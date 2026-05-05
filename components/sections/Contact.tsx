import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Image from "next/image";

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

export default function Contact() {
  const rawReduced = useReducedMotion();
  const prefersReducedMotion = rawReduced ?? false;

  const [copied, setCopied] = useState(false);
  const [emailHovered, setEmailHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateIsMobile();

    mediaQuery.addEventListener("change", updateIsMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);

  async function copyEmail() {
    if (isMobile) {
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

  const showEmail = !isMobile && emailHovered;

  return (
    <motion.section
      id="contact"
      className="mt-16 md:mt-24 pt-12 pb-6 md:py-16 border-t border-foreground/10"
      initial={
        prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
      }
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Section label */}
      <div className="flex items-center gap-2 mb-6">
        <span className="font-medium font-semibold tracking-wide text-xl lg:text-2xl">
          get in touch
        </span>

        <Image
          src="/assets/throughout/3-line-sparkle-accent.webp"
          alt=""
          width={96}
          height={96}
          className="-ml-12"
          style={{ height: "auto" }}
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-xl space-y-4 text-sm text-foreground/60 leading-relaxed">
          <p>
            Have an idea you’re trying to bring to life, or just fancy saying
            hello?
          </p>

          <p>
            I’m always happy to chat about digital products and interesting
            collabs.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap lg:justify-end">
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {copied ? "Email copied" : ""}
          </div>

          <button
            type="button"
            onClick={copyEmail}
            onMouseEnter={() => setEmailHovered(true)}
            onMouseLeave={() => setEmailHovered(false)}
            aria-label={isMobile ? "Email me" : "Copy email address"}
            className="bg-coral text-white inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium leading-none whitespace-nowrap overflow-hidden cursor-pointer"
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
                  {EMAIL}
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

          <div className="w-px h-5 mx-2 shrink-0" />

          <div className="flex items-center gap-4">
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
              className="text-2xl font-bold text-foreground/70 hover:text-foreground transition-colors"
            >
              in
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
