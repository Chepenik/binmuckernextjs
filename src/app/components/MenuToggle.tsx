'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function MenuToggle({ toggle }: { toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className="relative w-8 h-8 flex flex-col justify-between items-center"
    >
      <motion.span
        className="block w-full h-[2px] bg-white"
        animate={{ rotate: 0, translateY: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="block w-full h-[2px] bg-white"
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="block w-full h-[2px] bg-white"
        animate={{ rotate: 0, translateY: 0 }}
        transition={{ duration: 0.3 }}
      />
    </button>
  );
}
