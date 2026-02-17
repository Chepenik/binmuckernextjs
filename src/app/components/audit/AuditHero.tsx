'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AuditForm } from './AuditForm';
import { LoadingState } from './LoadingState';
import { AuditResults } from './AuditResults';
import type { AuditFormData, AuditReport, AuditState } from '@/types/audit';

export function AuditHero() {
  const [state, setState] = useState<AuditState>('idle');
  const [report, setReport] = useState<AuditReport | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (data: AuditFormData) => {
    setState('loading');
    setError('');

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Something went wrong');
      }

      setReport(json);
      setState('success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
      setState('error');
    }
  };

  const handleReset = () => {
    setState('idle');
    setReport(null);
    setError('');
  };

  return (
    <section id="audit" className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section header — always visible */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-neon-cyan font-mono text-sm tracking-widest uppercase mb-3">
            Free AI-Powered Analysis
          </p>
          <h1 className="heading-display text-gradient-gold mb-4">
            Local Business Audit
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Get a comprehensive audit of your local business presence in seconds.
            Scored across 5-6 key categories with actionable recommendations.
          </p>
        </motion.div>

        {/* State machine */}
        {state === 'idle' && <AuditForm onSubmit={handleSubmit} />}

        {state === 'loading' && <LoadingState />}

        {state === 'success' && report && (
          <AuditResults report={report} onReset={handleReset} />
        )}

        {state === 'error' && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-laser text-lg mb-4">{error}</p>
            <button onClick={handleReset} className="btn-neon px-6 py-3">
              Try Again
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
