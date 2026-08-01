import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Bitcoin,
  BookOpen,
  HeartPulse,
  Lightbulb,
  PenLine,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

const principles = [
  {
    icon: Wrench,
    title: 'Build for a real need',
    copy: 'Most projects begin as something I want to use myself. If it proves useful, I share it.',
  },
  {
    icon: PenLine,
    title: 'Write toward clarity',
    copy: 'Daily writing is how I test ideas, notice patterns, and turn vague thoughts into workable ones.',
  },
  {
    icon: Bitcoin,
    title: 'Prefer ownership',
    copy: 'Bitcoin, Lightning, sound money, sovereignty, and self-custody shape how I think about tools and incentives.',
  },
  {
    icon: HeartPulse,
    title: 'Protect attention',
    copy: 'Health, family, breathing, and focused software matter because useful work needs a human being behind it.',
  },
];

const projects = [
  {
    title: 'Free Local SEO Audit',
    copy: 'A practical review of how a local business appears across search, reviews, content, technical SEO, and AI discovery.',
    href: '/audit',
  },
  {
    title: 'Bitcoin Coloring Book',
    copy: 'A kid-friendly way to make Bitcoin, sound money, and self-custody easier to talk about.',
    href: 'https://bitcoincoloring.com/',
  },
  {
    title: 'Sound Money Mortgage',
    copy: 'A mortgage calculator that adds time and Bitcoin opportunity cost to the usual monthly-payment view.',
    href: 'https://soundmoneymortgage.com/',
  },
  {
    title: 'Breathe Better',
    copy: 'A quiet browser tool for guided breathing when the next minute needs to feel different from the last one.',
    href: '/breathe',
  },
];

export default function AboutPage() {
  return (
    <div className="home-page min-h-screen">
      <Header />
      <main>
        <div className="home-shell about-shell">
          <section className="about-hero" aria-labelledby="about-title">
            <p className="home-eyebrow">Conor Chepenik · the person behind Binmucker</p>
            <h1 id="about-title">I build small, useful things and write to understand why.</h1>
            <p>
              Binmucker is my personal internet home base: part project shelf, part public notebook,
              part daily desk, and part invitation to follow whatever I build next.
            </p>
            <div className="home-hero-actions">
              <Link href="/#directory" className="home-primary-button">
                Explore the projects <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a href="https://medium.com/@chepenikconor" target="_blank" rel="noopener noreferrer" className="home-secondary-button">
                Read the daily writing
              </a>
            </div>
          </section>

          <section className="about-story" aria-labelledby="story-title">
            <div className="about-section-heading">
              <p className="home-eyebrow">How the pieces fit</p>
              <h2 id="story-title">Writing is the thread.</h2>
            </div>
            <div className="about-story-grid">
              <div className="about-story-main">
                <BookOpen size={25} strokeWidth={1.5} aria-hidden="true" />
                <p>
                  I committed to writing every day, whether I felt inspired or not. That practice
                  became the foundation for the tools, books, experiments, and ideas collected here.
                  Writing forces clarity; building tests whether the clarity survives contact with reality.
                </p>
                <p>
                  My interest in Bitcoin grew from curiosity into a wider exploration of sound money,
                  decentralization, self-custody, and personal sovereignty. Those ideas sit alongside
                  work about better businesses, health, breathing, games, education, and whatever else
                  seems worth understanding by making something.
                </p>
              </div>
              <aside className="about-note" aria-label="Conor's working approach">
                <Lightbulb size={22} strokeWidth={1.5} aria-hidden="true" />
                <strong>The working bet</strong>
                <p>Build it for myself first. Make it genuinely useful. Then let other people decide whether it belongs in their lives too.</p>
              </aside>
            </div>
          </section>

          <section className="about-principles" aria-labelledby="principles-title">
            <div className="about-section-heading">
              <p className="home-eyebrow">Operating principles</p>
              <h2 id="principles-title">What guides the work.</h2>
            </div>
            <div className="about-principles-grid">
              {principles.map(({ icon: Icon, title, copy }) => (
                <article key={title} className="about-principle-card">
                  <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="about-projects" aria-labelledby="about-projects-title">
            <div className="about-section-heading">
              <p className="home-eyebrow">A few places to begin</p>
              <h2 id="about-projects-title">Useful, curious, sometimes strange.</h2>
            </div>
            <div className="about-project-list">
              {projects.map((project) => {
                const external = project.href.startsWith('http');
                const content = (
                  <>
                    <span>
                      <strong>{project.title}</strong>
                      <small>{project.copy}</small>
                    </span>
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </>
                );

                return external ? (
                  <a key={project.title} href={project.href} target="_blank" rel="noopener noreferrer">{content}</a>
                ) : (
                  <Link key={project.title} href={project.href}>{content}</Link>
                );
              })}
            </div>
          </section>

          <section className="about-close" aria-labelledby="about-close-title">
            <Sparkles size={24} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <p className="home-eyebrow">Still in motion</p>
              <h2 id="about-close-title">The site is a map, not a monument.</h2>
              <p>I keep writing, building, and revising. The searchable directory is the best way to see the whole drawer.</p>
            </div>
            <Link href="/#directory">Open everything <ArrowRight size={16} aria-hidden="true" /></Link>
          </section>

          <p className="about-legal">
            Binmucker is operated by Binmucker LLC. Some recommendations use clearly labeled affiliate links.
            See the <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Service</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
