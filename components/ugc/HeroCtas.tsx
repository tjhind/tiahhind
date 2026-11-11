"use client";

import UgcChatButton from "./UgcChatButton";
import { PLAY_REEL_EVENT } from "./Showreel";

export default function HeroCtas() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
      <UgcChatButton location="hero" />
      <button
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent(PLAY_REEL_EVENT))}
        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium leading-none border border-foreground text-foreground bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
      >
        watch the reel ▶
      </button>
    </div>
  );
}
