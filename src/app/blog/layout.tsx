import type { Metadata } from 'next';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on Bitcoin, building in public, web development, and wellness from Conor Chepenik.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog | Binmucker',
    description: 'Thoughts on Bitcoin, building in public, web development, and wellness from Conor Chepenik.',
    url: 'https://www.binmucker.com/blog',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Binmucker',
    description: 'Thoughts on Bitcoin, building in public, web development, and wellness from Conor Chepenik.',
    images: [OG_IMAGE_URL],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
