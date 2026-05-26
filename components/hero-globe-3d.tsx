"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function HeroGlobe3D({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const setSize = () => {
      width = Math.max(container.offsetWidth, 280);
    };

    setSize();

    const observer = new ResizeObserver(setSize);
    observer.observe(container);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.28,
      dark: 1,
      diffuse: 1.1,
      mapSamples: 16000,
      mapBrightness: 4,
      baseColor: [0.12, 0.12, 0.14],
      markerColor: [1, 0.45, 0.05],
      glowColor: [1, 0.72, 0.05],
      markers: [{ location: [-20.3484, 57.5522], size: 0.08 }],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.0035;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} aria-hidden className={cn("h-full w-full", className)}>
      <canvas ref={canvasRef} className="h-full w-full [contain:strict]" />
    </div>
  );
}
