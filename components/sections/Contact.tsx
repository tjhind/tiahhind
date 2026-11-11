"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import LetsChatButton, { DEFAULT_EMAIL } from "@/components/ui/LetsChatButton";

const LINKEDIN_URL = "https://www.linkedin.com/in/tiahhind";

export interface ContactSocial {
  label: string; // accessible name, e.g. "LinkedIn"
  href: string;
  icon: ReactNode;
  onClick?: () => void;
}

const defaultSocials: ContactSocial[] = [
  { label: "LinkedIn", href: LINKEDIN_URL, icon: "in" },
];

const defaultParagraphs = [
  "Have an idea you’re trying to bring to life, or just fancy saying hello?",
  "I’m always happy to chat about digital products and interesting collabs.",
];

interface ContactProps {
  id?: string;
  label?: string;
  paragraphs?: ReactNode[];
  email?: string;
  /** mailto: used by the button on mobile (e.g. with a prefilled subject). */
  mailtoHref?: string;
  socials?: ContactSocial[];
  /** Fired when the "let's chat" button copies or opens email. */
  onChatAction?: (action: "copy" | "email") => void;
  /** Fired when the plain email link is clicked. */
  onEmailClick?: () => void;
  className?: string;
}

export default function Contact({
  id = "contact",
  label = "get in touch",
  paragraphs = defaultParagraphs,
  email = DEFAULT_EMAIL,
  mailtoHref,
  socials = defaultSocials,
  onChatAction,
  onEmailClick,
  className = "mt-16 md:mt-24 pt-12 pb-6 md:py-16 border-t border-foreground/10",
}: ContactProps = {}) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Section label */}
      <div className="flex items-center gap-2 mb-6">
        <span className="font-medium font-semibold tracking-wide text-xl lg:text-2xl">
          {label}
        </span>

        <Image
          src="/assets/throughout/3-line-sparkle-accent.webp"
          alt="decorative sparkle"
          width={100}
          height={100}
          className="-ml-12"
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-xl space-y-4 text-sm text-foreground/60 leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="flex items-center gap-3 flex-wrap lg:justify-end">
          <LetsChatButton
            email={email}
            mailtoHref={mailtoHref}
            onAction={onChatAction}
          />

          <div className="w-px h-5 mx-2 shrink-0" />

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${email}`}
              onClick={onEmailClick}
              className="text-sm text-foreground/60 hover:text-foreground transition-colors"
            >
              {email}
            </a>

            {socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                onClick={social.onClick}
                className="text-2xl font-bold text-foreground/70 hover:text-foreground transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
