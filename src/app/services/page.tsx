import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { ServicesHero } from '@/app/components/services/ServicesHero';

export const metadata: Metadata = {
  title: 'AI SEO Services',
  description:
    'AI SEO strategy calls for local businesses. Get found in Google, Perplexity, ChatGPT, Claude, and Google AI Overviews. 30-minute sessions priced in sats, paid on Lightning.',
  keywords: [
    'AI SEO',
    'AI search optimization',
    'local SEO',
    'AI SEO consultant',
    'generative engine optimization',
    'GEO',
    'ChatGPT SEO',
    'Perplexity SEO',
    'Google AI Overviews',
    'AI visibility audit',
    'Bitcoin consulting',
  ],
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'AI SEO Services | Binmucker',
    description:
      'Help your business show up in Google and the AI answer engines. 30-minute AI SEO strategy calls by Conor Chepenik, priced in sats.',
    url: 'https://binmucker.com/services',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI SEO Services | Binmucker',
    description:
      'AI SEO strategy calls. Rank in Google, Perplexity, ChatGPT, and Google AI Overviews. 30 minutes, priced in sats.',
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicesHero />
      </main>
    </>
  );
}
