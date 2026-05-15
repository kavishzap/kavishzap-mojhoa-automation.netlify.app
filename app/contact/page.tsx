import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";
import { ScrollToSection } from "@/components/scroll-to-section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a consultation with Mojhoa Automations via WhatsApp. Email and phone details included.",
  alternates: { canonical: "https://mojhoa.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <LandingPage />
      <ScrollToSection id="contact" />
    </>
  );
}

