"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export const DEFAULT_EMAIL = "hello@tiahhind.com";

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

interface LetsChatButtonProps {
  email?: string;
  /** mailto: used on mobile / without clipboard. Defaults to a plain mailto. */
  mailtoHref?: string;
  /** Called on click with what the button did. */
  onAction?: (action: "copy" | "email") => void;
  className?: string;
}

/**
 * The site's "let's chat →" button. On desktop it shows the email on hover
 * and copies it on click; on mobile it opens the mail client.
 */
export default function LetsChatButton({
  email = DEFAULT_EMAIL,
  mailtoHref,
  onAction,
  className = "",
}: LetsChatButtonProps) {
  const [copied, setCopied] = useState(false);
  const [emailHovered, setEmailHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mailto = mailtoHref ?? `mailto:${email}`;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copyEmail() {
    if (isMobile || !navigator.clipboard) {
      onAction?.("email");
      window.location.href = mailto;
      return;
    }
    onAction?.("copy");
    await navigator.clipboard.writeText(email);
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1500);
  }

  const showEmail = !isMobile && emailHovered;

  return (
    <>
      <span aria-live="polite" aria-atomic="true" className="sr-only">
        {copied ? "Email copied" : ""}
      </span>
      <button
        type="button"
        onClick={copyEmail}
        onMouseEnter={() => setEmailHovered(true)}
        onMouseLeave={() => setEmailHovered(false)}
        aria-label={isMobile ? "Email me" : "Copy email address"}
        className={`bg-coral text-white inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium leading-none whitespace-nowrap overflow-hidden cursor-pointer ${className}`}
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
          ) : showEmail ? (
            <motion.span
              key="email"
              className="flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {email}
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
              let&apos;s chat →
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </>
  );
}
