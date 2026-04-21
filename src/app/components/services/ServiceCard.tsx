'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  priceInSats: number;
  priceLabel: string;
  emoji: string;
  onAction: () => void;
  actionLabel: string;
}

export function ServiceCard({
  title,
  description,
  features,
  priceInSats,
  priceLabel,
  emoji,
  onAction,
  actionLabel,
}: ServiceCardProps) {
  const usdApprox = Math.round(priceInSats * 0.001);

  return (
    <motion.div
      className="card-premium h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="text-4xl mb-4">{emoji}</div>
        <h3 className="text-xl font-display font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>

        <ul className="space-y-2 mb-6 flex-1">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
              <span className="text-neon-cyan mt-0.5 shrink-0">&#x2713;</span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <div className="mb-4 p-3 rounded-xl bg-white/5 border border-gold-500/20">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gradient-gold">
                {priceInSats.toLocaleString()}
              </span>
              <span className="text-gold-400 text-sm">sats</span>
            </div>
            <p className="text-gray-500 text-xs mt-1">
              ~${usdApprox} USD &middot; {priceLabel}
            </p>
          </div>

          <button onClick={onAction} className="w-full btn-neon py-3 text-sm font-semibold">
            {actionLabel}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
