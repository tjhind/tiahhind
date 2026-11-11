"use client";

import { useEffect, useState } from "react";
import TrackedLink from "./TrackedLink";

/**
 * Mobile-only "Work with me" bar. Appears once the hero has scrolled out of
 * view and hides again while the contact section is on screen, so it never
 * covers the contact buttons. The page reserves bottom padding for it.
 */
export default function StickyCta() {
  const [heroGone, setHeroGone] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("ugc-hero");
    const contact = document.getElementById("contact");
    const observers: IntersectionObserver[] = [];
    if (hero) {
      const io = new IntersectionObserver(([e]) =>
        setHeroGone(!e.isIntersecting),
      );
      io.observe(hero);
      observers.push(io);
    }
    if (contact) {
      const io = new IntersectionObserver(([e]) =>
        setContactVisible(e.isIntersecting),
      );
      io.observe(contact);
      observers.push(io);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const visible = heroGone && !contactVisible;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-foreground/10 bg-background/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-300 motion-reduce:transition-none md:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!visible}
      inert={!visible}
    >
      <TrackedLink
        href="#contact"
        event={{ name: "ugc_cta_click", props: { location: "sticky" } }}
        className="flex min-h-12 w-full items-center justify-center rounded-full bg-coral-deep text-[15px] font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
      >
        Work with me
      </TrackedLink>
    </div>
  );
}
