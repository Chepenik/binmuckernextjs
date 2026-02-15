export type Phase = "inhale" | "hold" | "exhale" | "holdAfterExhale";

export type PatternBadge = "beginner" | "sleep" | "focus" | "energy" | "stress" | "popular";

export type StandardPattern = {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  badges: PatternBadge[];
  type: "standard";
  durations: { inhale: number; hold: number; exhale: number; holdAfterExhale: number };
};

export type SequencePattern = {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  badges: PatternBadge[];
  type: "sequence";
  sequence: number[];
  durations: { holdAfterExhale: number };
};

export type Pattern = StandardPattern | SequencePattern;

export const PATTERNS: Pattern[] = [
  {
    id: "box",
    name: "Box Breathing",
    description: "Equal intervals of inhale, hold, exhale, and hold. Used by Navy SEALs for calm and focus under pressure.",
    shortDescription: "Balance & focus",
    badges: ["beginner", "popular", "focus"],
    type: "standard",
    durations: { inhale: 4, hold: 4, exhale: 4, holdAfterExhale: 4 },
  },
  {
    id: "478",
    name: "4-7-8 Breathing",
    description: "Inhale for 4, hold for 7, exhale for 8. A natural tranquilizer for the nervous system.",
    shortDescription: "Deep relaxation & sleep",
    badges: ["sleep", "stress"],
    type: "standard",
    durations: { inhale: 4, hold: 7, exhale: 8, holdAfterExhale: 0 },
  },
  {
    id: "spiral",
    name: "Spiral Breathing",
    description: "Progressive decreasing breath durations following the Fibonacci sequence. Naturally guides you into deep calm.",
    shortDescription: "Progressive calming",
    badges: ["stress"],
    type: "sequence",
    sequence: [13, 8, 5, 3, 2, 1],
    durations: { holdAfterExhale: 13 },
  },
  {
    id: "wimhof",
    name: "Wim Hof Breath",
    description: "Rapid rhythmic breathing to energize the body and sharpen the mind. Inspired by the Iceman method.",
    shortDescription: "Energy & alertness",
    badges: ["energy"],
    type: "standard",
    durations: { inhale: 2, hold: 0, exhale: 2, holdAfterExhale: 0 },
  },
  {
    id: "triangle",
    name: "Triangle Breath",
    description: "Three equal phases of breathing for a simple, balanced rhythm. Great for beginners.",
    shortDescription: "Simple & calming",
    badges: ["beginner", "stress"],
    type: "standard",
    durations: { inhale: 5, hold: 5, exhale: 5, holdAfterExhale: 0 },
  },
];

export const BADGE_COLORS: Record<PatternBadge, string> = {
  beginner: "bg-green-500/20 text-green-300 border-green-500/30",
  sleep: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  focus: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  energy: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  stress: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  popular: "bg-violet-500/20 text-violet-300 border-violet-500/30",
};

export const PHASE_CONFIG: Record<Phase, { label: string; guidance: string; glowColor: string }> = {
  inhale: { label: "Inhale", guidance: "Breathe in slowly", glowColor: "rgba(59, 130, 246, 0.5)" },
  hold: { label: "Hold", guidance: "Hold gently", glowColor: "rgba(234, 179, 8, 0.5)" },
  exhale: { label: "Exhale", guidance: "Let it all go", glowColor: "rgba(168, 85, 247, 0.5)" },
  holdAfterExhale: { label: "Hold", guidance: "Rest empty", glowColor: "rgba(156, 163, 175, 0.4)" },
};
