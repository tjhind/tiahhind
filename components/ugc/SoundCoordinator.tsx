"use client";

import { useEffect } from "react";

/**
 * Ensures only one video plays with sound at a time: whenever a video starts
 * (or is unmuted) with sound, every other audible video on the page pauses.
 */
export default function SoundCoordinator() {
  useEffect(() => {
    function onMedia(e: Event) {
      const target = e.target;
      if (!(target instanceof HTMLVideoElement)) return;
      if (target.muted || target.paused) return;
      document.querySelectorAll("video").forEach((v) => {
        if (v !== target && !v.muted && !v.paused) v.pause();
      });
    }
    // Media events don't bubble, so listen in the capture phase.
    document.addEventListener("play", onMedia, true);
    document.addEventListener("volumechange", onMedia, true);
    return () => {
      document.removeEventListener("play", onMedia, true);
      document.removeEventListener("volumechange", onMedia, true);
    };
  }, []);
  return null;
}
