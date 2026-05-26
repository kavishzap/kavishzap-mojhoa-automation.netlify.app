"use client";

import createGlobe, { type COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Gold markers — brand amber (#ffb703) on white dot globe */
const MARKER_GOLD: [number, number, number] = [1, 0.76, 0.15];

const GLOBE_CONFIG: COBEOptions = {
  devicePixelRatio: 2,
  width: 800,
  height: 800,
  phi: 0,
  theta: 0.25,
  dark: 1,
  diffuse: 1.2,
  scale: 1.12,
  mapSamples: 20000,
  mapBrightness: 12,
  mapBaseBrightness: 0,
  baseColor: [0.08, 0.08, 0.1],
  markerColor: MARKER_GOLD,
  glowColor: [1, 1, 1],
  markerElevation: 0.045,
  markers: [
    { location: [-20.3484, 57.5522], size: 0.055 },
    { location: [48.8566, 2.3522], size: 0.048 },
    { location: [40.7128, -74.006], size: 0.048 },
    { location: [51.5074, -0.1278], size: 0.045 },
    { location: [28.6139, 77.209], size: 0.045 },
    { location: [35.6762, 139.6503], size: 0.042 },
    { location: [-33.8688, 151.2093], size: 0.042 },
    { location: [1.3521, 103.8198], size: 0.04 },
    { location: [-23.5505, -46.6333], size: 0.04 },
    { location: [25.2048, 55.2708], size: 0.038 },
  ],
  onRender: () => {},
};

const STARS: Array<[number, number, number]> = [
  [8, 6, 0.35],
  [18, 14, 0.25],
  [32, 8, 0.4],
  [46, 18, 0.3],
  [58, 5, 0.45],
  [71, 12, 0.28],
  [84, 7, 0.38],
  [92, 20, 0.22],
  [14, 24, 0.32],
  [38, 22, 0.26],
  [62, 26, 0.34],
  [76, 16, 0.3],
  [52, 11, 0.2],
  [24, 32, 0.28],
  [88, 28, 0.24],
];

export function HeroStarfield({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      {STARS.map(([left, top, opacity], i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-white"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: i % 3 === 0 ? 2 : 1,
            height: i % 3 === 0 ? 2 : 1,
            opacity,
          }}
        />
      ))}
    </div>
  );
}

export function HeroGlobe3D({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(4.2);
  const widthRef = useRef(0);
  const r = useMotionValue(0);
  const rs = useSpring(r, { mass: 1, stiffness: 280, damping: 40 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setSize = () => {
      widthRef.current = canvas.offsetWidth;
    };

    setSize();
    const observer = new ResizeObserver(setSize);
    observer.observe(canvas);

    const globe = createGlobe(canvas, {
      ...GLOBE_CONFIG,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phiRef.current += 0.003;
        }
        state.phi = phiRef.current + rs.get();
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    });

    return () => {
      globe.destroy();
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn(
        "h-full w-full cursor-grab active:cursor-grabbing [contain:strict]",
        className
      )}
      onPointerDown={(e) => {
        pointerInteracting.current =
          e.clientX - pointerInteractionMovement.current;
        canvasRef.current?.style.setProperty("cursor", "grabbing");
      }}
      onPointerUp={() => {
        pointerInteracting.current = null;
        canvasRef.current?.style.removeProperty("cursor");
      }}
      onPointerOut={() => {
        pointerInteracting.current = null;
        canvasRef.current?.style.removeProperty("cursor");
      }}
      onMouseMove={(e) => {
        if (pointerInteracting.current !== null) {
          const delta = e.clientX - pointerInteracting.current;
          pointerInteractionMovement.current = delta;
          r.set(delta / 200);
        }
      }}
      onTouchMove={(e) => {
        if (pointerInteracting.current !== null && e.touches[0]) {
          const delta = e.touches[0].clientX - pointerInteracting.current;
          pointerInteractionMovement.current = delta;
          r.set(delta / 100);
        }
      }}
    />
  );
}

/** Desktop: upper hemisphere cropped at bottom, stars above */
export function HeroGlobeScene({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden bg-[#07070a]",
        className
      )}
    >
      <HeroStarfield className="z-[1]" />

      <div className="absolute inset-x-0 bottom-0 z-[2] h-[min(62vh,680px)] overflow-hidden max-lg:h-[min(56vh,520px)]">
        <div className="pointer-events-auto absolute bottom-0 left-1/2 aspect-square w-[min(168vw,1040px)] -translate-x-1/2 translate-y-[50%] max-lg:w-[min(185vw,720px)]">
          <HeroGlobe3D />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[42%] bg-gradient-to-b from-[#07070a] via-[#07070a]/92 to-transparent max-lg:h-[48%]" />
    </div>
  );
}
