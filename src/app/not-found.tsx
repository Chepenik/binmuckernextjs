'use client';

import { Footer } from '@/app/components/Footer';
import { Header } from '@/app/components/Header';
import { ArrowRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const TOTAL_SQUARES = 25;

export default function NotFoundPage() {
  const [isGameActive, setIsGameActive] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const startGame = () => {
    setIsGameActive(true);
    setHasPlayed(true);
    setScore(0);
    setTimeLeft(20);
    setActiveIndex(null);
  };

  useEffect(() => {
    if (!isGameActive) return;
    const timer = window.setTimeout(() => {
      if (timeLeft <= 1) {
        setTimeLeft(0);
        setIsGameActive(false);
        setActiveIndex(null);
      } else {
        setTimeLeft((current) => current - 1);
      }
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [isGameActive, timeLeft]);

  useEffect(() => {
    if (!isGameActive || timeLeft <= 0) return;
    const interval = window.setInterval(() => {
      setActiveIndex(Math.floor(Math.random() * TOTAL_SQUARES));
    }, 720);
    return () => window.clearInterval(interval);
  }, [isGameActive, timeLeft]);

  const hitSquare = (index: number) => {
    if (!isGameActive || index !== activeIndex) return;
    setScore((current) => current + 1);
    setActiveIndex(null);
  };

  return (
    <div className="site-page">
      <Header />
      <main className="site-shell route-main not-found-page">
        <section className="route-hero route-hero-centered">
          <p className="route-eyebrow">404 · Uncharted territory</p>
          <h1 className="route-title route-title-compact">Nothing lives here. Yet.</h1>
          <p className="route-lede">
            The link may have moved, or the idea may still be waiting to be built. Head home or stay for a twenty-second distraction.
          </p>
          <div className="route-actions">
            <Link href="/" className="ui-button">Return home <ArrowRight size={16} /></Link>
            <button type="button" className="ui-button-secondary" onClick={startGame}>
              <RotateCcw size={16} /> {hasPlayed ? 'Play again' : 'Play the tiny game'}
            </button>
          </div>
        </section>

        <section className="not-found-game ui-card" aria-labelledby="tiny-game-title">
          <div className="not-found-game-heading">
            <div>
              <p className="route-eyebrow">Optional easter egg</p>
              <h2 id="tiny-game-title">Catch the signal</h2>
            </div>
            <p aria-live="polite">Score {score} · {isGameActive ? `${timeLeft}s left` : hasPlayed ? `Finished at ${score}` : 'Ready'}</p>
          </div>
          <div className="not-found-grid" aria-label="Catch the highlighted square">
            {Array.from({ length: TOTAL_SQUARES }, (_, index) => (
              <button
                key={index}
                type="button"
                className={index === activeIndex ? 'is-active' : ''}
                onClick={() => hitSquare(index)}
                disabled={!isGameActive}
                aria-label={index === activeIndex ? 'Catch the signal' : `Empty square ${index + 1}`}
              >
                {index === activeIndex ? <span aria-hidden="true">₿</span> : null}
              </button>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
