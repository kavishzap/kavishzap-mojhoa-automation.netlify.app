"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Bot,
  Building2,
  CalendarDays,
  ChevronDown,
  Cpu,
  Database,
  ExternalLink,
  Layers,
  MonitorSmartphone,
  ShoppingCart,
  Wand2,
} from "lucide-react";
import Logo from "@/assets/mojhoa_whiteMO.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Stat = { label: string; value: number; suffix?: string };
type Service = { title: string; desc: string; icon: React.ElementType; tag: string };
type Industry = { title: string; blurb: string };
type Project = { name: string; desc: string; stack: string[]; href: string; image?: string };

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  topBlend = false,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  topBlend?: boolean;
}) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28", className)}>
      {topBlend ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-px h-20 bg-gradient-to-b from-[#07070a] to-transparent"
        />
      ) : null}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10">
          <div className="max-w-2xl">
            {eyebrow ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300/80" />
                <span className="tracking-wide">{eyebrow}</span>
              </div>
            ) : null}
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-3 text-base leading-relaxed text-white/70 md:text-lg">
                {subtitle}
              </p>
            ) : null}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StatCounter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 900;
    const from = 0;
    const to = stat.value;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.value]);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
    >
      <div className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
        <span className="bg-[linear-gradient(135deg,rgba(255,183,3,1),rgba(251,86,7,1))] bg-clip-text text-transparent">
          {val}
          {stat.suffix ?? ""}
        </span>
      </div>
      <div className="mt-2 text-sm text-white/65">{stat.label}</div>
    </div>
  );
}

function GlowCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_80px_rgba(0,0,0,0.55)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-24 bg-[radial-gradient(circle_at_30%_30%,rgba(255,183,3,0.22),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(251,86,7,0.18),transparent_60%)] blur-2xl" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const smoothY1 = useSpring(y1, { stiffness: 90, damping: 18, mass: 0.6 });
  const smoothY2 = useSpring(y2, { stiffness: 90, damping: 18, mass: 0.6 });

  return (
    <section id="home" className="relative overflow-hidden pt-24 md:pt-28">
      <div ref={ref} className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-7rem)] items-center gap-10 lg:grid-cols-12">
          {/* LEFT: keep clean for readability */}
          <div className="relative z-10 lg:col-span-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
                <Wand2 className="h-3.5 w-3.5 text-amber-300/80" />
                <span className="tracking-wide">
                  Premium AI automation & enterprise software in Mauritius
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
                We Build{" "}
                <span className="bg-[linear-gradient(135deg,rgba(255,183,3,1),rgba(251,86,7,1))] bg-clip-text text-transparent">
                  Smart Business Systems
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/70 md:text-lg">
                ERP modules, AI automation, booking platforms, POS systems, and premium
                brand experiences, engineered to help modern teams scale with clarity and control.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-6 flex justify-center sm:justify-start">
                <Image
                  src={Logo}
                  alt="Mojhoa Automations Logo"
                  className="h-auto w-28 opacity-95 drop-shadow-[0_18px_60px_rgba(251,86,7,0.25)] sm:w-24 md:w-28"
                  priority
                />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="group relative overflow-hidden rounded-xl border-0 bg-[linear-gradient(135deg,#ffb703_0%,#fb5607_55%,#ff006e_120%)] text-black shadow-[0_18px_70px_rgba(251,86,7,0.25)]"
                >
                  <Link href="#contact">
                    Book Consultation
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.05]"
                >
                  <Link href="#projects">View Projects</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-10 flex items-center gap-4 text-xs text-white/55">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-300/80" />
                  Fast delivery
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500/80" />
                  Enterprise-grade quality
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500/70" />
                  Ongoing support
                </span>
              </div>
            </Reveal>

            <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* RIGHT: cinematic composition */}
          <div className="relative lg:col-span-6">
            <div className="absolute inset-0 -z-10">
              <div className="absolute -right-10 top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,183,3,0.18),transparent_60%)] blur-3xl" />
              <div className="absolute right-20 top-44 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(251,86,7,0.14),transparent_60%)] blur-3xl" />
            </div>

            <motion.div
              style={{ y: smoothY1 }}
              className="relative mx-auto w-full max-w-xl"
            >
              <GlowCard className="p-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-white/[0.05]">
                      <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_30%,rgba(255,183,3,0.25),transparent_60%)]" />
                      <Bot className="relative h-5 w-5 text-amber-200/90" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">System Orchestrator</div>
                      <div className="text-xs text-white/60">AI + automation pipelines</div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                    Live
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {[
                    { icon: Layers, label: "ERP & Custom Modules", meta: "Inventory • Sales • Accounts" },
                    { icon: Cpu, label: "AI Automation", meta: "Agents • Workflows • Assistants" },
                    { icon: CalendarDays, label: "Booking Platforms", meta: "Payments • Scheduling • QR" },
                    { icon: Building2, label: "Brand & Web Presence", meta: "Corporate • Landing • UI/UX" },
                  ].map((row, i) => (
                    <motion.div
                      key={row.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: 0.15 + i * 0.06 }}
                      className="group/row flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.04]">
                          <row.icon className="h-5 w-5 text-white/85" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white/90">{row.label}</div>
                          <div className="text-xs text-white/55">{row.meta}</div>
                        </div>
                      </div>
                      <ChevronDown className="h-4 w-4 text-white/35 transition-transform group-hover/row:-rotate-90" />
                    </motion.div>
                  ))}
                </div>
              </GlowCard>

              <motion.div
                style={{ y: smoothY2, rotate: rot }}
                className="absolute -right-4 -top-8 hidden w-40 md:block"
              >
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">
                  <div className="text-xs font-medium text-white/85">
                    Why choose us
                  </div>
                  <div className="mt-3 grid gap-2 text-[11px] text-white/60">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-300/80" />
                      Premium UI and UX
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500/80" />
                      Automation that ships
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500/70" />
                      Support-ready delivery
                    </div>
                  </div>
                </div>
              </motion.div>

            </motion.div>

            {/* light trails */}
            <div className="pointer-events-none absolute inset-x-0 -top-6 h-72 opacity-70">
              <div className="absolute right-6 top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(255,183,3,0.32),transparent_62%)] blur-2xl" />
              <div className="absolute right-28 top-10 h-64 w-[520px] rotate-[14deg] bg-[linear-gradient(90deg,transparent,rgba(255,183,3,0.28),rgba(251,86,7,0.22),transparent)] blur-xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 -mb-px h-36 bg-gradient-to-b from-transparent to-[#07070a]" />
    </section>
  );
}

function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
          whileHover={{ y: -6 }}
          className="h-full"
        >
          <GlowCard className="h-full">
            <div className="flex items-start justify-between gap-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.05]">
                <s.icon className="h-5 w-5 text-amber-200/90" />
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/60">
                {s.tag}
              </div>
            </div>
            <div className="mt-4 text-lg font-medium text-white">{s.title}</div>
            <p className="mt-2 text-sm leading-relaxed text-white/65">{s.desc}</p>
          </GlowCard>
        </motion.div>
      ))}
    </div>
  );
}

function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {projects.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
          whileHover={{ y: -6 }}
        >
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute -inset-24 bg-[radial-gradient(circle_at_20%_25%,rgba(255,183,3,0.25),transparent_55%),radial-gradient(circle_at_85%_70%,rgba(251,86,7,0.20),transparent_60%)] blur-2xl" />
            </div>

            <div className="relative grid gap-6 p-7 md:grid-cols-[1fr_220px] md:items-stretch">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xl font-semibold tracking-tight text-white">
                      {p.name}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      {p.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] text-white/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-xl border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.05]"
                  >
                    <Link href="#contact">Request a Demo</Link>
                  </Button>
                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-2 text-sm text-amber-200/85 hover:text-amber-200"
                    target={p.href.startsWith("http") ? "_blank" : undefined}
                    rel={p.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    View details <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,183,3,0.35),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(251,86,7,0.28),transparent_60%),radial-gradient(circle_at_45%_10%,rgba(255,0,110,0.12),transparent_55%)]" />
                {p.image ? (
                  <>
                    <Image
                      src={p.image}
                      alt={`${p.name} preview`}
                      fill
                      className="object-cover opacity-80"
                      sizes="(min-width: 1024px) 220px, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/55" />
                  </>
                ) : (
                  <div className="absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]">
                    <div className="absolute left-6 top-8 h-28 w-28 rounded-full border border-white/10 bg-white/[0.02] blur-[0.2px]" />
                    <div className="absolute right-6 top-10 h-16 w-40 rounded-2xl border border-white/10 bg-white/[0.03]" />
                    <div className="absolute bottom-6 left-6 h-20 w-44 rounded-2xl border border-white/10 bg-white/[0.03]" />
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-[11px] text-white/60">
                  Cinematic preview • layered depth • hover glow
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AIAutomationPanel() {
  const nodes = useMemo(
    () => [
      { id: "req", x: 70, y: 70, label: "Booking request" },
      { id: "cal", x: 220, y: 110, label: "Availability" },
      { id: "ai", x: 360, y: 70, label: "AI assistant" },
      { id: "pay", x: 220, y: 220, label: "Payment" },
      { id: "ops", x: 360, y: 260, label: "Team schedule" },
      { id: "msg", x: 70, y: 270, label: "Confirmation" },
    ],
    []
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <GlowCard className="p-0">
        <div className="relative overflow-hidden rounded-2xl p-7">
          <div className="pointer-events-none absolute inset-0 opacity-90">
            <div className="absolute -inset-40 bg-[radial-gradient(circle_at_35%_25%,rgba(255,183,3,0.18),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(251,86,7,0.16),transparent_60%)] blur-2xl" />
          </div>

          <div className="relative flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Automation Canvas</div>
              <div className="mt-1 text-xs text-white/60">
                Example flow: booking request → availability → payment → confirmation → reminders → reporting
              </div>
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/60">
              Booking flow
            </div>
          </div>

          <div className="relative mt-7 overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-4">
            <svg viewBox="0 0 440 340" className="h-[320px] w-full">
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="rgba(255,183,3,0.9)" />
                  <stop offset="0.55" stopColor="rgba(251,86,7,0.85)" />
                  <stop offset="1" stopColor="rgba(255,0,110,0.55)" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {[
                ["req", "cal"],
                ["cal", "ai"],
                ["ai", "pay"],
                ["pay", "msg"],
                ["msg", "ops"],
              ].map(([a, b]) => {
                const A = nodes.find((n) => n.id === a)!;
                const B = nodes.find((n) => n.id === b)!;
                return (
                  <motion.path
                    key={`${a}-${b}`}
                    d={`M ${A.x} ${A.y} C ${(A.x + B.x) / 2} ${A.y}, ${(A.x + B.x) / 2} ${B.y}, ${B.x} ${B.y}`}
                    stroke="url(#g1)"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0.2 }}
                    whileInView={{ pathLength: 1, opacity: 0.85 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                );
              })}

              {nodes.map((n, idx) => (
                <motion.g
                  key={n.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.12 + idx * 0.05 }}
                >
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r="18"
                    fill="rgba(255,255,255,0.06)"
                    stroke="rgba(255,255,255,0.12)"
                  />
                  <circle cx={n.x} cy={n.y} r="5" fill="rgba(255,183,3,0.9)" />
                  <text
                    x={n.x}
                    y={n.y + 34}
                    textAnchor="middle"
                    fontSize="11"
                    fill="rgba(255,255,255,0.65)"
                  >
                    {n.label}
                  </text>
                </motion.g>
              ))}
            </svg>

            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="pointer-events-none absolute inset-0"
            >
              <div className="absolute -left-10 top-10 h-24 w-[520px] rotate-[16deg] bg-[linear-gradient(90deg,transparent,rgba(255,183,3,0.22),rgba(251,86,7,0.18),transparent)] blur-xl" />
            </motion.div>
          </div>
        </div>
      </GlowCard>

      <div className="grid gap-5">
        {[
          {
            title: "Lead intake and routing",
            desc: "Capture leads from forms, email, or WhatsApp, qualify them, and create deals in your CRM or ERP with the right owner and follow-up tasks.",
            icon: Database,
          },
          {
            title: "Bookings and confirmations",
            desc: "Auto-confirm appointments, send reminders, handle reschedules, and sync calendars. Add QR confirmations for events and staff tools.",
            icon: Bot,
          },
          {
            title: "Invoices, reporting, and support",
            desc: "Generate invoices from completed jobs, produce daily summaries, and route customer support to the right team. Includes approvals and audit trails.",
            icon: Layers,
          },
        ].map((x, i) => (
          <Reveal key={x.title} delay={i * 0.06}>
            <GlowCard>
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.05]">
                  <x.icon className="h-5 w-5 text-amber-200/90" />
                </div>
                <div>
                  <div className="text-base font-medium text-white">{x.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-white/65">{x.desc}</p>
                </div>
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function AboutSystemsVisual({ embedded = false }: { embedded?: boolean }) {
  const steps = useMemo(
    () => [
      { id: "d1", x: 70, y: 92, label: "Discovery", desc: "Goals, workflows, constraints." },
      { id: "d2", x: 220, y: 74, label: "Planning", desc: "Roadmap, integrations, scope." },
      { id: "d3", x: 370, y: 98, label: "UI/UX", desc: "Premium screens and flows." },
      { id: "d4", x: 310, y: 170, label: "Development", desc: "Fast, clean, scalable builds." },
      { id: "d5", x: 150, y: 186, label: "Testing", desc: "Edge cases, performance checks." },
      { id: "d6", x: 90, y: 252, label: "Deployment", desc: "Secure rollout and monitoring." },
      { id: "d7", x: 330, y: 252, label: "Support", desc: "Ongoing improvements and SLAs." },
    ],
    []
  );

  const content = (
    <div className={embedded ? "relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-6" : "relative overflow-hidden rounded-2xl p-7"}>
        <div className="pointer-events-none absolute inset-0 opacity-90">
          <div className="absolute -inset-40 bg-[radial-gradient(circle_at_35%_25%,rgba(255,183,3,0.16),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(251,86,7,0.14),transparent_60%)] blur-2xl" />
        </div>

        <div className="relative flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-white">System map</div>
            <div className="mt-1 text-xs text-white/60">
              Enterprise-ready systems for Mauritius operations, delivered with a proven process
            </div>
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/60">
            Visual
          </div>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-4">
          <svg viewBox="0 0 440 340" className="h-[340px] w-full">
            <defs>
              <linearGradient id="aboutg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="rgba(255,183,3,0.9)" />
                <stop offset="0.55" stopColor="rgba(251,86,7,0.85)" />
                <stop offset="1" stopColor="rgba(255,0,110,0.55)" />
              </linearGradient>
              <marker
                id="aboutArrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,183,3,0.85)" />
              </marker>
              <filter id="aboutglow">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Roadmap path */}
            {steps.slice(0, -1).map((A, idx) => {
              const B = steps[idx + 1]!;
              return (
                <motion.path
                  key={`${A.id}-${B.id}`}
                  d={`M ${A.x} ${A.y} C ${(A.x + B.x) / 2} ${A.y}, ${(A.x + B.x) / 2} ${B.y}, ${B.x} ${B.y}`}
                  stroke="url(#aboutg)"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#aboutglow)"
                  markerEnd="url(#aboutArrow)"
                  initial={{ pathLength: 0, opacity: 0.18 }}
                  whileInView={{
                    pathLength: 1,
                    opacity: idx === steps.length - 2 ? 0.95 : 0.78,
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: idx * 0.03 }}
                />
              );
            })}

            {/* Explicit Deployment → Support connector (extra emphasis) */}
            <motion.path
              d={`M ${steps[5]!.x} ${steps[5]!.y} C ${(steps[5]!.x + steps[6]!.x) / 2} ${steps[5]!.y - 10}, ${(steps[5]!.x + steps[6]!.x) / 2} ${steps[6]!.y - 10}, ${steps[6]!.x} ${steps[6]!.y}`}
              stroke="url(#aboutg)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              filter="url(#aboutglow)"
              markerEnd="url(#aboutArrow)"
              initial={{ pathLength: 0, opacity: 0.15 }}
              whileInView={{ pathLength: 1, opacity: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            />

            {/* Roadmap nodes */}
            {steps.map((s, idx) => (
              <motion.g
                key={s.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.12 + idx * 0.05 }}
              >
                <circle
                  cx={s.x}
                  cy={s.y}
                  r="18"
                  fill="rgba(255,255,255,0.06)"
                  stroke="rgba(255,255,255,0.12)"
                />
                <circle cx={s.x} cy={s.y} r="5" fill="rgba(255,183,3,0.9)" />

                <text
                  x={s.x}
                  y={s.y + 34}
                  textAnchor="middle"
                  fontSize="11"
                  fill="rgba(255,255,255,0.75)"
                >
                  {s.label}
                </text>
                <text
                  x={s.x}
                  y={s.y + 50}
                  textAnchor="middle"
                  fontSize="9.5"
                  fill="rgba(255,255,255,0.55)"
                >
                  {s.desc}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>
      </div>
  );

  if (embedded) return content;

  return <GlowCard className="p-0">{content}</GlowCard>;
}

function ProcessTimeline() {
  const steps = [
    { title: "Discovery", desc: "Understand goals, data, stakeholders, and constraints." },
    { title: "Planning", desc: "Architecture, roadmap, integrations, and milestones." },
    { title: "UI/UX", desc: "Premium interface design with clear flows and prototypes." },
    { title: "Development", desc: "Fast builds with robust engineering and best practices." },
    { title: "Testing", desc: "Performance, security checks, edge-case validation." },
    { title: "Deployment", desc: "Secure rollout, monitoring, and iteration." },
    { title: "Support", desc: "SLA options, maintenance, and continuous improvements." },
  ];

  return (
    <div className="grid gap-6">
      {steps.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
          className="relative"
        >
          <GlowCard className="pl-6">
            <div className="flex items-start gap-4">
              <div className="mt-1 h-8 w-8 shrink-0 rounded-full border border-white/10 bg-white/[0.04] text-center text-sm leading-8 text-amber-200/90">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <div className="text-base font-medium text-white">{s.title}</div>
                <p className="mt-1 text-sm leading-relaxed text-white/65">{s.desc}</p>
              </div>
            </div>
          </GlowCard>
          {i !== steps.length - 1 ? (
            <div className="pointer-events-none absolute left-[22px] top-[64px] h-10 w-px bg-gradient-to-b from-white/15 to-transparent" />
          ) : null}
        </motion.div>
      ))}
    </div>
  );
}

function TechFloaters() {
  const chips = [
    { label: "React", icon: Layers },
    { label: "Next.js", icon: MonitorSmartphone },
    { label: "Flutter", icon: MonitorSmartphone },
    { label: "Supabase", icon: Database },
    { label: "OpenAI", icon: Bot },
    { label: "n8n", icon: Cpu },
    { label: "Tailwind", icon: Wand2 },
    { label: "PostgreSQL", icon: Database },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-24 bg-[radial-gradient(circle_at_20%_25%,rgba(255,183,3,0.18),transparent_55%),radial-gradient(circle_at_85%_70%,rgba(251,86,7,0.14),transparent_60%)] blur-2xl" />
      </div>
      <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {chips.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.04 }}
            animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
            style={{ willChange: "transform" }}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.04]">
                <c.icon className="h-5 w-5 text-amber-200/90" />
              </div>
              <div className="text-sm font-medium text-white/90">{c.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Testimonials() {
  const items = [
    {
      quote:
        "Mojhoa delivered a system that made our operations feel effortless. The UI is premium and the automation is real.",
      name: "Operations Manager",
      company: "Mauritius Retail",
    },
    {
      quote:
        "From planning to deployment, everything was structured. We finally have visibility across bookings and payments.",
      name: "Founder",
      company: "Events & Ticketing",
    },
    {
      quote:
        "The ERP module and POS integration reduced manual work dramatically. Support is responsive and professional.",
      name: "Director",
      company: "Food & Hospitality",
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {items.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
          whileHover={{ y: -6 }}
        >
          <GlowCard className="h-full">
            <div className="text-sm leading-relaxed text-white/70">“{t.quote}”</div>
            <div className="mt-5 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-white">{t.name}</div>
                <div className="text-xs text-white/55">{t.company}</div>
              </div>
              <div className="h-10 w-10 rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,183,3,0.18),transparent_60%)]" />
            </div>
          </GlowCard>
        </motion.div>
      ))}
    </div>
  );
}

function ContactPanel() {
  return (
    <div className="grid gap-8">
      <GlowCard>
        <div className="text-lg font-medium text-white">Let’s build your system</div>
        <p className="mt-2 text-sm leading-relaxed text-white/65">
          Book a consultation on WhatsApp. We’ll reply with next steps and a clear plan.
        </p>

        <div className="mt-6 grid gap-3">
          <a
            href="https://wa.me/23059182520"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-white/85 hover:bg-white/[0.04]"
          >
            <span className="inline-flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.04]">
                <Bot className="h-5 w-5 text-amber-200/90" />
              </span>
              WhatsApp consultation
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="mailto:mojhoaautomations@gmail.com"
            className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-white/80 hover:bg-white/[0.04]"
          >
            Email: <span className="text-white/60">mojhoaautomations@gmail.com</span>
          </a>
          <a
            href="tel:+23059182520"
            className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-white/80 hover:bg-white/[0.04]"
          >
            Phone: <span className="text-white/60">59182520</span>
          </a>
          <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-white/80">
            Mauritius • Beau Vallon
          </div>
        </div>
      </GlowCard>
    </div>
  );
}

export function LandingPage() {
  const stats: Stat[] = [
    { label: "Projects Completed", value: 20, suffix: "+" },
    { label: "Businesses Automated", value: 15, suffix: "+" },
    { label: "Industries Served", value: 8, suffix: "+" },
    { label: "Systems Delivered", value: 30, suffix: "+" },
  ];

  const services: Service[] = [
    { title: "Custom ERP Systems", desc: "Modules tailored to your operations with roles, dashboards, and reporting.", icon: Layers, tag: "Enterprise" },
    { title: "Business Automation Systems", desc: "Automations that reduce admin work and eliminate repetitive tasks.", icon: Wand2, tag: "Workflows" },
    { title: "Booking Systems", desc: "Scheduling, payments, and confirmations designed for real teams.", icon: CalendarDays, tag: "Platforms" },
    { title: "AI Automation", desc: "Assistants, routing, summaries, and intelligent pipelines with guardrails.", icon: Bot, tag: "AI" },
    { title: "Branding & Digital Presence", desc: "Premium corporate websites, branding, and product-grade UI/UX.", icon: Building2, tag: "Design" },
    { title: "POS Systems", desc: "Retail-ready POS and operational tools for speed and accuracy.", icon: Cpu, tag: "Retail" },
    { title: "Mobile Applications", desc: "Mobile-first builds for scanning, staff tools, and customer experiences.", icon: MonitorSmartphone, tag: "Mobile" },
    { title: "E-Commerce Solutions", desc: "Conversion-focused storefronts, payments, catalog, and admin control.", icon: ShoppingCart, tag: "Commerce" },
    { title: "Custom Software Development", desc: "Build what your business actually needs, from MVP to enterprise scale.", icon: Database, tag: "Build" },
  ];

  const industries: Industry[] = [
    { title: "Retail", blurb: "POS, stock, and multi-branch reporting for Mauritius shops. Barcode, suppliers, and fast cashier flows." },
    { title: "Restaurants", blurb: "KOT, kitchen screens, table management, and inventory. WhatsApp order updates and cashier speed." },
    { title: "Logistics", blurb: "Dispatch board, driver tasks, proof-of-delivery, and route visibility across the island with SMS/WhatsApp updates." },
    { title: "Distribution", blurb: "Sales reps, invoicing, stock movement, and customer accounts. Mobile ordering and delivery notes for field teams." },
    { title: "Events", blurb: "Ticketing, QR scanning, check-in apps, and payouts. Local promotions and attendee messaging built-in." },
    { title: "Real Estate", blurb: "Lead capture, pipeline stages, viewing schedules, and automated follow-ups for Mauritius agencies." },
    { title: "Medical", blurb: "Appointments, reminders, and staff scheduling with role-based access and secure records workflows." },
    { title: "Beauty & Wellness", blurb: "Bookings, deposits, reminders, loyalty, and staff rosters. No-show reduction with automated follow-ups." },
  ];

  const projects: Project[] = [
    { name: "MoLedger", desc: "Ledger + reporting platform built for operational clarity and compliance-ready workflows.", stack: ["Next.js", "PostgreSQL", "Tailwind", "Charts"], href: "#contact", image: "/{E47010FC-090F-4203-A14B-BDBD469E99F5}.png" },
    { name: "ZotServis", desc: "Service management and ticketing workflow with roles, scheduling, and automation triggers.", stack: ["Next.js", "Supabase", "n8n", "RBAC"], href: "#contact", image: "/{C44673B4-DB9D-4405-8F8D-D98431457B19}.png" },
    { name: "Zeko", desc: "Modern business platform built for streamlined operations, automation, and a premium user experience.", stack: ["Automation", "Dashboards", "Integrations", "UI/UX"], href: "#contact", image: "/{9B4BBF8E-663D-40CB-8E18-427C0E6C774A}.png" },
    { name: "DSEvents", desc: "CREATING EXPERIENCES. NOT JUST EVENTS.", stack: ["Events", "Brand", "Website", "UI/UX"], href: "#contact", image: "/{A236A909-78CC-4C6A-B9CE-DA7887879E1B}.png" },
    { name: "Claire & Sailesh Back Office", desc: "Operations back office for sales, inventory, and reporting with clean workflows and admin control.", stack: ["Back Office", "Inventory", "Reporting", "Roles"], href: "#contact", image: "/{25ED9091-7B7F-462F-9E92-9E009B8BB3E3}.png" },
    { name: "Claire & Sailesh Commercial Website", desc: "Premium commercial website with modern UI, clear offerings, and conversion-focused sections.", stack: ["Next.js", "Branding", "UI/UX", "SEO"], href: "#contact", image: "/{4D01E58E-4F26-4EF5-80B0-16CB1127C2D4}.png" },
  ];

  return (
    <main className="min-h-screen text-white">
      <Hero />

      <Section
        id="stats"
        eyebrow="Trusted delivery"
        title="Systems shipped with confidence"
        subtitle="Modern engineering, premium UI, and automation-first thinking built for real operations."
        topBlend
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCounter key={s.label} stat={s} />
          ))}
        </div>
      </Section>

      <Section
        id="about"
        eyebrow="Who we are"
        title="Mojhoa Automations"
        subtitle="A Mauritius-focused software and AI automation company building enterprise-ready systems that scale."
      >
        <div className="grid items-start gap-6">
          <GlowCard>
            <div className="text-sm leading-relaxed text-white/70">
              <p>
                We help teams replace spreadsheets, manual admin, and disconnected tools with cohesive systems:
                ERP modules, booking platforms, automation pipelines, and premium digital experiences.
              </p>
              <p className="mt-4">
                Our approach blends product-grade design with reliable engineering, delivering modern interfaces,
                clear workflows, and automation that actually runs in production.
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { k: "Mission", v: "Build smart systems that reduce chaos and create leverage." },
                { k: "Vision", v: "Mauritius businesses operating with world-class software." },
                { k: "Focus", v: "AI + automation with enterprise-grade delivery." },
              ].map((x) => (
                <div key={x.k} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <div className="text-xs text-white/55">{x.k}</div>
                  <div className="mt-1 text-sm font-medium text-white/90">{x.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <AboutSystemsVisual embedded />
            </div>
          </GlowCard>
        </div>
      </Section>

      <Section
        id="services"
        eyebrow="Services"
        title="Enterprise-grade solutions"
        subtitle="Premium builds with cinematic UI and automation-driven outcomes, tailored to your industry."
      >
        <ServicesGrid services={services} />
      </Section>

      <Section
        id="industries"
        eyebrow="Industries"
        title="Built for operations"
        subtitle="We adapt our systems to your workflows, from front-of-house tools to back-office control."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {industries.map((x, i) => (
            <Reveal key={x.title} delay={i * 0.03}>
              <GlowCard>
                <div className="text-base font-medium text-white">{x.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{x.blurb}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="projects"
        eyebrow="Featured projects"
        title="Work that looks and feels premium"
        subtitle="Cinematic showcases with layered depth, modern stacks, and enterprise-ready UX."
      >
        <ProjectsGrid projects={projects} />

        <div className="mt-10">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_90px_rgba(0,0,0,0.55)] sm:p-8">
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <div className="absolute -inset-24 bg-[radial-gradient(circle_at_20%_20%,rgba(255,183,3,0.22),transparent_55%),radial-gradient(circle_at_85%_70%,rgba(251,86,7,0.18),transparent_60%)] blur-2xl" />
            </div>

            <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] text-white/65">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-300/80" />
                  Additional work available
                </div>
                <div className="mt-3 text-lg font-semibold tracking-tight text-white">
                  More projects, same premium standard
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  We have additional systems across retail, restaurants, services, and internal operations. Tell us your industry and we’ll share the most relevant examples.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button
                  asChild
                  className="h-11 rounded-xl border-0 bg-[linear-gradient(135deg,#ffb703_0%,#fb5607_55%,#ff006e_120%)] text-black shadow-[0_18px_70px_rgba(251,86,7,0.22)]"
                >
                  <Link href="#contact">Request examples</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-xl border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.05]"
                >
                  <Link href="#contact">Book consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="ai"
        eyebrow="AI automation"
        title="Futuristic automation that actually ships"
        subtitle="Practical AI automation examples we build for real businesses: lead intake to ERP, booking confirmations, WhatsApp support triage, invoice generation, and smart reporting."
      >
        <AIAutomationPanel />
      </Section>

      <Section
        id="faq"
        eyebrow="FAQ"
        title="Answers, clearly"
        subtitle="Everything you need to know before we build your next system."
      >
        <GlowCard className="p-0">
          <Accordion type="single" collapsible className="divide-y divide-white/10">
            {[
              {
                q: "Do you build custom ERP systems for Mauritius businesses?",
                a: "Yes. We build ERP modules around your operations (sales, inventory, accounting, dashboards), with roles and reporting designed for real teams.",
              },
              {
                q: "Can you integrate AI and automation into existing workflows?",
                a: "Yes. We integrate AI assistants and automation workflows into existing tools (email, spreadsheets, CRMs, WhatsApp workflows, internal apps) with guardrails and approvals.",
              },
              {
                q: "Do you support booking systems and event platforms?",
                a: "Yes. We build booking platforms with payments, schedules, confirmations, and optional QR ticketing/scanning flows.",
              },
              {
                q: "Do you provide ongoing support after launch?",
                a: "Yes. We offer ongoing support and SLA options, including monitoring, fixes, and feature iterations.",
              },
            ].map((x) => (
              <AccordionItem key={x.q} value={x.q} className="border-0">
                <AccordionTrigger className="px-6 py-5 text-left text-white/90 hover:no-underline">
                  {x.q}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-sm leading-relaxed text-white/65">
                  {x.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </GlowCard>
      </Section>

      <Section
        id="contact"
        eyebrow="Contact"
        title="Book a consultation"
        subtitle="Tell us what you’re building. We’ll reply with a plan, timeline, and the right next step."
        className="pb-28"
      >
        <ContactPanel />
      </Section>
    </main>
  );
}
