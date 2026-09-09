import { getRedis } from './redis';

export interface Lead {
  id: string;
  timestamp: string;
  ip: string;
  businessName: string;
  city: string;
  businessType: string;
  websiteUrl?: string;
  additionalContext?: string;
  status: 'success' | 'error' | 'timeout';
  overallScore?: number;
  errorMessage?: string;
  durationMs: number;
  scrapedDataAvailable?: boolean;
  aiReadinessScore?: number;
  placesDataAvailable?: boolean;
  placesCacheHit?: boolean;
  placeId?: string;
  googleRating?: number;
  googleReviewCount?: number;
}

let warnedMissingRedis = false;

export async function saveLead(lead: Lead): Promise<void> {
  const redis = getRedis();
  
  if (!redis) {
    if (!warnedMissingRedis) {
      warnedMissingRedis = true;
      console.warn(
        JSON.stringify({
          level: 'WARN',
          service: 'leads',
          message: 'Redis env vars not set (KV_REST_API_URL/TOKEN or UPSTASH_REDIS_REST_URL/TOKEN). Lead tracking disabled.',
        }),
      );
    }
    return;
  }

  try {
    const key = `lead:${lead.id}`;
    await redis.set(key, JSON.stringify(lead));
  } catch (err) {
    console.error(
      JSON.stringify({
        level: 'ERROR',
        service: 'leads',
        message: 'Failed to save lead to Redis',
        error: err instanceof Error ? err.message : 'unknown',
        leadId: lead.id,
      }),
    );
  }
}

export function generateLeadId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
