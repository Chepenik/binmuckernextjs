'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Phase, Pattern } from '../data/patterns';

export interface TimerState {
  isRunning: boolean;
  phase: Phase;
  timeRemaining: number;
  phaseDuration: number;
  cyclesCompleted: number;
  elapsedSeconds: number;
  sequenceIndex: number;
}

function getInitialPhaseDuration(pattern: Pattern): number {
  if (pattern.type === 'standard') {
    return pattern.durations.inhale;
  }
  return pattern.sequence[0];
}

export function useBreathingTimer(pattern: Pattern) {
  const [state, setState] = useState<TimerState>({
    isRunning: false,
    phase: 'inhale',
    timeRemaining: getInitialPhaseDuration(pattern),
    phaseDuration: getInitialPhaseDuration(pattern),
    cyclesCompleted: 0,
    elapsedSeconds: 0,
    sequenceIndex: 0,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onPhaseChangeRef = useRef<((phase: Phase) => void) | null>(null);
  const patternIdRef = useRef(pattern.id);

  // Reset when pattern changes
  useEffect(() => {
    if (patternIdRef.current !== pattern.id) {
      patternIdRef.current = pattern.id;
      if (intervalRef.current) clearInterval(intervalRef.current);
      setState({
        isRunning: false,
        phase: 'inhale',
        timeRemaining: getInitialPhaseDuration(pattern),
        phaseDuration: getInitialPhaseDuration(pattern),
        cyclesCompleted: 0,
        elapsedSeconds: 0,
        sequenceIndex: 0,
      });
    }
  }, [pattern]);

  const setOnPhaseChange = useCallback((cb: (phase: Phase) => void) => {
    onPhaseChangeRef.current = cb;
  }, []);

  const getNextPhaseStandard = useCallback(
    (currentPhase: Phase): { phase: Phase; duration: number; cycleComplete: boolean } => {
      if (pattern.type !== 'standard') throw new Error('Not a standard pattern');
      const d = pattern.durations;

      switch (currentPhase) {
        case 'inhale':
          return d.hold > 0
            ? { phase: 'hold', duration: d.hold, cycleComplete: false }
            : { phase: 'exhale', duration: d.exhale, cycleComplete: false };
        case 'hold':
          return { phase: 'exhale', duration: d.exhale, cycleComplete: false };
        case 'exhale':
          if (d.holdAfterExhale > 0) {
            return { phase: 'holdAfterExhale', duration: d.holdAfterExhale, cycleComplete: false };
          }
          return { phase: 'inhale', duration: d.inhale, cycleComplete: true };
        case 'holdAfterExhale':
          return { phase: 'inhale', duration: d.inhale, cycleComplete: true };
        default:
          return { phase: 'inhale', duration: d.inhale, cycleComplete: false };
      }
    },
    [pattern]
  );

  const getNextPhaseSequence = useCallback(
    (currentPhase: Phase, seqIndex: number): { phase: Phase; duration: number; cycleComplete: boolean; newIndex: number } => {
      if (pattern.type !== 'sequence') throw new Error('Not a sequence pattern');
      const seq = pattern.sequence;

      switch (currentPhase) {
        case 'inhale':
          return { phase: 'exhale', duration: seq[seqIndex], cycleComplete: false, newIndex: seqIndex };
        case 'exhale': {
          const nextIndex = seqIndex + 1;
          if (nextIndex < seq.length) {
            return { phase: 'inhale', duration: seq[nextIndex], cycleComplete: false, newIndex: nextIndex };
          }
          if (pattern.durations.holdAfterExhale > 0) {
            return { phase: 'holdAfterExhale', duration: pattern.durations.holdAfterExhale, cycleComplete: false, newIndex: 0 };
          }
          return { phase: 'inhale', duration: seq[0], cycleComplete: true, newIndex: 0 };
        }
        case 'holdAfterExhale':
          return { phase: 'inhale', duration: seq[0], cycleComplete: true, newIndex: 0 };
        default:
          return { phase: 'inhale', duration: seq[0], cycleComplete: false, newIndex: 0 };
      }
    },
    [pattern]
  );

  const tick = useCallback(() => {
    setState((prev) => {
      if (!prev.isRunning) return prev;

      const newTimeRemaining = prev.timeRemaining - 0.1;
      const newElapsed = prev.elapsedSeconds + 0.1;

      if (newTimeRemaining > 0.05) {
        return { ...prev, timeRemaining: newTimeRemaining, elapsedSeconds: newElapsed };
      }

      // Phase transition
      if (pattern.type === 'standard') {
        const next = getNextPhaseStandard(prev.phase);
        if (onPhaseChangeRef.current) onPhaseChangeRef.current(next.phase);
        return {
          ...prev,
          phase: next.phase,
          timeRemaining: next.duration,
          phaseDuration: next.duration,
          cyclesCompleted: next.cycleComplete ? prev.cyclesCompleted + 1 : prev.cyclesCompleted,
          elapsedSeconds: newElapsed,
        };
      } else {
        const next = getNextPhaseSequence(prev.phase, prev.sequenceIndex);
        if (onPhaseChangeRef.current) onPhaseChangeRef.current(next.phase);
        return {
          ...prev,
          phase: next.phase,
          timeRemaining: next.duration,
          phaseDuration: next.duration,
          cyclesCompleted: next.cycleComplete ? prev.cyclesCompleted + 1 : prev.cyclesCompleted,
          elapsedSeconds: newElapsed,
          sequenceIndex: next.newIndex,
        };
      }
    });
  }, [pattern, getNextPhaseStandard, getNextPhaseSequence]);

  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(tick, 100);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.isRunning, tick]);

  const start = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: true }));
  }, []);

  const stop = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setState({
      isRunning: false,
      phase: 'inhale',
      timeRemaining: getInitialPhaseDuration(pattern),
      phaseDuration: getInitialPhaseDuration(pattern),
      cyclesCompleted: 0,
      elapsedSeconds: 0,
      sequenceIndex: 0,
    });
  }, [pattern]);

  return { state, start, stop, reset, setOnPhaseChange };
}
