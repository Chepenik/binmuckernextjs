import type { NextConfig } from 'next';

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
};

export default nextConfig;
