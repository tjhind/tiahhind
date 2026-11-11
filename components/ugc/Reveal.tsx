"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Subtle scroll-in reveal.
 *
 * Always renders the same element on server and client (branching on
 * useReducedMotion would cause a hydration mismatch that leaves the server's
 * `opacity:0` in place). Reduced motion is handled in CSS instead: see the
 * `[data-reveal]` rule in globals.css, which forces these visible and static.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
