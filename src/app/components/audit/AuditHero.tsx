'use client';

import React, { useState } from 'react';
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
    <section id="audit">
      <div className="site-shell route-main audit-shell">
        {/* Section header — always visible */}
        <header className="route-hero route-hero-centered audit-hero">
          <p className="route-eyebrow">Free tool · no signup</p>
          <h1 className="route-title">See how discoverable your business really is.</h1>
          <p className="route-lede">
            Review local search, reputation, content, technical SEO, and AI readiness. Get a clear score and a prioritized next move.
          </p>
        </header>

        {/* State machine */}
        {state === 'idle' && <AuditForm onSubmit={handleSubmit} />}

        {state === 'loading' && <LoadingState />}

        {state === 'success' && report && (
          <AuditResults report={report} onReset={handleReset} />
        )}

        {state === 'error' && (
          <div className="audit-error" role="alert">
            <p>{error}</p>
            <button onClick={handleReset} className="ui-button-secondary">
              Try Again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
