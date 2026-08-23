"use client"

import { Check, MoveRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

type Solution = {
  title: string
  key: string
  color: string
  desc: string
  features: string[]
  visual: string
  image?: string
}

function Mockup({
  label,
  variant = "dashboard",
  className = "",
}: {
  label: string
  variant?: string
  className?: string
}) {
  return (
    <div className={`mockup ${variant} ${className}`}>
      <div className="mockup-bar">
        <span />
        <span />
        <span />
        <b>{label}</b>
      </div>
      <div className="mockup-content">
        <div className="mockup-sidebar">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="mockup-main">
          <div className="mockup-title">
            <strong>{label}</strong>
            <em>● LIVE</em>
          </div>
          <div className="mockup-metrics">
            <span />
            <span />
            <span />
          </div>
          <div className="mockup-chart">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="mockup-rows">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  )
}

function demoButtonClass(color: string) {
  if (color === "white") return "button button-dark solution-demo"
  if (color === "navy") return "button button-lime solution-demo"
  return "button button-light solution-demo"
}

function SolutionCard({
  solution,
  index,
  reduceMotion,
}: {
  solution: Solution
  index: number
  reduceMotion: boolean
}) {
  return (
    <motion.article
      className={`solution-detail ${solution.color}`}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 36 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4, margin: "0px 0px -60px 0px" }}
      transition={{ type: "spring", stiffness: 380, damping: 34 }}
    >
      <div className={`solution-detail-head ${solution.color}`}>
        <p className="eyebrow">
          {index === 5
            ? "FLAGSHIP SYSTEM"
            : "DIGITAL SOLUTION"}{" "}
          <span />
        </p>
        <h3>{solution.title}</h3>
        <p>{solution.desc}</p>
        <div className="feature-list">
          {solution.features.map((feature) => (
            <span key={feature}>
              <Check size={15} />
              {feature}
            </span>
          ))}
        </div>
        <a className={demoButtonClass(solution.color)} href="#contact">
          Request Demo <MoveRight size={17} />
        </a>
      </div>
      {solution.image ? (
        <img
          src={solution.image}
          alt={solution.title}
          className="solution-image framed"
        />
      ) : (
        <Mockup label={solution.visual} variant={solution.key} />
      )}
    </motion.article>
  )
}

export function SolutionsStack({ solutions }: { solutions: Solution[] }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="container solution-stack">
      {solutions.map((solution, index) => (
        <SolutionCard
          key={solution.key}
          solution={solution}
          index={index}
          reduceMotion={reduceMotion ?? false}
        />
      ))}
    </div>
  )
}
