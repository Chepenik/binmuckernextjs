'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOADING_PHASES } from '@/lib/audit-constants';

export function LoadingState() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => (p + 1) % LOADING_PHASES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Spinner */}
      <div className="relative w-16 h-16 mb-8">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-neon-cyan border-r-gold-400"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-transparent border-b-neon-cyan border-l-gold-400"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Phase text */}
      <div className="h-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={phase}
            className="text-gray-300 font-mono text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {LOADING_PHASES[phase]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-6">
        {LOADING_PHASES.map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            animate={{
              backgroundColor: i === phase ? '#00FFFF' : 'rgba(255,255,255,0.15)',
              scale: i === phase ? 1.3 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
