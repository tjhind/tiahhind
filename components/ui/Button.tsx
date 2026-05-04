"use client";

import Link from "next/link";
import { motion } from "motion/react";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "outline";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const MotionLink = motion.create(Link);

const hoverTap = (variant: "primary" | "outline") => ({
  whileHover: {
    y: -2,
    scale: 1.02,
    ...(variant === "primary" && { filter: "brightness(1.06)" }),
  },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2, ease: "easeOut" as const },
});

export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium leading-none";

  const variants = {
    primary: "bg-coral text-white",
    outline: "border border-foreground text-foreground bg-transparent",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <MotionLink href={href} className={classes} {...hoverTap(variant)}>
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={classes}
      {...hoverTap(variant)}
    >
      {children}
    </motion.button>
  );
}
