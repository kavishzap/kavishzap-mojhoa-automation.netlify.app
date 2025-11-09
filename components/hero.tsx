"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Zap,
  Users,
  Clock,
  Building2,
  Layers,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/animated-counter";
import Logo from "../assets/mojhoa_whiteMO.png";
import Image from "next/image";
const stats = [
  { value: 20, suffix: "+", label: "Projects Delivered" },
  { value: 15, suffix: "+", label: "Happy Clients" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden -mt-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Zap className="h-4 w-4" />
                  Enterprise Automation Solutions
                </span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
                 Mojhoa <span className="gradient-text">Automations.</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty max-w-2xl">
                We design high-impact Web, ERP, POS & Event Systems in Mauritius and enterprise-grade
                systems that transform how businesses operate.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
              {/* Left: Logo */}
              <div className="flex justify-center md:justify-start">
                <Image
                  src={Logo}
                  alt="Mojhoa Automations Logo"
                  className="w-45 h-45 object-contain rounded-lg"
                  priority
                />
              </div>

              {/* Right: Buttons stacked */}
              <div className="flex flex-col gap-4 w-full max-w-xs">
                <Button
                  asChild
                  size="lg"
                  className="gradient-sunset text-white border-0 group w-full"
                >
                  <Link href="#portfolio">
                    View Portfolio
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-8 flex justify-center"
                >
                  <div className="grid grid-cols-3 gap-6 text-center">
                    {stats.map((stat, index) => (
                      <div key={index} className="space-y-1">
                        <div className="text-2xl md:text-3xl font-bold gradient-text">
                          <AnimatedCounter
                            value={stat.value}
                            suffix={stat.suffix}
                          />
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Trust Stats */}
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative hidden lg:block"
          >
            <div className="relative ">
              {/* Main Card */}
              <div className="glass rounded-2xl p-8 space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      System Status
                    </div>
                    <div className="text-2xl font-bold">
                      All Systems Operational
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-green-500 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      icon: Building2,
                      label: "Restaurant, Event Management Systems",
                    },
                    {
                      icon: Globe,
                      label: "Corporate Website and Personal Portfolio",
                    },
                    { icon: Layers, label: "Custom ERP Solutions" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-xl bg-background/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg gradient-sunset flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-medium">{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-6 -right-6 w-32 h-32 glass rounded-2xl p-4 flex flex-col items-center justify-center"
              >
                <div className="text-3xl font-bold gradient-text">24/7</div>
                <div className="text-xs text-center text-muted-foreground">
                  Support
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -bottom-6 -left-6 w-32 h-32 glass rounded-2xl p-4 flex flex-col items-center justify-center"
              >
                <div className="text-3xl font-bold gradient-text">100%</div>
                <div className="text-xs text-center text-muted-foreground">
                  Custom Built
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
