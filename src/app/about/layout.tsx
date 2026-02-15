import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Conor Chepenik — Bitcoin educator, builder, and daily writer behind Binmucker.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About | Binmucker',
    description: 'About Conor Chepenik — Bitcoin educator, builder, and daily writer behind Binmucker.',
    url: 'https://binmucker.com/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
