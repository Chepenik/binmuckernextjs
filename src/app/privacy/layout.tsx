import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Binmucker — how we collect, use, and protect your information.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy | Binmucker',
    description: 'Privacy Policy for Binmucker — how we collect, use, and protect your information.',
    url: 'https://binmucker.com/privacy',
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
