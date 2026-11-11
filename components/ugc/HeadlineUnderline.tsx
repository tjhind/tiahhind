"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/*
 * Reuses the homepage's hand-drawn underline animation
 * (/assets/header/header-lines-animation.png, a 1300×750 APNG that plays once).
 * That file also draws three tick marks beside "tiah", so we show only the
 * underline by clipping to its region of the canvas.
 */
const CANVAS = { w: 1300, h: 750 };
const CLIP = { x: 225, y: 340, w: 435, h: 85 }; // underline only

export default function HeadlineUnderline({
  className = "",
}: {
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [playKey, setPlayKey] = useState(0); // 0 = not played yet
  const scrolledAway = useRef(false);

  // Play when it comes into view; replay when it returns after scrolling away
  // (same behaviour as the homepage heading). Remounting the <img> restarts it.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          scrolledAway.current = true;
        } else {
          setPlayKey((k) => (k === 0 || scrolledAway.current ? k + 1 : k));
          scrolledAway.current = false;
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: `${CLIP.w} / ${CLIP.h}` }}
    >
      {playKey > 0 && (
        <Image
          key={playKey}
          src="/assets/header/header-lines-animation.png"
          alt=""
          width={CANVAS.w}
          height={CANVAS.h}
          unoptimized
          className="absolute max-w-none"
          style={{
            width: `${(CANVAS.w / CLIP.w) * 100}%`,
            height: "auto",
            left: `${(-CLIP.x / CLIP.w) * 100}%`,
            top: `${(-CLIP.y / CLIP.h) * 100}%`,
          }}
        />
      )}
    </div>
  );
}
