import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Breathe Practice',
  description: 'Interactive breathing timer with animated visualization. Five science-backed patterns, no account needed.',
  alternates: { canonical: '/breathe/practice' },
  openGraph: {
    title: 'Breathe Practice | Binmucker',
    description: 'Interactive breathing timer with animated visualization. Five science-backed patterns, no account needed.',
    url: 'https://binmucker.com/breathe/practice',
  },
  twitter: {
    card: 'summary',
    title: 'Breathe Practice | Binmucker',
    description: 'Interactive breathing timer with animated visualization. Five science-backed patterns, no account needed.',
  },
};

export default function BreathePracticeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
