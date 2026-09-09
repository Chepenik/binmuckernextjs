'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Check, X } from 'lucide-react';

interface EmailGateProps {
  businessName: string;
  onSkip: () => void;
  onSuccess: () => void;
}

export function EmailGate({ onSkip, onSuccess }: EmailGateProps) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
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
        throw new Error(json.error || 'Failed to send report');
      }

      setState('success');
      onSuccess();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="email-gate-card ui-card">
        <div className="email-gate-success">
          <div className="email-gate-icon email-gate-icon-success">
            <Check size={24} />
          </div>
          <h3>Sent.</h3>
          <p>
            Check <strong>{email}</strong> for the full report.
          </p>
          <p className="email-gate-stack-link">
            Tools I actually use when I build sites →{' '}
            <Link 
              href="/stack?utm_source=binmucker&utm_medium=referral&utm_campaign=audit_results"
              className="ui-text-link"
            >
              My Stack
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="email-gate-card ui-card">
      <div className="email-gate-icon">
        <Mail size={24} />
      </div>
      <h3>Get the full report</h3>
      <p>
        Drop your email and I&apos;ll send the complete audit — scores by category,
        what to fix first, and plain-language next steps. No spam. Unsubscribe anytime.
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
          {state === 'loading' ? 'Sending...' : 'Send me the full report'}
        </button>

        <p className="email-gate-microcopy">
          Used only for this report and occasional useful updates about local visibility.
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
