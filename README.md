# Mojhoa Automations Website

A modern, production-ready website for Mojhoa Automations built with Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.

## Features

- 🎨 **Modern Design**: Dark theme with sunset gradient accents (#FFB703 → #FB5607)
- 🌓 **Theme Toggle**: Light/Dark mode support (defaults to dark)
- 📱 **Fully Responsive**: Mobile-first design with smooth animations
- 🎭 **Framer Motion**: Smooth entrance animations, hover effects, and transitions
- 🔍 **SEO Optimized**: Complete metadata, OpenGraph, and Twitter cards
- 📊 **Portfolio Filtering**: Dynamic category filtering for projects
- 📝 **Contact Form**: Validated form with toast notifications
- 🎪 **Logo Marquee**: Auto-scrolling client logo carousel
- 🎯 **ScrollSpy Navigation**: Active section highlighting in navbar
- ⚡ **Performance**: Optimized images, lazy loading, smooth scrolling

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter (body), Sora (headings)

## Getting Started

1. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Run development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Customization

### Editing Data

All content is data-driven for easy editing:

#### Portfolio Items (`components/portfolio.tsx`)
\`\`\`typescript
const portfolioItems: PortfolioItem[] = [
  {
    title: 'Your Project Name',
    category: 'Restaurants', // or 'Events', 'ERP', 'Corporate'
    image: '/path/to/image.jpg',
    url: 'https://yourproject.com',
    result: '+50% improvement',
    tech: ['Next.js', 'PostgreSQL', 'Stripe'],
  },
  // Add more items...
]
\`\`\`

#### Clients (`components/clients.tsx`)
\`\`\`typescript
const clients = [
  { name: 'Client Name', logo: '/path/to/logo.png' },
  // Add more clients...
]

const testimonials = [
  {
    name: 'Client Name',
    role: 'Position, Company',
    avatar: '/path/to/avatar.jpg',
    quote: 'Your testimonial here...',
    rating: 5,
  },
  // Add more testimonials...
]
\`\`\`

#### Services (`components/services.tsx`)
Edit the `services` array to modify service offerings, features, and descriptions.

### Contact Form Backend

The contact form currently logs to console. To connect a real backend:

1. **Email Service** (Recommended: Resend, SendGrid):
   \`\`\`typescript
   // app/api/contact/route.ts
   import { Resend } from 'resend'
   
   const resend = new Resend(process.env.RESEND_API_KEY)
   
   await resend.emails.send({
     from: 'contact@mojhoa.com',
     to: 'hello@mojhoa.com',
     subject: `New Contact: ${name}`,
     html: `<p>${message}</p>`,
   })
   \`\`\`

2. **Database** (Supabase, Neon, etc.):
   \`\`\`typescript
   await db.insert(contacts).values({
     name, email, phone, company, service, message
   })
   \`\`\`

### Styling

- **Colors**: Edit `app/globals.css` to change the color palette
- **Fonts**: Modify `app/layout.tsx` to use different Google Fonts
- **Spacing**: Adjust Tailwind classes in components

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

Build the production bundle:
\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
├── app/
│   ├── api/contact/       # Contact form API route
│   ├── layout.tsx         # Root layout with fonts & theme
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles & theme
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── hero.tsx           # Hero section
│   ├── portfolio.tsx      # Portfolio with filtering
│   ├── services.tsx       # Services section
│   ├── clients.tsx        # Clients & testimonials
│   ├── contact.tsx        # Contact form
│   ├── navbar.tsx         # Navigation with ScrollSpy
│   ├── footer.tsx         # Footer
│   └── ...                # Other components
└── README.md
\`\`\`

## Support

For questions or issues, contact hello@mojhoa.com

## License

© 2025 Mojhoa Automations. All rights reserved.
