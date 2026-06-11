import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { LavaBackground } from '@/app/components/LavaBackground';

export const metadata: Metadata = {
  title: 'My Stack',
  description:
    'The tools I actually use and earn from — the credit card, hardware wallet, hosting, and services behind Binmucker. Honest affiliate picks, no fluff.',
  keywords: [
    'Bitcoin tools',
    'affiliate',
    'Gemini credit card',
    'CrowdHealth',
    'Hostinger',
    'Fold',
    'River',
    'Coldcard',
    'hardware wallet',
  ],
  alternates: { canonical: 'https://binmucker.com/stack' },
  openGraph: {
    title: 'My Stack | Binmucker',
    description:
      'The tools I actually use and earn from — the credit card, hardware wallet, hosting, and services behind Binmucker.',
    url: 'https://binmucker.com/stack',
    siteName: 'Binmucker',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Stack | Binmucker',
    description:
      'The tools I actually use and earn from. Honest affiliate picks, priced in trust.',
  },
};

interface StackItem {
  name: string;
  description: string;
  href: string;
  cta: string;
}

const tools: StackItem[] = [
  {
    name: 'Gemini Credit Card',
    description:
      'The card I run everyday purchases through to stack sats automatically on every swipe.',
    href: 'https://creditcard.exchange.gemini.com/credit-card/apply?referral_code=jljkt4e94',
    cta: 'Apply with my link',
  },
  {
    name: 'CrowdHealth',
    description:
      'What my household actually uses instead of traditional health insurance — and it has worked.',
    href: 'https://www.joincrowdhealth.com/?referral_code=GQRENX',
    cta: 'Join CrowdHealth',
  },
  {
    name: 'Hostinger',
    description:
      'Where I host side projects when I want cheap, fast, and reliable with a free domain and email.',
    href: 'https://hostinger.com?REFERRALCODE=1CONOR59',
    cta: 'Get 20% off',
  },
  // TODO: replace href="#" with real affiliate referral links once enrolled.
  {
    name: 'Fold',
    description:
      'The debit card I use to earn Bitcoin back on everyday spending without thinking about it.',
    href: '#',
    cta: 'Coming soon',
  },
  // TODO: replace href="#" with real affiliate referral link once enrolled.
  {
    name: 'River',
    description:
      'Where I buy Bitcoin with zero-fee recurring orders and support that actually answers.',
    href: '#',
    cta: 'Coming soon',
  },
  // TODO: replace href="#" with real affiliate referral link once enrolled.
  {
    name: 'Coldcard',
    description:
      'The air-gapped hardware wallet I trust for serious, long-term cold storage of Bitcoin.',
    href: '#',
    cta: 'Coming soon',
  },
  // TODO: replace href="#" with real affiliate referral link once enrolled.
  {
    name: 'VPS Provider',
    description:
      'Where I spin up nodes and always-on services I fully control, away from the big clouds.',
    href: '#',
    cta: 'Coming soon',
  },
];

export default function StackPage() {
  return (
    <div className="min-h-screen bg-cyber-black">
      <LavaBackground />
      <div className="relative z-10">
        <Header />
        <main className="flex-grow pt-[80px] px-4">
          <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-20">
            {/* Header */}
            <div className="max-w-3xl mb-10">
              <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3">
                Value for value, transparent
              </p>
              <h1 className="heading-display text-[#E6EEF3] mb-5">
                My Stack &mdash;{' '}
                <span className="text-gradient-gold">tools I actually use and earn from.</span>
              </h1>

              {/* Affiliate disclosure (copied from the homepage) */}
              <p className="text-gray-500 text-sm leading-relaxed">
                Affiliate disclosure. The links on this page are affiliate links. If you sign up
                or buy through them, I may earn a commission at no extra cost to you. I only list
                products I actually use or have used, and I will not recommend something just
                because it pays. See the{' '}
                <Link href="/terms" className="text-neon-cyan hover:underline">
                  Terms of Service
                </Link>{' '}
                for the full version.
              </p>
            </div>

            {/* Card grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {tools.map((tool) => {
                const isPlaceholder = tool.href === '#';
                return (
                  <a
                    key={tool.name}
                    href={tool.href}
                    target="_blank"
                    rel="sponsored noopener"
                    className="group relative block card-premium h-full focus-visible:outline-none"
                    aria-label={`${tool.name}. Affiliate link.`}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-purple/15 via-neon-magenta/10 to-electric/15
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      aria-hidden="true"
                    />
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="flex items-center flex-wrap gap-2 mb-3">
                        <span
                          className="px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider
                                     bg-gold-500/10 text-gold-400 border border-gold-500/30"
                        >
                          Affiliate
                        </span>
                        {isPlaceholder && (
                          <span className="px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider
                                           bg-white/5 text-gray-400 border border-white/15">
                            Soon
                          </span>
                        )}
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest ml-auto">
                          External
                        </span>
                      </div>

                      <h2 className="font-semibold text-white text-lg leading-tight mb-2 group-hover:text-neon-purple transition-colors duration-300">
                        {tool.name}
                      </h2>
                      <p className="text-sm text-gray-400 leading-relaxed flex-1 group-hover:text-gray-300 transition-colors duration-300">
                        {tool.description}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neon-cyan group-hover:gap-2 transition-all duration-300">
                        {tool.cta}
                        <span aria-hidden="true">&rarr;</span>
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
