'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Layers, Play } from 'lucide-react';
import { useDialogFocus } from '@/app/hooks/useDialogFocus';

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
    description: 'Pick from five guided breathing patterns for different goals, including relaxation, focus, energy, and stress relief.',
  },
  {
    icon: Play,
    title: 'Start Breathing',
    description: 'Follow the animated circle. It grows as you inhale and shrinks as you exhale. Let your breath flow naturally with the rhythm.',
  },
];

export default function OnboardingModal({ isOpen, onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(0);
  const dialogRef = useDialogFocus<HTMLDivElement>(isOpen, onComplete);

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
          className="ui-dialog-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="breathe-onboarding-title"
            className="ui-dialog text-center"
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
                    <div className="ui-dialog-icon">
                        <StepIcon size={27} strokeWidth={1.5} />
                      </div>
                  );
                })()}
                <h2 id="breathe-onboarding-title">{steps[step].title}</h2>
                <p className="mt-3">{steps[step].description}</p>
              </motion.div>
            </AnimatePresence>

            {/* Step indicators */}
            <div className="dialog-progress" aria-label={`Step ${step + 1} of ${steps.length}`}>
              {steps.map((_, i) => (
                <div
                  key={i}
                  aria-hidden="true"
                  className={i === step ? 'is-active' : ''}
                />
              ))}
            </div>

            <div className="ui-dialog-actions">
              <button
                onClick={onComplete}
                className="ui-button-secondary"
              >
                Skip
              </button>
              <button
                onClick={handleNext}
                className="ui-button"
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
