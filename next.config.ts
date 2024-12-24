import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['i.nostr.build'], // Allow images from nostr.build
  },
};

export default nextConfig;
