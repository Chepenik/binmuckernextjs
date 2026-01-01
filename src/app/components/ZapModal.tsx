'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, ExternalLink, X, Check } from 'lucide-react';

interface ZapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ZapModal: React.FC<ZapModalProps> = ({ isOpen, onClose }) => {
  const btcAddress = 'bc1qfkpu72e6h58puah8m8cmjxhms4swdauzm30naglgm7au4n7ae24s6wvq2w';
  const lightningAddress = 'https://strike.me/chepenik/';
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error('Failed to copy BTC Address', error);
      });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-void/90 backdrop-blur-sm
                   flex items-center justify-center p-4 z-50"
        role="dialog"
        aria-modal="true"
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-md w-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Animated border glow */}
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-neon-cyan via-gold-400 to-neon-magenta opacity-75 blur-sm animate-gradient-shift" style={{ backgroundSize: '200% 200%' }} />

          {/* Modal content */}
          <div className="relative bg-cyber-black/95 backdrop-blur-xl
                          rounded-3xl p-8 border border-gold-500/20 overflow-hidden">

            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-gold-500/10 to-transparent blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-radial from-neon-cyan/10 to-transparent blur-2xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-neon-cyan
                         transition-colors p-2 rounded-full hover:bg-white/5"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Header with Bitcoin icon */}
            <div className="text-center mb-8 relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full
                              bg-gradient-to-br from-gold-400 to-bitcoin
                              flex items-center justify-center shadow-neon-gold">
                <span className="text-3xl text-cyber-black font-bold">&#8383;</span>
              </div>
              <h2 className="text-2xl font-display font-bold text-gradient-gold">
                Support The Binmucker
              </h2>
            </div>

            {/* Lightning Button - Primary CTA */}
            <a
              href={lightningAddress}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-4 px-6
                         rounded-xl font-bold text-cyber-black
                         bg-gradient-to-r from-gold-400 via-metallic to-gold-500
                         hover:shadow-neon-gold hover:scale-[1.02]
                         transition-all duration-300 mb-6 group relative z-10"
            >
              <span className="text-2xl mr-2 group-hover:animate-pulse">&#9889;</span>
              Pay with Lightning
              <ExternalLink size={20} className="ml-2" />
            </a>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6 relative z-10">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
              <span className="text-gray-500 text-sm">or</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
            </div>

            {/* Bitcoin Address */}
            <div className="text-center relative z-10">
              <h3 className="text-lg font-semibold text-gold-400 mb-3">
                Bitcoin On-Chain
              </h3>
              <div className="glass-gold rounded-xl p-4 mb-4">
                <p className="text-xs text-gray-400 font-mono break-all leading-relaxed select-all">
                  {btcAddress}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(btcAddress)}
                className="btn-neon text-sm inline-flex items-center gap-2 px-4 py-2"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-neon-green" />
                    <span className="text-neon-green">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy Address
                  </>
                )}
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-gray-500 text-sm mt-8 relative z-10">
              Thank you for supporting the Binmucker!{' '}
              <span className="text-gold-400">&#128591;</span>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ZapModal;
