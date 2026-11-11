"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import Poster from "./Poster";
import { track } from "@/lib/analytics";

/**
 * Vertical showreel in a phone frame. Autoplays muted + looped while in view
 * (unless reduced motion is set), pauses off-screen, and has a visible unmute
 * button. `preload="none"` means nothing downloads until it's on screen.
 */
export default function Showreel({
  src,
  poster,
  captionsSrc,
}: {
  src: string;
  poster: string;
  captionsSrc?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const reduce = useReducedMotion();
  const tracked = useRef(false);

  // Play when in view, pause when off-screen.
  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap || !src) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!reduce || !video.muted) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [src, reduce]);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted) video.play().catch(() => {});
  }

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-[min(72vw,280px)] lg:w-[300px] aspect-[9/19.5] rounded-[2.6rem] bg-foreground p-[10px] shadow-[0_30px_60px_-20px_rgba(26,26,26,0.45)]"
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-[#eeeae4]">
        {/* Dynamic-island notch */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-2.5 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-foreground"
        />
        {src ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={src}
            poster={poster || undefined}
            muted
            loop
            playsInline
            preload="none"
            aria-label="UGC showreel"
            onPlay={() => {
              if (!tracked.current) {
                tracked.current = true;
                track("ugc_video_play", {
                  slug: "showreel",
                  format: "showreel",
                });
              }
            }}
            onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
          >
            {captionsSrc && (
              <track
                kind="captions"
                src={captionsSrc}
                srcLang="en"
                label="English"
                default
              />
            )}
          </video>
        ) : (
          <Poster
            src={poster}
            alt="Showreel"
            sizes="300px"
            priority
            label="showreel"
          />
        )}

        {src && (
          <button
            type="button"
            onClick={toggleMute}
            className="absolute bottom-3 right-3 z-20 inline-flex h-11 items-center gap-1.5 rounded-full bg-foreground/80 px-3.5 text-xs text-white backdrop-blur focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-pressed={!muted}
            aria-label={muted ? "Unmute showreel" : "Mute showreel"}
          >
            <span aria-hidden="true">{muted ? "🔇" : "🔊"}</span>
            {muted ? "unmute" : "mute"}
          </button>
        )}
      </div>
    </div>
  );
}
