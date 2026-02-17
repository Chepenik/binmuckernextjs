import type { ScrapedData, AiReadinessResult, AiReadinessSignal } from '@/types/scraper';

const LOCAL_BUSINESS_TYPES = [
  'LocalBusiness', 'Restaurant', 'Store', 'MedicalBusiness', 'LegalService',
  'FinancialService', 'AutomotiveBusiness', 'HomeAndConstructionBusiness',
  'SportsActivityLocation', 'EntertainmentBusiness', 'HealthAndBeautyBusiness',
  'Dentist', 'Physician', 'Plumber', 'Electrician', 'RealEstateAgent',
  'InsuranceAgency', 'AccountingService', 'Attorney', 'Bakery', 'BarOrPub',
  'BeautySalon', 'CafeOrCoffeeShop', 'DayCare', 'GasStation', 'GolfCourse',
  'HairSalon', 'HotelOrMotel', 'NailSalon', 'Optician', 'PetStore',
  'Pharmacy', 'TravelAgency', 'VeterinaryCare',
];

export function calculateAiReadiness(data: ScrapedData): AiReadinessResult {
  const signals: AiReadinessSignal[] = [];

  // 1. Structured Data (25%)
  const structuredDataScore = scoreStructuredData(data);
  signals.push({ name: 'Structured Data', weight: 25, score: structuredDataScore, maxScore: 100 });

  // 2. Semantic HTML (20%)
  const semanticScore = scoreSemanticHtml(data);
  signals.push({ name: 'Semantic HTML', weight: 20, score: semanticScore, maxScore: 100 });

  // 3. Meta Descriptions (15%)
  const metaScore = scoreMetaDescriptions(data);
  signals.push({ name: 'Meta Descriptions', weight: 15, score: metaScore, maxScore: 100 });

  // 4. Crawlability (15%)
  const crawlScore = scoreCrawlability(data);
  signals.push({ name: 'Crawlability', weight: 15, score: crawlScore, maxScore: 100 });

  // 5. Performance (15%)
  const perfScore = scorePerformance(data);
  signals.push({ name: 'Performance', weight: 15, score: perfScore, maxScore: 100 });

  // 6. Accessibility (10%)
  const a11yScore = scoreAccessibility(data);
  signals.push({ name: 'Accessibility', weight: 10, score: a11yScore, maxScore: 100 });

  // Calculate weighted average
  const overallScore = Math.round(
    signals.reduce((sum, s) => sum + (s.score * s.weight) / 100, 0)
  );

  // Generate recommendations based on lowest-scoring signals
  const recommendations = generateRecommendations(signals, data);

  return { overallScore, signals, recommendations };
}

function scoreStructuredData(data: ScrapedData): number {
  if (!data.html) return 0;

  const { jsonLd } = data.html;
  if (jsonLd.length === 0) return 0;

  let score = 30; // Has any JSON-LD

  // Check for LocalBusiness type
  const hasLocalBusiness = jsonLd.some(item =>
    LOCAL_BUSINESS_TYPES.some(type =>
      item.type.includes(type)
    )
  );
  if (hasLocalBusiness) score += 30;

  // Check for key properties in any schema
  const anyItem = jsonLd.find(item =>
    LOCAL_BUSINESS_TYPES.some(type => item.type.includes(type))
  ) || jsonLd[0];

  if (anyItem.hasName) score += 10;
  if (anyItem.hasAddress) score += 10;
  if (anyItem.hasPhone) score += 10;
  if (anyItem.hasHours) score += 10;

  return Math.min(100, score);
}

function scoreSemanticHtml(data: ScrapedData): number {
  if (!data.html) return 0;

  let score = 0;
  const { headings, imageAltCoverage } = data.html;

  // Exactly 1 H1
  if (headings.h1Count === 1) score += 30;
  else if (headings.h1Count > 0) score += 10;

  // Has H2s
  if (headings.h2Count > 0) score += 15;

  // Proper hierarchy
  if (headings.hasProperHierarchy) score += 15;

  // Image alt text coverage
  const altPct = imageAltCoverage.percentage;
  if (altPct >= 90) score += 40;
  else if (altPct >= 70) score += 30;
  else if (altPct >= 50) score += 20;
  else if (altPct > 0) score += 10;

  return Math.min(100, score);
}

function scoreMetaDescriptions(data: ScrapedData): number {
  if (!data.html) return 0;

  let score = 0;
  const { metaDescription, ogTitle, ogDescription, title } = data.html;

  // Has title
  if (title) score += 20;

  // Has meta description
  if (metaDescription) {
    score += 25;
    // Good length (120-160 chars)
    if (metaDescription.length >= 120 && metaDescription.length <= 160) {
      score += 15;
    } else if (metaDescription.length >= 50) {
      score += 5;
    }
  }

  // Has OG tags
  if (ogTitle) score += 15;
  if (ogDescription) score += 15;

  // HTTPS
  if (data.html.isHttps) score += 10;

  return Math.min(100, score);
}

function scoreCrawlability(data: ScrapedData): number {
  let score = 0;
  const { crawlability } = data;

  // robots.txt exists
  if (crawlability.robotsTxtExists) score += 30;

  // Allows crawling
  if (crawlability.robotsTxtAllowsCrawling) score += 30;

  // Sitemap exists
  if (crawlability.sitemapExists) score += 40;

  return score;
}

function scorePerformance(data: ScrapedData): number {
  if (!data.pageSpeed) return 50; // Neutral when unavailable
  return data.pageSpeed.performance;
}

function scoreAccessibility(data: ScrapedData): number {
  if (!data.pageSpeed) return 50; // Neutral when unavailable
  return data.pageSpeed.accessibility;
}

function generateRecommendations(signals: AiReadinessSignal[], data: ScrapedData): string[] {
  // Sort by score ascending to prioritize worst areas
  const sorted = [...signals].sort((a, b) => a.score - b.score);
  const recommendations: string[] = [];

  for (const signal of sorted) {
    if (recommendations.length >= 3) break;

    switch (signal.name) {
      case 'Structured Data':
        if (signal.score < 30) {
          recommendations.push('Add Schema.org LocalBusiness structured data (JSON-LD) to help AI agents find your business info like address, phone number, and hours.');
        } else if (signal.score < 70) {
          recommendations.push('Expand your structured data with opening hours, phone number, and address to make your business fully machine-readable.');
        }
        break;

      case 'Semantic HTML':
        if (data.html && data.html.headings.h1Count !== 1) {
          recommendations.push(`Use exactly one H1 tag on your page (currently ${data.html.headings.h1Count}). AI agents use heading structure to understand your page hierarchy.`);
        } else if (data.html && data.html.imageAltCoverage.percentage < 80) {
          recommendations.push(`Add descriptive alt text to your images (${data.html.imageAltCoverage.percentage}% coverage). AI agents rely on alt text to understand visual content.`);
        }
        break;

      case 'Meta Descriptions':
        if (!data.html?.metaDescription) {
          recommendations.push('Add a meta description (120-160 characters) that clearly describes your business. AI agents use this as a primary summary of your page.');
        } else if (!data.html.ogTitle) {
          recommendations.push('Add OpenGraph meta tags (og:title, og:description) so AI agents and social platforms can properly preview your business.');
        }
        break;

      case 'Crawlability':
        if (!data.crawlability.sitemapExists) {
          recommendations.push('Create a sitemap.xml file to help AI crawlers discover all your important pages efficiently.');
        } else if (!data.crawlability.robotsTxtExists) {
          recommendations.push('Add a robots.txt file to guide AI crawlers on which pages to index and how to navigate your site.');
        }
        break;

      case 'Performance':
        if (signal.score < 50) {
          recommendations.push('Improve page load speed (currently scoring low on mobile). Slow pages are deprioritized by AI agents when recommending businesses.');
        }
        break;

      case 'Accessibility':
        if (signal.score < 50) {
          recommendations.push('Fix accessibility issues on your site. AI agents factor in accessibility compliance when evaluating website quality.');
        }
        break;
    }
  }

  // Always have at least one recommendation
  if (recommendations.length === 0) {
    recommendations.push('Your site is well-optimized for AI agents. Keep your structured data and content up to date as AI search evolves.');
  }

  return recommendations;
}
