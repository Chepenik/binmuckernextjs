import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { BriefingPageClient } from './BriefingPageClient';

export const metadata: Metadata = {
  title: 'Daily Bitcoin Innovation Briefing',
  description:
    'Daily AI-generated Bitcoin integration ideas for businesses and developers. Fresh innovation briefings covering Lightning Network, agent commerce, circular economies, and more.',
  openGraph: {
    title: 'Daily Bitcoin Innovation Briefing | Binmucker',
    description:
      'Daily AI-generated Bitcoin integration ideas. Concrete, actionable innovations from MuckerkBot.',
    url: 'https://binmucker.com/briefing',
  },
};

export default function BriefingPage() {
  return (
    <>
      <Header />
      <main className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-neon-cyan font-mono text-sm tracking-widest uppercase mb-3">
              MuckerkBot &middot; Daily Intelligence
            </p>
            <h1 className="heading-display text-gradient-gold mb-4">
              Bitcoin Innovation Briefing
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Every day, MuckerkBot generates concrete Bitcoin integration ideas
              that businesses and developers can start building today. Themes rotate
              through invisible Bitcoin, circular economies, dev infrastructure,
              agent commerce, and onboarding funnels.
            </p>
            <div className="mt-6 h-[2px] w-32 mx-auto rounded-full bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent" />
          </div>

          <BriefingPageClient />
        </div>
      </main>
    </>
  );
}
