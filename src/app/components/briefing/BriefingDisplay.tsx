'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BriefingCard } from './BriefingCard';
import type { Briefing } from '@/lib/briefing-constants';

interface BriefingDisplayProps {
  briefing: Briefing | null;
  archive: Briefing[];
}

export function BriefingDisplay({ briefing, archive }: BriefingDisplayProps) {
  if (!briefing && archive.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-6">&#x1F4E1;</div>
        <h2 className="text-2xl font-display font-bold text-white mb-3">
          First Briefing Coming Soon
        </h2>
        <p className="text-gray-400 max-w-md mx-auto">
          Daily Bitcoin innovation briefings are generated at 11:00 AM ET.
          Check back soon for the first one!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {briefing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-12 bg-neon-cyan/60 rounded-full shadow-[0_0_10px_rgba(0,194,255,0.3)]" />
            <div>
              <h2 className="heading-section text-white">
                Today&apos;s <span className="text-neon-cyan">Briefing</span>
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {briefing.theme} &middot;{' '}
                {new Date(briefing.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {briefing.ideas.map((idea, i) => (
              <BriefingCard key={idea.title} idea={idea} index={i} />
            ))}
          </div>
        </motion.div>
      )}

      {archive.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-12 bg-gold-500/60 rounded-full" />
            <div>
              <h2 className="heading-section text-white">
                Past <span className="text-gold-400">Briefings</span>
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Archive of previous innovation briefings
              </p>
            </div>
          </div>

          <div className="space-y-12">
            {archive.map((past) => (
              <div key={past.id}>
                <h3 className="text-lg font-display font-semibold text-gray-300 mb-4">
                  {past.theme} &middot;{' '}
                  {new Date(past.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {past.ideas.map((idea, i) => (
                    <BriefingCard key={idea.title} idea={idea} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
