'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Blob {
  cx: number;
  cy: number;
  r: number;
  color: [number, number, number];
  fx1: number; fy1: number;
  fx2: number; fy2: number;
  px1: number; py1: number;
  px2: number; py2: number;
  amp1: number; amp2: number;
  breatheAmp: number;
  breatheFreq: number;
  phase: number;
  peakAlpha: number;
}

// ── 2025–26 neon/cyberpunk palette ──
// strong separation, glow-friendly, dark bg pop
const BLOBS: Blob[] = [
  { cx: 0.22, cy: 0.18, r: 0.54, color: [0, 245, 255],   fx1:0.08,fy1:0.10, fx2:0.025,fy2:0.035, px1:0.0,py1:0.5, px2:2.1,py2:3.4, amp1:0.13,amp2:0.07, breatheAmp:0.09, breatheFreq:0.48, phase:0.0,  peakAlpha:0.48 },
  { cx: 0.78, cy: 0.24, r: 0.46, color: [255, 40, 220],  fx1:0.07,fy1:0.09, fx2:0.022,fy2:0.032, px1:1.4,py1:2.3, px2:4.3,py2:0.9, amp1:0.11,amp2:0.06, breatheAmp:0.07, breatheFreq:0.41, phase:1.6,  peakAlpha:0.52 },
  { cx: 0.48, cy: 0.78, r: 0.49, color: [50, 255, 180],  fx1:0.09,fy1:0.06, fx2:0.028,fy2:0.019, px1:2.8,py1:1.0, px2:5.4,py2:2.6, amp1:0.12,amp2:0.08, breatheAmp:0.10, breatheFreq:0.54, phase:3.1,  peakAlpha:0.47 },
  { cx: 0.16, cy: 0.64, r: 0.38, color: [140, 80, 255],  fx1:0.06,fy1:0.12, fx2:0.020,fy2:0.036, px1:3.9,py1:3.1, px2:0.5,py2:5.3, amp1:0.10,amp2:0.06, breatheAmp:0.07, breatheFreq:0.43, phase:4.3,  peakAlpha:0.45 },
  { cx: 0.72, cy: 0.58, r: 0.37, color: [255, 90, 130],  fx1:0.10,fy1:0.06, fx2:0.032,fy2:0.015, px1:5.2,py1:4.2, px2:2.4,py2:1.3, amp1:0.11,amp2:0.07, breatheAmp:0.08, breatheFreq:0.50, phase:5.5,  peakAlpha:0.49 },

  // accents — brighter, lower alpha
  { cx: 0.38, cy: 0.42, r: 0.24, color: [0, 255, 200],   fx1:0.12,fy1:0.08, fx2:0.040,fy2:0.024, px1:1.1,py1:3.5, px2:4.9,py2:1.8, amp1:0.15,amp2:0.09, breatheAmp:0.11, breatheFreq:0.62, phase:0.9,  peakAlpha:0.32 },
  { cx: 0.64, cy: 0.36, r: 0.21, color: [220, 60, 255],  fx1:0.11,fy1:0.14, fx2:0.034,fy2:0.044, px1:2.3,py1:5.7, px2:1.0,py2:4.0, amp1:0.14,amp2:0.08, breatheAmp:0.10, breatheFreq:0.58, phase:3.8,  peakAlpha:0.28 },
];

const GRAIN_SIZE = 256;
const GRAIN_ALPHA = 0.36;
const BLOOM_LARGE = 0.042;   // × min-dimension
const BLOOM_SMALL = 0.012;
const BLOOM_LARGE_ALPHA = 0.52;
const BLOOM_SMALL_ALPHA = 0.68;
const VIGNETTE_MAX = 0.48;
const SWEEP_SPEED = 0.11;
const SWEEP_WIDTH = 0.25;
const SWEEP_ALPHA = 0.040;

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function createGrainCanvas(size = GRAIN_SIZE) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  const img = g.createImageData(size, size);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const v = (Math.random() * 255) | 0;
    d[i] = d[i+1] = d[i+2] = v;
    d[i+3] = 255; // we'll modulate alpha later
  }
  g.putImageData(img, 0, 0);
  return c;
}

interface LavaBackgroundProps {
  className?: string;
}

export function LavaBackground({ className = '' }: LavaBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const offCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const grainPatternRef = useRef<CanvasPattern | null>(null);

  const pointerRef = useRef({ x: 0, y: 0 });
  const smoothPointerRef = useRef({ x: 0, y: 0 });
  const grainOffsetRef = useRef({ x: 0, y: 0 });

  const onPointerMove = useCallback((e: PointerEvent) => {
    pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let running = true;
    let animId = 0;
    let lastFrame = 0;
    const fpsThrottle = 1000 / 36; // slightly smoother than 30

    const resize = () => {
      const dpr = clamp(window.devicePixelRatio || 1, 1, 1.5);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);

      canvas.width = w;
      canvas.height = h;
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // low-res buffer ~60–70% — good quality/performance balance
      const scale = 0.68;
      const ow = Math.max(4, Math.floor(window.innerWidth  * scale));
      const oh = Math.max(4, Math.floor(window.innerHeight * scale));

      const off = document.createElement('canvas');
      off.width = ow; off.height = oh;
      offCtxRef.current = off.getContext('2d', { alpha: true })!;
      offscreenRef.current = off;

      // one-time grain pattern
      if (!grainPatternRef.current) {
        const grain = createGrainCanvas();
        grainPatternRef.current = ctx.createPattern(grain, 'repeat')!;
      }
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onVisChange = () => {
      running = document.visibilityState === 'visible';
      if (running) {
        lastFrame = performance.now();
        animId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVisChange);

    const draw = (now: number) => {
      if (!running) return;
      animId = requestAnimationFrame(draw);

      if (now - lastFrame < fpsThrottle) return;
      lastFrame = now;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const dim = Math.min(w, h);
      const t = reducedMotion ? 0 : now * 0.00096; // slightly slower feel

      // smooth pointer influence
      const sp = smoothPointerRef.current;
      const pp = pointerRef.current;
      sp.x += (pp.x - sp.x) * 0.045;
      sp.y += (pp.y - sp.y) * 0.045;
      const influence = 0.038; // was 0.03 — tiny bit stronger

      // background — deeper indigo hint
      ctx.globalCompositeOperation = 'source-over';
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0,   '#0a0015');
      bg.addColorStop(0.5, '#05000f');
      bg.addColorStop(1,   '#03000a');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const off = offscreenRef.current!;
      const offCtx = offCtxRef.current!;
      offCtx.clearRect(0, 0, off.width, off.height);

      // slight pre-darkening for richer blend
      offCtx.fillStyle = 'rgba(0,0,0,0.10)';
      offCtx.fillRect(0, 0, off.width, off.height);

      offCtx.globalCompositeOperation = 'screen';

      for (const b of BLOBS) {
        const driftX = b.amp1 * Math.sin(t * b.fx1 + b.px1) + b.amp2 * Math.sin(t * b.fx2 + b.px2);
        const driftY = b.amp1 * Math.cos(t * b.fy1 + b.py1) + b.amp2 * Math.cos(t * b.fy2 + b.py2);

        const breathe = reducedMotion ? 1 :
          1 + b.breatheAmp * Math.sin(t * b.breatheFreq + b.phase) *
              (0.74 + 0.26 * Math.sin(t * b.breatheFreq * 0.4 + b.phase * 2.2));

        const x = (b.cx + driftX + sp.x * influence) * off.width;
        const y = (b.cy + driftY + sp.y * influence) * off.height;
        const radius = b.r * Math.min(off.width, off.height) * breathe;

        const [cr, cg, cb] = b.color;
        const a = b.peakAlpha;

        const grad = offCtx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0.00, `rgba(${cr},${cg},${cb},${a})`);
        grad.addColorStop(0.16, `rgba(${cr},${cg},${cb},${a * 0.58})`);
        grad.addColorStop(0.45, `rgba(${cr},${cg},${cb},${a * 0.20})`);
        grad.addColorStop(0.75, `rgba(${cr},${cg},${cb},${a * 0.06})`);
        grad.addColorStop(1.00, `rgba(${cr},${cg},${cb},0)`);

        offCtx.fillStyle = grad;
        offCtx.fillRect(0, 0, off.width, off.height);
      }

      // ── render back to main canvas ──
      ctx.globalCompositeOperation = 'screen';

      // large soft bloom
      ctx.save();
      ctx.filter = `blur(${BLOOM_LARGE * dim}px)`;
      ctx.globalAlpha = BLOOM_LARGE_ALPHA;
      ctx.drawImage(off, 0, 0, w, h);
      ctx.restore();

      // sharper core glow
      ctx.save();
      ctx.filter = `blur(${BLOOM_SMALL * dim}px)`;
      ctx.globalAlpha = BLOOM_SMALL_ALPHA;
      ctx.drawImage(off, 0, 0, w, h);
      ctx.restore();

      // gentle light sweep
      ctx.globalCompositeOperation = 'screen';
      const s = 0.5 + 0.5 * Math.sin(t * SWEEP_SPEED);
      const sweep = ctx.createLinearGradient(-w * 0.3, -h * 0.3, w * 1.4, h * 1.4);
      sweep.addColorStop(clamp(s - SWEEP_WIDTH, 0, 1), 'rgba(255,255,255,0)');
      sweep.addColorStop(clamp(s,               0, 1), `rgba(255,255,255,${SWEEP_ALPHA})`);
      sweep.addColorStop(clamp(s + SWEEP_WIDTH, 0, 1), 'rgba(255,255,255,0)');
      ctx.fillStyle = sweep;
      ctx.fillRect(0, 0, w, h);

      // softer vignette
      ctx.globalCompositeOperation = 'multiply';
      const vig = ctx.createRadialGradient(w*0.5, h*0.5, dim*0.18, w*0.5, h*0.5, dim*0.92);
      vig.addColorStop(0.00, 'rgba(0,0,0,0)');
      vig.addColorStop(0.70, 'rgba(0,0,0,0.12)');
      vig.addColorStop(1.00, `rgba(0,0,0,${VIGNETTE_MAX})`);
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      // animated grain — slow drift instead of per-frame random
      const pat = grainPatternRef.current;
      if (pat) {
        grainOffsetRef.current.x += 0.14;
        grainOffsetRef.current.y += 0.09;
        if (grainOffsetRef.current.x > GRAIN_SIZE) grainOffsetRef.current.x -= GRAIN_SIZE;
        if (grainOffsetRef.current.y > GRAIN_SIZE) grainOffsetRef.current.y -= GRAIN_SIZE;

        ctx.globalCompositeOperation = 'overlay';
        ctx.globalAlpha = GRAIN_ALPHA;
        ctx.save();
        ctx.translate(grainOffsetRef.current.x, grainOffsetRef.current.y);
        ctx.fillStyle = pat;
        ctx.fillRect(-grainOffsetRef.current.x, -grainOffsetRef.current.y, w + GRAIN_SIZE, h + GRAIN_SIZE);
        ctx.restore();
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.filter = 'none';
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisChange);
    };
  }, [onPointerMove]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
}