'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bot,
  Brain,
  Check,
  CircleDollarSign,
  Coffee,
  CreditCard,
  Gamepad2,
  Gift,
  Guitar,
  HeartPulse,
  Landmark,
  Lightbulb,
  MessageCircle,
  PenLine,
  Search,
  Server,
  ShieldCheck,
  Shirt,
  Sparkles,
  Terminal,
  UserRound,
  WandSparkles,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { FaGithub, FaMedium, FaXTwitter, FaYoutube } from 'react-icons/fa6';

const RainbowCursor = dynamic(() => import('./RainbowCursor'), { ssr: false });
const ZapModal = dynamic(() => import('./ZapModal'), { ssr: false });

type Category = 'Build' | 'Bitcoin' | 'Writing' | 'Play' | 'Stack' | 'Connect';

interface HubLink {
  title: string;
  description: string;
  href: string;
  category: Category;
  label: string;
  icon: LucideIcon;
  affiliate?: boolean;
}

const hubLinks: HubLink[] = [
  {
    title: 'Free Local SEO Audit',
    description: 'See how a local business performs across search, reviews, content, and AI readiness.',
    href: '/audit',
    category: 'Build',
    label: 'Free tool',
    icon: Sparkles,
  },
  {
    title: 'Bitcoin Coloring Book',
    description: 'A kid-friendly introduction to sound money, self-custody, and Bitcoin.',
    href: 'https://bitcoincoloring.com/',
    category: 'Bitcoin',
    label: 'Book',
    icon: BookOpen,
  },
  {
    title: 'Sound Money Mortgage',
    description: 'Understand a mortgage in dollars, time, and Bitcoin opportunity cost.',
    href: 'https://soundmoneymortgage.com/',
    category: 'Bitcoin',
    label: 'Calculator',
    icon: Landmark,
  },
  {
    title: 'Saylorscope',
    description: 'A long-view calculator for testing investment ideas against time.',
    href: 'https://www.saylorscope.com/',
    category: 'Bitcoin',
    label: 'Tool',
    icon: CircleDollarSign,
  },
  {
    title: 'Fortune Sats',
    description: 'A tiny Lightning ritual: send 100 sats and receive a line of wisdom.',
    href: 'https://fortunesats.com',
    category: 'Bitcoin',
    label: 'Experiment',
    icon: Zap,
  },
  {
    title: 'Nostr',
    description: 'My notes and conversations on the decentralized social network.',
    href: 'https://primal.net/p/npub16syt2k5uky4pxycfttxrxmwwzht2t3008f2q68kw4almjl4guu9qea8t7y',
    category: 'Bitcoin',
    label: 'Social',
    icon: Brain,
  },
  {
    title: 'Daily writing on Medium',
    description: 'Notes on Bitcoin, building, health, family, and the lessons I keep relearning.',
    href: 'https://medium.com/@chepenikconor',
    category: 'Writing',
    label: 'Daily',
    icon: PenLine,
  },
  {
    title: 'The Binmucker Blog',
    description: 'Longer essays and references, without a paywall or an algorithm in the way.',
    href: '/blog',
    category: 'Writing',
    label: 'Essays',
    icon: BookOpen,
  },
  {
    title: 'Breathe Better',
    description: 'Five guided breathing patterns for focus, calm, sleep, and recovery.',
    href: '/breathe',
    category: 'Play',
    label: 'Well-being',
    icon: HeartPulse,
  },
  {
    title: 'Space Invaders',
    description: 'A lovingly overbuilt browser arcade with levels, bosses, and endless mode.',
    href: '/space-invaders',
    category: 'Play',
    label: 'Game',
    icon: Gamepad2,
  },
  {
    title: 'RyRacer',
    description: 'A 3D combat racer where Lightning turns practice laps into real stakes.',
    href: 'https://ryracer.com',
    category: 'Play',
    label: 'Game',
    icon: Gamepad2,
  },
  {
    title: 'GuitarGui',
    description: 'An open-source tuner, metronome, lesson space, and songbook for guitarists.',
    href: 'https://guitargui.com',
    category: 'Play',
    label: 'Open source',
    icon: Guitar,
  },
  {
    title: 'Handwritten Letters',
    description: 'A real letter, written with a real pen and mailed to your door.',
    href: 'https://quotestoansweryourquestions.replit.app/',
    category: 'Build',
    label: 'Experiment',
    icon: PenLine,
  },
  {
    title: 'Venice AI',
    description: 'Private AI with uncensored models. Join Pro and you get $10; I get $10 in credits too.',
    href: 'https://venice.ai/chat?ref=pnaIip',
    category: 'Stack',
    label: 'Give $10, get $10',
    icon: Bot,
    affiliate: true,
  },
  {
    title: 'Gemini Credit Card',
    description: 'The card I use for everyday purchases to earn Bitcoin rewards automatically.',
    href: 'https://creditcard.exchange.gemini.com/credit-card/apply?referral_code=jljkt4e94',
    category: 'Stack',
    label: 'Bitcoin rewards',
    icon: CreditCard,
    affiliate: true,
  },
  {
    title: 'CrowdHealth',
    description: 'The community-powered health funding option my household actually uses.',
    href: 'https://www.joincrowdhealth.com/?referral_code=GQRENX',
    category: 'Stack',
    label: 'Referral',
    icon: ShieldCheck,
    affiliate: true,
  },
  {
    title: 'Hostinger',
    description: 'Affordable hosting I use when a project needs to be fast, reliable, and simple.',
    href: 'https://hostinger.com?REFERRALCODE=1CONOR59',
    category: 'Stack',
    label: '20% off',
    icon: Server,
    affiliate: true,
  },
  {
    title: 'My Stack',
    description: 'The cards, services, hosting, and tools I actually use—with honest disclosure.',
    href: '/stack',
    category: 'Stack',
    label: 'Recommendations',
    icon: Terminal,
  },
  {
    title: 'X / Twitter',
    description: 'Build logs, Bitcoin takes, unfinished ideas, and the day-to-day work in motion.',
    href: 'https://x.com/ConorChepenik',
    category: 'Connect',
    label: 'Social',
    icon: MessageCircle,
  },
  {
    title: 'LinkedIn',
    description: 'The more professional corner of my work, background, and conversations.',
    href: 'https://www.linkedin.com/in/conorchepenik/',
    category: 'Connect',
    label: 'Profile',
    icon: UserRound,
  },
  {
    title: 'GitHub',
    description: 'Source code, experiments, and the work behind many of the projects here.',
    href: 'https://github.com/Chepenik',
    category: 'Connect',
    label: 'Code',
    icon: Terminal,
  },
  {
    title: 'YouTube',
    description: 'Videos about Bitcoin, building, and the ideas that are easier to show than tell.',
    href: 'https://www.youtube.com/@ConorChepenik',
    category: 'Connect',
    label: 'Video',
    icon: Gamepad2,
  },
  {
    title: 'Merch',
    description: 'Wearable artifacts from the stranger corners of the Binmucker universe.',
    href: 'https://chep.creator-spring.com/',
    category: 'Connect',
    label: 'Shop',
    icon: Shirt,
  },
  {
    title: 'Buy Me a Coffee',
    description: 'Support the next useful experiment if something here made your day better.',
    href: 'https://ko-fi.com/chepenik',
    category: 'Connect',
    label: 'Support',
    icon: Gift,
  },
];

const categories: Array<'All' | Category> = ['All', 'Build', 'Bitcoin', 'Writing', 'Play', 'Stack', 'Connect'];
const habits = [
  { id: 'write', label: 'Write one honest thing', detail: 'Clarify the thought.' },
  { id: 'build', label: 'Improve one useful thing', detail: 'Make the work compound.' },
  { id: 'move', label: 'Move and breathe', detail: 'Keep the machine working.' },
];

function isExternal(href: string) {
  return href.startsWith('http');
}

export function HomeHero() {
  const [category, setCategory] = useState<(typeof categories)[number]>('All');
  const [query, setQuery] = useState('');
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);
  const [isZapModalOpen, setZapModalOpen] = useState(false);
  const [weirdMode, setWeirdMode] = useState(false);
  const [easterMessage, setEasterMessage] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const dateKey = new Date().toISOString().slice(0, 10);
    let storedHabits: Record<string, boolean> | null = null;
    let storedNote: string | null = null;
    try {
      const rawHabits = localStorage.getItem(`binmucker-loop-${dateKey}`);
      if (rawHabits) storedHabits = JSON.parse(rawHabits);
      storedNote = localStorage.getItem('binmucker-idea');
    } catch {
      // Browser storage is a progressive enhancement; the desk still works without it.
    }
    const frame = window.requestAnimationFrame(() => {
      if (storedHabits) setCompleted(storedHabits);
      if (storedNote) setNote(storedNote);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const sequence = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];
    let position = 0;
    let messageTimer = 0;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches('input, textarea, select, [contenteditable="true"]')) return;
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      position = key === sequence[position] ? position + 1 : key === sequence[0] ? 1 : 0;
      if (position === sequence.length) {
        setWeirdMode(true);
        setEasterMessage('Arcade protocol unlocked. The universe approves.');
        position = 0;
        messageTimer = window.setTimeout(() => setEasterMessage(''), 4200);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(messageTimer);
    };
  }, []);

  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.matches('input, textarea, select, [contenteditable="true"]');
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      const isSlash = event.key === '/' && !isTyping;
      if (!isShortcut && !isSlash) return;
      event.preventDefault();
      searchRef.current?.focus();
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      searchRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    };

    window.addEventListener('keydown', focusSearch);
    return () => window.removeEventListener('keydown', focusSearch);
  }, []);

  const filteredLinks = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return hubLinks.filter((item) => {
      const inCategory = category === 'All' || item.category === category;
      const matchesQuery =
        !needle ||
        `${item.title} ${item.description} ${item.category} ${item.label}`
          .toLowerCase()
          .includes(needle);
      return inCategory && matchesQuery;
    });
  }, [category, query]);

  function toggleHabit(id: string) {
    const dateKey = new Date().toISOString().slice(0, 10);
    setCompleted((current) => {
      const next = { ...current, [id]: !current[id] };
      try {
        localStorage.setItem(`binmucker-loop-${dateKey}`, JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  function saveNote() {
    try {
      localStorage.setItem('binmucker-idea', note);
    } catch {}
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  }

  function trackPointer(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
  }

  function toggleWeirdMode() {
    const next = !weirdMode;
    setWeirdMode(next);
    setEasterMessage(next ? 'Weird mode engaged. Click anywhere.' : 'Back to quiet mode.');
    window.setTimeout(() => setEasterMessage(''), 2800);
  }

  return (
    <>
      {weirdMode && <div className="home-weird-background" aria-hidden="true" />}
      <div className={`home-shell ${weirdMode ? 'is-weird' : ''}`}>
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-kicker">
            <span className="home-status-dot" aria-hidden="true" />
            Conor Chepenik · Builder, daily writer, Bitcoiner
          </div>
          <h1 id="home-title">
            Useful things for a <span>more sovereign life.</span>
          </h1>
          <p className="home-intro">
            I build small, useful software, write every day to think clearly, and explore Bitcoin,
            better businesses, health, and the weird edges between them. This is where it all lives.
          </p>
          <div className="home-hero-actions">
            <a href="#directory" className="home-primary-button">
              Explore everything <ArrowRight size={17} aria-hidden="true" />
            </a>
            <Link href="/about" className="home-secondary-button">
              Why I build
            </Link>
          </div>
        </section>

        <section className="home-feature-grid" aria-label="Start here">
          <Link href="/audit" className="home-feature-card home-feature-main" onPointerMove={trackPointer}>
            <div className="home-card-topline">
              <span className="home-chip home-chip-blue">Featured tool</span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </div>
            <div className="home-feature-copy">
              <Sparkles size={28} strokeWidth={1.6} aria-hidden="true" />
              <h2>How discoverable is your business?</h2>
              <p>
                Run a free AI-powered audit across local search, reviews, content, technical SEO,
                and AI readiness. Clear score. Useful next steps.
              </p>
            </div>
            <span className="home-text-link">Run the free audit <ArrowRight size={15} /></span>
          </Link>

          <Link href="/breathe" className="home-feature-card home-feature-small home-feature-calm" onPointerMove={trackPointer}>
            <div className="home-card-topline">
              <span className="home-chip">Reset</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </div>
            <HeartPulse size={24} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <h3>Breathe Better</h3>
              <p>One quiet minute can change the next hour.</p>
            </div>
          </Link>

          <a
            href="https://medium.com/@chepenikconor"
            target="_blank"
            rel="noopener noreferrer"
            className="home-feature-card home-feature-small home-feature-writing"
            onPointerMove={trackPointer}
          >
            <div className="home-card-topline">
              <span className="home-chip">Daily practice</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </div>
            <PenLine size={24} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <h3>Writing every day</h3>
              <p>Public thinking, without waiting for perfect.</p>
            </div>
          </a>

          <a
            href="https://venice.ai/chat?ref=pnaIip"
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="home-feature-card home-feature-wide home-feature-partner home-feature-venice"
            onPointerMove={trackPointer}
          >
            <div className="home-venice-mark" aria-hidden="true"><Bot size={22} /></div>
            <div className="home-feature-wide-copy">
              <span className="home-chip">Referral · Pro</span>
              <h3>Try Venice AI. You get $10, I get $10.</h3>
              <p>Private, unrestricted AI models with a welcome credit when you join Pro.</p>
            </div>
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>

          <a
            href="https://creditcard.exchange.gemini.com/credit-card/apply?referral_code=jljkt4e94"
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="home-feature-card home-feature-wide home-feature-partner home-feature-gemini"
            onPointerMove={trackPointer}
          >
            <div className="home-gemini-mark" aria-hidden="true"><CreditCard size={22} /></div>
            <div className="home-feature-wide-copy">
              <span className="home-chip">Referral · Card</span>
              <h3>Earn Bitcoin on everyday purchases.</h3>
              <p>The Gemini Credit Card is the one I use to stack sats automatically.</p>
            </div>
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </section>

        <section id="directory" className="home-directory" aria-labelledby="directory-title">
          <div className="home-section-heading">
            <div>
              <p className="home-eyebrow">The whole internet drawer</p>
              <h2 id="directory-title">Everything, organized.</h2>
            </div>
            <p>Projects, writing, experiments, profiles, and the tools behind the work.</p>
          </div>

          <div className="home-directory-tools">
            <label className="home-search">
              <Search size={17} aria-hidden="true" />
              <span className="sr-only">Search links</span>
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find a project, idea, or tool"
              />
              {!query && <kbd aria-hidden="true">⌘ K</kbd>}
              {query && (
                <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
                  <X size={15} />
                </button>
              )}
            </label>
            <div className="home-filters" aria-label="Filter links">
              {categories.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setCategory(item)}
                  className={category === item ? 'is-active' : ''}
                  aria-pressed={category === item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <p className="sr-only" role="status" aria-live="polite">
            {filteredLinks.length} {filteredLinks.length === 1 ? 'link' : 'links'} shown.
          </p>
          <div className="home-link-list">
            {filteredLinks.map((item) => {
              const Icon = item.icon;
              const external = isExternal(item.href);
              const content = (
                <>
                  <span className="home-link-icon"><Icon size={19} strokeWidth={1.65} /></span>
                  <span className="home-link-copy">
                    <span className="home-link-title-row">
                      <strong>{item.title}</strong>
                      <span className="home-chip">{item.label}</span>
                      {item.affiliate && <span className="home-affiliate-label">Affiliate</span>}
                    </span>
                    <span>{item.description}</span>
                  </span>
                  <ArrowUpRight className="home-link-arrow" size={19} aria-hidden="true" />
                </>
              );

              return external ? (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel={item.affiliate ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
                  className="home-link-row"
                  onPointerMove={trackPointer}
                >
                  {content}
                </a>
              ) : (
                <Link key={item.title} href={item.href} className="home-link-row" onPointerMove={trackPointer}>
                  {content}
                </Link>
              );
            })}
            {filteredLinks.length === 0 && (
              <div className="home-empty-state">
                <Search size={24} strokeWidth={1.5} />
                <p>No link matches that yet.</p>
                <button type="button" onClick={() => { setQuery(''); setCategory('All'); }}>
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="desk" className="home-desk" aria-labelledby="desk-title">
          <div className="home-section-heading">
            <div>
              <p className="home-eyebrow">A site that gives something back</p>
              <h2 id="desk-title">The daily desk.</h2>
            </div>
            <p>A lightweight loop for making progress. Private to this browser.</p>
          </div>

          <div className="home-desk-grid">
            <div className="home-desk-panel">
              <div className="home-panel-heading">
                <div>
                  <span>Today&apos;s loop</span>
                  <p aria-live="polite">{Object.values(completed).filter(Boolean).length} of {habits.length} complete</p>
                </div>
                <span className="home-loop-count">{Object.values(completed).filter(Boolean).length}/{habits.length}</span>
              </div>
              <div className="home-habits">
                {habits.map((habit) => (
                  <button
                    type="button"
                    key={habit.id}
                    onClick={() => toggleHabit(habit.id)}
                    className={completed[habit.id] ? 'is-complete' : ''}
                    aria-pressed={Boolean(completed[habit.id])}
                  >
                    <span className="home-check">{completed[habit.id] && <Check size={15} />}</span>
                    <span><strong>{habit.label}</strong><small>{habit.detail}</small></span>
                  </button>
                ))}
              </div>
            </div>

            <div className="home-desk-panel home-idea-panel">
              <div className="home-panel-heading">
                <div>
                  <span>Quick capture</span>
                  <p>The thought you do not want to lose.</p>
                </div>
                <Lightbulb size={20} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="What if I built…"
                aria-label="Private idea note"
              />
              <div className="home-note-footer">
                <span role="status" aria-live="polite">{saved ? 'Thought saved on this device.' : 'Saved only on this device.'}</span>
                <button type="button" onClick={saveNote}>
                  {saved ? <><Check size={14} /> Saved</> : 'Save thought'}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="home-connect" aria-labelledby="connect-title">
          <div>
            <p className="home-eyebrow">Follow the work in motion</p>
            <h2 id="connect-title">Ideas improve in public.</h2>
            <p>Find the daily notes, unfinished thoughts, build logs, and occasional strong opinion.</p>
          </div>
          <div className="home-connect-actions">
            <button
              type="button"
              className={`home-weird-toggle ${weirdMode ? 'is-active' : ''}`}
              onClick={toggleWeirdMode}
              aria-pressed={weirdMode}
              title="Hint: the Konami code works too"
            >
              <WandSparkles size={15} />
              {weirdMode ? 'Quiet mode' : 'Make it weird'}
            </button>
            <div className="home-social-links">
              <a href="https://x.com/ConorChepenik" target="_blank" rel="noopener noreferrer" aria-label="Follow Conor on X"><FaXTwitter /></a>
              <a href="https://medium.com/@chepenikconor" target="_blank" rel="noopener noreferrer" aria-label="Read Conor on Medium"><FaMedium /></a>
              <a href="https://github.com/Chepenik" target="_blank" rel="noopener noreferrer" aria-label="View Conor on GitHub"><FaGithub /></a>
              <a href="https://www.youtube.com/@ConorChepenik" target="_blank" rel="noopener noreferrer" aria-label="Watch Conor on YouTube"><FaYoutube /></a>
              <button type="button" onClick={() => setZapModalOpen(true)} aria-label="Zap Conor with Bitcoin"><Zap size={18} /></button>
            </div>
          </div>
        </section>

        <section className="home-support">
          <div>
            <Coffee size={22} strokeWidth={1.5} aria-hidden="true" />
            <div><strong>Something here helped?</strong><span>Support the next useful thing.</span></div>
          </div>
          <a href="https://ko-fi.com/chepenik" target="_blank" rel="noopener noreferrer">
            Buy me a coffee <ArrowUpRight size={15} />
          </a>
        </section>
      </div>

      {easterMessage && (
        <div className="home-easter-toast" role="status">
          <WandSparkles size={16} />
          <span>{easterMessage}</span>
          {weirdMode && <Link href="/space-invaders">Enter arcade</Link>}
        </div>
      )}
      {weirdMode && <RainbowCursor />}
      <ZapModal isOpen={isZapModalOpen} onClose={() => setZapModalOpen(false)} />
    </>
  );
}
