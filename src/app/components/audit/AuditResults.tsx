'use client';

import React from 'react';
import { Zap } from 'lucide-react';
import { ScoreRing } from './ScoreRing';
import { CategoryCard } from './CategoryCard';
import type { AuditReport } from '@/types/audit';

interface AuditResultsProps {
  report: AuditReport;
  onReset: () => void;
}

export function AuditResults({ report, onReset }: AuditResultsProps) {
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

      {/* Reset */}
      <div className="audit-reset">
        <button onClick={onReset} className="ui-button-secondary">
          Run New Audit
        </button>
      </div>
    </div>
  );
}
