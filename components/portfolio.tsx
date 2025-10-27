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
    title: "Corporate Website for Deloitte",
    category: "Corporate",
    image: "/deloitte.png",
    url: "https://www.dboard.lu/",
    result: "Better Customer Reach",
    tech: [
      "Positions the Brand as Premium",
      "Helps visitors immediately understand the product’s value",
    ],
  },
  {
    title: "All in one Sales, Expense, Accounting ERP system",
    category: "ERP",
    image: "/zacc.png",
    url: "https://zaccboxv2test.netlify.app/PnL",
    result: "10K+ tickets sold",
    tech: [
      "Complete visibility across sales, expenses & accounts",
      "Automated reporting for faster decision-making",
      "Scales as your business grows",
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
    url: "https://roaring-truffle-940e53.netlify.app/",
    result: "Faster order processing & reduced wait times",
    tech: [
      "Digital menu with category-based filtering",
      "Customer cart & order customization (extra cheese, spice level, etc.)",
      "Order summary with name / table number before checkout",
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
    <section id="portfolio" className="py-20 md:py-32 bg-muted/30 -mt-20">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Visit Site Button */}
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

                    {/* View Implementation Button (only if images exist) */}
                    {item.images && item.images.length > 1 && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full gradient-sunset text-white border-white/40 hover:bg-white/20"
                        onClick={() => openViewer(item.images!)}
                      >
                        View Implementation
                      </Button>
                    )}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-heading font-semibold text-lg group-hover:text-primary transition-colors">
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
                      <Badge key={tech} variant="secondary" className="text-xs">
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
      {showViewer && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[999] flex items-center justify-center">
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setShowViewer(false)}
          >
            ✕
          </button>

          <div className="flex items-center gap-6">
            <button
              onClick={() =>
                setSlideIndex(
                  (slideIndex - 1 + activeImages.length) % activeImages.length
                )
              }
              className="text-white text-4xl px-4"
            >
              ‹
            </button>

            <div className="relative w-[80vw] max-w-4xl aspect-video">
              <Image
                src={activeImages[slideIndex]}
                alt="Implementation Preview"
                fill
                className="object-contain rounded-lg"
              />
            </div>

            <button
              onClick={() =>
                setSlideIndex((slideIndex + 1) % activeImages.length)
              }
              className="text-white text-4xl px-4"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
