"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "work", href: "#work" },
  { label: "about", href: "#about" },
  { label: "contact", href: "#contact" },
];

function smoothScrollTo(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const isMobile = window.innerWidth < 768;
  const offset = isMobile ? 220 : 72;

  const top = element.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background ">
      <nav className="max-w-[2000px] md:text-lg mx-auto px-6 md:px-10 lg:px-16 h-[60px] flex items-center justify-between ">
        {/* Logo */}
        <Link
          href="/"
          className=" font-semibold tracking-tight flex items-center gap-1"
        >
          tiah hind
          <span className="text-coral ml-0.5">✦</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm text-foreground/70 hover:text-foreground cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo(link.href.slice(1));
                }}
              >
                {link.label}
              </a>
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
                <a
                  href={link.href}
                  className="text-base text-foreground/70 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo(link.href.slice(1));
                    setMenuOpen(false);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button
            href="#contact"
            onClick={() => {
              smoothScrollTo("contact");
              setMenuOpen(false);
            }}
          >
            let&apos;s talk →
          </Button>
        </div>
      )}
    </header>
  );
}
