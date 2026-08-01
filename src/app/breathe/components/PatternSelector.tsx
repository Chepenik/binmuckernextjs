'use client';

import { Pattern } from '../data/patterns';

interface PatternSelectorProps {
  patterns: Pattern[];
  selected: Pattern;
  onSelect: (pattern: Pattern) => void;
  disabled?: boolean;
}

export default function PatternSelector({ patterns, selected, onSelect, disabled }: PatternSelectorProps) {
  return (
    <div className="pattern-grid">
      {patterns.map((pattern) => {
        const isSelected = pattern.id === selected.id;
        return (
          <button
            key={pattern.id}
            onClick={() => onSelect(pattern)}
            disabled={disabled}
            aria-pressed={isSelected}
            className={`pattern-card ui-card ui-card-interactive ${isSelected ? 'is-selected' : ''}`}
          >
            <strong>{pattern.name}</strong>
            <p>{pattern.shortDescription}</p>
            <div className="pattern-badges">
              {pattern.badges.map((badge) => (
                <span
                  key={badge}
                  className="ui-chip"
                >
                  {badge}
                </span>
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}
