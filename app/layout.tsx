import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'

import { StructuredData } from '@/components/structured-data'
import { absoluteUrl, siteConfig } from '@/lib/site'
import './globals.css'

const title = {
  default: `${siteConfig.name} | Business Automation & Digital Solutions in Mauritius`,
  template: `%s | ${siteConfig.name}`,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.founder.name, url: siteConfig.url }],
  creator: siteConfig.founder.name,
  publisher: siteConfig.legalName,
  category: 'technology',
  applicationName: siteConfig.name,
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-MU': '/',
      en: '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale.replace('_', '-'),
    url: siteConfig.url,
    siteName: siteConfig.legalName,
    title: title.default,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — POS, ERP, e-commerce and automation for businesses in Mauritius`,
      },
      {
        url: absoluteUrl(siteConfig.logo),
        width: 512,
        height: 512,
        alt: `${siteConfig.name} logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: title.default,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.ogImage)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/logo_white.png', type: 'image/png' }],
    apple: '/logo_white.png',
    shortcut: '/logo_white.png',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: siteConfig.backgroundColor,
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={siteConfig.language}>
      <head>
        <StructuredData />
      </head>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
