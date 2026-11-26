import type { NextConfig } from 'next';

// Baseline security headers. No CSP yet: the site loads third-party images
// and analytics, so a CSP needs its own rollout and testing.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // The site uses none of these device APIs.
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.nostr.build',
      },
      {
        protocol: 'https',
        hostname: '**.microlink.io',
      },
      {
        protocol: 'https',
        hostname: 'iad.microlink.io',
      },
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
