"use client";

import { motion } from "framer-motion";

export interface LogoMarqueeProps {
  clientNames: string[];
}

export function LogoMarquee({ clientNames }: LogoMarqueeProps) {
  const duplicated = [...clientNames, ...clientNames];

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-6 sm:gap-8 md:gap-10 cursor-grab active:cursor-grabbing items-center"
        drag="x"
        dragConstraints={{ left: -300, right: 300 }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        whileHover={{ scale: 1.005 }}
        onDragStart={(e) => e.stopPropagation()}
      >
        {duplicated.map((name, index) => (
          <motion.div
            key={`${name}-${index}`}
            className="flex-shrink-0"
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
          >
            <span
              className="
                font-tourney text-base sm:text-lg md:text-xl font-semibold tracking-tight
                px-5 py-2.5 sm:px-6 sm:py-3
                rounded-full
                border border-border/80 bg-background/80 dark:bg-card/80
                text-muted-foreground
                hover:text-foreground hover:border-primary/40 hover:shadow-md
                transition-all duration-300 whitespace-nowrap
              "
            >
              {name}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute inset-y-0 left-0 w-24 md:w-32 bg-gradient-to-r from-card/80 via-card/50 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-32 bg-gradient-to-l from-card/80 via-card/50 to-transparent pointer-events-none" />
    </div>
  );
}
