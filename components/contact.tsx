"use client";

import type React from "react";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionHeader } from "@/components/section-header";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import Image from "next/image";

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-20 md:py-32 -mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Get In Touch"
          title="Contact Us"
          description="Tell us your challenge; we'll automate it. Let's discuss how we can transform your business."
        />
        <div className="flex justify-center -mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-lg"
          >
            <Card className="p-6 md:p-8 border-border/50 space-y-6 text-center">
              {/* Contact Details */}
              <div className="space-y-6 text-center">
                <p className="text-muted-foreground max-w-md mx-auto">
                  Reach out for partnerships, projects, or questions — we
                  respond quickly.
                </p>

                <div className="space-y-3">
                  <div className="flex justify-center gap-3 items-center">
                    <Mail className="h-5 w-5 text-primary" />
                    <a
                      href="mailto:kavish17mojhoa@gmail.com"
                      className="hover:text-primary transition-colors"
                    >
                      kavish17mojhoa@gmail.com
                    </a>
                  </div>

                  <div className="flex justify-center gap-3 items-center">
                    <Phone className="h-5 w-5 text-primary" />
                    <a
                      href="tel:+23059182520"
                      className="hover:text-primary transition-colors"
                    >
                      +230 5182 2520
                    </a>
                  </div>

                  <div className="flex justify-center gap-3 items-center">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">
                      Beau Vallon, Mauritius
                    </span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="pt-4 space-y-3">
                  <Button
                    asChild
                    size="lg"
                    className="w-full gradient-sunset text-white border-0"
                  >
                    <a
                      href="https://wa.me/2305123456"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Call / WhatsApp Us
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    <a href="mailto:hello@mojhoa.com">Send Email</a>
                  </Button>
                </div>

                {/* Hours */}
                <div className="pt-4 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 inline-block mr-2" />
                  Mon–Fri: 9am–6pm • Sat: 10am–2pm (GMT+4)
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
