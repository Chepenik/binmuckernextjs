import { getRedis } from './redis';
import type { PlacesData } from '@/types/places';

const PLACES_API_URL = 'https://places.googleapis.com/v1/places:searchText';
const FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.rating',
  'places.userRatingCount',
  'places.types',
  'places.photos',
  'places.businessStatus',
  'places.location',
  'places.websiteUri',
  'places.googleMapsUri',
].join(',');

const CACHE_TTL_SECONDS = 24 * 60 * 60; // 24 hours
const REQUEST_TIMEOUT_MS = 6000;

function log(level: 'INFO' | 'WARN' | 'ERROR', message: string, data?: Record<string, unknown>) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    service: 'google-places',
    message,
    ...data,
  };
  if (level === 'ERROR') console.error(JSON.stringify(entry));
  else if (level === 'WARN') console.warn(JSON.stringify(entry));
  else console.log(JSON.stringify(entry));
}

function cacheKey(businessName: string, city: string): string {
  const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');
  return `places:v1:${norm(businessName)}|${norm(city)}`;
}

interface PlacesApiResponse {
  places?: Array<{
    id?: string;
    displayName?: { text?: string };
    formattedAddress?: string;
    rating?: number;
    userRatingCount?: number;
    types?: string[];
    photos?: unknown[];
    businessStatus?: string;
    location?: { latitude?: number; longitude?: number };
    websiteUri?: string;
    googleMapsUri?: string;
  }>;
}

export async function fetchGooglePlacesData(
  businessName: string,
  city: string,
): Promise<PlacesData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    log('INFO', 'GOOGLE_PLACES_API_KEY not configured, skipping Places lookup');
    return null;
  }

  if (!businessName.trim() || !city.trim()) return null;

  const redis = getRedis();
  const key = cacheKey(businessName, city);

  if (redis) {
    try {
      const cached = await redis.get<PlacesData>(key);
      if (cached) {
        log('INFO', 'Places cache hit', { businessName, city });
        return { ...cached, cacheHit: true };
      }
    } catch (err) {
      log('WARN', 'Places cache read failed', {
        error: err instanceof Error ? err.message : 'unknown',
      });
    }
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(PLACES_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': FIELD_MASK,
      },
      body: JSON.stringify({
        textQuery: `${businessName} ${city}`,
        maxResultCount: 1,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      log('WARN', 'Places API non-OK response', {
        status: response.status,
        businessName,
        city,
      });
      return null;
    }

    const data = (await response.json()) as PlacesApiResponse;
    const place = data.places?.[0];
    if (!place || !place.id) {
      log('INFO', 'Places API returned no match', { businessName, city });
      return null;
    }

    const result: PlacesData = {
      placeId: place.id,
      name: place.displayName?.text ?? businessName,
      formattedAddress: place.formattedAddress ?? '',
      businessStatus: place.businessStatus ?? null,
      rating: typeof place.rating === 'number' ? place.rating : null,
      userRatingCount:
        typeof place.userRatingCount === 'number' ? place.userRatingCount : null,
      types: Array.isArray(place.types) ? place.types : [],
      photoCount: Array.isArray(place.photos) ? place.photos.length : 0,
      websiteUri: place.websiteUri ?? null,
      googleMapsUri: place.googleMapsUri ?? null,
      location:
        place.location &&
        typeof place.location.latitude === 'number' &&
        typeof place.location.longitude === 'number'
          ? { latitude: place.location.latitude, longitude: place.location.longitude }
          : null,
      fetchedAt: new Date().toISOString(),
      cacheHit: false,
    };

    if (redis) {
      try {
        await redis.set(key, result, { ex: CACHE_TTL_SECONDS });
      } catch (err) {
        log('WARN', 'Places cache write failed', {
          error: err instanceof Error ? err.message : 'unknown',
        });
      }
    }

    log('INFO', 'Places lookup completed', {
      businessName,
      city,
      placeId: result.placeId,
      rating: result.rating,
      userRatingCount: result.userRatingCount,
    });

    return result;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      log('WARN', 'Places API timed out', { businessName, city });
    } else {
      log('ERROR', 'Places API error', {
        error: err instanceof Error ? err.message : 'unknown',
      });
    }
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
