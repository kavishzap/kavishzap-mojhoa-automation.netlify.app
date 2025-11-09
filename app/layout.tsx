import type React from "react";
import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mojhoa.com"),
  title: {
    default: "Mojhoa Automations | Enterprise Web & Automation in Mauritius",
    template: "%s | Mojhoa Automations",
  },
  description:
    "We design high-impact automations and enterprise-grade web systems for restaurants, events, ERP, and corporate websites.",
  keywords: [
    "Mojhoa",
    "Mojhoa Automations",
    "automation",
    "software solutions",
    "restaurant automation",
    "event management",
    "ERP system",
    "corporate websites",
    "Mauritius",
  ],
  alternates: { canonical: "https://mojhoa.com" },
  icons: {
    icon: [{ url: "/logo1.png" }, { url: "/logo1.png" }],
    shortcut: [{ url: "/logo1.png" }],
    apple: [{ url: "/logo1.png" }],
  },
  authors: [{ name: "Mojhoa Automations" }],
  openGraph: {
    type: "website",
    url: "https://mojhoa.com",
    siteName: "Mojhoa Automations",
    title: "Mojhoa Automations | Automate. Scale. Impress.",
    description:
      "We design high-impact automations and enterprise-grade web systems.",
    images: [{ url: "/logo1.png", width: 1200, height: 630 }],
    locale: "en_MU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mojhoa Automations | Automate. Scale. Impress.",
    description:
      "We design high-impact automations and enterprise-grade web systems.",
    images: ["/logo1.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sora.variable} font-sans antialiased overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
