'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Coffee, Sparkles } from 'lucide-react';
import ZapModal from './ZapModal';

interface BlockLink {
  title: string;
  description: string;
  url: string;
  category: string;
  isAffiliate?: boolean;
}

// Cyberpunk gradient mappings by category
const categoryGradients: Record<string, string> = {
  'Education': 'from-gold-500/20 via-bitcoin/10 to-gold-600/20',
  'Entertainment': 'from-neon-purple/20 via-neon-magenta/10 to-neon-pink/20',
  'Finance': 'from-neon-cyan/20 via-electric/10 to-neon-blue/20',
  'Writing': 'from-neon-blue/20 via-neon-purple/10 to-electric/20',
  'Health': 'from-neon-green/20 via-neon-cyan/10 to-electric/20',
  'Healthcare': 'from-laser/20 via-neon-magenta/10 to-neon-pink/20',
  'Shop': 'from-gold-400/20 via-gold-500/10 to-bitcoin/20',
  'Hosting': 'from-neon-purple/20 via-neon-blue/10 to-neon-cyan/20',
  'Tool': 'from-neon-cyan/20 via-electric/10 to-neon-green/20',
};

const links: BlockLink[] = [
  {
    title: 'Free Local SEO Audit',
    description: 'AI-powered audit that scores your business across 6 categories with real website data. Get actionable recommendations in 90 seconds.',
    url: '/audit',
    category: 'Tool',
  },
  {
    title: 'Bitcoin Coloring Book',
    description: 'A fun introduction to Bitcoin for kids and families. Learn about sound money, self-custody, and the future of finance through engaging coloring activities.',
    url: 'https://bitcoincoloring.com/',
    category: 'Education',
  },
  {
    title: 'My Nostr',
    description: 'A decentralized network where I get paid to shitpost',
    url: 'https://primal.net/p/npub16syt2k5uky4pxycfttxrxmwwzht2t3008f2q68kw4almjl4guu9qea8t7y',
    category: 'Entertainment',
  },
  {
    title: 'Mortgage Calculator',
    description: 'Calculate monthly payments and view amortization schedules',
    url: 'https://soundmoneymortgage.com/',
    category: 'Finance',
  },
  {
    title: 'My Medium',
    description: 'The place where I have decided to write everyday for the rest of my life',
    url: 'https://medium.com/@chepenikconor',
    category: 'Writing',
  },
  {
    title: 'Breathe Better',
    description: 'Free breathing exercises with 5 science-backed patterns. No accounts, no payments — just breathe.',
    url: '/breathe',
    category: 'Health',
  },
  {
    title: 'Join Crowdhealth',
    description: 'Escape the grip of big insurance with CrowdHealth - the free-market disruptor empowering you to control your healthcare costs and choices',
    url: 'https://www.joincrowdhealth.com/?referral_code=GQRENX',
    category: 'Healthcare',
    isAffiliate: true,
  },
  {
    title: 'Gemini Credit Card',
    description: 'Earn Bitcoin rewards when you use this link to apply for the Gemini Credit Card and are approved',
    url: 'https://creditcard.exchange.gemini.com/credit-card/apply?referral_code=jljkt4e94',
    category: 'Finance',
    isAffiliate: true,
  },
  {
    title: 'Handwritten Letters',
    description: 'Buy personal handwritten letters with sats',
    url: 'https://quotestoansweryourquestions.replit.app/',
    category: 'Shop',
  },
  {
    title: 'Saylorscope',
    description: 'Track how investments will likely perform over the years',
    url: 'https://www.saylorscope.com/',
    category: 'Finance',
  },
  {
    title: 'Hostinger Web Hosting',
    description: 'Secure, speedy, and reliable web hosting with free domain, business email & site migration included. Use my link to get 20% off your first hosting plan',
    url: 'https://hostinger.com?REFERRALCODE=1CONOR59',
    category: 'Hosting',
    isAffiliate: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

export function HomeHero() {
  const [isZapModalOpen, setZapModalOpen] = useState(false);

  return (
    <>
      <section className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Hero Section */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 mb-8 glass-dark px-5 py-2.5 rounded-full border border-white/10">
            <Sparkles className="w-5 h-5 text-neon-cyan/70 animate-pulse" />
            <span className="text-sm font-medium text-gray-400">
              If you want to fix the world, the best place to start is with yourself.
            </span>
            <Sparkles className="w-5 h-5 text-neon-cyan/70 animate-pulse" />
          </div>

          <h1 className="heading-display text-[#E6EEF3] mb-4 drop-shadow-[0_0_30px_rgba(0,194,255,0.15)]">
            Digital Creations
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A curated collection of projects, tools, and resources I&apos;ve built or found useful.
          </p>
          <div className="mt-6 h-[2px] w-32 mx-auto rounded-full bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent" />
        </motion.div>

        {/* Section Header */}
        <div className="mb-10 flex items-center gap-4">
          <div className="w-1 h-12 bg-neon-cyan/60 rounded-full shadow-[0_0_10px_rgba(0,194,255,0.3)]" />
          <div>
            <h2 className="heading-section text-white">
              Explore My <span className="text-neon-cyan">Stuff</span>
            </h2>
            <p className="text-gray-500 text-sm mt-1">Projects, tools, and recommendations</p>
          </div>
        </div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {links.map((link) => {
            const isExternal = link.url.startsWith('http');
            return (
            <motion.article key={link.title} variants={itemVariants}>
              <Link
                href={link.url}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group block card-premium h-full"
                aria-label={`${link.title} — ${link.category}`}
              >
                {/* Hover gradient overlay */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br
                              ${categoryGradients[link.category] || 'from-neon-cyan/10 to-neon-blue/10'}
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Card content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 pr-4">
                      <h3 className="font-semibold text-white text-lg mb-2
                                     group-hover:text-neon-cyan transition-colors duration-300">
                        {link.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed
                                    group-hover:text-gray-300 transition-colors duration-300">
                        {link.description}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="text-gray-600 group-hover:text-neon-cyan
                                 group-hover:translate-x-1 group-hover:-translate-y-1
                                 transition-all duration-300 flex-shrink-0"
                      size={20}
                    />
                  </div>

                  {/* Category badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider
                                       bg-white/5 text-gray-400
                                       border border-white/10
                                       group-hover:bg-neon-cyan/10 group-hover:text-neon-cyan
                                       group-hover:border-neon-cyan/30 group-hover:shadow-[0_0_10px_rgba(0,194,255,0.15)]
                                       transition-all duration-300">
                        {link.category}
                      </span>
                      {link.isAffiliate && (
                        <span className="px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider
                                         bg-gold-500/10 text-gold-400 border border-gold-500/30">
                          Affiliate
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-700
                                      group-hover:bg-neon-cyan group-hover:shadow-[0_0_6px_rgba(0,194,255,0.6)]
                                      transition-all duration-300" />
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-700
                                      group-hover:bg-neon-cyan/70 group-hover:shadow-[0_0_6px_rgba(0,194,255,0.4)]
                                      transition-all duration-300 delay-75" />
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-700
                                      group-hover:bg-neon-cyan/40 group-hover:shadow-[0_0_6px_rgba(0,194,255,0.2)]
                                      transition-all duration-300 delay-150" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
            );
          })}
        </motion.div>

        {/* Affiliate Disclosure */}
        <p className="mt-6 text-gray-500 text-xs text-center max-w-2xl mx-auto leading-relaxed">
          Some links above are affiliate links. If you sign up or make a purchase through them, I may
          earn a small commission at no extra cost to you. I only recommend products and services I
          genuinely use or believe in. See the{' '}
          <Link href="/terms" className="text-neon-cyan hover:underline">Terms of Service</Link> for
          more details.
        </p>

        {/* Support Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative rounded-3xl p-10 overflow-hidden
                          bg-gradient-to-br from-cyber-800/80 via-cyber-black/90 to-night-purple/50
                          border border-gold-500/40 backdrop-blur-xl
                          shadow-[0_0_50px_rgba(255,215,0,0.1),inset_0_1px_0_rgba(255,215,0,0.1)]">
            {/* Sharp accent line at top */}
            <div className="absolute top-0 left-0 right-0 h-[2px]
                            bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

            {/* Decorative corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gold-500/50 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-neon-cyan/50 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-neon-cyan/50 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gold-500/50 rounded-br-lg" />

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-72 h-72
                            bg-gradient-radial from-gold-500/15 to-transparent
                            blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-56 h-56
                            bg-gradient-radial from-neon-cyan/10 to-transparent
                            blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96
                            bg-gradient-radial from-neon-magenta/5 to-transparent
                            blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center">
              <div className="inline-block mb-4">
                <span className="text-5xl drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">&#8383;</span>
              </div>
              <h3 className="text-3xl font-display font-bold text-gradient-gold mb-2
                             drop-shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                Support the Mission
              </h3>
              <div className="accent-line w-24 mx-auto mb-6 rounded-full" />
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                I won&apos;t hold a grudge if you don&apos;t leave a tip (seriously, I won&apos;t even remember),
                but know they&apos;re always greatly appreciated. I hope only people who got legitimate
                value from my projects would leave one.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://ko-fi.com/chepenik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium inline-flex items-center gap-2 shadow-[0_0_20px_rgba(255,215,0,0.3)]
                             hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]"
                >
                  <Coffee className="w-5 h-5" />
                  <span>Buy me a coffee</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setZapModalOpen(true)}
                  className="btn-neon inline-flex items-center gap-2
                             hover:shadow-[0_0_25px_rgba(0,255,255,0.4)]"
                >
                  <span className="text-xl">&#9889;</span>
                  <span>Zap with Bitcoin</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Zap Modal */}
      <ZapModal isOpen={isZapModalOpen} onClose={() => setZapModalOpen(false)} />
    </>
  );
}
