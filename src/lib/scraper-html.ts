import * as cheerio from 'cheerio';
import type { HtmlScrapeResult, JsonLdData, HeadingStructure } from '@/types/scraper';

const HTML_FETCH_TIMEOUT = 10000;

export async function scrapeHtml(url: string): Promise<HtmlScrapeResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), HTML_FETCH_TIMEOUT);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'BinMucker-SEO-Auditor/1.0 (audit tool)',
        'Accept': 'text/html',
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('title').first().text().trim() || null;
    const metaDescription = $('meta[name="description"]').attr('content')?.trim() || null;
    const ogTitle = $('meta[property="og:title"]').attr('content')?.trim() || null;
    const ogDescription = $('meta[property="og:description"]').attr('content')?.trim() || null;
    const ogImage = $('meta[property="og:image"]').attr('content')?.trim() || null;

    const jsonLd = extractJsonLd($);
    const headings = extractHeadings($);
    const imageAltCoverage = extractImageAltCoverage($);
    const links = extractLinks($, url);
    const isHttps = url.startsWith('https://');

    return {
      title,
      metaDescription,
      ogTitle,
      ogDescription,
      ogImage,
      jsonLd,
      headings,
      imageAltCoverage,
      links,
      isHttps,
    };
  } finally {
    clearTimeout(timeout);
  }
}

function extractJsonLd($: cheerio.CheerioAPI): JsonLdData[] {
  const results: JsonLdData[] = [];

  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const raw = JSON.parse($(el).html() || '{}');
      const items = Array.isArray(raw) ? raw : raw['@graph'] ? raw['@graph'] : [raw];

      for (const item of items) {
        const type = item['@type'] || 'Unknown';
        results.push({
          type: Array.isArray(type) ? type.join(', ') : type,
          hasAddress: !!(item.address || item.location?.address),
          hasPhone: !!(item.telephone || item.phone),
          hasHours: !!(item.openingHoursSpecification || item.openingHours),
          hasName: !!item.name,
          raw: item,
        });
      }
    } catch {
      // Invalid JSON-LD, skip
    }
  });

  return results;
}

function extractHeadings($: cheerio.CheerioAPI): HeadingStructure {
  const h1Count = $('h1').length;
  const h2Count = $('h2').length;
  const h3Count = $('h3').length;

  // Proper hierarchy: exactly 1 H1, and H2s exist if H3s exist
  const hasProperHierarchy = h1Count === 1 && (h3Count === 0 || h2Count > 0);

  return { h1Count, h2Count, h3Count, hasProperHierarchy };
}

function extractImageAltCoverage($: cheerio.CheerioAPI): { withAlt: number; total: number; percentage: number } {
  const images = $('img');
  const total = images.length;
  let withAlt = 0;

  images.each((_, el) => {
    const alt = $(el).attr('alt');
    if (alt && alt.trim().length > 0) {
      withAlt++;
    }
  });

  return {
    withAlt,
    total,
    percentage: total > 0 ? Math.round((withAlt / total) * 100) : 100,
  };
}

function extractLinks($: cheerio.CheerioAPI, baseUrl: string): { internal: number; external: number } {
  let internal = 0;
  let external = 0;

  let baseHostname: string;
  try {
    baseHostname = new URL(baseUrl).hostname;
  } catch {
    return { internal: 0, external: 0 };
  }

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (!href) return;

    // Skip anchors, mailto, tel, javascript
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
      return;
    }

    try {
      const linkUrl = new URL(href, baseUrl);
      if (linkUrl.hostname === baseHostname) {
        internal++;
      } else {
        external++;
      }
    } catch {
      // Relative paths count as internal
      internal++;
    }
  });

  return { internal, external };
}
