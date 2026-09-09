'use client';

import React, { useState } from 'react';
import { Unlock, X } from 'lucide-react';

interface EmailGateProps {
  businessName: string;
  onSkip: () => void;
  onSuccess: () => void;
}

export function EmailGate({ onSkip, onSuccess }: EmailGateProps) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setState('loading');
    setError('');

    try {
      const res = await fetch('/api/audit/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Failed to unlock report');
      }

      // Success - unlock the report in browser
      onSuccess();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
      setState('error');
    }
  };

  return (
    <div className="email-gate-card ui-card">
      <div className="email-gate-icon">
        <Unlock size={24} />
      </div>
      <h3>Unlock the full report</h3>
      <p>
        Drop your email to unlock the complete audit on this page — scores by category,
        what to fix first, and plain-language next steps. No spam. Never sold.
      </p>

      <form onSubmit={handleSubmit} className="email-gate-form">
        <div>
          <label htmlFor="email-gate-input" className="ui-label">
            Email
          </label>
          <input
            type="email"
            id="email-gate-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@business.com"
            className="ui-field"
            required
            disabled={state === 'loading'}
          />
        </div>

        {error && (
          <div className="email-gate-error" role="alert">
            <X size={16} />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!email.trim() || state === 'loading'}
          className="ui-button"
        >
          {state === 'loading' ? 'Unlocking...' : 'Unlock full report'}
        </button>

        <p className="email-gate-microcopy">
          Used only to unlock this report and (if saved) occasional useful updates about local visibility.
          Never sold.
        </p>
      </form>

      <button
        type="button"
        onClick={onSkip}
        className="email-gate-skip"
        disabled={state === 'loading'}
      >
        No thanks — I&apos;ll use the top 3 for now
      </button>
    </div>
  );
}
