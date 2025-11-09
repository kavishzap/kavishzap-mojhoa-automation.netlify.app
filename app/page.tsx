// app/page.tsx
import Script from "next/script";
import { Hero } from "@/components/hero";
import { Portfolio } from "@/components/portfolio";
import { Services } from "@/components/services";
import { Clients } from "@/components/clients";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <Hero />
        <Portfolio />
        <Services />
        <Clients />
        <Contact />
      </main>

      {/* Organization */}
      <Script id="ld-org" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Mojhoa Automations Ltd",
            url: "https://mojhoa.com",
            logo: "https://mojhoa.com/og.jpg",
            sameAs: [
              "https://www.linkedin.com/in/kavish-mojhoa-b8a05023b"
            ],
            contactPoint: [{
              "@type": "ContactPoint",
              telephone: "+230-5918-2520",
              contactType: "customer service",
              areaServed: "MU",
              availableLanguage: ["English", "French"]
            }]
          })
        }}
      />

      {/* LocalBusiness */}
      <Script id="ld-local" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Mojhoa Automations",
            image: "https://mojhoa.com/og.jpg",
            url: "https://mojhoa.com",
            telephone: "+230-5918-2520",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Beau Vallon",
              addressCountry: "MU"
            },
            openingHoursSpecification: [{
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
              opens: "09:00",
              closes: "18:00"
            }]
          })
        }}
      />

      {/* Services list */}
      <Script id="ld-service" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: [
              { "@type": "Service", name: "Restaurant Automation (POS, KOT, Kitchen Display, Inventory)" },
              { "@type": "Service", name: "Event Ticketing & QR Scanning (Web & Mobile)" },
              { "@type": "Service", name: "Custom ERP Modules (Sales, Inventory, Accounting)" },
              { "@type": "Service", name: "Corporate Websites & Portfolios" }
            ]
          })
        }}
      />

      {/* FAQ rich results */}
      <Script id="ld-faq" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Do you build restaurant POS with inventory and printers?",
                acceptedAnswer: { "@type": "Answer", text: "Yes. We deliver POS with thermal printing, KOT, kitchen display, and real-time inventory." }
              },
              {
                "@type": "Question",
                name: "Can you manage ticketing and QR scanning for events?",
                acceptedAnswer: { "@type": "Answer", text: "Yes. We provide end-to-end ticketing, scanning apps, dashboards, and payouts." }
              },
              {
                "@type": "Question",
                name: "Do you offer ongoing support?",
                acceptedAnswer: { "@type": "Answer", text: "Yes. We provide 24/7 support SLAs for production systems." }
              }
            ]
          })
        }}
      />
    </>
  );
}
