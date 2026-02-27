"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Wrench, Phone, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";
import { DFW_CITIES } from "@/lib/cities";
import { cn } from "@/lib/utils";

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-white"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Wrench className="size-6 text-brand-primary" />
            <span className="text-lg font-bold text-brand-primary">
              {COMPANY.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {/* City Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                onBlur={() => setTimeout(() => setIsCityDropdownOpen(false), 150)}
                className="flex items-center gap-1 text-sm font-medium text-brand-text-muted hover:text-brand-primary transition-colors"
                aria-expanded={isCityDropdownOpen}
                aria-haspopup="true"
              >
                Service Areas
                <ChevronDown
                  className={cn(
                    "size-4 transition-transform",
                    isCityDropdownOpen && "rotate-180"
                  )}
                />
              </button>
              {isCityDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-brand-border py-1">
                  {DFW_CITIES.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/${city.slug}`}
                      className="block px-4 py-2 text-sm text-brand-text-muted hover:bg-brand-surface hover:text-brand-primary transition-colors"
                      onClick={() => setIsCityDropdownOpen(false)}
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Phone Link */}
            <a
              href={COMPANY.phoneHref}
              className="flex items-center gap-1.5 text-sm font-medium text-brand-text hover:text-brand-primary transition-colors"
            >
              <Phone className="size-4" />
              {COMPANY.phone}
            </a>

            {/* Call Now CTA */}
            <Button asChild className="bg-brand-accent hover:bg-brand-accent/90 text-white">
              <a href={COMPANY.phoneHref}>Call Now</a>
            </Button>
          </nav>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-3">
            <Button asChild size="sm" className="bg-brand-accent hover:bg-brand-accent/90 text-white">
              <a href={COMPANY.phoneHref}>
                <Phone className="size-4" />
                <span className="sr-only">Call Now</span>
              </a>
            </Button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-brand-text-muted hover:text-brand-primary transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-brand-border bg-white">
          <div className="px-4 py-4 space-y-3">
            <a
              href={COMPANY.phoneHref}
              className="flex items-center gap-2 text-sm font-medium text-brand-text"
            >
              <Phone className="size-4" />
              {COMPANY.phone}
            </a>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-text-muted mb-2">
                Service Areas
              </p>
              <div className="grid grid-cols-2 gap-1">
                {DFW_CITIES.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${city.slug}`}
                    className="px-3 py-2 text-sm text-brand-text-muted hover:text-brand-primary hover:bg-brand-surface rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
