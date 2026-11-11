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

/** Matches the Loader's own worst case (5s timeout + 0.7s exit). */
const LOADER_FALLBACK_MS = 6000;

export default function HeadlineUnderline({
  className = "",
}: {
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [playKey, setPlayKey] = useState(0); // 0 = not played yet; bump to (re)play
  const loaderDone = useRef(false);
  const inView = useRef(false);
  const scrolledAway = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Same behaviour as the homepage heading: first play once the loader has
    // exited, then replay whenever it scrolls back into view.
    const play = () => setPlayKey((k) => k + 1);

    let delay: ReturnType<typeof setTimeout> | undefined;
    function onLoaderDone() {
      if (loaderDone.current) return;
      loaderDone.current = true;
      if (inView.current) delay = setTimeout(play, 150);
      else scrolledAway.current = true; // play as soon as it's scrolled to
    }
    window.addEventListener("loaderComplete", onLoaderDone);
    const fallback = setTimeout(onLoaderDone, LOADER_FALLBACK_MS);

    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (!loaderDone.current) return;
        if (!entry.isIntersecting) {
          scrolledAway.current = true;
        } else if (scrolledAway.current) {
          scrolledAway.current = false;
          play();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);

    return () => {
      window.removeEventListener("loaderComplete", onLoaderDone);
      clearTimeout(fallback);
      clearTimeout(delay);
      io.disconnect();
    };
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
