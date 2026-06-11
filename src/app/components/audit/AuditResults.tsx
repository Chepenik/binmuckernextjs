'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { ScoreRing } from './ScoreRing';
import { CategoryCard } from './CategoryCard';
import type { AuditReport } from '@/types/audit';

interface AuditResultsProps {
  report: AuditReport;
  onReset: () => void;
}

export function AuditResults({ report, onReset }: AuditResultsProps) {
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Overall Score */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="hidden sm:block">
            <ScoreRing score={report.overallScore} size={200} />
          </div>
          <div className="block sm:hidden">
            <ScoreRing score={report.overallScore} size={160} />
          </div>
        </div>
        <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
          {report.summary}
        </p>
      </div>

      {/* Category Cards */}
      <div className="space-y-3">
        <h2 className="text-lg font-display font-semibold text-gold-400">Category Breakdown</h2>
        {report.categories.map((cat) => (
          <CategoryCard key={cat.category} category={cat} />
        ))}
      </div>

      {/* Quick Win */}
      <motion.div
        className="glass rounded-2xl p-6 border border-neon-cyan/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Zap size={20} className="text-neon-cyan" />
          <h2 className="text-lg font-display font-semibold text-neon-cyan">Quick Win</h2>
        </div>
        <h3 className="font-semibold text-gray-200 mb-1">{report.quickWin.title}</h3>
        <p className="text-gray-400 text-sm">{report.quickWin.description}</p>
        <p className="text-gray-500 text-xs mt-2 font-mono">
          Est. time: {report.quickWin.timeToImplement}
        </p>
      </motion.div>

      {/* Top 5 Priorities */}
      <motion.div
        className="glass rounded-2xl p-6 border border-gold-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg font-display font-semibold text-gold-400 mb-4">Top 5 Priorities</h2>
        <ol className="space-y-3">
          {report.topPriorities.map((priority, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="font-mono font-bold text-gold-400 text-sm mt-0.5 shrink-0 w-6">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-gray-300 text-sm">{priority}</span>
            </li>
          ))}
        </ol>
      </motion.div>

      {/* Competitive Insight */}
      <motion.div
        className="glass rounded-2xl p-6 border border-gold-400/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-lg font-display font-semibold text-gold-400 mb-3">Competitive Insight</h2>
        <p className="text-gray-400 text-sm leading-relaxed">{report.competitiveInsight}</p>
      </motion.div>

      {/* Book-a-call CTA */}
      <motion.div
        className="glass rounded-2xl p-6 md:p-8 border border-neon-cyan/30 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-lg font-display font-semibold text-neon-cyan mb-2">
          Want me to fix these for you?
        </h2>
        <p className="text-gray-400 text-sm mb-5 max-w-xl mx-auto">
          Book a 30-minute AI SEO strategy call and we&apos;ll turn this audit into a
          prioritized plan you can ship this week. You&apos;ll leave with at least 3
          implementable fixes — guaranteed — and the call fee is fully credited toward any
          retainer.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/book?offer=call"
            className="btn-premium px-8 py-3.5 text-base font-bold inline-block text-center"
          >
            Book a strategy call
          </a>
          <a href="/services" className="btn-neon px-6 py-3 text-sm inline-block">
            See services &amp; pricing
          </a>
        </div>
      </motion.div>

      {/* Reset */}
      <div className="flex justify-center pt-2">
        <button onClick={onReset} className="btn-neon px-6 py-3 text-sm">
          Run New Audit
        </button>
      </div>
    </motion.div>
  );
}
