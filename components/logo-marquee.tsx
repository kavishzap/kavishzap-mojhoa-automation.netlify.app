"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Client {
  name: string;
  logo: string;
}

interface LogoMarqueeProps {
  clients: Client[];
}

export function LogoMarquee({ clients }: LogoMarqueeProps) {
  return (
    <div className="relative overflow-hidden py-6">
      {/* Animation container */}
      <motion.div
        className="flex gap-12 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: -300, right: 300 }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 12, ease: "linear", repeat: Infinity }}
        whileHover={{ scale: 1.02 }}
        onDragStart={(e) => e.stopPropagation()}
      >
        {[...clients, ...clients].map((client, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0"
            whileHover={{ scale: 1.08 }} // zoom each logo on hover
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          >
            <div className="relative w-28 h-14 sm:w-36 sm:h-16 md:w-44 md:h-20">
              <Image
                src={client.logo || "/placeholder.svg"}
                alt={client.name}
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Soft gradient edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
}
