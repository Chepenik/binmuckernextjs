'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Phase, PHASE_CONFIG } from '../data/patterns';

interface BreathingCircleProps {
  phase: Phase;
  timeRemaining: number;
  phaseDuration: number;
  isRunning: boolean;
}

function getBorderColor(phase: Phase): string {
  switch (phase) {
    case 'inhale': return 'border-blue-400';
    case 'hold': return 'border-yellow-400';
    case 'exhale': return 'border-purple-400';
    case 'holdAfterExhale': return 'border-gray-400';
  }
}

export default function BreathingCircle({ phase, timeRemaining, phaseDuration, isRunning }: BreathingCircleProps) {
  const config = PHASE_CONFIG[phase];
  const progress = isRunning && phaseDuration > 0 ? 1 - timeRemaining / phaseDuration : 0;

  // For inhale, animate from 1 to 1.3 over the phase
  // For exhale, animate from 1.3 to 1
  const currentScale = (() => {
    if (!isRunning) return 1;
    switch (phase) {
      case 'inhale': return 1 + progress * 0.3;
      case 'exhale': return 1.3 - progress * 0.3;
      case 'hold': return 1.3;
      case 'holdAfterExhale': return 1;
    }
  })();

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full
                    bg-cyber-black/60 backdrop-blur-md border-2 ${getBorderColor(phase)}
                    flex flex-col items-center justify-center`}
        animate={{
          scale: currentScale,
          boxShadow: `0 0 40px ${config.glowColor}, 0 0 80px ${config.glowColor}`,
        }}
        transition={{
          scale: { duration: 0.1, ease: 'linear' },
          boxShadow: { duration: 0.5 },
        }}
      >
        {/* Inner content */}
        <div className="flex flex-col items-center gap-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={phase}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="text-2xl sm:text-3xl font-bold text-white"
            >
              {config.label}
            </motion.span>
          </AnimatePresence>

          <span className="text-3xl sm:text-4xl font-mono text-white/90 tabular-nums">
            {isRunning ? `${Math.max(0, timeRemaining).toFixed(1)}s` : '—'}
          </span>

          <AnimatePresence mode="wait">
            <motion.span
              key={phase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-gray-400 text-center px-4"
            >
              {isRunning ? config.guidance : 'Press Start'}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
