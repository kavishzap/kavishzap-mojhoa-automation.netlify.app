"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import Image from "next/image";
import { Check, MessageSquare } from "lucide-react";
import Link from "next/link";
import { event } from "@/components/analytics";
import { useCallback, useEffect, useState } from "react";

interface Product {
  title: string;
  description: string;
  image: string;
  price: string;
  features: string[];
}

const products: Product[] = [
  {
    title: "Car Rental Management System",
    description:
      "A complete digital solution to manage your car rental business efficiently. From vehicle tracking to contract management and revenue monitoring, everything is centralized in one powerful and easy-to-use platform.",
    image: "/poster/car.png",
    price: "Rs 25,000 (lifetime license) or 1,500 Monthly",
    features: [
      "Vehicle & Fleet Management",
      "Contract Creation with Digital Signature",
      "Customer & Driver Management",
      "Real-time Booking & Availability Tracking",
      "Revenue Dashboard & Financial Reports",
      "Add-ons & Extra Services Management",
      "Deposit & Payment Tracking",
      "Automated Invoice Generation",
    ],
  },
  {
    title: "Smart Invoice Management System",
    description:
      "A modern invoicing solution built to simplify billing, track payments, and manage customers effortlessly. Create professional invoices in seconds while keeping full control of your sales and cash flow.",
    image: "/poster/inv.png",
    price: "Rs 10,000 (lifetime license) or 1,500 Monthly",
    features: [
      "Create & Send Professional Invoices",
      "Customer Management",
      "Payment Status Tracking (Paid / Unpaid)",
      "Automatic Invoice Numbering",
      "PDF Download & Sharing",
      "Sales Summary Dashboard",
      "Tax & Discount Support",
      "Simple Reports for Business Owners",
    ],
  },
  {
    title: "All-In-One Gym Management System",
    description:
      "A complete gym management platform designed to handle members, workouts, diet plans, payments, and bookings — all from one powerful dashboard. Built to help gym owners save time, increase revenue, and deliver a better member experience.",
    image: "/poster/gym.png",
    price: "Rs 60,000 (lifetime license)",
    features: [
      "Member Management & Profiles",
      "Workout & Training Templates",
      "Smart Diet Planning System",
      "Membership Plans & Payments Tracking",
      "Class Scheduling & Service Bookings",
      "Admin Dashboard with Revenue Insights",
      "Attendance & Active Member Monitoring",
      "Multi-User Support for Staff",
    ],
  },
];

const AUTOPLAY_DELAY_MS = 6000;

export function Products() {
  const [api, setApi] = useState<CarouselApi>(undefined);
  const [current, setCurrent] = useState(0);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      scrollNext();
    }, AUTOPLAY_DELAY_MS);
    return () => clearInterval(interval);
  }, [api, scrollNext]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section
      id="products"
      className="py-20 md:py-32 -mt-20 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          kicker="What We Offer"
          title="Our Products"
          description="Discover our range of powerful solutions designed to transform your business operations and drive success."
        />

        <div className="relative">
          <Carousel
            opts={{ loop: true, align: "start" }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {products.map((product, index) => (
                <CarouselItem key={product.title} className="pl-0">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="group overflow-hidden border-border/50 hover:shadow-xl transition-all duration-300">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Left: Image */}
                        <div className="relative w-full overflow-hidden bg-muted/30 flex items-center justify-center min-h-[320px] lg:min-h-[420px]">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            width={800}
                            height={1200}
                            className="w-full h-auto max-h-[500px] object-contain group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10 lg:to-transparent pointer-events-none" />
                        </div>

                        {/* Right: Description */}
                        <div className="p-6 lg:p-8 flex flex-col justify-center">
                          <div className="space-y-4">
                            <h3 className="font-heading font-semibold text-xl lg:text-2xl group-hover:text-primary transition-colors">
                              {product.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {product.description}
                            </p>
                          </div>

                          <div className="space-y-2 mt-4 flex-1">
                            {product.features.slice(0, 5).map((feature, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-sm"
                              >
                                <div className="w-5 h-5 rounded-full gradient-sunset flex items-center justify-center flex-shrink-0">
                                  <Check className="h-3 w-3 text-white" />
                                </div>
                                <span className="text-muted-foreground">
                                  {feature}
                                </span>
                              </div>
                            ))}
                            {product.features.length > 5 && (
                              <p className="text-sm text-muted-foreground/80 pl-7">
                                +{product.features.length - 5} more features
                              </p>
                            )}
                          </div>

                          <div className="pt-6 mt-4 border-t border-border/50 space-y-4">
                            <div>
                              <span className="text-sm text-muted-foreground">
                                Price
                              </span>
                              <div className="text-xl lg:text-2xl font-bold gradient-text">
                                {product.price}
                              </div>
                            </div>
                            <Button
                              asChild
                              className="w-full sm:w-auto gradient-sunset text-white border-0 group/btn"
                              size="lg"
                              onClick={() => {
                                event({
                                  action: "click",
                                  category: "Product",
                                  label: `Get Quote - ${product.title}`,
                                });
                              }}
                            >
                              <Link href="#contact">
                                <MessageSquare className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                                Get a Quote
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-2 lg:-left-12 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="right-2 lg:-right-12 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {products.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to product ${index + 1}`}
                onClick={() => api?.scrollTo(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  current === index
                    ? "bg-primary scale-125"
                    : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
