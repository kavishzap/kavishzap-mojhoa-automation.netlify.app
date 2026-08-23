'use client'

import { HeroGlobe, HeroVisual } from '@/components/hero-visual'
import { SectionHexagon } from '@/components/section-hexagon'
import { SolutionsStack } from '@/components/solutions-stack'
import { Highlighter } from '@/components/ui/highlighter'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Mail, MapPin, Menu, MessageCircle, MoveRight, X } from 'lucide-react'

const solutions = [
  { title: 'Point of Sale', key: 'pos', color: 'orange', desc: 'Fast, intuitive POS solutions designed for restaurants, retail stores and service businesses, with kitchen app, offline mode, and possible MRA e-invoicing integration.', features: ['Fast checkout', 'Order management', 'Inventory integration', 'Sales analytics'], visual: 'POS / DAILY SALES', image: '/product1.png' },
  { title: 'E-Commerce', key: 'commerce', color: 'blue', desc: 'Launch a high-converting online store that sells while you sleep, syncs with your inventory, and gives customers a smooth buying experience from browse to checkout.', features: ['Mobile-first storefront', 'Secure payments', 'Live inventory sync', 'Order tracking & alerts'], visual: 'STORE / LIVE ORDERS', image: '/product2.png' },
  { title: 'WhatsApp Automation', key: 'whatsapp', color: 'green', desc: 'Reply instantly, nurture leads, and keep customers updated on WhatsApp without lifting a finger. Automate the conversations that grow your business.', features: ['Instant auto-replies', 'Order & booking updates', 'Lead capture & follow-up', 'Team inbox in one place'], visual: 'WHATSAPP / ACTIVE', image: '/product3.png' },
  { title: 'Booking Systems', key: 'booking', color: 'purple', desc: 'Make appointments, reservations and service bookings easier for customers and teams.', features: ['Online bookings', 'Availability management', 'Customer records', 'Automated confirmations'], visual: 'BOOKINGS / THIS WEEK', image: '/product4.png' },
  { title: 'Accounting & Finance', key: 'finance', color: 'yellow', desc: 'See the real health of your business at a glance. Track revenue, expenses, VAT and profit with clear reports built for Mauritian SMEs.', features: ['Automated P&L statements', 'VAT-ready reporting', 'Expense tracking', 'One-click PDF exports'], visual: 'FINANCE / OVERVIEW', image: '/product5.png' },
  { title: 'Custom ERP Solutions', key: 'erp', color: 'navy', desc: 'Run sales, stock, purchasing and finance in one system built around how your business actually works. No disconnected tools. Full visibility.', features: ['Sales & invoicing', 'Inventory & locations', 'Purchasing & suppliers', 'Live business dashboard'], visual: 'ERP / OPERATIONS HUB', image: '/product6.png' },
  { title: 'Payment Integration', key: 'payments', color: 'coral', desc: 'Accept cards, mobile money and online payments seamlessly across your POS, e-commerce and booking systems. One integration that keeps money flowing into your business.', features: ['Card & mobile money', 'Online checkout', 'Refunds & settlements'], visual: 'PAYMENTS / LIVE', image: '/product7.png' },
]

const contactEmail = 'mojhoaautomationsltd@gmail.com'
const contactPhone = '+230 5 918 2520'
const contactWhatsApp = '23059182520'
const contactLocation = 'Mauritius · Working globally'

const marqueeItems = ['POS', 'ERP', 'E-Commerce', 'Mobile', 'Automation', 'Booking', 'Accounting', 'WhatsApp', 'Payments']
const industries = ['Restaurants', 'Retail', 'Construction', 'Professional Services', 'Distribution', 'Events', 'Hospitality', 'Car Rental', 'SMEs', 'Service Businesses']

function Logo({ variant = 'default' }: { variant?: 'default' | 'light' }) {
  return (
    <a href="#home" className={`logo${variant === 'light' ? ' logo-light' : ''}`}>
      <img src="/logo.png" alt="" className="logo-image" />
      <span className="logo-text">Mojhoa Automations <small>Ltd</small></span>
    </a>
  )
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <div className={`reveal ${className}`}>{children}</div> }

export default function Page() {
  const [menu, setMenu] = useState(false)

  useEffect(() => { const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible') }), { threshold: .12 }); document.querySelectorAll('.reveal').forEach((el) => observer.observe(el)); return () => observer.disconnect() }, [])

  function sendEnquiryToWhatsApp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const company = String(data.get('company') || '').trim()
    const email = String(data.get('email') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    const interest = String(data.get('interest') || '').trim()
    const message = String(data.get('message') || '').trim()

    const lines = [
      'Hello Mojhoa Automations,',
      '',
      'I would like to send an enquiry.',
      '',
      `Name: ${name}`,
      company ? `Company: ${company}` : null,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      interest ? `Interested in: ${interest}` : null,
      '',
      'Message:',
      message,
    ].filter(Boolean)

    const text = encodeURIComponent(lines.join('\n'))
    window.open(`https://wa.me/${contactWhatsApp}?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  return <main id="home">
    <header className="site-header"><div className="container nav-wrap"><Logo /><nav className={menu ? 'open' : ''}>{['About', 'Solutions', 'Why Us', 'Contact'].map((item) => <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMenu(false)}>{item}</a>)}<a className="nav-cta" href="#contact">Let&apos;s Talk <ArrowUpRight size={16} /></a></nav><button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X /> : <Menu />}</button></div></header>

    <section className="hero"><HeroGlobe /><div className="container hero-grid"><div className="hero-content"><Reveal className="hero-intro"><div className="hero-brand"><p className="eyebrow">MOJHOA AUTOMATIONS LTD <span /></p><p className="hero-tagline">Helping automate businesses in <Highlighter action="underline" color="#f47b42" isView>Mauritius</Highlighter></p></div><h1>Technology built around <Highlighter action="highlight" color="#c6ef59" isView>your business.</Highlighter></h1></Reveal><Reveal className="hero-body"><p className="hero-copy">We build custom AI solutions, automation workflows, and modern digital systems that help businesses scale efficiently and stay ahead of the competition.</p><div className="hero-founder"><strong>Built by Kavish Mojhoa</strong><span>Senior Full Stack Developer &amp; Founder</span></div><div className="button-row hero-actions"><a className="button button-dark" href="#contact">Book Consultation <MoveRight size={17} /></a><a className="text-link hero-secondary-cta" href="#contact">Talk to us now <ArrowUpRight size={16} /></a></div></Reveal></div><Reveal className="hero-visual"><HeroVisual /></Reveal></div></section>

    <section className="marquee-section"><div className="container"><p>MULTIPLE BUSINESS SOLUTIONS.</p></div><div className="marquee"><div className="marquee-track" aria-hidden="true">{[...marqueeItems, ...marqueeItems].map((x, i) => <span key={`${x}-${i}`}>{x}<b>✳</b></span>)}</div></div></section>

    <section className="section about" id="about"><SectionHexagon variant="light" /><div className="container two-col"><Reveal><p className="eyebrow">WHO WE ARE <span /></p><h2>We don&apos;t just build software. <Highlighter action="highlight" color="#c6ef59" isView>We solve business problems.</Highlighter></h2></Reveal><Reveal><p className="lead">Mojhoa Automations creates practical digital solutions for businesses that want to operate smarter. We understand how you work, find what slows you down, and build technology around your actual operations.</p><a className="text-link" href="#why-us">Our approach <ArrowUpRight size={16} /></a></Reveal></div><div className="container principles"><div className="about-art"><SectionHexagon variant="accent" className="about-art-hexagon" /><div className="art-grid" /><strong>MAKE IT<br /><span>WORK</span></strong><small>Business, connected.</small></div>{[['Built Around You', 'Solutions designed around real business processes.'], ['Automation First', 'Reduce repetitive work and connect your operations.'], ['Ready to Scale', 'Technology that can grow alongside your business.']].map(([title, text], i) => <Reveal className="principle" key={title}><b>0{i + 1}</b><h3>{title}</h3><p>{text}</p></Reveal>)}</div></section>

    <section className="section solutions" id="solutions"><SectionHexagon variant="light" /><div className="container section-head"><Reveal><p className="eyebrow">WHAT WE DO <span /></p><h2>Solutions built for<br /><Highlighter action="highlight" color="#c6ef59" isView>the way you work.</Highlighter></h2></Reveal><Reveal><p className="lead">From a single business tool to a complete digital ecosystem, we design solutions that work together.</p></Reveal></div><Reveal className="container industry-capsules"><p className="industry-capsules-label">Built for</p><div className="industry-capsules-row">{industries.map((industry) => <span className="industry-capsule" key={industry}>{industry}</span>)}</div></Reveal><SolutionsStack solutions={solutions} /></section>

    <section className="why" id="why-us"><SectionHexagon variant="dark" /><div className="container why-intro"><Reveal><p className="eyebrow light">WHY MOJHOA <span /></p><h2>Technology should make business <Highlighter action="highlight" color="#c6ef59" isView>simpler.</Highlighter></h2></Reveal><Reveal><p className="why-lead">A clear, collaborative approach that turns complexity into momentum, with solutions built around how you actually work.</p></Reveal></div><div className="container why-approach"><Reveal><p className="eyebrow light">OUR APPROACH <span /></p></Reveal><div className="why-process">{[['01', 'Understand', 'We learn how your business operates, where the problems are and what can be improved.'], ['02', 'Design', 'We transform your requirements into simple, intuitive digital experiences.'], ['03', 'Build', 'We develop scalable solutions using modern technologies.'], ['04', 'Launch & Improve', 'We deploy, support and continuously improve your solution.']].map(([number, title, text]) => <Reveal className="why-process-item" key={number}><b>{number}</b><div><h3>{title}</h3><p>{text}</p></div></Reveal>)}</div></div></section>

    <section className="section contact" id="contact">
      <SectionHexagon variant="light" />
      <div className="container contact-head">
        <Reveal>
          <p className="eyebrow">CONTACT <span /></p>
          <h2>Let&apos;s talk about <Highlighter action="highlight" color="#c6ef59" isView>your business.</Highlighter></h2>
        </Reveal>
        <Reveal>
          <p className="lead">Have a project in mind, or just want to explore what&apos;s possible? Reach out directly or send an enquiry — we&apos;ll take it from there.</p>
        </Reveal>
      </div>
      <div className="container contact-shell">
        <Reveal className="contact-aside">
          <p className="contact-aside-kicker">Direct line</p>
          <h3>Prefer to talk now?</h3>
          <p className="contact-aside-copy">Message us on WhatsApp or drop an email. We usually reply within a few hours.</p>
          <div className="contact-channels">
            <a className="contact-channel" href={`mailto:${contactEmail}`}>
              <span className="contact-channel-icon"><Mail size={18} /></span>
              <span className="contact-channel-body"><b>Email</b><strong>{contactEmail}</strong></span>
              <ArrowUpRight size={16} className="contact-channel-arrow" />
            </a>
            <a className="contact-channel" href={`https://wa.me/${contactWhatsApp}`} target="_blank" rel="noopener noreferrer">
              <span className="contact-channel-icon"><MessageCircle size={18} /></span>
              <span className="contact-channel-body"><b>Phone / WhatsApp</b><strong>{contactPhone}</strong></span>
              <ArrowUpRight size={16} className="contact-channel-arrow" />
            </a>
            <div className="contact-channel contact-channel-static">
              <span className="contact-channel-icon"><MapPin size={18} /></span>
              <span className="contact-channel-body"><b>Location</b><strong>{contactLocation}</strong></span>
            </div>
          </div>
          <a className="button button-lime contact-wa-direct" href={`https://wa.me/${contactWhatsApp}`} target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp <MoveRight size={17} />
          </a>
        </Reveal>
        <Reveal className="contact-panel">
          <div className="contact-panel-head">
            <p className="contact-panel-kicker">Enquiry</p>
            <h3>Tell us what you need</h3>
            <p>Fill this in and we&apos;ll open WhatsApp with your details ready to send.</p>
          </div>
          <form onSubmit={sendEnquiryToWhatsApp}>
            <div className="form-row">
              <label>Name<input name="name" required placeholder="Your name" /></label>
              <label>Company<input name="company" placeholder="Company name" /></label>
            </div>
            <div className="form-row">
              <label>Email<input name="email" required type="email" placeholder="you@company.com" /></label>
              <label>Phone<input name="phone" placeholder="+230 ..." /></label>
            </div>
            <label>What are you interested in?
              <select name="interest" defaultValue="">
                <option value="" disabled>Select a solution</option>
                {solutions.map((s) => <option key={s.key} value={s.title}>{s.title}</option>)}
                <option value="Custom Solution">Custom Solution</option>
              </select>
            </label>
            <label>Message<textarea name="message" required placeholder="Tell us a little about your business and what you need help with..." rows={5} /></label>
            <button className="button button-dark" type="submit">Send enquiry on WhatsApp <MoveRight size={17} /></button>
          </form>
        </Reveal>
      </div>
    </section>

    <footer><SectionHexagon variant="dark" /><div className="container footer-top"><Logo variant="light" /><p>Technology built around<br /><span className="footer-accent">your business.</span></p><div className="footer-links"><div><b>Solutions</b>{solutions.slice(0, 5).map((s) => <a href="#solutions" key={s.key}>{s.title}</a>)}</div><div><b>Company</b><a href="#about">About</a><a href="#our-work">Our Work</a><a href="#contact">Contact</a></div></div></div><div className="container footer-bottom"><span>© 2026 Mojhoa Automations Ltd. All rights reserved.</span><span>Built with intent.</span></div></footer>
  </main>
}
