"use client";

import { useEffect, useRef } from "react";
import type { UgcConfig, UgcVideo } from "@/content/ugc";
import { formatDuration } from "@/content/ugc";
import { track } from "@/lib/analytics";
import Poster from "./Poster";
import { SPEC_EXPLAINER } from "./SpecBadge";

interface VideoModalProps {
  video: UgcVideo | null;
  formatLabels: UgcConfig["formatLabels"];
  position: { index: number; total: number };
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Lightbox built on the native <dialog> element: showModal() makes the rest of
 * the page inert (focus is trapped) and Esc closes it. Arrow keys step through
 * the currently filtered list. Focus return is handled by the parent.
 */
export default function VideoModal({
  video,
  formatLabels,
  position,
  onClose,
  onPrev,
  onNext,
}: VideoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trackedSlug = useRef<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (video && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    }
    if (!video && dialog.open) dialog.close();
  }, [video]);

  useEffect(() => {
    trackedSlug.current = null;
  }, [video?.slug]);

  function onKeyDown(e: React.KeyboardEvent<HTMLDialogElement>) {
    // Let the native video controls keep their own arrow-key seeking.
    if (e.target instanceof HTMLVideoElement) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      onPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      onNext();
    }
  }

  const btn =
    "inline-flex h-11 min-w-11 items-center justify-center rounded-full bg-white/10 px-3 text-sm text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-40";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="ugc-modal-title"
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        // Click on the backdrop (the dialog element itself) closes.
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-foreground/95 p-0 text-white backdrop:bg-black/60 md:m-auto md:h-[min(92dvh,900px)] md:w-[min(94vw,980px)] md:rounded-2xl"
    >
      {video && (
        <div className="flex h-full flex-col md:flex-row">
          <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black md:w-[55%] md:flex-none">
            <div className="relative aspect-[9/16] h-full max-h-full max-w-full">
              {video.src ? (
                <video
                  key={video.slug}
                  className="absolute inset-0 h-full w-full"
                  src={video.src}
                  poster={video.poster || undefined}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  onPlay={() => {
                    if (trackedSlug.current !== video.slug) {
                      trackedSlug.current = video.slug;
                      track("ugc_video_play", {
                        slug: video.slug,
                        format: video.format,
                      });
                    }
                  }}
                >
                  {video.captionsSrc && (
                    <track
                      kind="captions"
                      src={video.captionsSrc}
                      srcLang="en"
                      label="English"
                      default
                    />
                  )}
                </video>
              ) : (
                <Poster
                  src={video.poster}
                  alt={video.title}
                  sizes="500px"
                  label="video file"
                />
              )}
            </div>
          </div>

          <div className="flex max-h-[45dvh] flex-col gap-4 overflow-y-auto p-4 md:max-h-none md:flex-1 md:p-8">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-white/70">
                {String(position.index + 1).padStart(2, "0")} /{" "}
                {String(position.total).padStart(2, "0")}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={btn}
                  onClick={onPrev}
                  disabled={position.total < 2}
                  aria-label="Previous video"
                >
                  ←
                </button>
                <button
                  type="button"
                  className={btn}
                  onClick={onNext}
                  disabled={position.total < 2}
                  aria-label="Next video"
                >
                  →
                </button>
                <button
                  type="button"
                  className={btn}
                  onClick={onClose}
                  aria-label="Close video"
                  data-autofocus
                >
                  ✕
                </button>
              </div>
            </div>

            <h2
              id="ugc-modal-title"
              className="text-xl md:text-2xl font-bold leading-tight"
            >
              {video.title}
            </h2>

            <div className="flex flex-wrap gap-1.5 text-xs">
              <span className="rounded bg-white/10 px-1.5 py-0.5">
                {video.niche}
              </span>
              <span className="rounded bg-coral/25 px-1.5 py-0.5">
                {formatLabels[video.format]}
              </span>
              {video.durationSec > 0 && (
                <span className="rounded bg-white/10 px-1.5 py-0.5">
                  {formatDuration(video.durationSec)}
                </span>
              )}
              <span className="rounded bg-white/10 px-1.5 py-0.5">
                {video.isSpec
                  ? "Spec ad"
                  : video.isOriginal
                    ? "Original content"
                    : "Paid / commissioned"}
              </span>
            </div>
            {video.isSpec && (
              <p className="text-xs leading-snug text-white/70">
                {SPEC_EXPLAINER}
              </p>
            )}

            {video.hook && (
              <blockquote className="border-l-2 border-coral pl-3 italic text-white/90">
                “{video.hook}”
              </blockquote>
            )}

            {video.breakdown && (
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                {(["goal", "hook", "angle", "cta"] as const).map((k) => (
                  <div key={k} className="contents">
                    <dt className="text-white/60">{k}</dt>
                    <dd className="text-white/90">{video.breakdown![k]}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
