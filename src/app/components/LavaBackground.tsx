'use client';

import { useEffect, useRef } from 'react';

interface Blob {
  /** center X as fraction of canvas width */
  cx: number;
  cy: number;
  /** radius as fraction of min(w,h) */
  r: number;
  color: [number, number, number];
  /** Lissajous frequencies & phases for organic drift */
  fx: number;
  fy: number;
  px: number;
  py: number;
}

const BLOBS: Blob[] = [
  { cx: 0.25, cy: 0.18, r: 0.42, color: [0, 210, 230],  fx: 0.13, fy: 0.17, px: 0.0, py: 0.5 },   // teal
  { cx: 0.78, cy: 0.22, r: 0.36, color: [150, 50, 230],  fx: 0.11, fy: 0.15, px: 1.2, py: 2.0 },   // violet
  { cx: 0.50, cy: 0.78, r: 0.40, color: [230, 170, 15],  fx: 0.15, fy: 0.12, px: 2.5, py: 1.0 },   // gold
  { cx: 0.18, cy: 0.58, r: 0.34, color: [30, 70, 190],   fx: 0.09, fy: 0.19, px: 3.8, py: 3.0 },   // deep blue
  { cx: 0.72, cy: 0.52, r: 0.32, color: [230, 50, 130],  fx: 0.17, fy: 0.10, px: 5.0, py: 4.0 },   // rose
];

export function LavaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let animId: number;

    // Use DPR of 1 — this is a heavily blurred effect, retina is wasted here
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Throttle to ~30 fps
    let lastFrame = 0;
    const FRAME_MS = 1000 / 30;

    const draw = (now: number) => {
      animId = requestAnimationFrame(draw);

      if (now - lastFrame < FRAME_MS) return;
      lastFrame = now;

      const w = canvas.width;
      const h = canvas.height;
      const dim = Math.min(w, h);

      // Dark base fill
      ctx.fillStyle = '#0A0A0F';
      ctx.fillRect(0, 0, w, h);

      // Time in seconds (frozen if reduced-motion)
      const t = prefersReducedMotion ? 0 : now * 0.001;

      for (const b of BLOBS) {
        // Lissajous drift: smooth organic paths
        const x = (b.cx + 0.16 * Math.sin(t * b.fx + b.px)) * w;
        const y = (b.cy + 0.14 * Math.cos(t * b.fy + b.py)) * h;
        const radius = b.r * dim;

        const [r, g, bb] = b.color;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0,   `rgba(${r},${g},${bb},0.55)`);
        grad.addColorStop(0.25, `rgba(${r},${g},${bb},0.28)`);
        grad.addColorStop(0.55, `rgba(${r},${g},${bb},0.10)`);
        grad.addColorStop(1,   `rgba(${r},${g},${bb},0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, width: '100vw', height: '100vh' }}
      aria-hidden="true"
    />
  );
}
