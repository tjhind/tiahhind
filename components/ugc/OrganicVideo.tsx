"use client";

import { useRef } from "react";
import type { UgcVideo } from "@/content/ugc";
import { track } from "@/lib/analytics";

/**
 * An example TikTok post played in place with native controls. Nothing
 * downloads until it's played (`preload="none"`); SoundCoordinator pauses any
 * other video that's playing with sound.
 */
export default function OrganicVideo({ post }: { post: UgcVideo }) {
  const tracked = useRef(false);
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      src={post.src}
      poster={post.poster || undefined}
      controls
      playsInline
      preload="none"
      aria-label={post.title}
      onPlay={() => {
        if (tracked.current) return;
        tracked.current = true;
        track("ugc_video_play", { slug: post.slug, format: post.format });
      }}
    />
  );
}
