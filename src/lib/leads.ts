import { getRedis } from './redis';

export interface Lead {
  id: string;
  timestamp: string;
  ip: string;
  businessName: string;
  city: string;
  businessType: string;
  websiteUrl?: string;
  additionalContext?: string;
  status: 'success' | 'error' | 'timeout';
  overallScore?: number;
  errorMessage?: string;
  durationMs: number;
  scrapedDataAvailable?: boolean;
  aiReadinessScore?: number;
  placesDataAvailable?: boolean;
  placesCacheHit?: boolean;
  placeId?: string;
  googleRating?: number;
  googleReviewCount?: number;
}

/**
 * Save a lead to Upstash Redis.
 * 
 * If Redis is not configured, fails silently (lead tracking is a nice-to-have, not critical).
 * 
 * Leads are stored with a 90-day TTL as individual keys (lead:<id>) and also added to a 
 * sorted set (leads:index) for time-based querying.
 */
export async function saveLead(lead: Lead): Promise<void> {
  try {
    const redis = getRedis();
    if (!redis) {
      console.warn('[LEADS] Redis not configured, lead not persisted:', lead.id);
      return;
    }

    const leadKey = `lead:${lead.id}`;
    const indexKey = 'leads:index';
    const ttl = 60 * 60 * 24 * 90; // 90 days

    // Store lead data with TTL
    await redis.setex(leadKey, ttl, JSON.stringify(lead));

    // Add to sorted set index (score = timestamp for time-based queries)
    const timestamp = new Date(lead.timestamp).getTime();
    await redis.zadd(indexKey, { score: timestamp, member: lead.id });

    // Clean up old entries from the index (keep last 10k leads)
    const count = await redis.zcard(indexKey);
    if (count > 10000) {
      await redis.zremrangebyrank(indexKey, 0, count - 10001);
    }
  } catch (err) {
    console.error('[LEADS] Failed to save lead to Redis:', err);
  }
}

export function generateLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
