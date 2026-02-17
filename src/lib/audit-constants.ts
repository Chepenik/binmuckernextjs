export const BUSINESS_TYPES = [
  'Restaurant / Cafe',
  'Retail Store',
  'Professional Services (Law, Accounting)',
  'Healthcare / Medical',
  'Home Services (Plumbing, HVAC, Electric)',
  'Real Estate',
  'Fitness / Wellness',
  'Auto Services',
  'Beauty / Salon / Spa',
  'Education / Tutoring',
  'Pet Services',
  'Cleaning Services',
  'Construction / Contractor',
  'Financial Services',
  'Other',
] as const;

export const CATEGORY_META: Record<string, { emoji: string; label: string }> = {
  'Google Business Profile': { emoji: '\uD83D\uDCCD', label: 'Google Business Profile' },
  'Website & Technical SEO': { emoji: '\uD83C\uDF10', label: 'Website & Technical SEO' },
  'Reviews & Reputation': { emoji: '\u2B50', label: 'Reviews & Reputation' },
  'Content & Social': { emoji: '\uD83D\uDCF1', label: 'Content & Social' },
  'Competitive Position': { emoji: '\uD83C\uDFC6', label: 'Competitive Position' },
  'AI Readiness': { emoji: '\uD83E\uDD16', label: 'AI Readiness' },
};

export const LOADING_PHASES = [
  'Scanning your website...',
  'Measuring page performance...',
  'Evaluating AI readiness...',
  'Deep-analyzing business profile...',
  'Researching local competitors...',
  'Evaluating review signals...',
  'Auditing website presence...',
  'Assessing content strategy...',
  'Mapping local search landscape...',
  'Scoring category performance...',
  'Building action plan...',
  'Prioritizing recommendations...',
  'Finalizing your report...',
];

export function getScoreColor(score: number): string {
  if (score >= 75) return '#22c55e';
  if (score >= 50) return '#eab308';
  if (score >= 25) return '#f97316';
  return '#ef4444';
}

export function getScoreLabel(score: number): string {
  if (score >= 75) return 'Strong';
  if (score >= 50) return 'Average';
  if (score >= 25) return 'Needs Work';
  return 'Critical';
}

import type { ScrapedData } from '@/types/scraper';

function sanitizeInput(input: string, maxLength: number): string {
  return input
    .replace(/[\x00-\x1F]/g, '')
    .slice(0, maxLength)
    .trim();
}

function buildScrapedDataBlock(data: ScrapedData): string {
  const lines: string[] = ['REAL WEBSITE DATA (from live scraping):'];

  if (data.pageSpeed) {
    lines.push(`- PageSpeed Performance: ${data.pageSpeed.performance}/100 | SEO: ${data.pageSpeed.seo}/100 | Accessibility: ${data.pageSpeed.accessibility}/100`);
  }

  if (data.html) {
    const { jsonLd, metaDescription, imageAltCoverage, isHttps } = data.html;
    const localBizCount = jsonLd.filter(j =>
      j.type.includes('Business') || j.type.includes('Restaurant') || j.type.includes('Store')
    ).length;
    if (jsonLd.length > 0) {
      lines.push(`- Schema.org: ${jsonLd.map(j => j.type).join(', ')} found${localBizCount > 0 ? ` (${localBizCount} LocalBusiness)` : ''}`);
    } else {
      lines.push('- Schema.org: No structured data found');
    }

    lines.push(`- Meta Description: ${metaDescription ? `Present (${metaDescription.length} chars)` : 'Missing'}`);
    lines.push(`- Image Alt Coverage: ${imageAltCoverage.percentage}% (${imageAltCoverage.withAlt}/${imageAltCoverage.total} images)`);
    lines.push(`- HTTPS: ${isHttps ? 'Yes' : 'No'}`);
  }

  lines.push(`- Sitemap: ${data.crawlability.sitemapExists ? 'Present' : 'Missing'} | robots.txt: ${data.crawlability.robotsTxtExists ? 'Present' : 'Missing'}`);

  lines.push('\nUse these real scores to inform your Website & Technical SEO category. Be specific about what was found.');

  return lines.join('\n');
}

export function buildAuditPrompt(
  businessName: string,
  city: string,
  businessType: string,
  websiteUrl?: string,
  additionalContext?: string,
  scrapedData?: ScrapedData | null,
): string {
  const safeName = sanitizeInput(businessName, 100);
  const safeCity = sanitizeInput(city, 100);
  const safeType = sanitizeInput(businessType, 100);
  const safeUrl = websiteUrl ? sanitizeInput(websiteUrl, 200) : undefined;
  const safeContext = additionalContext ? sanitizeInput(additionalContext, 1000) : undefined;

  const scrapedBlock = scrapedData ? `\n\n${buildScrapedDataBlock(scrapedData)}` : '';

  return `Local SEO audit. Return ONLY valid JSON, no markdown or explanation.

Business: ${safeName} | ${safeCity} | ${safeType}${safeUrl ? ` | ${safeUrl}` : ''}${safeContext ? `\nContext: ${safeContext}` : ''}${scrapedBlock}

Score 0-100 per category. 3 actions each with priority (high/medium/low). Be specific and realistic.

JSON format:
{"overallScore":N,"summary":"2-3 sentences","categories":[{"category":"Google Business Profile","score":N,"emoji":"\uD83D\uDCCD","actions":[{"action":"...","priority":"high","estimatedImpact":"..."}]},{"category":"Website & Technical SEO","score":N,"emoji":"\uD83C\uDF10","actions":[...]},{"category":"Reviews & Reputation","score":N,"emoji":"\u2B50","actions":[...]},{"category":"Content & Social","score":N,"emoji":"\uD83D\uDCF1","actions":[...]},{"category":"Competitive Position","score":N,"emoji":"\uD83C\uDFC6","actions":[...]}],"quickWin":{"title":"...","description":"...","timeToImplement":"..."},"topPriorities":["1","2","3","4","5"],"competitiveInsight":"2-3 sentences"}`;
}
