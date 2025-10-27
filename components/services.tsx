"use client"

import { Card } from "@/components/ui/card"
import { SectionHeader } from "@/components/section-header"
import { UtensilsCrossed, Calendar, Database, Globe, Check } from "lucide-react"
import { motion } from "framer-motion"

const services = [
  {
    icon: UtensilsCrossed,
    title: "Restaurant Automation",
    description:
      "Transform your restaurant operations with intelligent automation that increases efficiency and customer satisfaction.",
    features: [
      "QR code digital menus",
      "Kitchen display system",
      "POS integration & sync",
      "Real-time analytics dashboard",
    ],
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Calendar,
    title: "Event Management System",
    description:
      "Comprehensive event solutions from ticketing to check-in, designed to handle events of any scale seamlessly.",
    features: [
      "Online ticketing & payments",
      "QR code check-in system",
      "Seating & capacity management",
      "Attendee analytics & reports",
    ],
    color: "from-blue-500 to-purple-500",
  },
  {
    icon: Database,
    title: "ERP System",
    description:
      "Enterprise resource planning solutions that unify your business operations into one powerful, integrated system.",
    features: [
      "Inventory & supply chain",
      "Finance & accounting modules",
      "Business workflow automation",
      "Role-based system access",
    ],
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Globe,
    title: "Corporate Website",
    description:
      "Lightning-fast, SEO-optimized websites built with modern frameworks that tell your brand story and drive conversions.",
    features: [
      "Custom web development",
      "SEO optimization & analytics",
      "Headless CMS integration",
      "Brand storytelling & design",
    ],
    color: "from-pink-500 to-rose-500",
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32 -mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="What We Do"
          title="Services"
          description="Specialized automation and software solutions tailored to your industry's unique challenges."
        />

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 border-border/50 group">
                <div className="space-y-6">

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="font-heading font-bold text-2xl group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 md:p-12"
        >
          <h3 className="font-heading font-bold text-2xl md:text-3xl text-center mb-8">
            What You Get With Every Project
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Custom Development", value: "100%" },
              { label: "Mobile Responsive", value: "Always" },
              { label: "Support & Maintenance", value: "24/7" },
              { label: "Deployment Assistance", value: "Included" },
            ].map((item) => (
              <div key={item.label} className="text-center space-y-2">
                <div className="text-3xl font-bold gradient-text">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
