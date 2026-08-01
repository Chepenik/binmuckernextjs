import type { Metadata } from 'next';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/og';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Conor Chepenik, the builder and daily writer behind Binmucker, exploring Bitcoin, useful software, health, and curious experiments.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About | Binmucker',
    description: 'Meet Conor Chepenik, the builder and daily writer behind Binmucker.',
    url: 'https://www.binmucker.com/about',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Binmucker',
    description: 'Meet Conor Chepenik, the builder and daily writer behind Binmucker.',
    images: [OG_IMAGE_URL],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
