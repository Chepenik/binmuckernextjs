import { NextRequest, NextResponse } from 'next/server';
import { getRedis } from '@/lib/redis';
import { checkRateLimit } from '@/lib/rateLimit';

export const maxDuration = 30;

interface UnlockRequest {
  email: string;
}

function log(level: 'INFO' | 'WARN' | 'ERROR', message: string, data?: Record<string, unknown>) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    service: 'audit-unlock-api',
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
  const startTime = Date.now();
  
  // Rate limiting (best effort)
  const ip = request.headers.get('x-real-ip') || 'unknown';
  const { allowed, remaining } = await checkRateLimit(ip, 'audit-unlock');
  
  if (!allowed) {
    log('WARN', 'Rate limit exceeded for unlock', { ip });
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'X-RateLimit-Remaining': '0' } },
    );
  }

  // Parse request
  let body: UnlockRequest;
  try {
    body = await request.json();
  } catch {
    log('WARN', 'Invalid request body', { ip });
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { email } = body;

  // Validate email
  if (!email || typeof email !== 'string' || !email.trim()) {
    log('WARN', 'Missing or invalid email', { ip });
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    log('WARN', 'Invalid email format', { ip, email });
    return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
  }

  // Store the email lead (best effort - don't fail if Redis unavailable)
  const redis = getRedis();
  let leadSaved = false;

  if (redis) {
    try {
      const leadKey = `lead:unlock:${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      await redis.set(leadKey, JSON.stringify({
        email: email.trim(),
        timestamp: new Date().toISOString(),
        ip,
      }), { ex: 7776000 }); // 90 days
      leadSaved = true;
      
      log('INFO', 'Lead saved successfully', { ip, email });
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      log('WARN', 'Failed to save lead (continuing anyway)', { ip, email, error: errMsg });
    }
  } else {
    log('WARN', 'Redis not available - lead not persisted', { ip, email });
  }

  const duration = Date.now() - startTime;

  log('INFO', 'Unlock completed', {
    ip,
    email,
    leadSaved,
    durationMs: duration,
  });

  // Always return success - client unlocks report in browser
  return NextResponse.json(
    { ok: true, leadSaved },
    { headers: { 'X-RateLimit-Remaining': String(remaining) } },
  );
}
