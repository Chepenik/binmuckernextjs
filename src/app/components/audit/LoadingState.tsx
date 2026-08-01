'use client';

import { useEffect, useState } from 'react';
import { LOADING_PHASES } from '@/lib/audit-constants';

export function LoadingState() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPhase((current) => (current + 1) % LOADING_PHASES.length);
    }, 8000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="audit-loading" role="status" aria-live="polite">
      <span className="audit-spinner" aria-hidden="true" />
      <p>{LOADING_PHASES[phase]}</p>
      <small>Usually 90–120 seconds. Keep this tab open.</small>
    </div>
  );
}
