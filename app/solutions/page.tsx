import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";
import { ScrollToSection } from "@/components/scroll-to-section";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "ERP systems, business automation, booking platforms, AI automation, POS systems, mobile apps, e-commerce, and custom software development.",
  alternates: { canonical: "https://mojhoa.com/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <LandingPage />
      <ScrollToSection id="services" />
    </>
  );
}

