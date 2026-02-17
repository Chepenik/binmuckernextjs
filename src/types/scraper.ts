export interface HtmlScrapeResult {
  title: string | null;
  metaDescription: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  jsonLd: JsonLdData[];
  headings: HeadingStructure;
  imageAltCoverage: { withAlt: number; total: number; percentage: number };
  links: { internal: number; external: number };
  isHttps: boolean;
}

export interface JsonLdData {
  type: string;
  hasAddress: boolean;
  hasPhone: boolean;
  hasHours: boolean;
  hasName: boolean;
  raw: Record<string, unknown>;
}

export interface HeadingStructure {
  h1Count: number;
  h2Count: number;
  h3Count: number;
  hasProperHierarchy: boolean;
}

export interface PageSpeedResult {
  performance: number;
  seo: number;
  accessibility: number;
  lcp: number | null;
  cls: number | null;
}

export interface CrawlabilityResult {
  robotsTxtExists: boolean;
  robotsTxtAllowsCrawling: boolean;
  sitemapExists: boolean;
}

export interface ScrapedData {
  html: HtmlScrapeResult | null;
  pageSpeed: PageSpeedResult | null;
  crawlability: CrawlabilityResult;
  url: string;
  scrapeDurationMs: number;
}

export interface AiReadinessResult {
  overallScore: number;
  signals: AiReadinessSignal[];
  recommendations: string[];
}

export interface AiReadinessSignal {
  name: string;
  weight: number;
  score: number;
  maxScore: number;
}
