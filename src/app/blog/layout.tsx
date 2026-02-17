import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on Bitcoin, building in public, web development, and wellness from Conor Chepenik.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog | Binmucker',
    description: 'Thoughts on Bitcoin, building in public, web development, and wellness from Conor Chepenik.',
    url: 'https://binmucker.com/blog',
  },
  twitter: {
    card: 'summary',
    title: 'Blog | Binmucker',
    description: 'Thoughts on Bitcoin, building in public, web development, and wellness from Conor Chepenik.',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
