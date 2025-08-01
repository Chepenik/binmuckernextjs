'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function MenuToggle({ toggle }: { toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className="relative w-8 h-8 flex flex-col justify-between items-center group"
    >
      <motion.span
        className="block w-full h-[3px] bg-gradient-to-r from-orange-300 to-cyan-300 rounded-full shadow-sm group-hover:shadow-orange-300/50 transition-shadow"
        animate={{ rotate: 0, translateY: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="block w-full h-[3px] bg-gradient-to-r from-cyan-300 to-teal-300 rounded-full shadow-sm group-hover:shadow-cyan-300/50 transition-shadow"
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="block w-full h-[3px] bg-gradient-to-r from-teal-300 to-orange-300 rounded-full shadow-sm group-hover:shadow-teal-300/50 transition-shadow"
        animate={{ rotate: 0, translateY: 0 }}
        transition={{ duration: 0.3 }}
      />
    </button>
  );
}
