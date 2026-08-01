'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useDialogFocus } from '@/app/hooks/useDialogFocus';

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
  const dialogRef = useDialogFocus<HTMLDivElement>(isOpen, onClose);

  const handleShare = async () => {
    const text = `Just completed a ${formatDuration(duration)} breathing session with ${patternName} on binmucker.com/breathe`;
    if (navigator.share) {
      try {
        await navigator.share({ text, url: 'https://www.binmucker.com/breathe' });
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
          className="ui-dialog-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0" onClick={onClose} />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="session-complete-title"
            className="ui-dialog text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <div className="ui-dialog-icon">
              <CheckCircle size={28} strokeWidth={1.5} />
            </div>
            <h2 id="session-complete-title">Well done.</h2>
            <p className="mt-3">{getEncouragement(duration)}</p>

            <div className="session-stats">
              <div>
                <strong>{formatDuration(duration)}</strong>
                <span>Duration</span>
              </div>
              <div>
                <strong>{cycles}</strong>
                <span>Cycles</span>
              </div>
            </div>

            <div className="session-pattern">{patternName}</div>

            <div className="ui-dialog-actions">
              <button
                onClick={onAgain}
                className="ui-button"
              >
                Again
              </button>
              <button
                onClick={handleShare}
                className="ui-button-secondary"
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
