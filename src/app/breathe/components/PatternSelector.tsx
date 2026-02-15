'use client';

import { Pattern, BADGE_COLORS } from '../data/patterns';

interface PatternSelectorProps {
  patterns: Pattern[];
  selected: Pattern;
  onSelect: (pattern: Pattern) => void;
  disabled?: boolean;
}

export default function PatternSelector({ patterns, selected, onSelect, disabled }: PatternSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {patterns.map((pattern) => {
        const isSelected = pattern.id === selected.id;
        return (
          <button
            key={pattern.id}
            onClick={() => onSelect(pattern)}
            disabled={disabled}
            aria-pressed={isSelected}
            className={`text-left p-4 rounded-xl border transition-all duration-200
                       ${isSelected
                         ? 'border-violet-500 ring-2 ring-violet-500/40 bg-violet-500/10'
                         : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                       }
                       ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                       `}
          >
            <div className="font-semibold text-white mb-1">{pattern.name}</div>
            <div className="text-sm text-gray-400 mb-2">{pattern.shortDescription}</div>
            <div className="flex flex-wrap gap-1.5">
              {pattern.badges.map((badge) => (
                <span
                  key={badge}
                  className={`text-xs px-2 py-0.5 rounded-full border ${BADGE_COLORS[badge]}`}
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
