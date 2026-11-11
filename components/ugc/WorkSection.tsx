"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { UgcConfig, UgcFormat } from "@/content/ugc";
import { slugifyNiche } from "@/content/ugc";
import { track } from "@/lib/analytics";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";

export interface WorkInitialState {
  niche: string | null; // slugified niche
  format: UgcFormat | null;
  video: string | null; // slug
}

type Chip = { value: string | null; label: string; count: number };

/** Mirror filter + open-video state into the URL without a navigation. */
function syncUrl(state: WorkInitialState) {
  const url = new URL(window.location.href);
  const set = (k: string, v: string | null) =>
    v ? url.searchParams.set(k, v) : url.searchParams.delete(k);
  set("niche", state.niche);
  set("format", state.format);
  set("v", state.video);
  window.history.replaceState(window.history.state, "", url);
}

function ChipRow({
  label,
  chips,
  selected,
  onSelect,
}: {
  label: string;
  chips: Chip[];
  selected: string | null;
  onSelect: (value: string | null) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex items-center gap-3">
      <span className="hidden sm:block w-16 shrink-0 font-mono text-xs text-foreground/70">
        {label.toLowerCase()}
      </span>
      {/* Only the chip row scrolls sideways on mobile, never the videos. */}
      <div className="-mx-4 flex min-w-0 flex-1 gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        {chips.map((chip) => {
          const active = selected === chip.value;
          return (
            <button
              key={chip.value ?? "all"}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(chip.value)}
              className={`inline-flex min-h-11 shrink-0 items-center gap-1 whitespace-nowrap rounded-lg border px-3 font-mono text-[13px] transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral ${
                active
                  ? "border-coral-deep bg-coral-deep text-white"
                  : "border-foreground/15 bg-white/60 text-foreground/80 hover:border-foreground/40"
              }`}
            >
              {chip.label}
              <span className={active ? "text-white/85" : "text-foreground/60"}>
                ({chip.count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function WorkSection({
  config,
  initial,
}: {
  config: UgcConfig;
  initial: WorkInitialState;
}) {
  const { videos, niches, formatLabels } = config;
  const [niche, setNiche] = useState<string | null>(initial.niche);
  const [format, setFormat] = useState<UgcFormat | null>(initial.format);
  const [openSlug, setOpenSlug] = useState<string | null>(
    initial.video && videos.some((v) => v.slug === initial.video)
      ? initial.video
      : null,
  );
  const cardRefs = useRef(new Map<string, HTMLButtonElement>());
  // The card focus returns to when the modal closes.
  const lastTrigger = useRef<string | null>(initial.video);
  const openSlugRef = useRef(openSlug);
  useEffect(() => {
    openSlugRef.current = openSlug;
  }, [openSlug]);

  // Chips: ordered by config, only those with ≥1 video. Niches present in
  // videos but missing from config are appended so nothing is unfilterable.
  const nicheChips = useMemo<Chip[]>(() => {
    const order = [
      ...niches,
      ...videos.map((v) => v.niche).filter((n) => !niches.includes(n)),
    ];
    const seen = new Set<string>();
    const chips: Chip[] = [];
    for (const n of order) {
      if (seen.has(n)) continue;
      seen.add(n);
      const count = videos.filter((v) => v.niche === n).length;
      if (count > 0) chips.push({ value: slugifyNiche(n), label: n, count });
    }
    return [{ value: null, label: "All", count: videos.length }, ...chips];
  }, [videos, niches]);

  const formatChips = useMemo<Chip[]>(() => {
    const chips = (Object.keys(formatLabels) as UgcFormat[])
      .map((f) => ({
        value: f,
        label: formatLabels[f],
        count: videos.filter((v) => v.format === f).length,
      }))
      .filter((c) => c.count > 0);
    return [{ value: null, label: "All", count: videos.length }, ...chips];
  }, [videos, formatLabels]);

  const filtered = useMemo(
    () =>
      videos.filter(
        (v) =>
          (!niche || slugifyNiche(v.niche) === niche) &&
          (!format || v.format === format),
      ),
    [videos, niche, format],
  );

  // Keep the URL in sync with filters + open video.
  useEffect(() => {
    syncUrl({ niche, format, video: openSlug });
  }, [niche, format, openSlug]);

  // The list the modal steps through: the filtered list, or all videos if a
  // deep link points at something currently filtered out.
  const modalList = filtered.some((v) => v.slug === openSlug)
    ? filtered
    : videos;
  const openIndex = modalList.findIndex((v) => v.slug === openSlug);
  const openVideo = openIndex >= 0 ? modalList[openIndex] : null;

  const open = (slug: string) => {
    lastTrigger.current = slug;
    setOpenSlug(slug);
  };

  const close = useCallback(() => {
    if (openSlugRef.current === null) return; // dialog "close" event after we closed it
    openSlugRef.current = null;
    setOpenSlug(null);
    const slug = lastTrigger.current;
    // Return focus to the card that opened the modal, after the dialog closes.
    requestAnimationFrame(() => {
      if (slug) cardRefs.current.get(slug)?.focus();
    });
  }, []);

  const step = (dir: 1 | -1) => {
    if (modalList.length < 2 || openIndex < 0) return;
    const next =
      modalList[(openIndex + dir + modalList.length) % modalList.length];
    lastTrigger.current = next.slug;
    setOpenSlug(next.slug);
  };

  function selectNiche(value: string | null) {
    setNiche(value);
    track("ugc_filter_change", {
      niche: value ?? "all",
      format: format ?? "all",
    });
  }
  function selectFormat(value: string | null) {
    setFormat(value as UgcFormat | null);
    track("ugc_filter_change", {
      niche: niche ?? "all",
      format: value ?? "all",
    });
  }

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-16 pb-16"
    >
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h2
          id="work-heading"
          className="text-2xl sm:text-3xl font-extrabold tracking-tight"
        >
          the work
        </h2>
        <span className="font-mono text-xs text-foreground/70">
          {"// tap to play with sound"}
        </span>
      </div>

      <div className="mb-6 flex flex-col gap-2">
        <ChipRow
          label="Niche"
          chips={nicheChips}
          selected={niche}
          onSelect={selectNiche}
        />
        <ChipRow
          label="Ad style"
          chips={formatChips}
          selected={format}
          onSelect={selectFormat}
        />
      </div>

      <p aria-live="polite" className="sr-only">
        {`Showing ${filtered.length} of ${videos.length} videos`}
      </p>

      {filtered.length > 0 ? (
        <ul className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
          {filtered.map((video, i) => (
            <li key={video.slug}>
              <VideoCard
                ref={(el) => {
                  if (el) cardRefs.current.set(video.slug, el);
                  else cardRefs.current.delete(video.slug);
                }}
                video={video}
                formatLabels={formatLabels}
                onOpen={() => open(video.slug)}
                priority={i < 2}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-xl border border-dashed border-foreground/20 p-8 text-center">
          <p className="mb-3 text-foreground/80">
            No samples match both filters yet.
          </p>
          <button
            type="button"
            onClick={() => {
              setNiche(null);
              setFormat(null);
              track("ugc_filter_change", { niche: "all", format: "all" });
            }}
            className="inline-flex min-h-11 items-center rounded-full border border-foreground px-5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
          >
            Clear filters
          </button>
        </div>
      )}

      <VideoModal
        video={openVideo}
        formatLabels={formatLabels}
        position={{ index: Math.max(openIndex, 0), total: modalList.length }}
        onClose={close}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </section>
  );
}
