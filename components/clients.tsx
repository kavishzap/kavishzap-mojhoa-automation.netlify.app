"use client";

import { SectionHeader } from "@/components/section-header";
import { LogoMarquee } from "@/components/logo-marquee";

const clientNames = [
  "Claire & Sailesh",
  "Zeko",
  "Native Lodge",
  "L'Ajoupa",
  "Pot Au Feu",
  "Kohinoor Decorations",
  "DS Events",
];

export function Clients() {
  return (
    <section id="clients" className="py-20 md:py-32 bg-muted/30 -mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Trusted By"
          title="Our Clients"
          description="Businesses that trust us to power their operations and digital presence."
        />

        <div className="relative rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm py-8 md:py-10 px-4 shadow-inner">
          <LogoMarquee clientNames={clientNames} />
        </div>
      </div>
    </section>
  );
}
