"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const EMAIL = "hello@tiahhind.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/tiahhind";

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

export default function Footer() {
  const [heroGone, setHeroGone] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("section");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setHeroGone(true);
        } else {
          setHeroGone(false);
        }
      },
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const bottom = document.getElementById("contact");
    if (!bottom) return;

    const observer = new IntersectionObserver(
      ([entry]) => setAtBottom(entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(bottom);
    return () => observer.disconnect();
  }, []);

  async function copyEmail() {
    if (window.innerWidth < 768) {
      window.location.href = `mailto:${EMAIL}`;
      return;
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } else {
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  if (!heroGone || atBottom) return null;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#EEEAE4] sm:hidden">
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {copied ? "Email copied" : ""}
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-3 flex items-center">
        <button
          type="button"
          onClick={copyEmail}
          aria-label="Copy email address"
          className="bg-coral text-white inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium leading-none whitespace-nowrap overflow-hidden"
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
                <CheckIcon /> copied!
              </motion.span>
            ) : (
              <motion.span
                key="default"
                className="flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                let&apos;s chat →
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <div className="w-px h-5 bg-foreground/20 mx-5 shrink-0" />

        <div className="flex-1 flex items-end justify-end gap-3 flex-wrap">
          <a
            href={`mailto:${EMAIL}`}
            className="text-sm text-foreground/60 hover:text-foreground transition-colors"
          >
            {EMAIL}
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-sm font-bold text-foreground/70 hover:text-foreground transition-colors"
          >
            in
          </a>
        </div>
      </div>
    </footer>
  );
}
