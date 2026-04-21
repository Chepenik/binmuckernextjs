'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { BriefingIdea } from '@/lib/briefing-constants';

interface BriefingCardProps {
  idea: BriefingIdea;
  index: number;
}

export function BriefingCard({ idea, index }: BriefingCardProps) {
  return (
    <motion.div
      className="card-premium"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-display font-bold text-white pr-4">{idea.title}</h3>
          <span className="px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 shrink-0">
            {idea.businessType}
          </span>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-4">{idea.description}</p>

        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-white/5 border border-gold-500/20">
            <p className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1">
              Implementation
            </p>
            <p className="text-gray-300 text-sm">{idea.implementation}</p>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-neon-cyan/20">
            <p className="text-xs font-semibold text-neon-cyan uppercase tracking-wider mb-1">
              Why Bitcoin?
            </p>
            <p className="text-gray-300 text-sm">{idea.whyBitcoin}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
