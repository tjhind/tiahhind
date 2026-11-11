"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

interface CopyEmailProps {
  email: string;
  /** Visible label on the button. */
  label?: string;
  className?: string;
}

/**
 * Email as real, selectable text plus a convenience Copy button.
 * The address is a mailto: link, so long-press/highlight still selects it on
 * iOS and Android. The Copy button is a sibling, never a wrapper.
 */
export default function CopyEmail({
  email,
  label = "Copy",
  className = "",
}: CopyEmailProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    track("ugc_contact_click", { method: "copy_email" });
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Fallback for browsers without async clipboard: select the text.
      const el = document.createElement("textarea");
      el.value = email;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }

  return (
    <span
      className={`inline-flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}
    >
      <a
        href={`mailto:${email}`}
        onClick={() => track("ugc_contact_click", { method: "email" })}
        className="select-text font-mono text-[15px] sm:text-base text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-coral break-all"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-foreground/20 px-3 text-xs font-medium font-mono hover:border-foreground/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
        aria-label={`Copy email address ${email}`}
      >
        {copied ? "Copied!" : label}
      </button>
      <span aria-live="polite" aria-atomic="true" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </span>
  );
}
