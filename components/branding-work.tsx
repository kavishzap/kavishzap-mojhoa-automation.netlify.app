"use client";

import { SectionHeader } from "@/components/section-header";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const LAJOUPA_IMAGES = [
  "/lajoupa/ChatGPT Image Feb 25, 2026, 10_47_44 PM.png",
  "/lajoupa/ChatGPT Image Feb 25, 2026, 10_55_36 PM.png",
  "/lajoupa/ChatGPT Image Feb 25, 2026, 12_18_49 AM.png",
];

export function BrandingWork() {
  return (
    <section
      id="branding"
      className="py-20 md:py-32 -mt-20 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="What We Do"
          title="Our Branding Work"
          description="Visual identity and branding projects we've delivered for our clients."
        />

        <div className="space-y-10">
          <div>
            <h3 className="font-heading font-semibold text-xl md:text-2xl mb-3 text-foreground">
              Branding of L&apos;Ajoupa restaurant:
            </h3>
            <Link
              href="https://lajoupa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              lajoupa.com
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:grid-rows-2">
            {/* First image: full height on the left; on mobile show full image (natural height) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="relative overflow-hidden rounded-xl border border-border/50 bg-muted/30 w-full md:col-start-1 md:row-start-1 md:row-span-2 md:min-h-0 md:aspect-auto"
            >
              {/* Mobile: full width, natural height so entire image shows */}
              <div className="relative w-full md:hidden">
                <Image
                  src={LAJOUPA_IMAGES[0]}
                  alt="L'joupa branding 1"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  sizes="100vw"
                />
              </div>
              {/* Desktop: fill with object-cover */}
              <div className="hidden md:block absolute inset-0">
                <Image
                  src={LAJOUPA_IMAGES[0]}
                  alt="L'joupa branding 1"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="50vw"
                />
              </div>
            </motion.div>
            {/* Second image: top right */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="relative overflow-hidden rounded-xl border border-border/50 bg-muted/30 min-h-[200px] md:min-h-0 md:col-start-2 md:row-start-1 aspect-[4/3] w-full"
            >
              <Image
                src={LAJOUPA_IMAGES[1]}
                alt="L'joupa branding 2"
                fill
                className="object-contain md:object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            {/* Third image: bottom right */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="relative overflow-hidden rounded-xl border border-border/50 bg-muted/30 min-h-[200px] md:min-h-0 md:col-start-2 md:row-start-2 aspect-[4/3] w-full"
            >
              <Image
                src={LAJOUPA_IMAGES[2]}
                alt="L'joupa branding 3"
                fill
                className="object-contain md:object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
