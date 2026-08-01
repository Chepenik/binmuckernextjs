import type { Metadata } from 'next';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Breathe Practice',
  description: 'Interactive breathing timer with an animated visualization and five guided patterns. No account needed.',
  alternates: { canonical: '/breathe/practice' },
  openGraph: {
    title: 'Breathe Practice | Binmucker',
    description: 'Interactive breathing timer with an animated visualization and five guided patterns. No account needed.',
    url: 'https://www.binmucker.com/breathe/practice',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Breathe Practice | Binmucker',
    description: 'Interactive breathing timer with an animated visualization and five guided patterns. No account needed.',
    images: [OG_IMAGE_URL],
  },
};

export default function BreathePracticeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
