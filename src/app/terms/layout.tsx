import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Binmucker — the rules governing use of our website and services.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service | Binmucker',
    description: 'Terms of Service for Binmucker — the rules governing use of our website and services.',
    url: 'https://binmucker.com/terms',
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
