import { Redis } from '@upstash/redis';

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const WINDOW_SECONDS = 60 * 60;
const MAX_REQUESTS = 10;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory fallback for local dev when Redis isn't provisioned.
const rateLimitMap = new Map<string, RateLimitEntry>();

let warnedMissingRedis = false;
let redisClient: Redis | null = null;

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    if (!warnedMissingRedis) {
      warnedMissingRedis = true;
      console.warn(
        JSON.stringify({
          level: 'WARN',
          service: 'rateLimit',
          message:
            'Redis env vars not set (KV_REST_API_URL/TOKEN or UPSTASH_REDIS_REST_URL/TOKEN). Falling back to in-memory rate limiting — NOT safe on serverless with multiple instances.',
        }),
      );
    }
    return null;
  }
  if (!redisClient) {
    redisClient = new Redis({ url, token });
  }
  return redisClient;
}

function checkInMemory(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();

  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(key);
  }

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }
  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }
  entry.count++;
  return { allowed: true, remaining: MAX_REQUESTS - entry.count };
}

export async function checkRateLimit(
  ip: string,
  namespace = 'audit',
): Promise<{ allowed: boolean; remaining: number }> {
  const redis = getRedis();
  if (!redis) return checkInMemory(ip);

  const key = `rl:${namespace}:${ip}`;
  try {
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, WINDOW_SECONDS);
    }
    if (count > MAX_REQUESTS) {
      return { allowed: false, remaining: 0 };
    }
    return { allowed: true, remaining: MAX_REQUESTS - count };
  } catch (err) {
    // Fail-open to in-memory rather than DOS'ing legitimate users when Redis is down.
    console.error(
      JSON.stringify({
        level: 'ERROR',
        service: 'rateLimit',
        message: 'Redis rate-limit check failed; falling back to in-memory',
        error: err instanceof Error ? err.message : 'unknown',
      }),
    );
    return checkInMemory(ip);
  }
}
