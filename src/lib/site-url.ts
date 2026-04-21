export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://binmucker.com';

export function resolveShotTarget(url: string, override?: string): string {
  if (override) return override;
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;
}

export function displayHost(url: string): string {
  try {
    if (/^https?:\/\//i.test(url)) {
      return new URL(url).hostname.replace(/^www\./, '');
    }
  } catch {
    // fall through
  }
  const path = url.startsWith('/') ? url : `/${url}`;
  const base = SITE_URL.replace(/^https?:\/\//, '').replace(/^www\./, '');
  return `${base}${path}`;
}
