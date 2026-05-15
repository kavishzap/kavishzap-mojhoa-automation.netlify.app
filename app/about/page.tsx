import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";
import { ScrollToSection } from "@/components/scroll-to-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mojhoa Automations is a Mauritius-focused software and AI automation company building enterprise-ready systems that scale.",
  alternates: { canonical: "https://mojhoa.com/about" },
};

export default function AboutPage() {
  return (
    <>
      <LandingPage />
      <ScrollToSection id="about" />
    </>
  );
}

