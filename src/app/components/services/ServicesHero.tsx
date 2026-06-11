'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { ServiceCard } from './ServiceCard';

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
    actionHref: '/book?offer=call',
  },
];

const retainerFeatures = [
  'Monthly AI + SEO visibility report',
  'Prioritized fixes shipped to your site',
  'Competitor gap tracking',
  'Direct access to me',
];

const steps = [
  {
    n: '01',
    title: 'Run the free audit',
    body: 'Optional, but smart. See where you stand across 6 categories in about 90 seconds.',
    href: '/audit',
    hrefLabel: 'Start the audit',
  },
  {
    n: '02',
    title: 'Book a 30-min call',
    body: 'We go through your site, your competitors, and the AI answer engines together, live.',
  },
  {
    n: '03',
    title: 'Get your plan',
    body: 'Leave with prioritized fixes. Ship them yourself, or put me on retainer to handle it.',
  },
];

const faqs = [
  {
    q: 'How do I pay?',
    a: 'In sats over the Lightning Network. Once we lock a time I send a Lightning invoice — no cards, no chasing. New to Bitcoin? I\'ll walk you through paying in about two minutes.',
  },
  {
    q: 'What exactly do I get on the call?',
    a: 'A live review of your AI and SEO signals, a prioritized list of fixes you can ship this week, a competitor comparison, and written follow-up notes afterward.',
  },
  {
    q: 'I\'m not technical. Will this still help?',
    a: 'Yes. I translate every fix into plain steps. And if you\'d rather not touch your site at all, the retainer exists so I can just ship the fixes for you.',
  },
  {
    q: 'Do you do the work, or just advise?',
    a: 'The call is advisory — you leave with the plan. The AI Visibility Retainer is done-for-you: I ship the prioritized fixes to your site month over month.',
  },
];

export function ServicesHero() {
  return (
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

        {/* ============== OFFERS ============== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-start">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}

          {/* Retainer card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <div className="glass rounded-2xl p-6 md:p-7 border border-gold-500/30 h-full flex flex-col shadow-[0_0_40px_rgba(255,215,0,0.06)]">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-3xl" aria-hidden="true">🚀</span>
                <h3 className="text-xl font-display font-bold text-white">
                  AI Visibility Retainer
                </h3>
                <span className="ml-auto px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-bitcoin/10 text-bitcoin border border-bitcoin/30">
                  Limited to 5 clients
                </span>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Ongoing AI + SEO visibility work, handled for you month over month.
                I track where you show up across Google and the AI answer engines,
                ship the fixes that move the needle, and keep an eye on your
                competitors so you don&apos;t have to.
              </p>

              <ul className="space-y-2 mb-6 flex-1">
                {retainerFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-neon-cyan mt-0.5 shrink-0">&#x2713;</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <div className="mb-4 p-3 rounded-xl bg-white/5 border border-gold-500/20">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gradient-gold">1,000,000</span>
                    <span className="text-gold-400 text-sm">sats/mo</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">3-month minimum</p>
                </div>

                <Link
                  href="/book?offer=retainer"
                  className="w-full btn-premium py-3 text-sm font-semibold inline-flex items-center justify-center"
                >
                  Book a Call
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ============== GUARANTEE ============== */}
        <motion.div
          className="mt-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative rounded-2xl p-6 md:p-7 overflow-hidden glass-dark border border-neon-green/30 shadow-[0_0_30px_rgba(57,255,20,0.06)]">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-green/60 to-transparent" />
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-neon-green/10 border border-neon-green/30 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-neon-green" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-white font-display font-bold text-lg mb-1">
                  The 3-fix guarantee
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  You&apos;ll leave our call with at least three specific, implementable fixes to
                  get found in Google and the AI answer engines. If you don&apos;t, the call is
                  free — I refund every sat. No awkwardness, no fine print.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============== HOW IT WORKS ============== */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
              Simple by design
            </p>
            <h2 className="heading-section text-white">
              How it <span className="text-neon-cyan">works</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((step) => (
              <div
                key={step.n}
                className="glass-dark rounded-2xl border border-white/10 p-6 hover:border-neon-cyan/30 transition-colors duration-300"
              >
                <span className="font-mono text-sm text-neon-cyan/70">{step.n}</span>
                <h3 className="text-white font-semibold text-lg mt-2 mb-1.5">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.body}</p>
                {step.href && (
                  <Link
                    href={step.href}
                    className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-neon-cyan hover:gap-2 transition-all duration-300"
                  >
                    {step.hrefLabel}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ============== FAQ ============== */}
        <motion.div
          className="mt-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
              Before you ask
            </p>
            <h2 className="heading-section text-white">
              Common <span className="text-gradient-gold">questions</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group glass-dark rounded-xl border border-white/10 px-5 py-4 [&_summary]:cursor-pointer"
              >
                <summary className="flex items-center justify-between gap-4 text-white font-semibold text-sm md:text-base list-none">
                  {faq.q}
                  <span
                    className="shrink-0 text-neon-cyan transition-transform duration-300 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="text-gray-400 text-sm leading-relaxed mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </motion.div>

        {/* ============== FINAL CTA ============== */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/book?offer=call"
            className="btn-premium inline-flex items-center gap-2 text-base px-8 py-3.5"
          >
            <Sparkles className="w-5 h-5" aria-hidden="true" />
            Book your strategy call
          </Link>
          <p className="text-gray-500 text-sm mt-3">
            Or{' '}
            <Link href="/audit" className="text-neon-cyan hover:underline">
              run the free audit
            </Link>{' '}
            first — no email required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
