"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

export default function Footer() {
  const [heroGone, setHeroGone] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

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

  if (!heroGone || atBottom) return null;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#EEEAE4] border-t border-foreground/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-3 flex items-center">
        <Button href="#contact">let&apos;s connect ↗</Button>

        <div className="w-px h-5 bg-foreground/20 mx-5 shrink-0" />

        <div className="flex-1 flex items-end justify-end gap-3 flex-wrap">
          <a
            href="mailto:hello@tiahhind.com"
            className="text-sm text-foreground/60 hover:text-foreground transition-colors"
          >
            hello@tiahhind.com
          </a>{" "}
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
