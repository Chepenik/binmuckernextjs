'use client';

import React, { useState } from 'react';
import { ScoreRing } from './ScoreRing';
import { EmailGate } from './EmailGate';
import { CategoryCard } from './CategoryCard';
import type { AuditReport, ActionItem } from '@/types/audit';

interface AuditResultsProps {
  report: AuditReport;
  onReset: () => void;
  businessName: string;
}

export function AuditResults({ report, onReset, businessName }: AuditResultsProps) {
  const [showFullReport, setShowFullReport] = useState(false);
  const [gateSkipped, setGateSkipped] = useState(false);

  // Extract top 3 high-priority actions from all categories
  const getTopThreeFixes = (): ActionItem[] => {
    const allHighPriority: ActionItem[] = [];
    
    report.categories.forEach((cat) => {
      cat.actions.forEach((action) => {
        if (action.priority === 'high') {
          allHighPriority.push(action);
        }
      });
    });

    // Return first 3, or pad with medium priority if needed
    const topThree = allHighPriority.slice(0, 3);
    
    if (topThree.length < 3) {
      report.categories.forEach((cat) => {
        cat.actions.forEach((action) => {
          if (action.priority === 'medium' && topThree.length < 3) {
            topThree.push(action);
          }
        });
      });
    }

    return topThree.slice(0, 3);
  };

  const topThreeFixes = getTopThreeFixes();

  return (
    <div className="audit-results">
      {/* Always visible: Overall Score + Summary */}
      <div className="text-center">
        <h2 className="audit-score-headline">Your score: {report.overallScore}/100</h2>
        <p className="audit-score-sub">
          Here&apos;s what matters most for {businessName}.
        </p>
        <div className="flex justify-center my-6">
          <div className="hidden sm:block">
            <ScoreRing score={report.overallScore} size={200} />
          </div>
          <div className="block sm:hidden">
            <ScoreRing score={report.overallScore} size={160} />
          </div>
        </div>
      </div>

      {/* Always visible: Top 3 Fixes (Free) */}
      <section className="audit-result-section">
        <h2>Top 3 fixes (free)</h2>
        <ol className="audit-top-fixes">
          {topThreeFixes.map((fix, i) => (
            <li key={i} className="ui-card">
              <div className="audit-fix-number">{i + 1}</div>
              <div className="audit-fix-content">
                <h3>{fix.action}</h3>
                <p>{fix.estimatedImpact}</p>
                <span className={`audit-priority-badge audit-priority-${fix.priority}`}>
                  {fix.priority} priority
                </span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Bridge copy */}
      {!showFullReport && !gateSkipped && (
        <div className="audit-bridge">
          <p>
            Want the full breakdown — every category, ranked fixes, and a simple order of operations?
          </p>
        </div>
      )}

      {/* Email Gate (shown unless full report unlocked or skipped) */}
      {!showFullReport && !gateSkipped && (
        <EmailGate
          businessName={businessName}
          onSkip={() => setGateSkipped(true)}
          onSuccess={() => setShowFullReport(true)}
        />
      )}

      {/* Full Report (shown after email submitted or gate skipped) */}
      {(showFullReport || gateSkipped) && (
        <>
          {/* Unlocked header */}
          {showFullReport && (
            <div className="audit-unlocked-header">
              <h2>Full report unlocked</h2>
            </div>
          )}

          {/* Category Cards */}
          <section className="audit-result-section">
            <h2>Category breakdown</h2>
            {report.categories.map((cat) => (
              <CategoryCard key={cat.category} category={cat} />
            ))}
          </section>

          {/* Top Priorities (full list) */}
          <section className="audit-result-card ui-card">
            <h2>Order of operations</h2>
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

          {/* Stack footer */}
          {showFullReport && (
            <div className="audit-stack-footer">
              <p>
                Tools I actually use when I build sites →{' '}
                <a 
                  href="/stack?utm_source=binmucker&utm_medium=referral&utm_campaign=audit_results"
                  className="ui-text-link"
                >
                  My Stack
                </a>
              </p>
            </div>
          )}
        </>
      )}

      {/* Reset */}
      <div className="audit-reset">
        <button onClick={onReset} className="ui-button-secondary">
          Run New Audit
        </button>
      </div>
    </div>
  );
}
