import { Footer } from '@/app/components/Footer';
import { Header } from '@/app/components/Header';
import SpaceInvaders from '@/app/components/SpaceInvaders';
import { Gamepad2, Keyboard, Sparkles } from 'lucide-react';

export default function SpaceInvadersPage() {
  return (
    <div className="site-page">
      <Header />
      <main className="site-shell route-main game-page">
        <section className="route-hero route-hero-centered">
          <p className="route-eyebrow">A playable easter egg</p>
          <h1 className="route-title route-title-compact">Space Invaders</h1>
          <p className="route-lede">
            Five levels, endless mode, power-ups, and twelve achievements. The calm
            part of the website ends at the edge of the game board.
          </p>
        </section>

        <section className="game-stage ui-card" aria-label="Space Invaders game">
          <SpaceInvaders />
        </section>

        <section className="ui-section" aria-labelledby="game-guide-title">
          <div className="ui-section-heading">
            <div>
              <p className="route-eyebrow">Field guide</p>
              <h2 id="game-guide-title">How to play</h2>
            </div>
            <p>Move, fire, build combos, and keep an eye out for mystery UFOs.</p>
          </div>

          <div className="ui-grid-3 game-guide-grid">
            <article className="ui-card game-guide-card">
              <Keyboard aria-hidden="true" />
              <h3>Controls</h3>
              <dl>
                <div><dt>← →</dt><dd>Move ship</dd></div>
                <div><dt>Space</dt><dd>Fire weapons</dd></div>
                <div><dt>P</dt><dd>Pause game</dd></div>
              </dl>
            </article>

            <article className="ui-card game-guide-card">
              <Sparkles aria-hidden="true" />
              <h3>Power-ups</h3>
              <p>Rapid fire, spread shot, shields, bombs, slow motion, piercing rounds, double points, and a magnet.</p>
            </article>

            <article className="ui-card game-guide-card">
              <Gamepad2 aria-hidden="true" />
              <h3>Play smart</h3>
              <p>Chain quick kills for a 15× multiplier. Bosses arrive on levels three and five. Red UFOs pay well.</p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
