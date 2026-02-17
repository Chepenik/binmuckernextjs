import type { PageSpeedResult } from '@/types/scraper';

const PAGESPEED_API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
const PAGESPEED_TIMEOUT = 30000;

export async function scrapePageSpeed(url: string): Promise<PageSpeedResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PAGESPEED_TIMEOUT);

  try {
    // Build URL manually — URLSearchParams deduplicates keys, but PageSpeed API needs multiple `category` params
    const apiUrl = `${PAGESPEED_API_URL}?url=${encodeURIComponent(url)}&strategy=mobile&category=performance&category=seo&category=accessibility`;

    const response = await fetch(apiUrl, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`PageSpeed API returned ${response.status}`);
    }

    const data = await response.json();
    const categories = data.lighthouseResult?.categories;
    const audits = data.lighthouseResult?.audits;

    const performance = Math.round((categories?.performance?.score ?? 0) * 100);
    const seo = Math.round((categories?.seo?.score ?? 0) * 100);
    const accessibility = Math.round((categories?.accessibility?.score ?? 0) * 100);

    // Core Web Vitals
    const lcp = audits?.['largest-contentful-paint']?.numericValue
      ? Math.round(audits['largest-contentful-paint'].numericValue)
      : null;
    const cls = audits?.['cumulative-layout-shift']?.numericValue ?? null;

    return { performance, seo, accessibility, lcp, cls };
  } finally {
    clearTimeout(timeout);
  }
}
