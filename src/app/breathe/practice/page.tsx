'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
    setMounted(true);
    if (typeof window !== 'undefined') {
      const completed = localStorage.getItem(ONBOARDING_KEY);
      if (!completed) {
        setShowOnboarding(true);
      }
    }
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
      <div className="min-h-screen bg-gradient-to-b from-[#111827] to-[#1f2937]">
        <Header />
        <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
          <div className="flex flex-col items-center gap-8">
            <div className="w-64 h-64 rounded-full bg-white/5 animate-pulse" />
            <div className="w-48 h-12 rounded-xl bg-white/5 animate-pulse" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111827] to-[#1f2937]">
      <Header />

      <main className="max-w-4xl mx-auto px-4 pt-20 pb-16">
        {/* Top bar */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/breathe"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <button
            onClick={() => setShowOnboarding(true)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Breathing Circle */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BreathingCircle
            phase={state.phase}
            timeRemaining={state.timeRemaining}
            phaseDuration={state.phaseDuration}
            isRunning={state.isRunning}
          />
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex flex-col items-center gap-4 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={state.isRunning ? handleStop : handleStart}
              className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white text-lg
                         transition-all duration-200 min-w-[160px] justify-center
                         ${state.isRunning
                           ? 'bg-slate-600 hover:bg-slate-500'
                           : 'bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-400 hover:to-violet-400 shadow-lg shadow-violet-500/25'
                         }`}
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
              className="p-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          <p className="text-sm text-gray-500">
            {state.isRunning
              ? 'Follow the circle. Let your breath flow naturally.'
              : "Press Start when you're ready"}
          </p>

          {state.isRunning && (
            <div className="flex gap-6 text-sm text-gray-500">
              <span>Cycles: {state.cyclesCompleted}</span>
              <span>{Math.floor(state.elapsedSeconds)}s elapsed</span>
            </div>
          )}
        </motion.div>

        {/* Pattern Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-white mb-4">Choose a Pattern</h2>
          <PatternSelector
            patterns={PATTERNS}
            selected={selectedPattern}
            onSelect={handlePatternChange}
            disabled={state.isRunning}
          />
        </motion.div>
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
