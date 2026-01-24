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
};

const links: BlockLink[] = [
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
    title: 'Breath Better',
    description: 'An app to help you improve your breathing techniques',
    url: 'https://breathbetter.io',
    category: 'Health',
  },
  {
    title: 'Join Crowdhealth',
    description: 'Escape the grip of big insurance with CrowdHealth - the free-market disruptor empowering you to control your healthcare costs and choices',
    url: 'https://www.joincrowdhealth.com/?referral_code=GQRENX',
    category: 'Healthcare',
  },
  {
    title: 'Gemini Credit Card',
    description: 'Earn Bitcoin rewards when you use this link to apply for the Gemini Credit Card and are approved',
    url: 'https://creditcard.exchange.gemini.com/credit-card/apply?referral_code=jljkt4e94',
    category: 'Finance',
  },
  {
    title: 'Handwritten Letters',
    description: 'Buy personal handwritten letters with sats',
    url: 'https://quotestoansweryourquestions.replit.app/',
    category: 'Shop',
  },
  {
    title: 'Saylorscope',
    description: 'Track how investments well likely perform over the years',
    url: 'https://www.saylorscope.com/',
    category: 'Finance',
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
          <div className="inline-flex items-center gap-3 mb-8 glass-gold px-5 py-2.5 rounded-full">
            <Sparkles className="w-5 h-5 text-gold-400 animate-pulse" />
            <span className="text-sm font-medium text-gray-300">
              If you want to fix the world, the best place to start is with yourself.
            </span>
            <Sparkles className="w-5 h-5 text-gold-400 animate-pulse" />
          </div>

          <h1 className="heading-display text-gradient-gold mb-4 drop-shadow-[0_0_30px_rgba(255,215,0,0.3)]">
            Digital Creations
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            A curated collection of projects, tools, and resources I&apos;ve built or found useful.
          </p>
          <div className="mt-6 accent-line w-32 mx-auto rounded-full" />
        </motion.div>

        {/* Section Header */}
        <div className="mb-10 flex items-center gap-4">
          <div className="w-1 h-12 bg-gradient-to-b from-gold-400 via-neon-cyan to-neon-magenta rounded-full shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
          <div>
            <h2 className="heading-section text-white">
              Explore My <span className="text-gradient-aurora">Stuff</span>
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
          {links.map((link) => (
            <motion.div key={link.title} variants={itemVariants}>
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block card-premium h-full"
              >
                {/* Hover gradient overlay */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br
                              ${categoryGradients[link.category] || 'from-gold-500/20 to-neon-cyan/20'}
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Card content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 pr-4">
                      <h3 className="font-semibold text-white text-lg mb-2
                                     group-hover:text-gold-400 transition-colors duration-300">
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
                    <span className="px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider
                                     bg-gradient-to-r from-gold-500/10 to-bitcoin/10 text-gold-400
                                     border border-gold-500/30
                                     group-hover:from-gold-500/20 group-hover:to-bitcoin/20
                                     group-hover:border-gold-400/50 group-hover:shadow-[0_0_10px_rgba(255,215,0,0.2)]
                                     transition-all duration-300">
                      {link.category}
                    </span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-700
                                      group-hover:bg-neon-cyan group-hover:shadow-[0_0_8px_rgba(0,255,255,0.8)]
                                      transition-all duration-300" />
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-700
                                      group-hover:bg-gold-400 group-hover:shadow-[0_0_8px_rgba(255,215,0,0.8)]
                                      transition-all duration-300 delay-75" />
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-700
                                      group-hover:bg-neon-magenta group-hover:shadow-[0_0_8px_rgba(255,0,255,0.8)]
                                      transition-all duration-300 delay-150" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

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
