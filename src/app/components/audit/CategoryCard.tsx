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
    <motion.button
      type="button"
      className="audit-category ui-card ui-card-interactive"
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      aria-label={`${category.category}. Score ${category.score}. ${isOpen ? 'Collapse' : 'Expand'} details.`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="audit-category-heading">
        <div>
          <span aria-hidden="true">{category.emoji}</span>
          <h3>{category.category}</h3>
        </div>
        <div className="audit-category-score">
          <strong style={{ color }}>
            {category.score}
          </strong>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="audit-progress">
        <motion.div
          className="audit-progress-value"
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
            <div className="audit-category-actions">
              {category.actions.map((action, i) => {
                const priority = priorityColors[action.priority] || priorityColors.medium;
                return (
                  <div key={i} className="audit-action-row">
                    <span
                      className={`${priority.bg} ${priority.text} audit-priority`}
                    >
                      {priority.label}
                    </span>
                    <div>
                      <p>{action.action}</p>
                      <small>{action.estimatedImpact}</small>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
