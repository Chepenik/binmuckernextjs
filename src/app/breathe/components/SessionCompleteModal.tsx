'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Share2, Copy, Check } from 'lucide-react';
import { useDialogFocus } from '@/app/hooks/useDialogFocus';
import { useState, useEffect } from 'react';

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

function getShareText(duration: number, patternName: string): string {
  const time = formatDuration(duration);
  return `Just finished a ${time} ${patternName} session on binmucker.com/breathe — try it.`;
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
  const [copied, setCopied] = useState(false);
  const [hasWebShare, setHasWebShare] = useState(false);

  const shareUrl = 'https://www.binmucker.com/breathe';
  const shareText = getShareText(duration, patternName);

  // Check Web Share API support on mount
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      setHasWebShare(true);
    }
  }, []);

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer,width=550,height=420');
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer,width=550,height=550');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'noopener,noreferrer,width=555,height=600');
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText, url: shareUrl });
      } catch {
        // User cancelled or share failed
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API failed
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

            {/* Social Share Section */}
            <div className="mt-6 space-y-3">
              <p className="text-sm text-gray-400">Share your progress</p>
              
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleTwitterShare}
                  className="flex-1 min-h-[44px] px-4 py-2 rounded-full border border-[#30363D] bg-[rgba(255,255,255,0.045)] hover:bg-[rgba(255,255,255,0.075)] hover:border-[rgba(255,255,255,0.18)] transition-all duration-180 text-sm font-semibold text-[#DDDDDF] hover:-translate-y-0.5"
                  aria-label="Share on X/Twitter"
                >
                  <svg className="w-4 h-4 inline mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  X
                </button>
                <button
                  onClick={handleLinkedInShare}
                  className="flex-1 min-h-[44px] px-4 py-2 rounded-full border border-[#30363D] bg-[rgba(255,255,255,0.045)] hover:bg-[rgba(255,255,255,0.075)] hover:border-[rgba(255,255,255,0.18)] transition-all duration-180 text-sm font-semibold text-[#DDDDDF] hover:-translate-y-0.5"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="w-4 h-4 inline mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </button>
                <button
                  onClick={handleFacebookShare}
                  className="flex-1 min-h-[44px] px-4 py-2 rounded-full border border-[#30363D] bg-[rgba(255,255,255,0.045)] hover:bg-[rgba(255,255,255,0.075)] hover:border-[rgba(255,255,255,0.18)] transition-all duration-180 text-sm font-semibold text-[#DDDDDF] hover:-translate-y-0.5"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-4 h-4 inline mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>

              <div className="flex gap-2 justify-center">
                {hasWebShare && (
                  <button
                    onClick={handleWebShare}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-gray-400 hover:text-gray-300 transition-colors"
                    aria-label="Share via native share"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    More options
                  </button>
                )}
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 px-4 py-2 text-xs text-gray-400 hover:text-gray-300 transition-colors"
                  aria-label="Copy share text and link"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy link
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="ui-dialog-actions mt-6">
              <button
                onClick={onAgain}
                className="ui-button"
              >
                Again
              </button>
              <button
                onClick={onClose}
                className="ui-button-secondary"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
