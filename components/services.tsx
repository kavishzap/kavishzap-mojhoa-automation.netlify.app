"use client"

import { Card } from "@/components/ui/card"
import { SectionHeader } from "@/components/section-header"
import { Layers, Building2, Globe, Users, Check } from "lucide-react"
import { motion } from "framer-motion"

const services = [
  {
    icon: Layers,
    title: "Custom ERP & Business Automation Systems",
    description:
      "Enterprise resource planning solutions that unify your business operations into one powerful, integrated system with intelligent automation.",
    features: [
      "Inventory & supply chain management",
      "Finance & accounting modules",
      "Business workflow automation",
      "Role-based system access & permissions",
    ],
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Building2,
    title: "Restaurant, POS & Event Management Platforms",
    description:
      "Comprehensive solutions for restaurants and events - from POS systems to ticketing platforms, designed to handle operations seamlessly.",
    features: [
      "Point of Sale (POS) systems",
      "Restaurant automation & kitchen display",
      "Event ticketing & QR check-in",
      "Real-time analytics & reporting",
    ],
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Globe,
    title: "Corporate Websites & Personal Portfolio Development",
    description:
      "Lightning-fast, SEO-optimized websites built with modern frameworks that tell your brand story and drive conversions.",
    features: [
      "Custom web development",
      "SEO optimization & analytics",
      "Portfolio & showcase websites",
      "Brand storytelling & design",
    ],
    color: "from-blue-500 to-purple-500",
  },
  {
    icon: Users,
    title: "Management & Back Office Systems",
    description:
      "Powerful back-office solutions designed to streamline operations, manage resources, and provide comprehensive control over your business processes.",
    features: [
      "Customer & member management",
      "Booking & scheduling systems",
      "Payment tracking & invoicing",
      "Admin dashboards & reporting",
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
