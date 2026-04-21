'use client';

import React, { useEffect, useState } from 'react';
import { BriefingDisplay } from '@/app/components/briefing/BriefingDisplay';
import type { Briefing } from '@/lib/briefing-constants';

export function BriefingPageClient() {
  const [briefings, setBriefings] = useState<Briefing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBriefings() {
      try {
        const res = await fetch('/api/briefing');
        const data = await res.json();
        setBriefings(data.briefings || []);
      } catch {
        // Silently handle — will show empty state
      } finally {
        setLoading(false);
      }
    }
    fetchBriefings();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block w-8 h-8 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin" />
        <p className="text-gray-500 mt-4 text-sm">Loading briefings...</p>
      </div>
    );
  }

  const today = new Date().toISOString().split('T')[0];
  const todaysBriefing = briefings.find((b) => b.date === today) || briefings[0] || null;
  const archive = briefings.filter((b) => b !== todaysBriefing);

  return <BriefingDisplay briefing={todaysBriefing} archive={archive} />;
}
