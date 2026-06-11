import { NextRequest, NextResponse } from 'next/server';
import { getRedis } from '@/lib/redis';
import { checkRateLimit } from '@/lib/rateLimit';

const SUBSCRIBERS_KEY = 'subscribers';
const MAX_EMAIL_LENGTH = 254;

// Pragmatic email check — good enough to reject obvious junk without
// pretending to fully validate RFC 5322.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function log(level: 'INFO' | 'WARN' | 'ERROR', message: string, data?: Record<string, unknown>) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    service: 'subscribe-api',
    message,
    ...data,
  };
  if (level === 'ERROR') {
    console.error(JSON.stringify(entry));
  } else if (level === 'WARN') {
    console.warn(JSON.stringify(entry));
  } else {
    console.log(JSON.stringify(entry));
  }
}

export async function POST(request: NextRequest) {
  // Vercel's edge sets x-real-ip to the trusted client IP.
  const ip = request.headers.get('x-real-ip') || 'unknown';

  const { allowed } = await checkRateLimit(ip, 'subscribe');
  if (!allowed) {
    log('WARN', 'Rate limit exceeded', { ip });
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const rawEmail = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!rawEmail || rawEmail.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(rawEmail)) {
    return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
  }

  const entry = JSON.stringify({ email: rawEmail, ts: Date.now() });

  const redis = getRedis();
  if (redis) {
    try {
      await redis.rpush(SUBSCRIBERS_KEY, entry);
      log('INFO', 'Subscriber added', { domain: rawEmail.split('@')[1] });
    } catch (err) {
      log('ERROR', 'Failed to persist subscriber', {
        error: err instanceof Error ? err.message : 'unknown',
      });
      return NextResponse.json({ error: 'Could not save your email. Try again.' }, { status: 500 });
    }
  } else {
    // Local dev without Redis provisioned — accept the signup so the flow works,
    // but make it loud that nothing was persisted.
    log('WARN', 'Redis not configured; subscriber not persisted', {
      domain: rawEmail.split('@')[1],
    });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
