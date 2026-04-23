'use client';

import { useEffect, useRef } from 'react';

type TrailPoint = {
  x: number;
  y: number;
  life: number;
  hue: number;
};

type Confetto = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  gravity: number;
  rot: number;
  vr: number;
  size: number;
  hue: number;
  shape: 'rect' | 'circle' | 'tri';
  life: number;
  maxLife: number;
};

export default function RainbowCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const hasFinePointer =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(pointer: fine)').matches;

    const trail: TrailPoint[] = [];
    const confetti: Confetto[] = [];
    let mouseX = width / 2;
    let mouseY = height / 2;
    let hasMoved = false;
    let globalHue = 0;

    const addTrail = (x: number, y: number) => {
      trail.push({ x, y, life: 1, hue: globalHue });
      if (trail.length > 40) trail.shift();
    };

    const spawnConfetti = (x: number, y: number, count = 40) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 7;
        const shapes: Confetto['shape'][] = ['rect', 'circle', 'tri'];
        confetti.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3,
          gravity: 0.18 + Math.random() * 0.12,
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.4,
          size: 6 + Math.random() * 8,
          hue: Math.floor(Math.random() * 360),
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          life: 0,
          maxLife: 70 + Math.random() * 40,
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      hasMoved = true;
      addTrail(mouseX, mouseY);
    };

    const onClick = (e: MouseEvent) => {
      spawnConfetti(e.clientX, e.clientY, 45);
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      spawnConfetti(t.clientX, t.clientY, 35);
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      mouseX = t.clientX;
      mouseY = t.clientY;
      hasMoved = true;
      addTrail(mouseX, mouseY);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('click', onClick, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('resize', resize);

    let raf = 0;
    const tick = () => {
      globalHue = (globalHue + 3) % 360;
      ctx.clearRect(0, 0, width, height);

      // Rainbow neon trail
      if (hasFinePointer && hasMoved && trail.length > 1) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        for (let i = 1; i < trail.length; i++) {
          const p0 = trail[i - 1];
          const p1 = trail[i];
          const t = i / trail.length;
          const alpha = t;
          const lineWidth = 2 + t * 10;
          const hue = (p1.hue + i * 8) % 360;

          ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${alpha})`;
          ctx.shadowColor = `hsl(${hue}, 100%, 55%)`;
          ctx.shadowBlur = 18;
          ctx.lineCap = 'round';
          ctx.lineWidth = lineWidth;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }

        // Glowing cursor head
        const head = trail[trail.length - 1];
        const pulse = 10 + Math.sin(performance.now() / 120) * 3;
        const grad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, pulse * 2.5);
        grad.addColorStop(0, `hsla(${globalHue}, 100%, 75%, 1)`);
        grad.addColorStop(0.4, `hsla(${(globalHue + 60) % 360}, 100%, 60%, 0.7)`);
        grad.addColorStop(1, `hsla(${(globalHue + 120) % 360}, 100%, 50%, 0)`);
        ctx.fillStyle = grad;
        ctx.shadowColor = `hsl(${globalHue}, 100%, 60%)`;
        ctx.shadowBlur = 30;
        ctx.beginPath();
        ctx.arc(head.x, head.y, pulse * 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Decay trail
        for (let i = 0; i < trail.length; i++) {
          trail[i].life -= 0.04;
        }
        while (trail.length && trail[0].life <= 0) trail.shift();
      }

      // Confetti
      if (confetti.length) {
        ctx.save();
        for (let i = confetti.length - 1; i >= 0; i--) {
          const c = confetti[i];
          c.vy += c.gravity;
          c.vx *= 0.995;
          c.x += c.vx;
          c.y += c.vy;
          c.rot += c.vr;
          c.life += 1;

          const alpha = Math.max(0, 1 - c.life / c.maxLife);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = `hsl(${c.hue}, 100%, 60%)`;
          ctx.shadowColor = `hsl(${c.hue}, 100%, 55%)`;
          ctx.shadowBlur = 8;

          ctx.translate(c.x, c.y);
          ctx.rotate(c.rot);
          if (c.shape === 'rect') {
            ctx.fillRect(-c.size / 2, -c.size / 3, c.size, c.size / 1.5);
          } else if (c.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, c.size / 2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.moveTo(0, -c.size / 2);
            ctx.lineTo(c.size / 2, c.size / 2);
            ctx.lineTo(-c.size / 2, c.size / 2);
            ctx.closePath();
            ctx.fill();
          }
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

          if (c.life >= c.maxLife || c.y > height + 60) {
            confetti.splice(i, 1);
          }
        }
        ctx.globalAlpha = 1;
        ctx.restore();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
