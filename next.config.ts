import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The general contact form is gone — route everyone to the booking flow.
      { source: '/contact', destination: '/book', permanent: true },
    ];
  },
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
};

export default nextConfig;
