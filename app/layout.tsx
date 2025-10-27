import type React from "react"
import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" })

export const metadata: Metadata = {
  title: "Mojhoa Automations",
  description:
    "We design high-impact automations and enterprise-grade web systems for restaurants, events, ERP, and corporate websites.",
  keywords: [
    "automation",
    "software solutions",
    "restaurant automation",
    "event management",
    "ERP system",
    "corporate websites",
    "Mauritius",
  ],
  icons: {
    icon: "/logofinal.png",      // Main favicon
    shortcut: "/logofinal.png",  // Older browser support
    apple: "/logofinal.png",     // Apple touch icon
  },
  authors: [{ name: "Mojhoa Automations" }],
  openGraph: {
    title: "Mojhoa Automations | Automate. Scale. Impress.",
    description: "We design high-impact automations and enterprise-grade web systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mojhoa Automations | Automate. Scale. Impress.",
    description: "We design high-impact automations and enterprise-grade web systems.",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
