import type { ScrapedData, CrawlabilityResult } from '@/types/scraper';
import { scrapeHtml } from './scraper-html';
import { scrapePageSpeed } from './scraper-pagespeed';

const CRAWL_FETCH_TIMEOUT = 5000;

// SSRF protection: block private/internal IPs
const BLOCKED_HOSTNAMES = ['localhost', '127.0.0.1', '0.0.0.0', '[::1]'];
const BLOCKED_IP_PREFIXES = ['10.', '172.16.', '172.17.', '172.18.', '172.19.',
  '172.20.', '172.21.', '172.22.', '172.23.', '172.24.', '172.25.', '172.26.',
  '172.27.', '172.28.', '172.29.', '172.30.', '172.31.', '192.168.', '169.254.'];

function isUrlSafe(url: string): boolean {
  try {
    const parsed = new URL(url);

    // Only allow http and https
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return false;
    }

    const hostname = parsed.hostname.toLowerCase();

    // Block known private hostnames
    if (BLOCKED_HOSTNAMES.includes(hostname)) {
      return false;
    }

    // Block private IP ranges
    for (const prefix of BLOCKED_IP_PREFIXES) {
      if (hostname.startsWith(prefix)) {
        return false;
      }
    }

    // Block IPv6 loopback
    if (hostname === '::1' || hostname === '[::1]') {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

async function checkCrawlability(url: string): Promise<CrawlabilityResult> {
  const baseUrl = new URL(url);
  const origin = baseUrl.origin;

  const result: CrawlabilityResult = {
    robotsTxtExists: false,
    robotsTxtAllowsCrawling: true,
    sitemapExists: false,
  };

  // Check robots.txt and sitemap.xml in parallel
  const [robotsResult, sitemapResult] = await Promise.allSettled([
    fetchWithTimeout(`${origin}/robots.txt`, CRAWL_FETCH_TIMEOUT),
    fetchWithTimeout(`${origin}/sitemap.xml`, CRAWL_FETCH_TIMEOUT),
  ]);

  // Process robots.txt
  if (robotsResult.status === 'fulfilled' && robotsResult.value.ok) {
    result.robotsTxtExists = true;
    const text = await robotsResult.value.text();
    // Simple check: look for "Disallow: /" that blocks everything
    const lines = text.toLowerCase().split('\n');
    let inAllAgents = false;
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('user-agent:') && trimmed.includes('*')) {
        inAllAgents = true;
      } else if (trimmed.startsWith('user-agent:')) {
        inAllAgents = false;
      }
      if (inAllAgents && trimmed === 'disallow: /') {
        result.robotsTxtAllowsCrawling = false;
      }
    }
  }

  // Process sitemap.xml
  if (sitemapResult.status === 'fulfilled' && sitemapResult.value.ok) {
    const contentType = sitemapResult.value.headers.get('content-type') || '';
    const text = await sitemapResult.value.text();
    // Verify it's actually XML, not a custom 404 page
    if (contentType.includes('xml') || text.trimStart().startsWith('<?xml') || text.includes('<urlset')) {
      result.sitemapExists = true;
    }
  }

  return result;
}

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'BinMucker-SEO-Auditor/1.0 (audit tool)' },
      redirect: 'follow',
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function scrapeWebsite(url: string): Promise<ScrapedData | null> {
  if (!isUrlSafe(url)) {
    console.warn(`[SCRAPER] URL blocked by SSRF protection: ${url}`);
    return null;
  }

  const startTime = Date.now();

  // Run all scrapers in parallel — any can fail independently
  const [htmlResult, pageSpeedResult, crawlabilityResult] = await Promise.allSettled([
    scrapeHtml(url),
    scrapePageSpeed(url),
    checkCrawlability(url),
  ]);

  const html = htmlResult.status === 'fulfilled' ? htmlResult.value : null;
  const pageSpeed = pageSpeedResult.status === 'fulfilled' ? pageSpeedResult.value : null;
  const crawlability = crawlabilityResult.status === 'fulfilled'
    ? crawlabilityResult.value
    : { robotsTxtExists: false, robotsTxtAllowsCrawling: true, sitemapExists: false };

  if (htmlResult.status === 'rejected') {
    console.warn(`[SCRAPER] HTML scrape failed for ${url}:`, htmlResult.reason?.message || htmlResult.reason);
  }
  if (pageSpeedResult.status === 'rejected') {
    console.warn(`[SCRAPER] PageSpeed failed for ${url}:`, pageSpeedResult.reason?.message || pageSpeedResult.reason);
  }
  if (crawlabilityResult.status === 'rejected') {
    console.warn(`[SCRAPER] Crawlability check failed for ${url}:`, crawlabilityResult.reason?.message || crawlabilityResult.reason);
  }

  const scrapeDurationMs = Date.now() - startTime;

  // If both HTML and PageSpeed failed, return null to trigger fallback
  if (!html && !pageSpeed) {
    console.warn(`[SCRAPER] All scrapers failed for ${url}, falling back to LLM-only`);
    return null;
  }

  console.log(`[SCRAPER] Completed in ${scrapeDurationMs}ms — HTML: ${html ? 'OK' : 'FAIL'}, PageSpeed: ${pageSpeed ? 'OK' : 'FAIL'}, Crawlability: OK`);

  return { html, pageSpeed, crawlability, url, scrapeDurationMs };
}
