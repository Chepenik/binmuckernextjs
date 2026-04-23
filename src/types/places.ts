export interface PlacesData {
  placeId: string;
  name: string;
  formattedAddress: string;
  businessStatus: string | null;
  rating: number | null;
  userRatingCount: number | null;
  types: string[];
  photoCount: number;
  websiteUri: string | null;
  googleMapsUri: string | null;
  location: { latitude: number; longitude: number } | null;
  fetchedAt: string;
  cacheHit: boolean;
}
