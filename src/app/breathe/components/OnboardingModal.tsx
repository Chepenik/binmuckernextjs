'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Layers, Play } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

const steps = [
  {
    icon: Wind,
    title: 'Welcome to Breathe Better',
    description: 'A free breathing exercise tool to help you find calm, focus, and balance through mindful breathing.',
  },
  {
    icon: Layers,
    title: 'Choose a Pattern',
    description: 'Pick from 5 scientifically-backed breathing patterns. Each one targets different goals — relaxation, focus, energy, or stress relief.',
  },
  {
    icon: Play,
    title: 'Start Breathing',
    description: 'Follow the animated circle. It grows as you inhale and shrinks as you exhale. Let your breath flow naturally with the rhythm.',
  },
];

export default function OnboardingModal({ isOpen, onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(0);

  // Escape key to skip
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onComplete(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onComplete]);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
      setStep(0);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Onboarding"
            className="relative bg-cyber-black border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {(() => {
                  const StepIcon = steps[step].icon;
                  return (
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500/20 to-violet-500/20 flex items-center justify-center">
                        <StepIcon className="w-8 h-8 text-violet-400" />
                      </div>
                    </div>
                  );
                })()}
                <h2 className="text-xl font-bold text-white mb-3">{steps[step].title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{steps[step].description}</p>
              </motion.div>
            </AnimatePresence>

            {/* Step indicators */}
            <div className="flex justify-center gap-2 mb-6">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === step ? 'bg-violet-400 w-6' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={onComplete}
                className="px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white transition-colors"
              >
                Skip
              </button>
              <button
                onClick={handleNext}
                className="flex-1 px-6 py-2.5 rounded-xl font-semibold text-white
                           bg-gradient-to-r from-pink-500 to-violet-500
                           hover:from-pink-400 hover:to-violet-400
                           transition-all duration-200"
              >
                {step < steps.length - 1 ? 'Next' : "Let's Go"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
