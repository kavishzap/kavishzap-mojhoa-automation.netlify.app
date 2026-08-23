"use client"

import { HexagonPattern } from "@/components/ui/hexagon-pattern"
import { cn } from "@/lib/utils"

const accentHexagons: Array<[number, number]> = [
  [1, 1],
  [4, 3],
  [2, 4],
  [6, 2],
  [8, 5],
  [3, 6],
  [7, 1],
  [5, 5],
  [9, 3],
]

export function SectionHexagon({
  variant = "light",
  className,
}: {
  variant?: "light" | "dark" | "accent"
  className?: string
}) {
  return (
    <div
      className={cn("section-hexagon", `section-hexagon-${variant}`, className)}
      aria-hidden="true"
    >
      <HexagonPattern
        radius={38}
        gap={10}
        x={-1}
        y={-1}
        strokeDasharray="0"
        hexagons={accentHexagons}
        className={cn(
          "section-hexagon-svg",
          variant === "dark" && "section-hexagon-svg-dark",
          variant === "accent" && "section-hexagon-svg-accent"
        )}
      />
    </div>
  )
}
