"use client";

import { useId, useState } from "react";

export const SPEC_EXPLAINER =
  "Sample ad made independently to show style. Not sponsored by or affiliated with the brand.";

/**
 * Small neutral "Spec ad" label with a tooltip (hover, focus or tap).
 * The tooltip is positioned against the nearest positioned ancestor (the card's
 * badge strip) so it never overflows the viewport on narrow screens.
 */
export default function SpecBadge() {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <span className="group inline-flex">
      <button
        type="button"
        aria-describedby={id}
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && open) {
            e.stopPropagation();
            setOpen(false);
          }
        }}
        // Visual pill is small; padding gives a 44px tap target.
        className="pointer-events-auto -m-3.5 p-3.5 focus-visible:outline-none"
      >
        <span className="inline-flex items-center gap-1 rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-foreground/80 ring-1 ring-foreground/10 group-focus-within:ring-2 group-focus-within:ring-coral">
          Spec ad <span aria-hidden="true">ⓘ</span>
        </span>
      </button>
      <span
        id={id}
        role="tooltip"
        className={`pointer-events-none absolute inset-x-0 top-full z-30 mt-1 max-w-56 rounded-md bg-foreground px-2.5 py-2 text-[11px] leading-snug text-white shadow-lg transition-opacity motion-reduce:transition-none ${
          open
            ? "visible opacity-100"
            : "invisible opacity-0 group-hover:visible group-hover:opacity-100 group-has-[:focus-visible]:visible group-has-[:focus-visible]:opacity-100"
        }`}
      >
        {SPEC_EXPLAINER}
      </span>
    </span>
  );
}
