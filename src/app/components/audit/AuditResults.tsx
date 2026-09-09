'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Coffee, Share2, Zap } from 'lucide-react';
import { ScoreRing } from './ScoreRing';
import { CategoryCard } from './CategoryCard';
import type { AuditReport } from '@/types/audit';

interface AuditResultsProps {
  report: AuditReport;
  onReset: () => void;
}

export function AuditResults({ report, onReset }: AuditResultsProps) {
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'shared'>('idle');

  async function handleShare() {
    const shareData = {
      title: 'My Business SEO Audit Results',
      text: `I scored ${report.overallScore}/100 on my local SEO audit. Check out this free tool from Binmucker!`,
      url: 'https://binmucker.com/audit',
    };

    // Try native share first (mobile)
    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        setShareStatus('shared');
        setTimeout(() => setShareStatus('idle'), 3000);
        return;
      } catch (err) {
        // User cancelled or share failed, fall through to clipboard
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(`I scored ${report.overallScore}/100 on my local SEO audit! Free tool: https://binmucker.com/audit`);
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 3000);
    } catch (err) {
      console.error('Share failed:', err);
    }
  }

  return (
    <div className="audit-results">
      {/* Overall Score */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="hidden sm:block">
            <ScoreRing score={report.overallScore} size={200} />
          </div>
          <div className="block sm:hidden">
            <ScoreRing score={report.overallScore} size={160} />
          </div>
        </div>
        <p className="audit-summary">
          {report.summary}
        </p>
      </div>

      {/* Category Cards */}
      <section className="audit-result-section">
        <h2>Category breakdown</h2>
        {report.categories.map((cat) => (
          <CategoryCard key={cat.category} category={cat} />
        ))}
      </section>

      {/* Quick Win */}
      <section className="audit-result-card ui-card">
        <div className="audit-result-card-heading">
          <Zap size={19} aria-hidden="true" />
          <h2>Quick win</h2>
        </div>
        <h3>{report.quickWin.title}</h3>
        <p>{report.quickWin.description}</p>
        <small>
          Est. time: {report.quickWin.timeToImplement}
        </small>
      </section>

      {/* Top 5 Priorities */}
      <section className="audit-result-card ui-card">
        <h2>Top five priorities</h2>
        <ol className="audit-priorities">
          {report.topPriorities.map((priority, i) => (
            <li key={i}>
              <span>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p>{priority}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Competitive Insight */}
      <section className="audit-result-card ui-card">
        <h2>Competitive insight</h2>
        <p>{report.competitiveInsight}</p>
      </section>

      {/* Soft Close - Next Steps */}
      <section className="audit-next-steps">
        <div className="audit-next-steps-header">
          <h2>This tool helped?</h2>
          <p>Share it with someone who needs it, or support the next useful thing.</p>
        </div>
        <div className="audit-next-steps-actions">
          <button 
            type="button" 
            onClick={handleShare}
            className="audit-action-button audit-action-share"
          >
            <Share2 size={18} />
            <span>
              {shareStatus === 'copied' ? 'Link copied!' : shareStatus === 'shared' ? 'Thanks for sharing!' : 'Share this tool'}
            </span>
          </button>
          <a
            href="https://ko-fi.com/chepenik"
            target="_blank"
            rel="noopener noreferrer"
            className="audit-action-button audit-action-support"
          >
            <Coffee size={18} />
            <span>Buy me a coffee</span>
            <ArrowUpRight size={15} />
          </a>
          <a
            href="/#directory"
            className="audit-action-button audit-action-explore"
          >
            <span>Explore more tools</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      </section>

      {/* Reset */}
      <div className="audit-reset">
        <button onClick={onReset} className="ui-button-secondary">
          Run New Audit
        </button>
      </div>
    </div>
  );
}
