'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ServiceCard } from './ServiceCard';
import ZapModal from '../ZapModal';

const services = [
  {
    title: 'AI SEO Strategy Call',
    description:
      'A focused 30-minute working session on getting your business found in Google AND the AI answer engines — ChatGPT, Claude, Perplexity, and Google AI Overviews. We look at your site, your competitors, and what to change this week.',
    features: [
      'Live review of your site\'s AI + SEO signals',
      'Prioritized fixes you can ship this week',
      'Competitor visibility comparison',
      'Follow-up notes sent after the call',
      'Call fee is fully credited toward any retainer',
    ],
    priceInSats: 300000,
    priceLabel: 'per 30-min call',
    emoji: '🔎',
    actionLabel: 'Book a Call',
  },
];

const retainerFeatures = [
  'Monthly AI + SEO visibility report',
  'Prioritized fixes shipped to your site',
  'Competitor gap tracking',
  'Direct access to me',
];

export function ServicesHero() {
  const [isZapModalOpen, setZapModalOpen] = useState(false);
  const isSingle = services.length === 1;

  return (
    <>
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 mb-6 glass-dark px-5 py-2.5 rounded-full border border-white/10">
              <Sparkles className="w-5 h-5 text-neon-cyan/70 animate-pulse" />
              <span className="text-sm font-medium text-gray-400">
                AI SEO &middot; Built for the new search
              </span>
              <Sparkles className="w-5 h-5 text-neon-cyan/70 animate-pulse" />
            </div>

            <h1 className="heading-display text-gradient-gold mb-4">
              Get found by Google <span className="whitespace-nowrap">and the AI</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Search has changed. Your customers now ask Google, ChatGPT, Claude,
              Perplexity, and Google AI Overviews — and only the sites the AI
              trusts get quoted. I help local businesses rank in all of them.
              Start with the{' '}
              <Link href="/audit" className="text-neon-cyan hover:underline">
                free AI SEO audit
              </Link>
              , then book a call to turn the findings into a plan.
            </p>
            <div className="mt-6 h-[2px] w-32 mx-auto rounded-full bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent" />
          </motion.div>

          <div
            className={
              isSingle
                ? 'max-w-md mx-auto'
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            }
          >
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                {...service}
                onAction={() => setZapModalOpen(true)}
              />
            ))}
          </div>

          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass rounded-2xl p-8 md:p-10 border border-gold-500/30 max-w-2xl mx-auto shadow-[0_0_40px_rgba(255,215,0,0.06)]">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-3xl" aria-hidden="true">🚀</span>
                <h3 className="text-2xl font-display font-bold text-white">
                  AI Visibility Retainer
                </h3>
                <span className="ml-auto px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-bitcoin/10 text-bitcoin border border-bitcoin/30">
                  Limited to 5 clients
                </span>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Ongoing AI + SEO visibility work, handled for you month over month.
                I track where you show up across Google and the AI answer engines,
                ship the fixes that move the needle, and keep an eye on your
                competitors so you don&apos;t have to.
              </p>

              <ul className="space-y-2 mb-6">
                {retainerFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-neon-cyan mt-0.5 shrink-0">&#x2713;</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mb-6 p-4 rounded-xl bg-white/5 border border-gold-500/20">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gradient-gold">1,000,000</span>
                  <span className="text-gold-400 text-sm">sats/mo</span>
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  ~$1,000 USD &middot; 3-month minimum
                </p>
              </div>

              <button
                onClick={() => setZapModalOpen(true)}
                className="w-full btn-premium py-3 text-sm font-semibold"
              >
                Book a Call
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <ZapModal isOpen={isZapModalOpen} onClose={() => setZapModalOpen(false)} />
    </>
  );
}
