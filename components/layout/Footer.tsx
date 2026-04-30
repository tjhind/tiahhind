"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

export default function Footer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.querySelector("section");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#EEEAE4] border-t border-foreground/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-3 flex items-center">
        <Button href="#contact">let&apos;s connect ↗</Button>

        <div className="w-px h-5 bg-foreground/20 mx-5 shrink-0" />

        <a
          href="mailto:hello@tiahhind.com"
          className="text-sm text-foreground/60 hover:text-foreground transition-colors"
        >
          hello@tiahhind.com
        </a>

        <div className="ml-auto">
          <a
            href="https://linkedin.com/in/tiahhind"
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
