import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";
import Logo from "../assets/mojhoa_whiteMO.png";
import Image from "next/image";
const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#products", label: "Products" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#services", label: "Services" },
  { href: "#clients", label: "Clients" },
];

const services = [
  { href: "#services", label: "Custom ERP & Business Automation" },
  { href: "#services", label: "Restaurant, POS & Event Platforms" },
  { href: "#services", label: "Corporate Websites & Portfolios" },
  { href: "#services", label: "Management & Back Office Systems" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 text-center sm:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start space-y-4">
            <Image
              src={Logo}
              alt="Mojhoa Automations Logo"
              className="w-20 h-auto sm:w-28 object-contain"
              priority
            />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              We design high-impact automations and enterprise-grade web systems
              that help businesses scale.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-center sm:text-left">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-center sm:text-left">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-center sm:text-left">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-center sm:justify-start items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a
                  href="mailto:kavish17mojhoa@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  kavish17mojhoa@gmail.com
                </a>
              </li>

              <li className="flex justify-center sm:justify-start items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a
                  href="tel:+23059182520"
                  className="hover:text-primary transition-colors"
                >
                  +230 5918 2520
                </a>
              </li>

              <li className="flex justify-center sm:justify-start items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Beau Vallon, Mauritius</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex justify-center sm:justify-start gap-3 mt-4">
              <a
                href="https://www.linkedin.com/in/kavish-mojhoa-b8a05023b"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border space-y-1 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mojhoa Automations. All rights
            reserved.
          </p>
          <p className="text-sm text-muted-foreground">
           BRN: C25227605
          </p>
        </div>
      </div>
    </footer>
  );
}
