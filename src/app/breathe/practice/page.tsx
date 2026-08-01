'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Play, Square, Volume2, VolumeX, HelpCircle, ArrowLeft } from 'lucide-react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import BreathingCircle from '../components/BreathingCircle';
import PatternSelector from '../components/PatternSelector';
import SessionCompleteModal from '../components/SessionCompleteModal';
import OnboardingModal from '../components/OnboardingModal';
import { PATTERNS, Pattern } from '../data/patterns';
import { useBreathingTimer } from '../hooks/useBreathingTimer';

const ONBOARDING_KEY = 'breathBetterOnboardingComplete';

export default function PracticePage() {
  const [selectedPattern, setSelectedPattern] = useState<Pattern>(PATTERNS[0]);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { state, start, stop, reset, setOnPhaseChange } = useBreathingTimer(selectedPattern);

  const musicRef = useRef<HTMLAudioElement | null>(null);
  const transitionRef = useRef<HTMLAudioElement | null>(null);
  const duckTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMutedRef = useRef(isMuted);

  // Keep muted ref in sync
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Check onboarding on mount
  useEffect(() => {
    const completed = localStorage.getItem(ONBOARDING_KEY);
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
      setShowOnboarding(!completed);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // Initialize audio
  useEffect(() => {
    if (typeof window === 'undefined') return;
    musicRef.current = new Audio('/sounds/music_fx_create_a_soothing_lofi_track_for_breath_work.mp3');
    musicRef.current.loop = true;
    musicRef.current.volume = 0.05;

    transitionRef.current = new Audio('/sounds/transition_to_inhale.mp3');
    transitionRef.current.volume = 0.15;

    return () => {
      musicRef.current?.pause();
      transitionRef.current?.pause();
      if (duckTimeoutRef.current) clearTimeout(duckTimeoutRef.current);
    };
  }, []);

  // Phase change audio ducking (stable callback using ref to avoid stale closure)
  const handlePhaseChange = useCallback(() => {
    if (isMutedRef.current) return;

    // Duck music volume briefly
    if (musicRef.current) {
      musicRef.current.volume = 0.02;
      if (duckTimeoutRef.current) clearTimeout(duckTimeoutRef.current);
      duckTimeoutRef.current = setTimeout(() => {
        if (musicRef.current) musicRef.current.volume = 0.05;
      }, 250);
    }

    // Play transition sound
    if (transitionRef.current) {
      transitionRef.current.currentTime = 0;
      transitionRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    setOnPhaseChange(handlePhaseChange);
  }, [setOnPhaseChange, handlePhaseChange]);

  // Mute/unmute
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.muted = isMuted;
    }
    if (transitionRef.current) {
      transitionRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleStart = () => {
    start();
    if (!isMuted && musicRef.current) {
      musicRef.current.play().catch(() => {});
    }
  };

  const handleStop = () => {
    stop();
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.currentTime = 0;
    }
    // Show session modal if meaningful session
    if (state.cyclesCompleted >= 1 || state.elapsedSeconds >= 10) {
      setShowSessionModal(true);
    }
  };

  const handlePatternChange = (pattern: Pattern) => {
    if (state.isRunning) return;
    setSelectedPattern(pattern);
    reset();
  };

  const handleAgain = () => {
    setShowSessionModal(false);
    reset();
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(ONBOARDING_KEY, 'true');
    }
  };

  // Loading skeleton
  if (!mounted) {
    return (
      <div className="site-page">
        <Header />
        <main>
          <div className="site-shell route-main practice-shell">
            <h1 className="sr-only">Breathe Better guided practice</h1>
            <div className="practice-loading" role="status" aria-label="Loading breathing practice">
              <div className="practice-loading-circle" />
              <div className="practice-loading-line" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="site-page">
      <Header />

      <main>
        <div className="site-shell route-main practice-shell">
          <h1 className="sr-only">Breathe Better guided practice</h1>
        {/* Top bar */}
        <div className="practice-toolbar">
          <Link
            href="/breathe"
            className="ui-back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <button
            onClick={() => setShowOnboarding(true)}
            className="ui-icon-button"
            aria-label="Help"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Breathing Circle */}
        <div className="practice-circle-wrap">
          <BreathingCircle
            phase={state.phase}
            timeRemaining={state.timeRemaining}
            phaseDuration={state.phaseDuration}
            isRunning={state.isRunning}
          />
        </div>

        {/* Controls */}
        <div className="practice-controls">
          <div className="practice-control-row">
            <button
              onClick={state.isRunning ? handleStop : handleStart}
              className={state.isRunning ? 'ui-button-secondary practice-start-button' : 'ui-button practice-start-button'}
            >
              {state.isRunning ? (
                <>
                  <Square className="w-5 h-5" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start
                </>
              )}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="ui-icon-button"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          <p className="practice-guidance">
            {state.isRunning
              ? 'Follow the circle. Let your breath flow naturally.'
              : "Press Start when you're ready"}
          </p>

          {state.isRunning && (
            <div className="practice-stats" aria-live="polite">
              <span>Cycles: {state.cyclesCompleted}</span>
              <span>{Math.floor(state.elapsedSeconds)}s elapsed</span>
            </div>
          )}
        </div>

        {/* Pattern Selector */}
        <section className="practice-patterns" aria-labelledby="pattern-title">
          <div className="ui-section-heading">
            <div>
              <p className="route-eyebrow">Set the rhythm</p>
              <h2 id="pattern-title">Choose a pattern</h2>
            </div>
          </div>
          <PatternSelector
            patterns={PATTERNS}
            selected={selectedPattern}
            onSelect={handlePatternChange}
            disabled={state.isRunning}
          />
        </section>
        </div>
      </main>

      <Footer />

      {/* Modals */}
      <SessionCompleteModal
        isOpen={showSessionModal}
        duration={state.elapsedSeconds}
        cycles={state.cyclesCompleted}
        patternName={selectedPattern.name}
        onAgain={handleAgain}
        onClose={() => setShowSessionModal(false)}
      />

      <OnboardingModal
        isOpen={showOnboarding}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
}
