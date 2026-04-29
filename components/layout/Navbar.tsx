"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "work", href: "#work" },
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "blog", href: "#blog" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-foreground/10">
      <nav className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight flex items-center gap-1"
        >
          tiah hind
          <span className="text-coral ml-0.5">✦</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm text-foreground/70 hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button href="#contact">let&apos;s talk →</Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className={`block w-5 h-px bg-foreground origin-center transition-none ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-foreground ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-foreground origin-center transition-none ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-b border-foreground/10 px-6 pb-6 pt-4">
          <ul className="flex flex-col gap-4 mb-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-base text-foreground/70"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button href="#contact" onClick={() => setMenuOpen(false)}>
            let&apos;s talk →
          </Button>
        </div>
      )}
    </header>
  );
}
