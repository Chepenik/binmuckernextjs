import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { ServicesHero } from '@/app/components/services/ServicesHero';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/og';

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
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI SEO Services | Binmucker',
    description:
      'AI SEO strategy calls. Rank in Google, Perplexity, ChatGPT, and Google AI Overviews. 30 minutes, priced in sats.',
    images: [OG_IMAGE_URL],
  },
};

// FAQPage structured data — mirrors the visible FAQ in ServicesHero so the
// answer engines can quote it directly (and so this page practices what it sells).
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I pay?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In sats over the Lightning Network. Once we lock a time I send a Lightning invoice — no cards, no chasing. New to Bitcoin? I will walk you through paying in about two minutes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What exactly do I get on the call?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A live review of your AI and SEO signals, a prioritized list of fixes you can ship this week, a competitor comparison, and written follow-up notes afterward.',
      },
    },
    {
      '@type': 'Question',
      name: 'I am not technical. Will this still help?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. I translate every fix into plain steps. And if you would rather not touch your site at all, the retainer exists so I can just ship the fixes for you.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you do the work, or just advise?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The call is advisory — you leave with the plan. The AI Visibility Retainer is done-for-you: I ship the prioritized fixes to your site month over month.',
      },
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main>
        <ServicesHero />
      </main>
      <Footer />
    </>
  );
}
