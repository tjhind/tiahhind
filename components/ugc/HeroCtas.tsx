"use client";

import TrackedLink from "./TrackedLink";
import { PLAY_REEL_EVENT } from "./Showreel";

export default function HeroCtas() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <TrackedLink
        href="#contact"
        event={{ name: "ugc_cta_click", props: { location: "hero" } }}
        className="inline-flex min-h-11 items-center rounded-full bg-coral-deep px-6 text-sm font-semibold text-white hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
      >
        Work with me
      </TrackedLink>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent(PLAY_REEL_EVENT))}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-foreground px-5 text-sm font-medium hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
      >
        <span aria-hidden="true">▶</span> Watch the reel
      </button>
    </div>
  );
}
