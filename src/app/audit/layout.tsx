import type { Metadata } from 'next';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Free Local Business Audit',
  description:
    'Get a free AI-powered audit of your local business presence. Scored across 5-6 categories with actionable SEO, reviews, and competitive recommendations.',
  alternates: { canonical: '/audit' },
  openGraph: {
    title: 'Free Local Business Audit | Binmucker',
    description:
      'Free AI-powered audit scoring your local business across SEO, reviews, content, and more with actionable recommendations.',
    url: 'https://binmucker.com/audit',
    siteName: 'Binmucker',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Local Business Audit | Binmucker',
    description:
      'Free AI-powered audit scoring your local business across SEO, reviews, content, and more.',
    images: [OG_IMAGE_URL],
  },
};

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return children;
}
