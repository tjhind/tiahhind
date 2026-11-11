"use client";

import { forwardRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { UgcConfig, UgcVideo } from "@/content/ugc";
import { formatDuration } from "@/content/ugc";
import Poster from "./Poster";
import SpecBadge from "./SpecBadge";

interface VideoCardProps {
  video: UgcVideo;
  formatLabels: UgcConfig["formatLabels"];
  onOpen: () => void;
  priority?: boolean;
}

function canHoverPreview() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

/**
 * Grid card. The whole poster/title area is one button that opens the modal;
 * the Spec badge sits outside that button so it stays independently operable.
 * Desktop only: the low-bitrate preview clip is mounted on hover, never before.
 */
const VideoCard = forwardRef<HTMLButtonElement, VideoCardProps>(
  function VideoCard({ video, formatLabels, onOpen, priority }, ref) {
    const [hovering, setHovering] = useState(false);
    const reduce = useReducedMotion();
    const showPreview =
      hovering && !reduce && !!video.previewSrc && canHoverPreview();

    return (
      <article className="relative flex flex-col gap-2">
        <button
          ref={ref}
          type="button"
          onClick={onOpen}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
          onPointerLeave={() => setHovering(false)}
          className="group flex flex-col gap-2 text-left rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
          aria-label={`Play: ${video.title}`}
        >
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-darkGrey/40">
            <Poster
              src={video.poster}
              alt=""
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
              priority={priority}
            />
            {showPreview && (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={video.previewSrc}
                muted
                autoPlay
                loop
                playsInline
                preload="none"
                aria-hidden="true"
              />
            )}
            {/* Play icon */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md transition-transform group-hover:scale-110 motion-reduce:transition-none"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M4 2.5v11l9-5.5z" />
              </svg>
            </span>
            {video.durationSec > 0 && (
              <span className="absolute bottom-2 right-2 rounded bg-foreground/80 px-1.5 py-0.5 text-[11px] text-white">
                {formatDuration(video.durationSec)}
              </span>
            )}
          </div>

          <h3 className="text-sm sm:text-[15px] font-semibold leading-snug">
            {video.title}
          </h3>
          {video.hook && (
            <p className="-mt-1 line-clamp-2 border-l-2 border-coral pl-2 text-[13px] italic leading-snug text-foreground/70">
              “{video.hook}”
            </p>
          )}
        </button>

        {/* Tags: always visible */}
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          <span className="rounded bg-foreground/[0.06] px-1.5 py-0.5 text-foreground/80">
            {video.niche}
          </span>
          <span className="rounded bg-coral/10 px-1.5 py-0.5 text-coral-deep">
            {formatLabels[video.format]}
          </span>
        </div>

        {video.isSpec && (
          <div className="pointer-events-none absolute inset-x-2 top-2 z-10">
            <SpecBadge />
          </div>
        )}
      </article>
    );
  },
);

export default VideoCard;
