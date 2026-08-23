const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://mojhoa.com'

export const siteConfig = {
  name: 'Mojhoa Automations',
  legalName: 'Mojhoa Automations Ltd',
  shortName: 'Mojhoa',
  url: siteUrl,
  locale: 'en_MU',
  language: 'en',
  tagline: 'Technology built around your business.',
  description:
    'Mojhoa Automations Ltd builds POS, ERP, e-commerce, WhatsApp automation, booking systems and custom digital solutions for businesses in Mauritius and worldwide. Founded by Kavish Mojhoa.',
  keywords: [
    'Mojhoa',
    'Mojhoa Automations',
    'Mojhoa Automations Ltd',
    'Mojhoa Mauritius',
    'business automation Mauritius',
    'automations in Mauritius',
    'digital solutions Mauritius',
    'Kavish Mojhoa',
    'POS Mauritius',
    'ERP Mauritius',
    'e-commerce Mauritius',
    'WhatsApp automation Mauritius',
    'booking system Mauritius',
    'payment integration Mauritius',
    'custom software Mauritius',
    'SME automation Mauritius',
    'restaurant POS Mauritius',
    'business software Mauritius',
  ],
  founder: {
    name: 'Kavish Mojhoa',
    role: 'Senior Full Stack Developer & Founder',
  },
  contact: {
    email: 'mojhoaautomationsltd@gmail.com',
    phone: '+230 5 918 2520',
    phoneE164: '+23059182520',
    whatsapp: '23059182520',
    location: 'Mauritius',
    countryCode: 'MU',
  },
  social: {
    // Add when available — helps Google Knowledge Panel & rich results
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  },
  services: [
    'Point of Sale Systems',
    'E-Commerce Development',
    'WhatsApp Automation',
    'Booking Systems',
    'Accounting & Finance Software',
    'Custom ERP Solutions',
    'Payment Integration',
  ],
  ogImage: '/hero1.png',
  logo: '/logo.png',
  themeColor: '#101d38',
  backgroundColor: '#f6f5f1',
} as const

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
}
