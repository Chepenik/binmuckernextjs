'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Copy, ExternalLink, X, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ZapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ZapModal({ isOpen, onClose }: ZapModalProps) {
  const btcAddress = 'bc1qfkpu72e6h58puah8m8cmjxhms4swdauzm30naglgm7au4n7ae24s6wvq2w';
  const lightningAddress = 'https://strike.me/chepenik/';
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(btcAddress);
      setCopyError(false);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy BTC address', error);
      setCopyError(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="ui-dialog-backdrop" onMouseDown={onClose}>
          <motion.div
            ref={dialogRef}
            className="ui-dialog support-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="support-dialog-title"
            aria-describedby="support-dialog-description"
            initial={{ y: reduceMotion ? 0 : 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: reduceMotion ? 0 : 8, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button ref={closeButtonRef} type="button" className="ui-icon-button support-dialog-close" onClick={onClose} aria-label="Close support dialog">
              <X size={18} />
            </button>

            <div className="ui-dialog-icon support-dialog-icon" aria-hidden="true">
              <Zap size={22} />
            </div>
            <p className="route-eyebrow">Support the work</p>
            <h2 id="support-dialog-title">Send a zap</h2>
            <p id="support-dialog-description" className="support-dialog-copy">
              If something here helped you, Lightning is the quickest way to help fund the next useful experiment.
            </p>

            <a href={lightningAddress} target="_blank" rel="noopener noreferrer" className="ui-button support-lightning-link">
              Pay with Lightning <ExternalLink size={16} />
            </a>

            <div className="support-divider"><span>or use Bitcoin on-chain</span></div>
            <code className="support-address">{btcAddress}</code>
            <button type="button" className="ui-button-secondary support-copy-button" onClick={copyToClipboard}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy address'}
            </button>
            <p className="support-thanks">Thank you for keeping the curious corners of the internet alive.</p>
            <p className="sr-only" role="status" aria-live="polite">
              {copied ? 'Bitcoin address copied.' : copyError ? 'Could not copy the Bitcoin address. Select it manually.' : ''}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
