"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#industries", label: "Industries" },
  { href: "#projects", label: "Projects" },
  { href: "#ai", label: "AI" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // ScrollSpy logic
      const sections = navLinks.map((link) => link.href.slice(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-black/55 backdrop-blur-xl border-b border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.55)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-2 group min-w-0">
            <span className="font-heading font-semibold truncate text-base sm:text-lg max-w-[60vw] sm:max-w-none text-white">
              MOJHOA <span className="gradient-text">AUTOMATIONS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white",
                  activeSection === link.href.slice(1)
                    ? "text-amber-200"
                    : "text-white/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA & Theme Toggle */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="hidden sm:flex rounded-xl border-0 bg-[linear-gradient(135deg,#ffb703_0%,#fb5607_55%,#ff006e_120%)] text-black shadow-[0_18px_70px_rgba(251,86,7,0.22)]"
            >
              <Link href="#contact">Book Consultation</Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/70 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-3 py-2 rounded-xl text-base font-medium transition-colors",
                  activeSection === link.href.slice(1)
                    ? "bg-white/[0.06] text-amber-200"
                    : "text-white/70 hover:bg-white/[0.04]"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="w-full rounded-xl border-0 bg-[linear-gradient(135deg,#ffb703_0%,#fb5607_55%,#ff006e_120%)] text-black"
            >
              <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                Book Consultation
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
