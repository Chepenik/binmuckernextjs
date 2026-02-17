'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { getScoreColor } from '@/lib/audit-constants';
import type { CategoryResult } from '@/types/audit';

interface CategoryCardProps {
  category: CategoryResult;
}

const priorityColors: Record<string, { bg: string; text: string; label: string }> = {
  high: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'High' },
  medium: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Medium' },
  low: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Low' },
};

export function CategoryCard({ category }: CategoryCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const color = getScoreColor(category.score);

  return (
    <motion.div
      className="card-premium cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsOpen(!isOpen); } }}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-label={`${category.category} - Score ${category.score}. Click to ${isOpen ? 'collapse' : 'expand'} details.`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{category.emoji}</span>
          <h3 className="font-semibold text-gray-200">{category.category}</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold text-lg" style={{ color }}>
            {category.score}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={20} className="text-gray-500" />
          </motion.div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${category.score}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-3 pt-4 border-t border-gold-500/10">
              {category.actions.map((action, i) => {
                const priority = priorityColors[action.priority] || priorityColors.medium;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className={`${priority.bg} ${priority.text} text-xs font-mono font-semibold px-2 py-0.5 rounded mt-0.5 shrink-0`}
                    >
                      {priority.label}
                    </span>
                    <div>
                      <p className="text-gray-300 text-sm">{action.action}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{action.estimatedImpact}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
