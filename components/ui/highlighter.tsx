"use client"

import { useEffect, useRef } from "react"
import type React from "react"
import { useInView } from "motion/react"
import { annotate } from "rough-notation"
import type { RoughAnnotation } from "rough-notation/lib/model"

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
  className?: string
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
  className,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const annotationRef = useRef<RoughAnnotation | null>(null)
  const drawnRef = useRef(false)

  const isInView = useInView(elementRef, {
    once: true,
    amount: 0.6,
    margin: "0px 0px -8% 0px",
  })

  const shouldShow = !isView || isInView

  useEffect(() => {
    const element = elementRef.current
    if (!shouldShow || !element || drawnRef.current) return

    let cancelled = false

    // Wait for reveal/layout to settle so annotation positions correctly once
    const timer = window.setTimeout(() => {
      if (cancelled || !elementRef.current || drawnRef.current) return

      annotationRef.current?.remove()
      const annotation = annotate(elementRef.current, {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      })

      annotationRef.current = annotation
      drawnRef.current = true
      annotation.show()
    }, 850)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ])

  useEffect(() => {
    return () => {
      annotationRef.current?.remove()
      annotationRef.current = null
    }
  }, [])

  return (
    <span ref={elementRef} className={className}>
      {children}
    </span>
  )
}
