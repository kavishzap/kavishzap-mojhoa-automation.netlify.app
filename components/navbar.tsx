"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          isScrolled || isMobileMenuOpen
            ? "bg-black/55 backdrop-blur-xl border-b border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.55)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2 group min-w-0">
              <span className="font-heading font-semibold text-sm sm:text-lg text-white whitespace-nowrap">
                MOJHOA <span className="gradient-text">AUTOMATIONS</span>{" "}
                <span className="text-white">LTD</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button
                asChild
                className="hidden sm:flex rounded-lg border-0 bg-[linear-gradient(135deg,#ffb703_0%,#fb5607_55%,#ff006e_120%)] text-black shadow-[0_18px_70px_rgba(251,86,7,0.22)]"
              >
                <Link href="/contact">Book Consultation</Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative md:hidden text-white hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <Menu
                  className={cn(
                    "absolute h-5 w-5 transition-all duration-300 ease-out",
                    isMobileMenuOpen
                      ? "scale-75 rotate-90 opacity-0"
                      : "scale-100 rotate-0 opacity-100"
                  )}
                />
                <X
                  className={cn(
                    "absolute h-5 w-5 transition-all duration-300 ease-out",
                    isMobileMenuOpen
                      ? "scale-100 rotate-0 opacity-100"
                      : "scale-75 -rotate-90 opacity-0"
                  )}
                />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu — drops down from top */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 z-40 md:hidden",
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setIsMobileMenuOpen(false)}
          className={cn(
            "fixed inset-0 top-16 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out",
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
        />

        <div
          className={cn(
            "relative border-b border-white/10 bg-[#07070a]/95 shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isMobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          )}
        >
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <nav className="space-y-1">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${80 + i * 50}ms` : "0ms",
                  }}
                  className={cn(
                    "block rounded-lg px-3 py-3 text-base font-medium text-white/75 transition-all duration-300 ease-out hover:bg-white/[0.06] hover:text-white",
                    isMobileMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-3 opacity-0"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div
              style={{
                transitionDelay: isMobileMenuOpen
                  ? `${80 + navLinks.length * 50}ms`
                  : "0ms",
              }}
              className={cn(
                "mt-4 transition-all duration-300 ease-out",
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-3 opacity-0"
              )}
            >
              <Button
                asChild
                className="w-full rounded-lg border-0 bg-[linear-gradient(135deg,#ffb703_0%,#fb5607_55%,#ff006e_120%)] text-black"
              >
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Book Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
