"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SectionHeader } from "@/components/section-header"
import { Star } from "lucide-react"
import { motion } from "framer-motion"
import { LogoMarquee } from "@/components/logo-marquee"

const clients = [
  { name: "Zapproach", logo: "/{AB7F8A45-B590-4AD9-8589-F0912649688E}.png" },
  { name: "Klanik", logo: "/klanik.png" },
  { name: "Deloitte", logo: "/deloitte1.png" },
  { name: "Nx2Square", logo: "/nx.png" },
  { name: "ZekoMru", logo: "/zeko.png" },
  { name: "Uom Oracle Club", logo: "/upm.png" },
]

export function Clients() {
  return (
    <section id="clients" className="py-20 md:py-32 bg-muted/30 -mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Trusted By"
          title="Our Clients"
          description="15+ businesses that trust us to power their operations and digital presence."
        />

        {/* Logo Marquee */}
        <div className="mb-20">
          <LogoMarquee clients={clients} />
        </div>
      </div>
    </section>
  )
}
