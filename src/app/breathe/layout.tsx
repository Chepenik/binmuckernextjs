import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Breathe Better',
  description: 'Free breathing exercises to help you find calm, focus, and balance through mindful breathing.',
  alternates: { canonical: '/breathe' },
  openGraph: {
    title: 'Breathe Better | Binmucker',
    description: 'Free breathing exercises to help you find calm, focus, and balance.',
    url: 'https://binmucker.com/breathe',
  },
  twitter: {
    card: 'summary',
    title: 'Breathe Better | Binmucker',
    description: 'Free breathing exercises to help you find calm, focus, and balance.',
  },
};

export default function BreatheLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
