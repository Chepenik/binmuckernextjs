import { Metadata } from 'next';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Breathe Better',
  description: 'Free breathing exercises to help you find calm, focus, and balance through mindful breathing.',
  alternates: { canonical: '/breathe' },
  openGraph: {
    title: 'Breathe Better | Binmucker',
    description: 'Free breathing exercises to help you find calm, focus, and balance.',
    url: 'https://www.binmucker.com/breathe',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Breathe Better | Binmucker',
    description: 'Free breathing exercises to help you find calm, focus, and balance.',
    images: [OG_IMAGE_URL],
  },
};

export default function BreatheLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
