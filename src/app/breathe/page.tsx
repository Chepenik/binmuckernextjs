import Link from 'next/link';
import { ArrowRight, Brain, Target, Wind } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const benefits = [
  {
    icon: Wind,
    title: 'Feel calmer',
    description: 'Use a steady visual rhythm to slow down, breathe deliberately, and make room for a calmer moment.',
  },
  {
    icon: Brain,
    title: 'Think clearer',
    description: 'Step away from the noise for a minute and return to the next task with a clearer point of focus.',
  },
  {
    icon: Target,
    title: 'Build a habit',
    description: 'Start with one minute a day. Small, consistent practice makes the reset easier to remember.',
  },
];

export default function BreatheLanding() {
  return (
    <div className="site-page">
      <Header />
      <main>
        <div className="site-shell route-main">
          <header className="route-hero route-hero-centered">
            <p className="route-eyebrow"><Wind size={15} aria-hidden="true" /> Breathe Better · free browser tool</p>
            <h1 className="route-title">A quieter minute, whenever you need one.</h1>
            <p className="route-lede">
              Five guided breathing patterns for a calmer pause, a clearer reset, or a more deliberate start. No account. No payment. Just breathe.
            </p>
            <div className="route-actions">
              <Link href="/breathe/practice" className="ui-button">Start breathing <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
          </header>

          <section className="ui-grid-3" aria-label="Benefits of taking a breathing pause">
            {benefits.map(({ icon: Icon, title, description }) => (
              <article key={title} className="ui-card breathe-benefit-card">
                <span className="breathe-benefit-icon"><Icon size={22} strokeWidth={1.5} aria-hidden="true" /></span>
                <h2>{title}</h2>
                <p>{description}</p>
              </article>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
