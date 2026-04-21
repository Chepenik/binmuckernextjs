'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Coffee,
  PenLine,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';
import ZapModal from './ZapModal';
import { resolveShotTarget, displayHost } from '@/lib/site-url';

type Status =
  | 'Live'
  | 'Tool'
  | 'Daily'
  | 'Book'
  | 'Experiment'
  | 'Writing'
  | 'Game'
  | 'Social'
  | 'Partner';

interface LinkItem {
  title: string;
  description: string;
  url: string;
  status: Status;
  featured?: boolean;
  isAffiliate?: boolean;
  thumbnailUrl?: string;
}

interface LinkSection {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  accent: 'gold' | 'cyan' | 'bitcoin' | 'magenta' | 'purple';
  items: LinkItem[];
}

const sections: LinkSection[] = [
  {
    id: 'built-by-me',
    eyebrow: 'Shipped from this desk',
    title: (
      <>
        Built by <span className="text-gradient-gold">Me</span>
      </>
    ),
    description: 'Original tools, services, and oddities I actually use.',
    accent: 'gold',
    items: [
      {
        title: 'Free Local SEO Audit',
        description:
          'An AI audit that scores a business across 6 categories from real website and Google Profile data. Actionable fixes in about 90 seconds.',
        url: '/audit',
        status: 'Live',
        featured: true,
      },
      {
        title: 'AI & Bitcoin Services',
        description:
          'Consulting, content, audits, and Bitcoin integration work. Priced in sats, because I practice what I write.',
        url: '/services',
        status: 'Live',
        featured: true,
      },
      {
        title: 'Daily Bitcoin Briefing',
        description:
          'A new Bitcoin integration idea every day. Concrete, shippable concepts for builders and business owners.',
        url: '/briefing',
        status: 'Daily',
        featured: true,
      },
      {
        title: 'Bitcoin Coloring Book',
        description:
          'A kid-friendly introduction to sound money and self-custody. Print, color, learn, repeat.',
        url: 'https://bitcoincoloring.com/',
        status: 'Book',
      },
      {
        title: 'Handwritten Letters',
        description:
          'Real pen, real paper, real human. Buy a personal letter with sats and I put it in the mail.',
        url: 'https://quotestoansweryourquestions.replit.app/',
        status: 'Experiment',
      },
    ],
  },
  {
    id: 'bitcoin-lightning',
    eyebrow: 'Sound money and sovereignty',
    title: (
      <>
        Bitcoin &amp; <span className="text-bitcoin">Lightning</span>
      </>
    ),
    description: 'Tools and profiles for the Bitcoin-curious and the already-orange-pilled.',
    accent: 'bitcoin',
    items: [
      {
        title: 'Sound Money Mortgage',
        description:
          'A mortgage calculator that surfaces monthly payments, amortization, and what a home really costs in Bitcoin terms.',
        url: 'https://soundmoneymortgage.com/',
        status: 'Tool',
      },
      {
        title: 'Saylorscope',
        description:
          'Track how different investments are likely to perform over years. A quiet stress test for long-term conviction.',
        url: 'https://www.saylorscope.com/',
        status: 'Tool',
      },
      {
        title: 'My Nostr',
        description:
          'A decentralized network where I actually get paid to post. Follow along or zap the good stuff.',
        url: 'https://primal.net/p/npub16syt2k5uky4pxycfttxrxmwwzht2t3008f2q68kw4almjl4guu9qea8t7y',
        status: 'Social',
      },
      {
        title: 'Fortune Sats',
        description:
          'A Lightning-powered fortune teller. Pay 100 sats, receive a line of wisdom. A tiny ritual that shows how micropayments feel when the friction disappears.',
        url: 'https://fortunesats.com',
        status: 'Experiment',
      },
    ],
  },
  {
    id: 'writing',
    eyebrow: 'Daily output, public thinking',
    title: (
      <>
        Writing &amp; <span className="text-neon-cyan">Ideas</span>
      </>
    ),
    description: 'Daily essays, longer posts, and the occasional argument with myself.',
    accent: 'cyan',
    items: [
      {
        title: 'Medium',
        description:
          'Daily writing on Bitcoin, building, health, family, and the lessons I keep relearning.',
        url: 'https://medium.com/@chepenikconor',
        status: 'Writing',
      },
      {
        title: 'The Binmucker Blog',
        description:
          'Longer pieces and references, posted here in a format that loads quickly and never hits a paywall.',
        url: '/blog',
        status: 'Writing',
      },
    ],
  },
  {
    id: 'play-practice',
    eyebrow: 'Not everything has to be productive',
    title: (
      <>
        Play &amp; <span className="text-neon-green">Practice</span>
      </>
    ),
    description:
      'A retro arcade, a Lightning racer, a breathing app, and a guitar coach. Reminders that software is not the whole point.',
    accent: 'magenta',
    items: [
      {
        title: 'Space Invaders',
        description:
          'A browser-based retro arcade with 5 levels, power-ups, boss fights, and an endless mode. Built for fun.',
        url: '/space-invaders',
        status: 'Game',
      },
      {
        title: 'RyRacer',
        description:
          'A 3D arcade combat racer where sats are on the line. Free 30-second practice laps, or 1,000 sats to enter the global leaderboard. Lightning makes the stakes real.',
        url: 'https://ryracer.com',
        status: 'Game',
      },
      {
        title: 'Breathe Better',
        description:
          'Five science-backed breathing patterns, animated, no login, no ads. Calm down, perform better, sleep easier.',
        url: '/breathe',
        status: 'Tool',
      },
      {
        title: 'GuitarGui',
        description:
          'A free, open-source guitar coach. Tuner, metronome, lessons, and songs in one place. No account, no ads, no paywall. MIT-licensed.',
        url: 'https://guitargui.com',
        status: 'Tool',
      },
    ],
  },
  {
    id: 'picks-partners',
    eyebrow: 'Value for value, transparent',
    title: (
      <>
        Picks &amp; <span className="text-neon-purple">Partners</span>
      </>
    ),
    description: 'Affiliate links for things I actually use. If you sign up through them, we both win.',
    accent: 'purple',
    items: [
      {
        title: 'Gemini Credit Card',
        description:
          'Earn Bitcoin on every purchase. If you apply through my link and get approved, I earn sats too.',
        url: 'https://creditcard.exchange.gemini.com/credit-card/apply?referral_code=jljkt4e94',
        status: 'Partner',
        isAffiliate: true,
        thumbnailUrl: 'https://www.gemini.com/credit-card',
      },
      {
        title: 'CrowdHealth',
        description:
          'A community-funded alternative to traditional health insurance. My household uses it and it has actually worked.',
        url: 'https://www.joincrowdhealth.com/?referral_code=GQRENX',
        status: 'Partner',
        isAffiliate: true,
      },
      {
        title: 'Hostinger',
        description:
          'Cheap, fast, reliable hosting with a free domain and email. 20% off on your first plan through my link.',
        url: 'https://hostinger.com?REFERRALCODE=1CONOR59',
        status: 'Partner',
        isAffiliate: true,
        thumbnailUrl: 'https://www.hostinger.com/',
      },
    ],
  },
];

const accentClasses: Record<
  LinkSection['accent'],
  { bar: string; hover: string; text: string; cardGradient: string }
> = {
  gold: {
    bar: 'bg-gold-400/70 shadow-[0_0_10px_rgba(255,215,0,0.35)]',
    hover: 'group-hover:text-gold-300',
    text: 'text-gold-300',
    cardGradient: 'from-gold-500/15 via-bitcoin/10 to-gold-600/15',
  },
  cyan: {
    bar: 'bg-neon-cyan/60 shadow-[0_0_10px_rgba(0,194,255,0.3)]',
    hover: 'group-hover:text-neon-cyan',
    text: 'text-neon-cyan',
    cardGradient: 'from-neon-cyan/15 via-electric/10 to-neon-blue/15',
  },
  bitcoin: {
    bar: 'bg-bitcoin/70 shadow-[0_0_10px_rgba(247,147,26,0.35)]',
    hover: 'group-hover:text-bitcoin',
    text: 'text-bitcoin',
    cardGradient: 'from-bitcoin/15 via-gold-500/10 to-bitcoin/15',
  },
  magenta: {
    bar: 'bg-neon-magenta/60 shadow-[0_0_10px_rgba(255,0,255,0.3)]',
    hover: 'group-hover:text-neon-magenta',
    text: 'text-neon-magenta',
    cardGradient: 'from-neon-magenta/15 via-neon-pink/10 to-neon-purple/15',
  },
  purple: {
    bar: 'bg-neon-purple/60 shadow-[0_0_10px_rgba(191,0,255,0.3)]',
    hover: 'group-hover:text-neon-purple',
    text: 'text-neon-purple',
    cardGradient: 'from-neon-purple/15 via-neon-magenta/10 to-electric/15',
  },
};

const statusClasses: Record<Status, string> = {
  Live: 'bg-neon-green/10 text-neon-green border-neon-green/30',
  Tool: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30',
  Daily: 'bg-gold-400/10 text-gold-300 border-gold-400/30',
  Book: 'bg-bitcoin/10 text-bitcoin border-bitcoin/30',
  Experiment: 'bg-neon-magenta/10 text-neon-magenta border-neon-magenta/30',
  Writing: 'bg-electric/10 text-electric border-electric/30',
  Game: 'bg-laser/10 text-laser border-laser/30',
  Social: 'bg-neon-purple/10 text-neon-purple border-neon-purple/30',
  Partner: 'bg-white/5 text-gray-300 border-white/15',
};

const recentShips = [
  { label: 'Daily Bitcoin Briefing', href: '/briefing' },
  { label: 'AI Audit Tool', href: '/audit' },
  { label: 'Services priced in sats', href: '/services' },
];

const startHere = [
  {
    icon: PenLine,
    title: 'I write every day',
    body: 'A commitment to daily publishing on Medium, no matter the mood.',
  },
  {
    icon: Terminal,
    title: 'I ship small useful tools',
    body: 'Audits, calculators, games, breathing aids. Built for me first.',
  },
  {
    icon: Zap,
    title: 'Bitcoin and Lightning, always',
    body: 'Sound money, self-custody, and invisible payments are the throughline.',
  },
  {
    icon: Sparkles,
    title: 'Health, family, weird detours',
    body: 'Software is not the whole point. The rest of life shows up here too.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
};

interface LinkCardProps {
  item: LinkItem;
  accent: LinkSection['accent'];
  eager?: boolean;
}

const accentRingClasses: Record<LinkSection['accent'], string> = {
  gold: 'group-hover:ring-gold-400/50 group-hover:shadow-[0_0_24px_rgba(255,215,0,0.18)]',
  cyan: 'group-hover:ring-neon-cyan/50 group-hover:shadow-[0_0_24px_rgba(0,194,255,0.18)]',
  bitcoin: 'group-hover:ring-bitcoin/50 group-hover:shadow-[0_0_24px_rgba(247,147,26,0.20)]',
  magenta: 'group-hover:ring-neon-magenta/50 group-hover:shadow-[0_0_24px_rgba(255,0,255,0.18)]',
  purple: 'group-hover:ring-neon-purple/50 group-hover:shadow-[0_0_24px_rgba(191,0,255,0.18)]',
};

interface CardThumbnailProps {
  url: string;
  host: string;
  accent: LinkSection['accent'];
  eager?: boolean;
}

function CardThumbnail({ url, host, accent, eager }: CardThumbnailProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const src = `/api/thumbnail?url=${encodeURIComponent(url)}`;

  return (
    <div className="relative border-b border-white/10 overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 h-[28px] bg-black/60 backdrop-blur-sm border-b border-white/5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
          <span className="w-[10px] h-[10px] rounded-full bg-[#FEBC2E]" />
          <span className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
        </span>
        <span
          className="ml-2 flex-1 truncate px-2 py-[2px] rounded-md bg-white/5 border border-white/10
                     font-mono text-[11px] text-gray-400"
          title={host}
        >
          {host}
        </span>
      </div>

      {/* Shot frame */}
      <div
        className={`relative aspect-[16/10] bg-cyber-black ring-1 ring-white/5 transition-all duration-500
                    ${accentRingClasses[accent]}`}
      >
        {!loaded && !failed && <div className="thumb-shimmer" aria-hidden="true" />}
        {failed ? (
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono uppercase tracking-widest text-gray-600">
            preview unavailable
          </div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt=""
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`absolute inset-0 w-full h-full object-cover object-top
                        transition-[transform,opacity] duration-500 ease-out
                        motion-reduce:transition-none
                        group-hover:scale-[1.04] motion-reduce:group-hover:scale-100
                        ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        {/* Subtle top-glare */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1/3
                     bg-gradient-to-b from-white/[0.04] to-transparent"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function LinkCard({ item, accent, eager }: LinkCardProps) {
  const isExternal = item.url.startsWith('http');
  const accentCfg = accentClasses[accent];
  const shotTarget = resolveShotTarget(item.url, item.thumbnailUrl);
  const host = displayHost(item.thumbnailUrl ?? item.url);

  return (
    <Link
      href={item.url}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group relative block card-premium !p-0 h-full focus-visible:outline-none
                  ${item.featured ? 'border-gold-400/40 shadow-[0_0_24px_rgba(255,215,0,0.08)]' : ''}`}
      aria-label={`${item.title}. ${item.status}${item.isAffiliate ? ', affiliate' : ''}.`}
    >
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${accentCfg.cardGradient}
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        aria-hidden="true"
      />

      {item.featured && (
        <span
          className="absolute top-[38px] right-3 z-20 inline-flex items-center gap-1 px-2 py-1 rounded-md
                     text-[10px] font-bold uppercase tracking-widest
                     bg-gold-400/15 text-gold-300 border border-gold-400/40
                     shadow-[0_0_10px_rgba(255,215,0,0.15)]"
        >
          <Sparkles className="w-3 h-3" aria-hidden="true" />
          Featured
        </span>
      )}

      <div className="relative z-10 flex h-full flex-col">
        <CardThumbnail url={shotTarget} host={host} accent={accent} eager={eager} />

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center flex-wrap gap-2 mb-3">
            <span
              className={`px-2 py-1 rounded-md border text-[10px] font-semibold uppercase tracking-wider
                          ${statusClasses[item.status]}`}
            >
              {item.status}
            </span>
            {item.isAffiliate && (
              <span
                className="px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider
                           bg-gold-500/10 text-gold-400 border border-gold-500/30"
              >
                Affiliate
              </span>
            )}
            {isExternal && (
              <span className="text-[10px] text-gray-500 uppercase tracking-widest ml-auto">
                External
              </span>
            )}
          </div>

          <div className="flex justify-between items-start gap-4 mb-3">
            <h3
              className={`font-semibold text-white text-lg leading-tight transition-colors duration-300
                          ${accentCfg.hover}`}
            >
              {item.title}
            </h3>
            <ArrowUpRight
              className={`text-gray-600 ${accentCfg.hover}
                         group-hover:translate-x-1 group-hover:-translate-y-1
                         transition-all duration-300 flex-shrink-0`}
              size={20}
              aria-hidden="true"
            />
          </div>

          <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
            {item.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function HomeHero() {
  const [isZapModalOpen, setZapModalOpen] = useState(false);

  return (
    <>
      <section className="max-w-6xl mx-auto px-4 md:px-8">
        {/* ==================== HERO ==================== */}
        <motion.div
          className="pt-4 md:pt-10 pb-14 md:pb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-2 mb-8 glass-dark px-4 py-2 rounded-full
                       border border-white/10 text-xs md:text-sm text-gray-300 font-mono tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-neon-green shadow-[0_0_8px_rgba(57,255,20,0.8)]" aria-hidden="true" />
            <span className="uppercase text-gray-500">Binmucker</span>
            <span className="text-gray-600">/</span>
            <span>by Conor Chepenik</span>
          </div>

          <h1 className="heading-display text-[#E6EEF3] mb-5 drop-shadow-[0_0_30px_rgba(0,194,255,0.15)]">
            A builder&apos;s home base{' '}
            <span className="text-gradient-gold">on the internet.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Free tools, daily essays, Bitcoin projects, breathing exercises, a retro game, and a few
            experiments that defy category. If something is genuinely useful to me, I ship it so it
            can be useful to you too.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="#built-by-me"
              className="btn-premium inline-flex items-center gap-2 text-sm md:text-base"
            >
              <Terminal className="w-4 h-4" aria-hidden="true" />
              Explore the tools
            </Link>
            <Link
              href="/blog"
              className="btn-gold-outline inline-flex items-center gap-2 text-sm md:text-base"
            >
              <PenLine className="w-4 h-4" aria-hidden="true" />
              Read the writing
            </Link>
            <button
              type="button"
              onClick={() => setZapModalOpen(true)}
              className="btn-neon inline-flex items-center gap-2 text-sm md:text-base"
            >
              <span className="text-lg leading-none" aria-hidden="true">&#9889;</span>
              Zap me with Bitcoin
            </button>
          </div>

          {/* Recently shipped strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs md:text-sm">
            <span className="font-mono uppercase tracking-widest text-gray-500">
              Recently shipped
            </span>
            <span className="text-gray-700" aria-hidden="true">/</span>
            {recentShips.map((ship, i) => (
              <React.Fragment key={ship.href}>
                <Link
                  href={ship.href}
                  className="text-gray-300 hover:text-neon-cyan transition-colors duration-200
                             border-b border-dashed border-white/10 hover:border-neon-cyan/60 pb-px"
                >
                  {ship.label}
                </Link>
                {i < recentShips.length - 1 && (
                  <span className="text-gray-700" aria-hidden="true">&middot;</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* ==================== START HERE ==================== */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          aria-labelledby="start-here-title"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-12 bg-neon-cyan/60 rounded-full shadow-[0_0_10px_rgba(0,194,255,0.3)]" />
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-1">
                New here? Five seconds.
              </p>
              <h2 id="start-here-title" className="heading-section text-white">
                Start <span className="text-neon-cyan">Here</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {startHere.map((item) => (
              <div
                key={item.title}
                className="glass-dark rounded-2xl border border-white/10 p-5
                           hover:border-neon-cyan/30 hover:shadow-[0_0_20px_rgba(0,194,255,0.08)]
                           transition-all duration-300"
              >
                <item.icon className="w-6 h-6 text-neon-cyan mb-3" aria-hidden="true" />
                <h3 className="text-white font-semibold text-base mb-1.5">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ==================== LINK SECTIONS ==================== */}
        {sections.map((section) => {
          const accentCfg = accentClasses[section.accent];
          return (
            <motion.section
              key={section.id}
              id={section.id}
              className="mb-20 scroll-mt-28"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              aria-labelledby={`${section.id}-title`}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-1 h-14 rounded-full ${accentCfg.bar}`} />
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-1">
                    {section.eyebrow}
                  </p>
                  <h2
                    id={`${section.id}-title`}
                    className="heading-section text-white"
                  >
                    {section.title}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1 max-w-2xl">
                    {section.description}
                  </p>
                </div>
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
              >
                {section.items.map((item) => (
                  <motion.article key={item.title} variants={itemVariants}>
                    <LinkCard item={item} accent={section.accent} eager={item.featured} />
                  </motion.article>
                ))}
              </motion.div>

              {section.id === 'picks-partners' && (
                <p className="mt-6 text-gray-500 text-xs leading-relaxed max-w-3xl">
                  Affiliate disclosure. The links in this section are affiliate links. If you sign up
                  or buy through them, I may earn a commission at no extra cost to you. I only list
                  products I actually use or have used, and I will not recommend something just
                  because it pays. See the{' '}
                  <Link href="/terms" className="text-neon-cyan hover:underline">
                    Terms of Service
                  </Link>{' '}
                  for the full version.
                </p>
              )}
            </motion.section>
          );
        })}

        {/* ==================== ABOUT PREVIEW ==================== */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          aria-labelledby="about-preview-title"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-12 bg-gold-400/70 rounded-full shadow-[0_0_10px_rgba(255,215,0,0.35)]" />
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-1">
                Behind the site
              </p>
              <h2 id="about-preview-title" className="heading-section text-white">
                Who is the <span className="text-gradient-gold">Binmucker</span>?
              </h2>
            </div>
          </div>

          <div className="glass-dark rounded-2xl border border-white/10 p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-start">
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I&apos;m Conor Chepenik. A while back I committed to writing every day, forever, and
                  that habit turned into a habit of building things in public. The tools, the books,
                  the odd little apps, they all come out of that practice.
                </p>
                <p>
                  I care about Bitcoin, sovereignty, and software that respects your attention. I
                  mostly build for myself first. If a thing is honestly useful to me, there is a
                  decent chance it is useful to someone else too. That is what this site is. A place
                  where the writing, the code, the experiments, and the detours all live together.
                </p>
              </div>
              <div className="flex md:flex-col gap-3">
                <Link
                  href="/about"
                  className="btn-gold-outline inline-flex items-center gap-2 text-sm whitespace-nowrap"
                >
                  Read the full story
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="btn-neon inline-flex items-center gap-2 text-sm whitespace-nowrap"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ==================== SUPPORT ==================== */}
        <motion.section
          id="support"
          className="scroll-mt-28 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          aria-labelledby="support-title"
        >
          <div
            className="relative rounded-3xl p-8 md:p-10 overflow-hidden
                       bg-gradient-to-br from-cyber-800/80 via-cyber-black/90 to-night-purple/50
                       border border-gold-500/40 backdrop-blur-xl
                       shadow-[0_0_50px_rgba(255,215,0,0.1),inset_0_1px_0_rgba(255,215,0,0.1)]"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gold-500/50 rounded-tl-lg" aria-hidden="true" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-neon-cyan/50 rounded-tr-lg" aria-hidden="true" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-neon-cyan/50 rounded-bl-lg" aria-hidden="true" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gold-500/50 rounded-br-lg" aria-hidden="true" />

            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-radial from-gold-500/15 to-transparent blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-radial from-neon-cyan/10 to-transparent blur-3xl pointer-events-none" aria-hidden="true" />

            <div className="relative z-10 text-center">
              <div className="inline-block mb-3">
                <span className="text-4xl md:text-5xl drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]" aria-hidden="true">
                  &#8383;
                </span>
              </div>
              <h2
                id="support-title"
                className="text-2xl md:text-3xl font-display font-bold text-gradient-gold mb-2
                           drop-shadow-[0_0_30px_rgba(255,215,0,0.3)]"
              >
                Value for value
              </h2>
              <div className="accent-line w-24 mx-auto mb-5 rounded-full" />
              <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                If something here saved you time, taught you something, or made you laugh, you can
                send sats. Not required. I keep building either way. This is just how you
                participate in the healthy version of the internet if you want to.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3 md:gap-4">
                <a
                  href="https://ko-fi.com/chepenik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium inline-flex items-center gap-2 shadow-[0_0_20px_rgba(255,215,0,0.3)]
                             hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]"
                >
                  <Coffee className="w-5 h-5" aria-hidden="true" />
                  <span>Buy me a coffee</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() => setZapModalOpen(true)}
                  className="btn-neon inline-flex items-center gap-2 hover:shadow-[0_0_25px_rgba(0,255,255,0.4)]"
                >
                  <span className="text-xl" aria-hidden="true">&#9889;</span>
                  <span>Zap with Bitcoin</span>
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </section>

      <ZapModal isOpen={isZapModalOpen} onClose={() => setZapModalOpen(false)} />
    </>
  );
}
