"use client";

import type React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function Contact() {
  const ME = {
    name: "Kavish",
    title: "Owner • Software Developer",
    photo: "/Gemini_Generated_Image_frjtbofrjtbofrjt.png", // change to your real image when ready
    email: "kavish17mojhoa@gmail.com",
    phone: "+230 5182 2520",
    whatsapp: "23059182520",
    location: "Beau Vallon, Mauritius",
    hours: "Mon–Fri: 9am–6pm • Sat: 10am–2pm (GMT+4)",
  };

  return (
    <section id="contact" className="py-20 md:py-32 -mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Get In Touch"
          title="Contact Us"
          description="Tell us your challenge; we'll automate it. Let's discuss how we can transform your business."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10"
        >
          {/* LEFT CARD — Contact Info */}
          <Card className="p-6 md:p-8 border-border/50 space-y-6 text-center">
            <p className="text-muted-foreground max-w-md mx-auto">
              Reach out for partnerships, projects, or questions — we respond quickly.
            </p>

            <div className="space-y-3">
              <div className="flex justify-center gap-3 items-center">
                <Mail className="h-5 w-5 text-primary" />
                <a
                  href={`mailto:${ME.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {ME.email}
                </a>
              </div>

              <div className="flex justify-center gap-3 items-center">
                <Phone className="h-5 w-5 text-primary" />
                <a
                  href={`tel:${ME.phone.replace(/\s+/g, "")}`}
                  className="hover:text-primary transition-colors"
                >
                  {ME.phone}
                </a>
              </div>

              <div className="flex justify-center gap-3 items-center">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">{ME.location}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 space-y-3">
              <Button
                asChild
                size="lg"
                className="w-full gradient-sunset text-white border-0"
              >
                <a
                  href={`https://wa.me/${ME.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Call / WhatsApp Us
                </a>
              </Button>

              <Button asChild variant="outline" size="lg" className="w-full">
                <a href={`mailto:${ME.email}`}>Send Email</a>
              </Button>
            </div>

            {/* Hours */}
            <div className="pt-4 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 inline-block mr-2" />
              {ME.hours}
            </div>
          </Card>

          {/* RIGHT CARD — Only Photo (responsive fix) */}
          <Card className="p-4 sm:p-6 flex items-center justify-center rounded-lg shadow-sm border-border/50">
            <div
              className="
                relative
                w-full
                max-w-[320px]
                sm:max-w-[380px]
                aspect-[3/4]
                md:max-w-none md:w-80 md:aspect-[3/4]
                mx-auto
                rounded-xl overflow-hidden ring-1 ring-border/40 bg-muted group
              "
            >
              <Image
                src={ME.photo}
                alt={`${ME.name} headshot`}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                quality={100}
                // Serve a big mobile width, then a fixed ~20rem on desktop
                sizes="(max-width: 768px) 90vw, 20rem"
                priority
              />
              <span className="absolute bottom-2 left-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full shadow">
                Owner
              </span>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
