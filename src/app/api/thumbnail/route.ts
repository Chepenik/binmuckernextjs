import { NextRequest, NextResponse } from 'next/server';

const WEEK_SECONDS = 60 * 60 * 24 * 7;
const FALLBACK_PATH = '/images/thumbnail-fallback.svg';

function isSafePublicUrl(raw: string): boolean {
  if (raw.length > 2048) return false;
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return false;
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;

  const host = parsed.hostname.toLowerCase();
  if (host === 'localhost' || host.endsWith('.localhost')) return false;
  if (host === '0.0.0.0' || host === '::1') return false;

  // Block IPv4 private / loopback / link-local ranges.
  const ipv4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    const [a, b] = ipv4.slice(1).map(Number);
    if (a === 10) return false;
    if (a === 127) return false;
    if (a === 169 && b === 254) return false;
    if (a === 172 && b >= 16 && b <= 31) return false;
    if (a === 192 && b === 168) return false;
    if (a === 0) return false;
  }
  return true;
}

function fallbackRedirect(origin: string) {
  const res = NextResponse.redirect(new URL(FALLBACK_PATH, origin), 302);
  res.headers.set('Cache-Control', 'public, max-age=60');
  return res;
}

export async function GET(req: NextRequest) {
  const target = req.nextUrl.searchParams.get('url');
  if (!target || !isSafePublicUrl(target)) {
    return fallbackRedirect(req.nextUrl.origin);
  }

  const microlink = new URL('https://api.microlink.io/');
  microlink.searchParams.set('url', target);
  microlink.searchParams.set('screenshot', 'true');
  microlink.searchParams.set('meta', 'false');
  microlink.searchParams.set('viewport.width', '1280');
  microlink.searchParams.set('viewport.height', '800');
  microlink.searchParams.set('waitFor', '800');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const apiRes = await fetch(microlink.toString(), {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
      next: { revalidate: WEEK_SECONDS },
    });
    if (!apiRes.ok) return fallbackRedirect(req.nextUrl.origin);

    const json = (await apiRes.json()) as {
      status?: string;
      data?: { screenshot?: { url?: string } };
    };
    const shotUrl = json?.data?.screenshot?.url;
    if (json?.status !== 'success' || !shotUrl) {
      return fallbackRedirect(req.nextUrl.origin);
    }

    const res = NextResponse.redirect(shotUrl, 302);
    res.headers.set(
      'Cache-Control',
      `public, s-maxage=${WEEK_SECONDS}, stale-while-revalidate=86400`,
    );
    return res;
  } catch {
    return fallbackRedirect(req.nextUrl.origin);
  } finally {
    clearTimeout(timeout);
  }
}
