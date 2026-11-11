"use client";

import type { ReactNode } from "react";
import { track, type UgcEvent } from "@/lib/analytics";

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
  event: UgcEvent;
  external?: boolean;
  "aria-label"?: string;
};

/** Anchor that fires an analytics event on click. In-page hashes scroll smoothly. */
export default function TrackedLink({
  href,
  className,
  children,
  event,
  external,
  ...rest
}: Props) {
  return (
    <a
      href={href}
      className={className}
      aria-label={rest["aria-label"]}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={(e) => {
        track(event.name, event.props as never);
        if (href.startsWith("#")) {
          const el = document.getElementById(href.slice(1));
          if (!el) return;
          e.preventDefault();
          const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;
          el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
          history.replaceState(history.state, "", href);
        }
      }}
    >
      {children}
    </a>
  );
}
