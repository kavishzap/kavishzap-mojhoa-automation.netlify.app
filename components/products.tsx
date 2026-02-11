"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import { motion } from "framer-motion";
import Image from "next/image";
import { Check, MessageSquare } from "lucide-react";
import Link from "next/link";
import { event } from "@/components/analytics";

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
        description: "A complete digital solution to manage your car rental business efficiently. From vehicle tracking to contract management and revenue monitoring, everything is centralized in one powerful and easy-to-use platform.",
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
            "Automated Invoice Generation"
        ],
    },
    {
        title: "Smart Invoice Management System",
        description: "A modern invoicing solution built to simplify billing, track payments, and manage customers effortlessly. Create professional invoices in seconds while keeping full control of your sales and cash flow.",
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
            "Simple Reports for Business Owners"
        ],
    },
    {
        title: "All-In-One Gym Management System",
        description: "A complete gym management platform designed to handle members, workouts, diet plans, payments, and bookings — all from one powerful dashboard. Built to help gym owners save time, increase revenue, and deliver a better member experience.",
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
            "Multi-User Support for Staff"
        ],
    }
    ,
    {
        title: "Smart Point of Sale (POS) System",
        description: "A modern POS solution designed for restaurants, retail shops, and service businesses. Easily manage sales, products, customers, and daily reports with a fast, touch-friendly interface built for real-world operations.",
        image: "/poster/pos.png",
        price: "Rs 25,000 (lifetime) or Rs 1,500 / month",
        features: [
            "Touch-Friendly Sales Interface",
            "Product & Category Management",
            "Quick Billing & Cart System",
            "Customer Management",
            "Daily Sales Summary & Reports",
            "Invoice Printing (Thermal Printer Ready)",
            "Offline Mode with Auto Sync",
            "Kitchen Display Screen (KDS) Support"
        ],
    }

];

export function Products() {
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

                {/* Products Grid - 2x2 */}
                <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 h-full flex flex-col">
                                {/* Product Image */}
                                <div className="relative w-full overflow-hidden bg-muted/30 flex items-center justify-center min-h-[300px]">
                                    <Image
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.title}
                                        width={800}
                                        height={1200}
                                        className="w-full h-auto max-h-[500px] object-contain group-hover:scale-105 transition-transform duration-500"
                                        unoptimized
                                    />
                                    {/* Gradient overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                </div>

                                {/* Product Content */}
                                <div className="p-6 space-y-4 flex-1 flex flex-col">
                                    <div className="space-y-2">
                                        <h3 className="font-heading font-semibold text-xl group-hover:text-primary transition-colors">
                                            {product.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Features List */}
                                    <div className="space-y-2 flex-1">
                                        {product.features.map((feature, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2 text-sm"
                                            >
                                                <div className="w-5 h-5 rounded-full gradient-sunset flex items-center justify-center flex-shrink-0">
                                                    <Check className="h-3 w-3 text-white" />
                                                </div>
                                                <span className="text-muted-foreground">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Price and CTA */}
                                    <div className="pt-4 border-t border-border/50">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <span className="text-sm text-muted-foreground">
                                                    Price
                                                </span>
                                                <div className="text-2xl font-bold gradient-text">
                                                    {product.price}
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            asChild
                                            className="w-full gradient-sunset text-white border-0 group/btn"
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
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

