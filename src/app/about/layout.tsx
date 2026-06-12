import type { Metadata } from 'next';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/og';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Conor Chepenik. Bitcoin educator, builder, and daily writer behind Binmucker.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About | Binmucker',
    description: 'About Conor Chepenik. Bitcoin educator, builder, and daily writer behind Binmucker.',
    url: 'https://binmucker.com/about',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Binmucker',
    description: 'About Conor Chepenik. Bitcoin educator, builder, and daily writer behind Binmucker.',
    images: [OG_IMAGE_URL],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
