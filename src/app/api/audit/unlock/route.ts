import { NextRequest, NextResponse } from 'next/server';
import { getRedis } from '@/lib/redis';
import { checkRateLimit } from '@/lib/rateLimit';
import { sendAuditReport } from '@/lib/email';
import type { AuditReport } from '@/types/audit';

export const maxDuration = 60;

interface UnlockRequest {
  email: string;
}

interface StoredAuditData {
  report: AuditReport;
  businessName: string;
  city: string;
  timestamp: string;
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
  
  // Rate limiting
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

  // Get the audit report from session/cookie
  // For now, we'll retrieve from Redis using the IP as a temporary key
  // In production, you might want to use a session token
  const redis = getRedis();

  if (!redis) {
    log('ERROR', 'Redis not configured for unlock', { ip, email });
    return NextResponse.json(
      { error: 'Report storage not available. Please run the audit again.' },
      { status: 503 },
    );
  }

  try {
    // Try to get the most recent audit for this IP
    const auditKey = `audit:session:${ip}`;
    const storedData = await redis.get(auditKey);

    if (!storedData) {
      log('WARN', 'No recent audit found for unlock', { ip, email });
      return NextResponse.json(
        { error: 'No recent audit found. Please run the audit again.' },
        { status: 404 },
      );
    }

    const auditData: StoredAuditData = JSON.parse(storedData as string);

    log('INFO', 'Unlock requested', {
      ip,
      email,
      businessName: auditData.businessName,
      score: auditData.report.overallScore,
    });

    // Send the email
    const emailResult = await sendAuditReport({
      email: email.trim(),
      businessName: auditData.businessName,
      city: auditData.city,
      report: auditData.report,
    });

    if (!emailResult.success) {
      log('ERROR', 'Failed to send email for unlock', {
        ip,
        email,
        error: emailResult.error,
      });
      return NextResponse.json(
        { error: emailResult.error || 'Failed to send report.' },
        { status: 500 },
      );
    }

    // Store the email lead
    const leadKey = `lead:unlock:${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    await redis.set(leadKey, JSON.stringify({
      email: email.trim(),
      businessName: auditData.businessName,
      city: auditData.city,
      score: auditData.report.overallScore,
      timestamp: new Date().toISOString(),
      ip,
    }));

    const duration = Date.now() - startTime;

    log('INFO', 'Unlock completed successfully', {
      ip,
      email,
      businessName: auditData.businessName,
      durationMs: duration,
    });

    return NextResponse.json(
      { success: true },
      { headers: { 'X-RateLimit-Remaining': String(remaining) } },
    );
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    log('ERROR', 'Unexpected error during unlock', { ip, email, error: errMsg });

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    );
  }
}
