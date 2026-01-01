'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
}

export default function MenuToggle({ toggle, isOpen }: MenuToggleProps) {
  return (
    <button
      onClick={toggle}
      className="relative w-10 h-10 flex flex-col justify-center items-center
                 rounded-lg hover:bg-white/5 transition-colors group"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      {/* Top bar */}
      <motion.span
        className="absolute w-6 h-0.5 bg-gradient-to-r from-gold-400 to-neon-cyan
                   rounded-full"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : -8,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ boxShadow: isOpen ? '0 0 10px rgba(255, 215, 0, 0.5)' : 'none' }}
      />

      {/* Middle bar */}
      <motion.span
        className="absolute w-6 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-magenta
                   rounded-full"
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Bottom bar */}
      <motion.span
        className="absolute w-6 h-0.5 bg-gradient-to-r from-neon-magenta to-gold-400
                   rounded-full"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? 0 : 8,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ boxShadow: isOpen ? '0 0 10px rgba(255, 215, 0, 0.5)' : 'none' }}
      />
    </button>
  );
}
