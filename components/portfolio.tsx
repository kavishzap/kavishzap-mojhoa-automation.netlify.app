"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, TrendingUp } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { motion } from "framer-motion";
import Image from "next/image";

type Category = "All" | "Restaurants" | "Events" | "ERP" | "Corporate";

interface PortfolioItem {
  title: string;
  category: Category;
  image: string;
  url: string;
  result: string;
  tech: string[];
  images?: string[];
}

const portfolioItems: PortfolioItem[] = [
  {
    title: "Point of Sale Management System",
    category: "Restaurants",
    image: "/pos.png",
    url: "https://posmanagementsystem.netlify.app/",
    images: ["/pos1.png", "/pos2.jpg", "/pos3.jpg"],
    result: "+50% table turnover",
    tech: [
      "Inventory Management",
      "Product Management ",
      "Integrated mobile app connected to Thermal printer",
    ],
  },
  {
    title: "Invoicing App for Companies",
    category: "ERP",
    image: "/invoice1.png",
    url: "https://invoicepilotapp.netlify.app/",
    result: "60% faster workflows",
    tech: ["Custom Invoices", "Customer Management", "template selection"],
  },
  {
    title: "Corporate Website for Zaccbox App",
    category: "Corporate",
    image: "/zaccbox.png",
    url: "https://zaccbox.com/",
    result: "Better Customer Reach",
    tech: ["Clear Value Proposition", "Builds Trust & Credibility"],
  },
  {
    title: "Noudeal Event Management Website",
    category: "Events",
    image: "/nourb.png",
    url: "https://backofficenoudeal.netlify.app",
    result:
      "Streamlined event management, improved customer engagement, and enhanced booking experience",
    tech: [
      "Next.js + Tailwind UI",
      "Secure event back-office dashboard",
      "Customer and booking management system",
      "Modern UX for seamless event browsing & ticketing",
    ],
  },
  {
    title: "Noudeal Ticketing Platform",
    category: "Events",
    image: "/noudeal.png",
    url: "https://ticketnoudeal.netlify.app/",
    result: "10,000+ tickets processed and streamlined event operations",
    tech: [
      "Next.js & Tailwind UI",
      "Real-time ticket sales & attendee analytics",
      "Integrated expenses, accounting, and payouts dashboard",
      "Automated financial reporting for event organizers",
    ],
  },
  {
    title: "University of Mauritius Hackathon Website",
    category: "Corporate",
    image: "/code.png",
    url: "https://code4good2025.netlify.app/",
    result: "350+ participants managed",
    tech: [
      "Easy online registration process",
      "Automated team & participant management",
      "Clear event schedule and information access",
    ],
  },
  {
    title: "Car Rental Contract Automation System",
    category: "ERP",
    image: "/carrental.png",
    url: "https://car-rental-sailesh.netlify.app/reports",
    result: "End-to-end rental operations digitized and automated",
    tech: [
      "Next.js & Tailwind UI",
      "Digital contract generation with e-signatures",
      "Automated pricing, invoicing & fleet management",
      "Real-time reporting and customer tracking",
    ],
  },
  {
    title: "ZaccBox Business Management Suite",
    category: "ERP",
    image: "/zbc.png",
    url: "zbc.png",
    result: "End-to-end business operations streamlined for SMEs",
    tech: [
      "Next.js & Tailwind UI",
      "Supabase authentication & data storage",
      "Invoice & expense automation",
      "Real-time dashboards & financial reporting",
    ],
  },
  {
    title: "Zeko Event Booking Platform",
    category: "Events",
    image: "/zeko.jpg",
    url: "https://zekomru.com/",
    result: "600+ bookings processed",
    tech: [
      "Seamless online ticket purchasing",
      "QR-based entry & on-site scanning",
      "Real-time sales dashboard for organizers",
    ],
  },
  {
    title: "Restaurant Website with Online Menu",
    category: "Restaurants",
    image: "/lajoupa.png",
    url: "https://lajoupa.netlify.app/",
    result: "Faster order processing & reduced wait times",
    tech: [
      "Digital menu with category-based filtering",
      "Customer cart & order customization (extra cheese, spice level, etc.)",
      "Order summary with name / table number before checkout",
    ],
  },
  {
    title: "Mantra Connexions Website",
    category: "Corporate",
    image: "/mantra.png",
    url: "https://mantraconnexions.netlify.app/",
    result:
      "Enhanced brand visibility and client engagement for the service business",
    tech: [
      "Next.js & Tailwind UI",
      "Responsive service-profile site with dynamic content",
      "SEO-optimised pages and performance enhancements",
      "Contact form integration & lead capture analytics",
    ],
  },
  {
    title: "Native Lodge User Wallet",
    category: "Restaurants",
    image: "/image.png",
    url: "https://native-lodge-user-wallet.netlify.app/dashboard",
    result:
      "Enhanced brand visibility and client engagement for the service business",
    tech: [
      "Next.js + Tailwind CSS",
      "Wallet dashboard with balance & transaction history",
      "Secure auth & real-time updates via API",
      "QR payment system integration & analytics",
    ],
  },
];

const categories: Category[] = [
  "All",
  "Restaurants",
  "Events",
  "ERP",
  "Corporate",
];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);
  const [showViewer, setShowViewer] = useState(false);
  const [activeImages, setActiveImages] = useState<string[]>([]);
  const [slideIndex, setSlideIndex] = useState(0);

  const openViewer = (images: string[]) => {
    setActiveImages(images);
    setSlideIndex(0);
    setShowViewer(true);
  };
  return (
    <section
      id="portfolio"
      className="py-20 md:py-32 bg-muted/30 -mt-20 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="Some of our Our Work"
          title="Portfolio"
          description="Explore our some of our successful projects across industries. Each solution is custom-built to drive measurable results."
        />

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category
                  ? "gradient-sunset text-white border-0"
                  : ""
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="min-w-0" // ← ensure child can shrink inside grid cell
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 w-full min-w-0">
                <div className="relative aspect-video overflow-hidden min-w-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Mobile external link icon */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${item.title}`}
                    className="md:hidden absolute top-2 right-2 z-20 bg-black/70 text-white p-2 rounded-full backdrop-blur-sm touch-manipulation"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>

                  {/* Make the gradient ignore taps/clicks */}
                  <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Keep desktop CTA above the gradient too */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      asChild
                      size="sm"
                      className="w-full text-white border-0 mb-2"
                    >
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Site
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="p-6 space-y-4 min-w-0">
                  {" "}
                  {/* ← prevent inner text from forcing width */}
                  <div className="space-y-2 min-w-0">
                    <h3 className="font-heading font-semibold text-lg group-hover:text-primary transition-colors break-words">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="font-medium text-green-500">
                        {item.result}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs max-w-full break-words"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Viewer unchanged (you already constrained it with p-4 and max-w-4xl) */}
      {showViewer && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[999] flex items-center justify-center p-4">
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setShowViewer(false)}
            aria-label="Close viewer"
          >
            ✕
          </button>

          <div className="relative w-full max-w-4xl">
            <button
              onClick={() =>
                setSlideIndex(
                  (slideIndex - 1 + activeImages.length) % activeImages.length
                )
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-4xl px-2"
              aria-label="Previous"
            >
              ‹
            </button>

            <div className="relative mx-10 sm:mx-12 aspect-video">
              <Image
                src={activeImages[slideIndex]}
                alt="Implementation Preview"
                fill
                className="object-contain rounded-lg"
                sizes="100vw"
              />
            </div>

            <button
              onClick={() =>
                setSlideIndex((slideIndex + 1) % activeImages.length)
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-4xl px-2"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
