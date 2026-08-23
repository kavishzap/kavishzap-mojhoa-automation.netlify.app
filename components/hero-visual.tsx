"use client"

import { motion, useReducedMotion } from "motion/react"
import { Sparkles, Zap } from "lucide-react"

import { AnimatedList } from "@/components/ui/animated-list"
import { BorderBeam } from "@/components/ui/border-beam"
import { Globe } from "@/components/ui/globe"
import { cn } from "@/lib/utils"

const heroBadges = [
  {
    name: "AI enabled",
    description: "Smarter workflows",
    icon: Sparkles,
    color: "#c6ef59",
    time: "Live",
  },
  {
    name: "Quick setup",
    description: "Ready to launch",
    icon: Zap,
    color: "#f47b42",
    time: "Fast",
  },
]

function HeroBadge({
  name,
  description,
  icon: Icon,
  color,
  time,
}: (typeof heroBadges)[number]) {
  return (
    <figure
      className={cn(
        "hero-float-card relative min-h-fit w-max max-w-[220px] overflow-hidden rounded-2xl p-3",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.08)]"
      )}
    >
      <div className="flex flex-row items-center gap-2.5">
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: color }}
        >
          <Icon size={16} color="#101d38" strokeWidth={2.4} />
        </div>
        <div className="flex min-w-0 flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center text-sm font-semibold whitespace-nowrap text-[#101d38]">
            <span>{name}</span>
            <span className="mx-1 text-[#b0b7c3]">·</span>
            <span className="text-[11px] font-medium text-[#778090]">{time}</span>
          </figcaption>
          <p className="text-xs font-normal text-[#687082]">{description}</p>
        </div>
      </div>
    </figure>
  )
}

export function HeroVisual() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="hero-visual-inner">
      <motion.div
        className="hero-image-frame"
        initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 28, delay: 0.15 }}
      >
        <motion.div
          className="hero-image-float"
          animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.9,
          }}
        >
          <div className="hero-image-shell">
            <img
              src="/hero1.png"
              alt="Mojhoa Automations POS, ERP, e-commerce and WhatsApp systems"
              className="hero-image"
            />
            <BorderBeam
              size={110}
              duration={8}
              borderWidth={2}
              colorFrom="#f47b42"
              colorTo="#c6ef59"
            />
          </div>
          <div className="hero-float-overlay" aria-hidden="true">
            <AnimatedList
              className="hero-float-list"
              delay={reduceMotion ? 0 : 1200}
              reverse={false}
            >
              {heroBadges.map((badge) => (
                <HeroBadge {...badge} key={badge.name} />
              ))}
            </AnimatedList>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export function HeroGlobe() {
  return (
    <div className="hero-globe" aria-hidden="true">
      <Globe className="hero-globe-canvas" />
      <div className="hero-globe-fade" />
    </div>
  )
}
