import { NextRequest, NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/rateLimit';
import { buildAuditPrompt, BUSINESS_TYPES } from '@/lib/audit-constants';
import { saveLead, generateLeadId, type Lead } from '@/lib/leads';
import { scrapeWebsite } from '@/lib/scraper';
import { calculateAiReadiness } from '@/lib/ai-readiness';
import { fetchGooglePlacesData } from '@/lib/google-places';
import type { CategoryResult } from '@/types/audit';
import type { ScrapedData } from '@/types/scraper';
import type { PlacesData } from '@/types/places';

// AI Gateway model routing: default to gpt-5.4, allow env override.
// Routes through Vercel AI Gateway automatically for observability, cost tracking, and failover.
export const maxDuration = 300;

const MAX_LENGTHS = {
  businessName: 100,
  city: 100,
  businessType: 100,
  websiteUrl: 200,
  additionalContext: 1000,
} as const;

// Default model for audit generation via AI Gateway
// Free tier: gpt-4o-mini, gemini-2.5-flash-lite, claude-3-haiku
// Paid tier: upgrade at vercel.com for gpt-5.4, claude-sonnet-4.6, etc.
const AUDIT_MODEL = process.env.AUDIT_MODEL || 'openai/gpt-4o-mini';

// Zod schema for structured audit report generation
const auditReportSchema = z.object({
  overallScore: z.number().min(0).max(100).describe('Overall digital marketing score (0-100)'),
  summary: z.string().describe('Brief executive summary of the audit findings'),
  categories: z.array(
    z.object({
      category: z.string().describe('Category name (e.g., "SEO", "Content", "Social Media")'),
      score: z.number().min(0).max(100).describe('Category score (0-100)'),
      emoji: z.string().describe('Single emoji representing the category'),
      actions: z.array(
        z.object({
          action: z.string().describe('Specific recommended action'),
          priority: z.enum(['high', 'medium', 'low']).describe('Action priority level'),
          estimatedImpact: z.string().describe('Expected business impact of this action'),
        }),
      ).describe('List of actionable recommendations for this category'),
    }),
  ).describe('Detailed category-by-category analysis'),
  quickWin: z.object({
    title: z.string().describe('Title of the easiest high-impact action'),
    description: z.string().describe('Why this is valuable and how to implement it'),
    timeToImplement: z.string().describe('Estimated time to complete (e.g., "1 hour", "1 day")'),
  }).describe('The single most impactful quick win'),
  topPriorities: z.array(z.string()).describe('Top 3-5 priority actions across all categories'),
  competitiveInsight: z.string().describe('One strategic insight about the competitive landscape'),
});

function log(level: 'INFO' | 'WARN' | 'ERROR', message: string, data?: Record<string, unknown>) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    service: 'audit-api',
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
  const leadId = generateLeadId();

  // Rate limiting. Do NOT trust x-forwarded-for's leftmost entry from the client.
  // Vercel's edge sets x-real-ip to the real client IP — that's the trusted source.
  const ip = request.headers.get('x-real-ip') || 'unknown';

  log('INFO', 'Audit request received', { leadId, ip });

  const { allowed, remaining } = await checkRateLimit(ip);
  if (!allowed) {
    log('WARN', 'Rate limit exceeded', { leadId, ip });
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later (10 audits per hour).' },
      { status: 429, headers: { 'X-RateLimit-Remaining': '0' } },
    );
  }

  // AI Gateway authentication: uses Vercel OIDC on deployment, optional AI_GATEWAY_API_KEY for local dev
  // No explicit provider keys (OPENAI_API_KEY, etc.) needed — gateway handles auth via OIDC token.

  // Parse request body
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    log('WARN', 'Invalid request body', { leadId, ip });
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { businessName, city, businessType, websiteUrl, additionalContext } = body;

  // Type validation
  if (
    typeof businessName !== 'string' ||
    typeof city !== 'string' ||
    typeof businessType !== 'string' ||
    !businessName.trim() ||
    !city.trim() ||
    !businessType.trim()
  ) {
    log('WARN', 'Missing required fields', { leadId, ip });
    return NextResponse.json(
      { error: 'Business name, city, and business type are required.' },
      { status: 400 },
    );
  }

  if (websiteUrl !== undefined && typeof websiteUrl !== 'string') {
    return NextResponse.json({ error: 'Invalid website URL.' }, { status: 400 });
  }

  if (additionalContext !== undefined && typeof additionalContext !== 'string') {
    return NextResponse.json({ error: 'Invalid additional context.' }, { status: 400 });
  }

  // Length validation
  if (
    businessName.length > MAX_LENGTHS.businessName ||
    city.length > MAX_LENGTHS.city ||
    businessType.length > MAX_LENGTHS.businessType ||
    (websiteUrl && websiteUrl.length > MAX_LENGTHS.websiteUrl) ||
    (additionalContext && additionalContext.length > MAX_LENGTHS.additionalContext)
  ) {
    log('WARN', 'Field length exceeded', { leadId, ip, businessName });
    return NextResponse.json(
      { error: 'One or more fields exceed the maximum allowed length.' },
      { status: 400 },
    );
  }

  // Validate business type against allowed values
  if (!(BUSINESS_TYPES as readonly string[]).includes(businessType)) {
    log('WARN', 'Invalid business type', { leadId, ip, businessType });
    return NextResponse.json({ error: 'Invalid business type.' }, { status: 400 });
  }

  // Validate URL format if provided
  if (websiteUrl) {
    try {
      new URL(websiteUrl);
    } catch {
      return NextResponse.json({ error: 'Invalid website URL format.' }, { status: 400 });
    }
  }

  // Lead base data — captured before the API call
  const leadBase = {
    id: leadId,
    timestamp: new Date().toISOString(),
    ip,
    businessName: businessName as string,
    city: city as string,
    businessType: businessType as string,
    websiteUrl: websiteUrl as string | undefined,
    additionalContext: additionalContext as string | undefined,
  };

  log('INFO', 'Audit started', {
    leadId,
    businessName,
    city,
    businessType,
    websiteUrl: websiteUrl || null,
    hasContext: !!additionalContext,
  });

  // Data enrichment phase — scrape website AND look up Google Business Profile
  // in parallel so wall-clock time is max(scrape, places) instead of the sum.
  const scrapePromise: Promise<ScrapedData | null> = websiteUrl
    ? scrapeWebsite(websiteUrl as string).catch((scrapeErr) => {
        const msg = scrapeErr instanceof Error ? scrapeErr.message : 'Unknown scrape error';
        log('WARN', 'Scraping failed, falling back to LLM-only', { leadId, error: msg });
        return null;
      })
    : Promise.resolve(null);

  const placesPromise: Promise<PlacesData | null> = fetchGooglePlacesData(
    businessName as string,
    city as string,
  ).catch((err) => {
    const msg = err instanceof Error ? err.message : 'Unknown places error';
    log('WARN', 'Places lookup failed, continuing without GBP data', { leadId, error: msg });
    return null;
  });

  if (websiteUrl) log('INFO', 'Starting website scrape', { leadId, websiteUrl });
  log('INFO', 'Starting Google Places lookup', { leadId });

  const [scrapedData, placesData] = await Promise.all([scrapePromise, placesPromise]);

  if (scrapedData) {
    log('INFO', 'Scraping completed', {
      leadId,
      scrapeDurationMs: scrapedData.scrapeDurationMs,
      hasHtml: !!scrapedData.html,
      hasPageSpeed: !!scrapedData.pageSpeed,
      sitemapExists: scrapedData.crawlability.sitemapExists,
    });
  } else if (websiteUrl) {
    log('WARN', 'Scraping returned null, falling back to LLM-only', { leadId });
  }

  if (placesData) {
    log('INFO', 'Places data available', {
      leadId,
      placeId: placesData.placeId,
      rating: placesData.rating,
      userRatingCount: placesData.userRatingCount,
      cacheHit: placesData.cacheHit,
    });
  }

  // Build prompt (with scraped + places data if available)
  const prompt = buildAuditPrompt(
    businessName as string,
    city as string,
    businessType as string,
    websiteUrl as string | undefined,
    additionalContext as string | undefined,
    scrapedData,
    placesData,
  );

  // Generate audit via AI Gateway with timeout (300s for reasoning models)
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 300000);

  try {
    const apiStartTime = Date.now();

    // Detect environment for AI Gateway tracking
    const environment = process.env.VERCEL_ENV || (process.env.NODE_ENV === 'production' ? 'production' : 'development');

    // Call AI Gateway with structured output via AI SDK
    // Includes free-tier-friendly failover models
    const { object: report, usage } = await generateObject({
      model: AUDIT_MODEL,
      schema: auditReportSchema,
      prompt,
      abortSignal: controller.signal,
      providerOptions: {
        gateway: {
          tags: [`feature:audit`, `env:${environment}`],
          user: leadId, // Track per-audit for observability
          models: [
            AUDIT_MODEL,
            'google/gemini-2.5-flash-lite', // Free tier fallback: $0.10/$0.40 per 1M tokens
            'anthropic/claude-3-haiku',      // Free tier fallback: $0.25/$1.25 per 1M tokens
          ],
        },
      },
    });

    const apiDurationMs = Date.now() - apiStartTime;
    const tokensUsed = usage?.totalTokens || 0;

    log('INFO', 'AI Gateway responded', {
      leadId,
      model: AUDIT_MODEL,
      apiDurationMs,
      tokensUsed,
    });

    // Sanitize scores (Zod validates structure, but we still enforce bounds)
    report.overallScore = Math.max(0, Math.min(100, Math.round(report.overallScore)));
    for (const cat of report.categories) {
      cat.score = Math.max(0, Math.min(100, Math.round(cat.score)));
    }

    // Append AI Readiness category if scraping succeeded
    let aiReadinessScore: number | undefined;
    if (scrapedData) {
      const aiReadiness = calculateAiReadiness(scrapedData);
      aiReadinessScore = aiReadiness.overallScore;

      const aiReadinessCategory: CategoryResult = {
        category: 'AI Readiness',
        score: aiReadiness.overallScore,
        emoji: '\uD83E\uDD16',
        actions: aiReadiness.recommendations.map((rec, i) => ({
          action: rec,
          priority: i === 0 ? 'high' as const : i === 1 ? 'medium' as const : 'low' as const,
          estimatedImpact: i === 0
            ? 'Critical for AI-powered search visibility'
            : i === 1
              ? 'Improves AI agent understanding of your business'
              : 'Enhances machine readability of your site',
        })),
      };

      report.categories.push(aiReadinessCategory);

      log('INFO', 'AI Readiness calculated', {
        leadId,
        aiReadinessScore: aiReadiness.overallScore,
        signals: aiReadiness.signals.map(s => ({ name: s.name, score: s.score })),
      });
    }

    const totalDurationMs = Date.now() - startTime;

    // Save successful lead
    const lead: Lead = {
      ...leadBase,
      status: 'success',
      overallScore: report.overallScore,
      durationMs: totalDurationMs,
      scrapedDataAvailable: !!scrapedData,
      aiReadinessScore,
      placesDataAvailable: !!placesData,
      placesCacheHit: placesData?.cacheHit,
      placeId: placesData?.placeId,
      googleRating: placesData?.rating ?? undefined,
      googleReviewCount: placesData?.userRatingCount ?? undefined,
    };
    await saveLead(lead);

    // Store audit report in Redis for email unlock (Campaign 1)
    // TTL: 1 hour (3600 seconds)
    const redis = await import('@/lib/redis').then(m => m.getRedis());
    if (redis()) {
      try {
        const auditSessionKey = `audit:session:${ip}`;
        await redis()!.set(
          auditSessionKey,
          JSON.stringify({
            report,
            businessName: businessName as string,
            city: city as string,
            timestamp: new Date().toISOString(),
          }),
          { ex: 3600 }, // 1 hour expiry
        );
        log('INFO', 'Audit report stored for unlock', { leadId, auditSessionKey });
      } catch (err) {
        log('WARN', 'Failed to store audit for unlock', { 
          leadId, 
          error: err instanceof Error ? err.message : 'unknown',
        });
      }
    }

    log('INFO', 'Audit completed successfully', {
      leadId,
      businessName,
      city,
      businessType,
      overallScore: report.overallScore,
      categoryScores: report.categories.map(c => ({ category: c.category, score: c.score })),
      totalDurationMs,
      tokensUsed,
      scrapedDataAvailable: !!scrapedData,
      aiReadinessScore,
      placesDataAvailable: !!placesData,
      placesCacheHit: placesData?.cacheHit,
    });

    return NextResponse.json(report, {
      headers: { 'X-RateLimit-Remaining': String(remaining) },
    });
  } catch (error: unknown) {
    const totalDurationMs = Date.now() - startTime;

    if (error instanceof Error && error.name === 'AbortError') {
      log('ERROR', 'Audit request timed out', { leadId, totalDurationMs });

      const lead: Lead = { ...leadBase, status: 'timeout', errorMessage: 'Request timed out', durationMs: totalDurationMs };
      await saveLead(lead);

      return NextResponse.json(
        { error: 'Audit request timed out. Please try again.' },
        { status: 504 },
      );
    }

    // AI Gateway specific errors: free tier restrictions, budget exhaustion, and rate limits
    const errMsg = error instanceof Error ? error.message : String(error);
    const errStr = errMsg.toLowerCase();

    // Free tier model restriction
    if (errStr.includes('free tier') || errStr.includes('upgrade to paid') || errStr.includes('unrestricted access')) {
      log('ERROR', 'AI Gateway free tier model restriction', { leadId, error: errMsg, model: AUDIT_MODEL, totalDurationMs });

      const lead: Lead = { ...leadBase, status: 'error', errorMessage: 'Free tier model restriction', durationMs: totalDurationMs };
      await saveLead(lead);

      return NextResponse.json(
        {
          error: `The requested AI model (${AUDIT_MODEL}) requires paid credits. The free tier includes models like gpt-4o-mini. ` +
                 'Contact the administrator to upgrade at vercel.com/ai or set AUDIT_MODEL=openai/gpt-4o-mini.'
        },
        { status: 402 },
      );
    }

    if (errStr.includes('402') || errStr.includes('budget') || errStr.includes('payment required')) {
      log('ERROR', 'AI Gateway budget exhausted', { leadId, error: errMsg, totalDurationMs });

      const lead: Lead = { ...leadBase, status: 'error', errorMessage: 'Budget exhausted', durationMs: totalDurationMs };
      await saveLead(lead);

      return NextResponse.json(
        { error: 'AI service budget exceeded. Please contact the administrator.' },
        { status: 503 },
      );
    }

    if (errStr.includes('429') || errStr.includes('rate limit') || errStr.includes('too many requests')) {
      log('ERROR', 'AI Gateway rate limited', { leadId, error: errMsg, totalDurationMs });

      const lead: Lead = { ...leadBase, status: 'error', errorMessage: 'Gateway rate limited', durationMs: totalDurationMs };
      await saveLead(lead);

      return NextResponse.json(
        { error: 'AI service temporarily unavailable due to high demand. Please try again in a few moments.' },
        { status: 429 },
      );
    }

    log('ERROR', 'Unexpected error during audit generation', { leadId, error: errMsg, totalDurationMs });

    const lead: Lead = { ...leadBase, status: 'error', errorMessage: errMsg, durationMs: totalDurationMs };
    await saveLead(lead);

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
