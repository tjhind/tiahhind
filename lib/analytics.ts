/**
 * Lightweight analytics shim.
 *
 * Events are pushed to `window.dataLayer`, which Google Tag Manager picks up
 * once a container is loaded (see NEXT_PUBLIC_GTM_ID in .env.example). Until a
 * tag manager is installed, pushes are harmless no-ops. Swap the body of
 * `track` to target Plausible/Umami/etc. without touching call sites.
 */

export type UgcEvent =
  | { name: "ugc_video_play"; props: { slug: string; format: string } }
  | { name: "ugc_filter_change"; props: { niche: string; format: string } }
  | {
      name: "ugc_cta_click";
      props: { location: "hero" | "sticky" | "services" | "footer" };
    }
  | {
      name: "ugc_contact_click";
      props: { method: "email" | "copy_email" | "instagram" | "tiktok" };
    }
  | { name: "ugc_outbound_click"; props: { destination: string } };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track<N extends UgcEvent["name"]>(
  name: N,
  props: Extract<UgcEvent, { name: N }>["props"],
) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...props });
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", name, props);
  }
}
