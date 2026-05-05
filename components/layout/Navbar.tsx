"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import Logo from "@/components/ui/Logo";

const EMAIL = "hello@tiahhind.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/tiahhind";

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

  window.scrollTo({ top, behavior: "smooth" });
}

function CheckIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 6.5l3.25 3.25 5.75-6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopHovered, setDesktopHovered] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const mobileCTARef = useRef<HTMLDivElement>(null);

  function closeMenu() {
    setMenuOpen(false);
    setMobileExpanded(false);
  }

  // Close mobile expanded on click outside
  useEffect(() => {
    if (!mobileExpanded) return;

    function onMouseDown(e: MouseEvent) {
      if (
        mobileCTARef.current &&
        !mobileCTARef.current.contains(e.target as Node)
      ) {
        setMobileExpanded(false);
      }
    }

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [mobileExpanded]);

  async function copyEmail() {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } else {
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-background">
      {/* Screen-reader announcement for clipboard copy */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {copied ? "Email copied" : ""}
      </div>

      <nav className="max-w-[2000px] md:text-lg mx-auto px-6 md:px-10 lg:px-16 h-[60px] flex md:grid md:grid-cols-[1fr_auto_1fr] items-center justify-between md:justify-normal">
        {/* Logo */}
        <Link
          href="/"
          className="md:justify-self-start"
          aria-label="Scroll to top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            closeMenu();
          }}
        >
          <Logo />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8 md:justify-self-center">
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

        {/* Desktop CTA — hover expands into reserved right column */}
        <div className="hidden md:flex justify-end w-[310px] md:justify-self-end">
          <motion.div
            layout
            transition={{ layout: { duration: 0.25, ease: "easeOut" } }}
            className="bg-coral text-white rounded-full overflow-hidden flex items-center"
            onMouseEnter={() => setDesktopHovered(true)}
            onMouseLeave={() => setDesktopHovered(false)}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {!desktopHovered ? (
                <motion.span
                  key="label"
                  className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-medium leading-none whitespace-nowrap select-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  let&apos;s chat →
                </motion.span>
              ) : (
                <motion.div
                  key="options"
                  className="flex items-center gap-0.5 px-2 py-1.5"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <motion.button
                    type="button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium leading-none text-white hover:bg-white/15 transition-colors whitespace-nowrap"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.span
                          key="copied"
                          className="flex items-center gap-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <CheckIcon /> copied
                        </motion.span>
                      ) : (
                        <motion.span
                          key="default"
                          className="flex items-center gap-1 cursor-pointer"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          {EMAIL}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <div className="w-px h-3.5 bg-white/30 mx-0.5 shrink-0" />

                  <motion.a
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                      delay: 0.08,
                    }}
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit LinkedIn profile"
                    className="flex items-center justify-center px-3 py-1.5 rounded-full text-sm font-bold leading-none text-white hover:bg-white/15 transition-colors"
                  >
                    in
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
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
          <ul className="flex flex-col gap-6 mb-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-base text-foreground/70 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo(link.href.slice(1));
                    closeMenu();
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
