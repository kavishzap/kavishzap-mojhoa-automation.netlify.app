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
  CheckCircle2,
  ChevronDown,
  Cpu,
  Database,
  Headphones,
  Layers,
  Map,
  MonitorSmartphone,
  Quote,
  Rocket,
  Search,
  ShoppingCart,
  Wand2,
} from "lucide-react";
import { HeroGlobeScene } from "@/components/hero-globe-3d";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Stat = { label: string; value: number; suffix?: string };
type Service = {
  title: string;
  desc: string;
  icon: React.ElementType;
  tag: string;
  image?: string;
};
type Industry = { title: string; blurb: string };
type Project = { name: string; desc: string; stack: string[]; href: string; image?: string; requestDemo?: boolean };

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  topBlend = false,
  headerFullWidth = false,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  topBlend?: boolean;
  headerFullWidth?: boolean;
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
          <div className={cn(headerFullWidth ? "w-full max-w-none" : "max-w-2xl")}>
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
    <section id="home" className="relative isolate overflow-hidden bg-[#07070a] pt-24 md:pt-28">
      <HeroGlobeScene className="z-0" />

      <div ref={ref} className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-7rem)] items-center gap-10 lg:grid-cols-12">
          {/* LEFT: keep clean for readability */}
          <div className="relative lg:col-span-6">
            <div className="relative z-10">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
                <span className="tracking-wide">
                  AI automation & enterprise software
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
                We build custom AI solutions, automation workflows, and modern digital systems that help
                businesses scale efficiently and stay ahead of the competition
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="group relative overflow-hidden rounded-lg border-0 bg-[linear-gradient(135deg,#ffb703_0%,#fb5607_55%,#ff006e_120%)] text-black shadow-[0_18px_70px_rgba(251,86,7,0.25)]"
                >
                  <Link href="#contact">
                    Book Consultation
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-lg border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.05]"
                >
                  <Link href="#projects">View Projects</Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-10 grid grid-cols-3 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center backdrop-blur">
                  <div className="text-lg font-semibold text-white">20+</div>
                  <div className="mt-1 text-xs text-white/60">Projects Delivered</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center backdrop-blur">
                  <div className="text-lg font-semibold text-white">15+</div>
                  <div className="mt-1 text-xs text-white/60">Businesses Automated</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center backdrop-blur">
                  <div className="text-lg font-semibold text-white">24/7</div>
                  <div className="mt-1 text-xs text-white/60">Support Available</div>
                </div>
              </div>
            </Reveal>

            <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>

          {/* RIGHT: cinematic composition */}
          <div className="relative lg:col-span-6">
            <div className="absolute inset-0 -z-10 max-lg:opacity-25 lg:opacity-100">
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
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                    Live
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {[
                    { icon: Building2, label: "Brand & Web Presence", meta: "Corporate • Landing • UI/UX" },
                    { icon: Cpu, label: "AI Automation", meta: "Agents • Workflows • Assistants" },
                    { icon: Layers, label: "ERP & Custom Modules", meta: "Inventory • Sales • Accounts" },
                    { icon: CalendarDays, label: "Booking Platforms", meta: "Payments • Scheduling • QR" },
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
            <div className="pointer-events-none absolute inset-x-0 -top-6 hidden h-72 opacity-70 md:block">
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

function ServiceCard({ service: s, className }: { service: Service; className?: string }) {
  return (
    <GlowCard className={cn("flex h-full flex-col border-white/10", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.05]">
          <s.icon className="h-5 w-5 text-amber-200/90" />
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/60">
          {s.tag}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-lg font-medium text-white">{s.title}</div>
        <p className="mt-2 text-sm leading-relaxed text-white/65">{s.desc}</p>
      </div>

      <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/25">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,183,3,0.18),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(251,86,7,0.14),transparent_60%)]" />
        {s.image ? (
          <Image src={s.image} alt={s.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-2 text-white/35">
              <s.icon className="h-8 w-8" />
              <span className="text-xs tracking-wide">Image placeholder</span>
            </div>
          </div>
        )}
      </div>
    </GlowCard>
  );
}

function ServicesMobileStack({ services }: { services: Service[] }) {
  const baseTop = 88;
  const peekStep = 14;
  const lastIndex = services.length - 1;

  const scrollPadding = (i: number) => {
    if (i === lastIndex) return "0";
    if (i === lastIndex - 1) return "min(28vh, 240px)";
    if (i === lastIndex - 2) return "min(34vh, 300px)";
    return "min(40vh, 340px)";
  };

  return (
    <div className="relative -mb-6 md:hidden">
      {services.map((s, i) => (
        <div
          key={s.title}
          className="sticky w-full"
          style={{
            top: baseTop + i * peekStep,
            zIndex: i + 1,
            paddingBottom: scrollPadding(i),
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <ServiceCard
              service={s}
              className="shadow-[0_24px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
}

function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <>
      <ServicesMobileStack services={services} />

      <div className="hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
            className="h-full"
          >
            <ServiceCard service={s} />
          </motion.div>
        ))}
      </div>
    </>
  );
}

function ProjectsGrid({ projects }: { projects: Project[] }) {
  const isLiveSite = (href: string) => href.startsWith("http");

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {projects.map((p, i) => {
        const liveUrl = isLiveSite(p.href) ? p.href : null;

        return (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="h-full"
          >
            <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -inset-24 bg-[radial-gradient(circle_at_20%_25%,rgba(255,183,3,0.25),transparent_55%),radial-gradient(circle_at_85%_70%,rgba(251,86,7,0.20),transparent_60%)] blur-2xl" />
              </div>

              <div className="relative grid gap-4 p-5 md:grid-cols-[1fr_180px] md:items-start">
                <div>
                  <div className="text-xl font-semibold tracking-tight text-white">{p.name}</div>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/65">
                    {p.desc}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] text-white/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {liveUrl ? (
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-xl border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.05]"
                      >
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      </Button>
                    </div>
                  ) : p.requestDemo ? (
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-xl border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.05]"
                      >
                        <Link href="#contact">Request Demo</Link>
                      </Button>
                    </div>
                  ) : null}
                </div>

                {liveUrl ? (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "relative block h-[160px] w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/30 transition-opacity md:h-[160px] md:w-[180px]",
                      p.image ? "cursor-pointer hover:opacity-95" : "cursor-pointer"
                    )}
                    aria-label={`Open ${p.name} website`}
                  >
                    <ThumbnailContent project={p} />
                  </a>
                ) : (
                  <div
                    className="relative h-[160px] w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/30 md:h-[160px] md:w-[180px]"
                  >
                    <ThumbnailContent project={p} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function ThumbnailContent({ project: p }: { project: Project }) {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,183,3,0.35),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(251,86,7,0.28),transparent_60%),radial-gradient(circle_at_45%_10%,rgba(255,0,110,0.12),transparent_55%)]" />
      {p.image ? (
        <>
          <Image
            src={p.image}
            alt={`${p.name} preview`}
            fill
            className="object-cover opacity-80"
            sizes="180px"
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
    </>
  );
}

function ServicesProcessLine() {
  const steps = useMemo(
    () => [
      { label: "Analyse", desc: "Your goals, workflows, and bottlenecks", icon: Search },
      { label: "Plan", desc: "Roadmap, scope, and integrations", icon: Map },
      { label: "Design", desc: "UI/UX for apps and web presence", icon: Layers },
      { label: "Build", desc: "Custom apps, automation, and websites", icon: Cpu },
      { label: "Test", desc: "Quality, performance, and edge cases", icon: CheckCircle2 },
      { label: "Deploy", desc: "Secure launch and go-live", icon: Rocket },
      { label: "Support", desc: "Ongoing help and improvements", icon: Headphones },
    ],
    []
  );

  return (
    <Reveal>
      <GlowCard className="overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <div className="absolute -inset-24 bg-[radial-gradient(circle_at_30%_20%,rgba(255,183,3,0.14),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(251,86,7,0.12),transparent_60%)] blur-2xl" />
        </div>

        <div className="relative">
          {/* Desktop: horizontal process line */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* straight connector line behind icons */}
              <div className="pointer-events-none absolute left-7 right-7 top-7">
                <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/25 to-white/10" />
                <motion.div
                  className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[linear-gradient(135deg,#ffb703,#fb5607)] shadow-[0_0_14px_rgba(251,86,7,0.55)]"
                  animate={{ left: ["0%", "100%"] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-amber-300/70"
                  animate={{ left: ["-10%", "110%"], opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "linear", delay: 1.2 }}
                />
                <motion.div
                  className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-orange-400/70"
                  animate={{ left: ["-20%", "120%"], opacity: [0.15, 0.9, 0.15] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "linear", delay: 2.4 }}
                />
              </div>

              <div className="flex items-start justify-between">
                {steps.map((step, i) => (
                  <div key={step.label} className="flex min-w-0 flex-1 flex-col items-center">
                    <ProcessStepIcon icon={step.icon} label={step.label} index={i} />
                    <div className="mt-3 text-center">
                      <div className="text-xs font-medium text-white/90">{step.label}</div>
                      <div className="mt-1 hidden max-w-[8rem] text-[10px] leading-snug text-white/50 xl:block">
                        {step.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile / tablet: vertical timeline */}
          <div className="mt-8 space-y-0 lg:hidden">
            {steps.map((step, i) => (
              <div key={step.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <ProcessStepIcon icon={step.icon} label={step.label} index={i} compact />
                  {i < steps.length - 1 ? (
                    <div className="relative my-2 h-10 w-px overflow-hidden bg-white/10">
                      <motion.div
                        className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(255,183,3,0.7)]"
                        animate={{ top: ["0%", "100%"] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "linear",
                          delay: i * 0.25,
                        }}
                      />
                    </div>
                  ) : null}
                </div>
                <div className="pb-8 pt-2">
                  <div className="text-sm font-medium text-white">{step.label}</div>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlowCard>
    </Reveal>
  );
}

function ServicesRangeIntro() {
  return (
    <Reveal>
      <div className="w-full max-w-none">
        <h3 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          A full range of services for modern businesses
        </h3>
        <p className="mt-3 text-base leading-relaxed text-white/70 md:text-lg">
          From first conversation to long-term support, we help you grow with automation, custom software,
          and a strong online presence. Explore ERP modules, business automation, booking platforms, AI
          workflows, branding and websites, POS, mobile apps, e-commerce, and bespoke builds, all tailored
          to how your team works today.
        </p>
      </div>
    </Reveal>
  );
}

function ProcessStepIcon({
  icon: Icon,
  label,
  index,
  compact = false,
}: {
  icon: React.ElementType;
  label: string;
  index: number;
  compact?: boolean;
}) {
  const size = compact ? "h-12 w-12" : "h-14 w-14";

  return (
    <div className={cn("relative grid place-items-center", size)} aria-label={label}>
      <div
        className={cn(
          "relative z-10 grid place-items-center rounded-full border border-white/15 bg-white/[0.06] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_40px_rgba(0,0,0,0.4)]",
          compact ? "h-10 w-10" : "h-12 w-12"
        )}
      >
        <Icon className={cn("text-amber-200/90", compact ? "h-4 w-4" : "h-5 w-5")} />
      </div>
    </div>
  );
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

type TestimonialItem = {
  quote: string;
  company: string;
  initials: string;
};

const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "Working with Mojhoa Automations completely transformed how we manage our operations at Spark Distribution. The MoLedger implementation gave us a centralized system for invoicing, inventory tracking, reporting, and customer management. What used to take hours is now automated and accessible in real-time.",
    company: "Spark Distribution",
    initials: "SD",
  },
  {
    quote:
      "The Car Rental Back Office System and website developed for us exceeded expectations. From booking management to vehicle tracking and customer records, everything became much more organized and professional. The website also helped us establish a stronger online presence.",
    company: "Claire Sailesh LTD",
    initials: "CS",
  },
  {
    quote:
      "Our wedding decoration website gave our company a modern and elegant digital presence. Clients can now explore services, decoration packages, and contact us easily online. The design perfectly reflects the luxury experience we wanted to showcase.",
    company: "Kohinoor Decoration Ltd",
    initials: "KD",
  },
  {
    quote:
      "The POS system implemented for our restaurant made daily operations smoother and faster. Order management, billing, sales tracking, and reporting are now simple and efficient. The system is easy to use and perfectly adapted to restaurant operations.",
    company: "Lajoupa Restaurant",
    initials: "LR",
  },
  {
    quote:
      "The booking platform developed for our business helped us digitize our reservation process and improve customer experience significantly. The platform is modern, responsive, and easy for both our team and customers to use.",
    company: "Three Pillar Ltd",
    initials: "TP",
  },
  {
    quote:
      "Zot Servis was brought to life exactly as envisioned — a professional directory platform connecting customers with service providers across Mauritius. The platform structure, search experience, and business model integration were all implemented with great attention to detail.",
    company: "Next Layer Digital Services",
    initials: "NL",
  },
];

function TestimonialCard({ item, className }: { item: TestimonialItem; className?: string }) {
  return (
    <div
      className={cn(
        "h-full w-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-sm",
        className
      )}
    >
      <Quote className="h-9 w-9 text-amber-300/35" aria-hidden />
      <p className="mt-3 text-sm leading-relaxed text-white/75">{item.quote}</p>
      <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,183,3,0.22),transparent_60%)] text-xs font-semibold text-amber-100/90">
          {item.initials}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-white">{item.company}</div>
          <div className="truncate text-xs text-white/55">Client</div>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const items = TESTIMONIALS.slice(0, 5);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        "[-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      )}
    >
      <motion.div
        className="flex gap-4 py-1"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={`${item.name}-${i}`} className="w-[min(100vw-2rem,340px)] shrink-0 sm:w-[340px]">
            <TestimonialCard item={item} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ContactMap() {
  return (
    <GlowCard className="flex h-full min-h-[420px] flex-col overflow-hidden p-0">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="text-lg font-medium text-white">Find us</div>
        <p className="mt-1 text-sm text-white/60">Beau Vallon, Mauritius</p>
      </div>
      <div className="relative min-h-[360px] flex-1 overflow-hidden">
        <div className="absolute inset-0 [filter:invert(92%)_hue-rotate(180deg)_brightness(0.88)_contrast(0.92)_saturate(0.85)]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37442.88646467839!2d57.673389315789!3d-20.046388982558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x217c6fd6f0098765%3A0xae77e05fe1a06771!2sBeau%20Vallon%2C%20Mauritius!5e0!3m2!1sen!2smu!4v1710000000000!5m2!1sen!2smu"
            className="h-full w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mojhoa Automations location map"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[#07070a]/15" />
      </div>
    </GlowCard>
  );
}

function ContactPanel() {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
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
      <ContactMap />
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
    {
      title: "Custom ERP Systems",
      desc: "Modules tailored to your operations with roles, dashboards, and reporting.",
      icon: Layers,
      tag: "Enterprise",
      image: "/{F5AFACDA-557C-44DE-9C69-793679B85346}.png",
    },
    {
      title: "Business Automation Systems",
      desc: "Automations that reduce admin work and eliminate repetitive tasks.",
      icon: Wand2,
      tag: "Workflows",
      image: "/{865F886B-B789-4AC6-8F36-16CB3945C195}.png",
    },
    {
      title: "Booking Systems",
      desc: "Scheduling, payments, and confirmations designed for real teams.",
      icon: CalendarDays,
      tag: "Platforms",
      image: "/{DD1966EB-41C4-48A5-AF1A-EE316EDEA886}.png",
    },
    {
      title: "AI Automation",
      desc: "Assistants, routing, summaries, and intelligent pipelines with guardrails.",
      icon: Bot,
      tag: "AI",
      image: "/{A2D24C55-0028-43D4-8B7A-799A1C2D924C}.png",
    },
    {
      title: "Branding & Digital Presence",
      desc: "Premium corporate websites, branding, and product-grade UI/UX.",
      icon: Building2,
      tag: "Design",
      image: "/{3F9CB44E-4B85-4E59-929A-AFE7A7EA5904}.png",
    },
    {
      title: "POS Systems",
      desc: "Retail-ready POS and operational tools for speed and accuracy.",
      icon: Cpu,
      tag: "Retail",
      image: "/{EC372F55-6A2E-494E-83C9-B853BE97DC56}.png",
    },
    {
      title: "Mobile Applications",
      desc: "Mobile-first builds for scanning, staff tools, and customer experiences.",
      icon: MonitorSmartphone,
      tag: "Mobile",
      image: "/{F1510E09-A447-4DBD-88F5-953D9982A99E}.png",
    },
    {
      title: "E-Commerce Solutions",
      desc: "Conversion-focused storefronts, payments, catalog, and admin control.",
      icon: ShoppingCart,
      tag: "Commerce",
      image: "/{639A71E5-7AB8-450C-9F89-FA6F48A4E75E}.png",
    },
    {
      title: "Custom Software Development",
      desc: "Build what your business actually needs, from MVP to enterprise scale.",
      icon: Database,
      tag: "Build",
      image: "/{D10DE288-38F1-48FD-A57A-3831C686329F}.png",
    },
  ];

  const projects: Project[] = [
    {
      name: "MoLedger",
      desc: "All-in-one SME platform for invoicing, expenses, stock, payroll, quotations, purchase orders, and accounting — with real-time reports and scalable subscription plans for Mauritian businesses.",
      stack: ["SaaS", "Invoicing", "Accounting", "Stock"],
      href: "https://moledger.com/",
      image: "/{E47010FC-090F-4203-A14B-BDBD469E99F5}.png",
    },
    {
      name: "ZotServis",
      desc: "Mauritius worker directory where customers browse verified electricians, plumbers, cleaners, and more — then contact pros directly, with subscription profiles for service providers.",
      stack: ["Directory", "Search", "Profiles", "Mauritius"],
      href: "https://zotservis.com/",
      image: "/{C44673B4-DB9D-4405-8F8D-D98431457B19}.png",
    },
    {
      name: "Zeko",
      desc: "Event booking platform for online ticket sales, QR-based entry scanning, and a real-time sales dashboard — built to handle high-volume event registrations.",
      stack: ["Events", "Bookings", "QR Scan", "Dashboard"],
      href: "https://zekomru.com/dashboard",
      image: "/{9B4BBF8E-663D-40CB-8E18-427C0E6C774A}.png",
    },
    {
      name: "DSEvents",
      desc: "Entertainment company website for DJ, live music, karaoke, sound, and lighting services — showcasing events, concerts, and major client work across Mauritius.",
      stack: ["Events", "Entertainment", "Brand", "Website"],
      href: "https://dsevents.info/",
      image: "/{A236A909-78CC-4C6A-B9CE-DA7887879E1B}.png",
    },
    {
      name: "Claire & Sailesh Back Office",
      desc: "Private car rental back office for bookings, fleet and vehicle tracking, customer records, sales, inventory, and reporting — built to run daily rental operations in one place.",
      stack: ["Back Office", "Bookings", "Fleet", "Reporting"],
      href: "#contact",
      requestDemo: true,
      image: "/{25ED9091-7B7F-462F-9E92-9E009B8BB3E3}.png",
    },
    {
      name: "Claire & Sailesh Commercial Website",
      desc: "Car rental website for Mauritius with fleet browsing, chauffeur-guide transfers, island tours, 24/7 support, and WhatsApp-ready enquiry flows for Beau Vallon and beyond.",
      stack: ["Car Rental", "Fleet", "Tours", "WhatsApp"],
      href: "https://clairesailesh.com/",
      image: "/{4D01E58E-4F26-4EF5-80B0-16CB1127C2D4}.png",
    },
    {
      name: "Kohinoor Decorations",
      desc: "Wedding decoration website for Haldi, Mehendi, reception, and special events — with theme galleries, décor packages, and direct client enquiries across Mauritius.",
      stack: ["Weddings", "Décor", "Packages", "Website"],
      href: "https://kohinoordecorations.com/",
      image: "/{5CC72980-B43A-490B-9ACE-02375361D2DE}.png",
    },
    {
      name: "Lajoupa Restaurant",
      desc: "L'AJOUPA restaurant and bar site in Mahebourg with a full digital menu, drinks showcase, brand story, and call-to-book contact for dine-in and events.",
      stack: ["Restaurant", "Digital Menu", "Bar", "Mahebourg"],
      href: "https://lajoupa.com/",
      image: "/{C6BF91B8-5FE4-48A4-BE3E-03BCAA4879AF}.png",
    },
  ];

  return (
    <main className="min-h-screen text-white">
      <Hero />

      <Section
        id="services"
        eyebrow="Who are we and what services we offer"
        title="We analyse your needs, then build what grows your business"
        subtitle="We study how you work today, identify where automation saves time, and deliver custom apps plus websites that strengthen your online presence, so you can scale with less manual admin."
        topBlend
        headerFullWidth
      >
        <div className="grid gap-10">
          <ServicesProcessLine />
          <ServicesRangeIntro />
          <ServicesGrid services={services} />
        </div>
      </Section>

      <Section
        id="projects"
        eyebrow="Featured projects"
        title="Work that looks and feels premium"
        subtitle="Cinematic showcases with layered depth, modern stacks, and enterprise-ready UX."
        headerFullWidth
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
        id="testimonials"
        eyebrow="Testimonials"
        title="Words of praise about our work"
        subtitle="What clients say after we deliver automation, custom software, and premium digital experiences."
        headerFullWidth
      >
        <Testimonials />
      </Section>

      <Section
        id="faq"
        eyebrow="FAQ"
        title="How we can help your business"
        subtitle="Common questions about how we analyse your needs, build the right solution, and support you after launch."
      >
        <GlowCard className="p-0">
          <Accordion type="single" collapsible className="divide-y divide-white/10">
            {[
              {
                q: "How do you understand what our business actually needs?",
                a: "We start with a consultation to map your current workflows, pain points, and goals. From there, we identify where automation, custom software, or a stronger online presence will save time, reduce errors, and help you scale.",
              },
              {
                q: "What kind of problems can you help us solve?",
                a: "We help with manual admin, disconnected tools, slow operations, and lack of visibility. That includes ERP modules, booking platforms, POS systems, business automation, AI workflows, mobile apps, e-commerce, and premium websites tailored to how your team works.",
              },
              {
                q: "Can you automate tasks we currently do manually?",
                a: "Yes. We build automation for lead intake, booking confirmations, invoicing, reporting, follow-ups, WhatsApp workflows, and internal approvals. The goal is less repetitive work and more time for your team to focus on growth.",
              },
              {
                q: "Do you build both internal systems and customer-facing websites?",
                a: "Yes. We deliver back-office systems for operations and reporting, plus websites and digital presence that help you look professional online, showcase services, and convert more enquiries.",
              },
              {
                q: "What does your process look like from start to finish?",
                a: "We follow a clear path: Analyse, Plan, Design, Build, Test, Deploy, and Support. You stay involved at each stage so the final system matches your business, not a generic template.",
              },
              {
                q: "Can you work with tools we already use?",
                a: "In most cases, yes. We can integrate with spreadsheets, email, WhatsApp, payment providers, and existing platforms so your new system fits into your current operations instead of forcing a full restart.",
              },
              {
                q: "Do you provide support after the system goes live?",
                a: "Yes. We offer ongoing support, fixes, improvements, and feature updates so your system keeps running smoothly as your business grows.",
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
