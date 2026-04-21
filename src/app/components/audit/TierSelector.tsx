'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { AuditTier } from '@/types/audit';

interface TierSelectorProps {
  selected: AuditTier;
  onSelect: (tier: AuditTier) => void;
}

const tiers: {
  id: AuditTier;
  name: string;
  price: string;
  description: string;
  badge?: string;
}[] = [
  {
    id: 'free',
    name: 'Free',
    price: '0 sats',
    description: '5-6 category analysis with quick recommendations',
    badge: 'Current',
  },
  {
    id: 'detailed',
    name: 'Detailed',
    price: '5,000 sats',
    description: 'Deep technical SEO crawl + 90-day action plan',
  },
  {
    id: 'competitor',
    name: 'Competitor',
    price: '10,000 sats',
    description: 'Full competitor gap analysis + market positioning',
  },
  {
    id: 'monthly',
    name: 'Monthly',
    price: '25,000 sats',
    description: 'Weekly audits + progress tracking + priority support',
  },
];

export function TierSelector({ selected, onSelect }: TierSelectorProps) {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <p className="text-sm text-gray-400 text-center mb-4">Choose your audit tier</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {tiers.map((tier) => (
          <button
            key={tier.id}
            onClick={() => onSelect(tier.id)}
            className={`relative p-3 rounded-xl border text-left transition-all duration-300 ${
              selected === tier.id
                ? 'border-neon-cyan bg-neon-cyan/10 shadow-[0_0_15px_rgba(0,194,255,0.2)]'
                : 'border-white/10 bg-white/5 hover:border-gold-500/30 hover:bg-white/[0.07]'
            }`}
          >
            {tier.badge && (
              <span className="absolute -top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30">
                {tier.badge}
              </span>
            )}
            <p
              className={`font-semibold text-sm ${
                selected === tier.id ? 'text-neon-cyan' : 'text-white'
              }`}
            >
              {tier.name}
            </p>
            <p className="text-xs text-gold-400 font-mono mt-1">{tier.price}</p>
            <p className="text-[11px] text-gray-500 mt-1 leading-tight">{tier.description}</p>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
