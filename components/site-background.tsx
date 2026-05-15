"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
};

export function SiteBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches,
    []
  );

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.5 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const particles: Particle[] = [];
    const count = prefersReducedMotion ? 24 : 70;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 0.6 + Math.random() * 1.6,
        a: 0.18 + Math.random() * 0.25,
      });
    }

    let raf = 0;
    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      // subtle vignette (keep it light so the site doesn't feel crushed)
      const v = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.75);
      v.addColorStop(0, "rgba(0,0,0,0)");
      v.addColorStop(1, "rgba(0,0,0,0.38)");
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, w, h);

      // particles + connections
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 183, 3, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]!;
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 120 * 120) {
            const a = (1 - Math.sqrt(d2) / 120) * 0.08;
            ctx.strokeStyle = `rgba(251, 86, 7, ${a})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />

      {/* glow blobs (mouse parallax) */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-60"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,183,3,0.35),transparent_60%),radial-gradient(circle_at_70%_65%,rgba(251,86,7,0.28),transparent_55%),radial-gradient(circle_at_40%_80%,rgba(255,0,80,0.12),transparent_60%)]" />
      </motion.div>

      <div className="absolute -bottom-56 -left-56 h-[620px] w-[620px] rounded-full blur-3xl opacity-55">
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(251,86,7,0.22),transparent_55%),radial-gradient(circle_at_70%_65%,rgba(255,183,3,0.18),transparent_60%),radial-gradient(circle_at_50%_80%,rgba(255,0,80,0.10),transparent_65%)]" />
      </div>

      {/* faint grid */}
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:72px_72px]" />
      {/* noise */}
      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay bg-[url('/noise.svg')] bg-repeat" />
    </div>
  );
}
