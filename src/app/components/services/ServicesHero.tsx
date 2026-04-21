'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ServiceCard } from './ServiceCard';
import ZapModal from '../ZapModal';

const services = [
  {
    title: '30-Minute Consultation',
    description:
      'A focused 30-minute call on whatever you are building, stuck on, or curious about. Bitcoin, Lightning, AI, SEO, or any topic I can honestly speak to.',
    features: [
      '30 minutes of my undivided time',
      'Video or Lightning voice call',
      'Bring your questions, leave with straight answers',
      'Follow-up notes sent after the call',
    ],
    priceInSats: 21000,
    priceLabel: 'per 30-min call',
    emoji: '📞',
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
                Human + AI Partnership
              </span>
              <Sparkles className="w-5 h-5 text-neon-cyan/70 animate-pulse" />
            </div>

            <h1 className="heading-display text-gradient-gold mb-4">Services</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              One focused offer right now: a 30-minute call priced in sats and
              delivered on Lightning. More scoped engagements are being re-priced
              and will return soon.
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
                Need something specific?
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Larger engagements, audits, and Bitcoin integration work are
                paused while I re-scope pricing. If you have a clear project in
                mind, reach out and we can talk about it on a call first.
              </p>
              <a href="/contact" className="btn-premium px-8 py-3 inline-block">
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <ZapModal isOpen={isZapModalOpen} onClose={() => setZapModalOpen(false)} />
    </>
  );
}
