import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';
import { buildAuditPrompt, BUSINESS_TYPES } from '@/lib/audit-constants';
import { saveLead, generateLeadId, type Lead } from '@/lib/leads';
import { scrapeWebsite } from '@/lib/scraper';
import { calculateAiReadiness } from '@/lib/ai-readiness';
import type { AuditReport, CategoryResult } from '@/types/audit';
import type { ScrapedData } from '@/types/scraper';

const MAX_LENGTHS = {
  businessName: 100,
  city: 100,
  businessType: 100,
  websiteUrl: 200,
  additionalContext: 1000,
} as const;

const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const NVIDIA_MODEL = 'moonshotai/kimi-k2.5';

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

  // Rate limiting
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0]?.trim() || realIp || 'unknown';

  log('INFO', 'Audit request received', { leadId, ip });

  const { allowed, remaining } = checkRateLimit(ip);
  if (!allowed) {
    log('WARN', 'Rate limit exceeded', { leadId, ip });
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later (10 audits per hour).' },
      { status: 429, headers: { 'X-RateLimit-Remaining': '0' } },
    );
  }

  // Validate API key
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    log('ERROR', 'NVIDIA_API_KEY not configured', { leadId });
    return NextResponse.json(
      { error: 'Audit service is not configured. Please contact the administrator.' },
      { status: 500 },
    );
  }

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

  // Scraping phase — only if a website URL is provided
  let scrapedData: ScrapedData | null = null;
  if (websiteUrl) {
    try {
      log('INFO', 'Starting website scrape', { leadId, websiteUrl });
      scrapedData = await scrapeWebsite(websiteUrl as string);
      if (scrapedData) {
        log('INFO', 'Scraping completed', {
          leadId,
          scrapeDurationMs: scrapedData.scrapeDurationMs,
          hasHtml: !!scrapedData.html,
          hasPageSpeed: !!scrapedData.pageSpeed,
          sitemapExists: scrapedData.crawlability.sitemapExists,
        });
      } else {
        log('WARN', 'Scraping returned null, falling back to LLM-only', { leadId });
      }
    } catch (scrapeErr) {
      const msg = scrapeErr instanceof Error ? scrapeErr.message : 'Unknown scrape error';
      log('WARN', 'Scraping failed, falling back to LLM-only', { leadId, error: msg });
    }
  }

  // Build prompt (with scraped data if available)
  const prompt = buildAuditPrompt(
    businessName as string,
    city as string,
    businessType as string,
    websiteUrl as string | undefined,
    additionalContext as string | undefined,
    scrapedData,
  );

  // Call NVIDIA API with timeout (300s — Kimi K2.5 reasoning takes ~60-120s)
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 300000);

  try {
    const apiStartTime = Date.now();

    const response = await fetch(NVIDIA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        model: NVIDIA_MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4096,
        temperature: 1.0,
        top_p: 1.0,
        stream: false,
      }),
      signal: controller.signal,
    });

    const apiDurationMs = Date.now() - apiStartTime;

    if (!response.ok) {
      const statusCode = response.status;
      log('ERROR', 'NVIDIA API returned error', { leadId, statusCode, apiDurationMs });

      const lead: Lead = { ...leadBase, status: 'error', errorMessage: `API ${statusCode}`, durationMs: Date.now() - startTime };
      await saveLead(lead);

      return NextResponse.json(
        { error: 'Failed to generate audit. Please try again.' },
        { status: 500 },
      );
    }

    const data = await response.json();
    const rawText: string = data.choices?.[0]?.message?.content || '';
    const tokensUsed = data.usage?.total_tokens || 0;

    log('INFO', 'NVIDIA API responded', { leadId, apiDurationMs, tokensUsed, contentLength: rawText.length });

    // Robust JSON extraction: find the first complete JSON object
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      log('ERROR', 'No JSON found in model response', { leadId, contentPreview: rawText.substring(0, 200) });

      const lead: Lead = { ...leadBase, status: 'error', errorMessage: 'No JSON in response', durationMs: Date.now() - startTime };
      await saveLead(lead);

      return NextResponse.json(
        { error: 'Failed to parse audit results. Please try again.' },
        { status: 500 },
      );
    }

    let report: AuditReport;
    try {
      report = JSON.parse(jsonMatch[0]);
    } catch {
      log('ERROR', 'JSON parse failed', { leadId, jsonPreview: jsonMatch[0].substring(0, 200) });

      const lead: Lead = { ...leadBase, status: 'error', errorMessage: 'JSON parse failed', durationMs: Date.now() - startTime };
      await saveLead(lead);

      return NextResponse.json(
        { error: 'Failed to parse audit results. Please try again.' },
        { status: 500 },
      );
    }

    // Validate structure
    if (typeof report.overallScore !== 'number' || !Array.isArray(report.categories)) {
      log('ERROR', 'Invalid report structure', { leadId });

      const lead: Lead = { ...leadBase, status: 'error', errorMessage: 'Invalid report structure', durationMs: Date.now() - startTime };
      await saveLead(lead);

      return NextResponse.json(
        { error: 'Invalid audit response format. Please try again.' },
        { status: 500 },
      );
    }

    // Sanitize scores and validate enums
    report.overallScore = Math.max(0, Math.min(100, Math.round(report.overallScore)));
    for (const cat of report.categories) {
      cat.score = Math.max(0, Math.min(100, Math.round(cat.score)));
      if (Array.isArray(cat.actions)) {
        for (const action of cat.actions) {
          if (!['high', 'medium', 'low'].includes(action.priority)) {
            action.priority = 'medium';
          }
        }
      }
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
    };
    await saveLead(lead);

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

    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    log('ERROR', 'Unexpected error', { leadId, error: errMsg, totalDurationMs });

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
