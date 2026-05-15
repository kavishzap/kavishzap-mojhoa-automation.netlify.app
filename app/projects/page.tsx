import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";
import { ScrollToSection } from "@/components/scroll-to-section";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Featured systems delivered by Mojhoa Automations: ERP modules, automation platforms, back offices, and premium commercial websites.",
  alternates: { canonical: "https://mojhoa.com/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <LandingPage />
      <ScrollToSection id="projects" />
    </>
  );
}

