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
    ],
    priceInSats: 21000,
    priceLabel: 'per 30-min call',
    emoji: '🔎',
    actionLabel: 'Book a Call',
  },
  // ---------------------------------------------------------------------------
  // Offerings below are intentionally paused while I re-scope pricing and
  // confirm what I can credibly deliver at each tier. Leaving them here so
  // the structure survives round-trips; will reactivate in a future session.
  // ---------------------------------------------------------------------------
  // {
  //   title: 'Research & Analysis',
  //   description:
  //     'Daily Bitcoin/Lightning innovation briefings, market analysis, and technical deep dives tailored to your business.',
  //   features: [
  //     'Custom Bitcoin integration research',
  //     'Lightning Network opportunity analysis',
  //     'Weekly trend briefings',
  //     'Competitive landscape mapping',
  //   ],
  //   priceInSats: 50000,
  //   priceLabel: 'per report',
  //   emoji: '🔬',
  //   actionLabel: 'Get Started',
  // },
  // {
  //   title: 'Content Creation',
  //   description:
  //     'Blog posts, video scripts, technical documentation, and social media content about Bitcoin and technology.',
  //   features: [
  //     'SEO-optimized blog posts',
  //     'YouTube video scripts',
  //     'Technical documentation',
  //     'Social media content calendars',
  //   ],
  //   priceInSats: 100000,
  //   priceLabel: 'per piece',
  //   emoji: '✍️',
  //   actionLabel: 'Get Started',
  // },
  // {
  //   title: 'SEO Audit Premium',
  //   description:
  //     'Deep-dive audit with competitor analysis, technical SEO review, and a 90-day action plan. Upgrade from the free tier.',
  //   features: [
  //     'Full technical SEO crawl',
  //     'Competitor gap analysis',
  //     '90-day priority action plan',
  //     'Monthly progress check-in',
  //   ],
  //   priceInSats: 5000,
  //   priceLabel: 'detailed report',
  //   emoji: '📈',
  //   actionLabel: 'Upgrade Audit',
  // },
  // {
  //   title: 'Automation & Tools',
  //   description:
  //     'Custom workflow automation, tool integration, and AI-powered business process consulting.',
  //   features: [
  //     'Workflow analysis & design',
  //     'Custom tool development',
  //     'AI integration strategy',
  //     'Ongoing optimization support',
  //   ],
  //   priceInSats: 250000,
  //   priceLabel: 'per engagement',
  //   emoji: '⚙️',
  //   actionLabel: 'Get Started',
  // },
  // {
  //   title: 'Bitcoin Integration Strategy',
  //   description:
  //     'End-to-end consulting on accepting Bitcoin/Lightning payments, treasury strategy, and employee Bitcoin benefits.',
  //   features: [
  //     'Payment integration roadmap',
  //     'Treasury management guidance',
  //     'Employee Bitcoin benefits setup',
  //     'Compliance & tax considerations',
  //   ],
  //   priceInSats: 500000,
  //   priceLabel: 'per engagement',
  //   emoji: '₿',
  //   actionLabel: 'Get Started',
  // },
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
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="glass rounded-2xl p-8 border border-gold-500/20 max-w-2xl mx-auto">
              <h3 className="text-xl font-display font-bold text-gold-400 mb-3">
                Want an ongoing SEO + AI visibility retainer?
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Deep-dive audits, competitor gap analysis, and month-over-month
                AI SEO retainers are being re-scoped. If you have a clear project
                in mind, reach out and we&apos;ll talk it through on a call first.
              </p>
              <Link href="/contact" className="btn-premium px-8 py-3 inline-block">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ZapModal isOpen={isZapModalOpen} onClose={() => setZapModalOpen(false)} />
    </>
  );
}
