'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface SessionCompleteModalProps {
  isOpen: boolean;
  duration: number;
  cycles: number;
  patternName: string;
  onAgain: () => void;
  onClose: () => void;
}

function getEncouragement(seconds: number): string {
  if (seconds >= 300) return 'Amazing dedication! Your consistency is building real change.';
  if (seconds >= 120) return 'Wonderful session! You gave yourself a meaningful pause.';
  if (seconds >= 60) return 'Great work! Every mindful breath makes a difference.';
  return 'Nice start! Even a few breaths can shift your state.';
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

export default function SessionCompleteModal({
  isOpen,
  duration,
  cycles,
  patternName,
  onAgain,
  onClose,
}: SessionCompleteModalProps) {
  // Escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleShare = async () => {
    const text = `Just completed a ${formatDuration(duration)} breathing session with ${patternName} on binmucker.com/breathe`;
    if (navigator.share) {
      try {
        await navigator.share({ text, url: 'https://binmucker.com/breathe' });
      } catch {
        // User cancelled
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
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
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Session complete"
            className="relative bg-cyber-black border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Well done!</h2>
            <p className="text-gray-400 mb-6">{getEncouragement(duration)}</p>

            <div className="flex justify-center gap-8 mb-6">
              <div>
                <div className="text-2xl font-bold font-mono text-white">{formatDuration(duration)}</div>
                <div className="text-sm text-gray-500">Duration</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-white">{cycles}</div>
                <div className="text-sm text-gray-500">Cycles</div>
              </div>
            </div>

            <div className="text-sm text-gray-500 mb-6">{patternName}</div>

            <div className="flex gap-3">
              <button
                onClick={onAgain}
                className="flex-1 px-6 py-3 rounded-xl font-semibold text-white
                           bg-gradient-to-r from-pink-500 to-violet-500
                           hover:from-pink-400 hover:to-violet-400
                           transition-all duration-200"
              >
                Again
              </button>
              <button
                onClick={handleShare}
                className="flex-1 px-6 py-3 rounded-xl font-semibold text-white
                           border border-white/20 hover:bg-white/10
                           transition-all duration-200"
              >
                Share
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
