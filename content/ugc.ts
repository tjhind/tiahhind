/**
 * UGC page content: the single source of truth for /ugc.
 *
 * Add a new sample video by appending to `videos`. No component changes needed.
 * Anything marked TODO is a placeholder the owner still needs to fill in.
 *
 * Video hosting: `src` / `previewSrc` / `showreel.src` are plain URLs, so files
 * can live in /public or on external storage (e.g. Cloudflare R2) and be swapped
 * without touching components. Posters live in /public/assets/ugc/ so they go
 * through next/image optimisation.
 */

// ── Types ───────────────────────────────────────────────────────────────────

/** Ad style. */
export type UgcFormat =
  | "problem-solution"
  | "product-demo"
  | "unboxing-setup"
  | "testimonial"
  | "listicle"
  | "dev-diary"
  | "tutorial"
  | "honest-take"
  | "organic";

/** Niche / product type. Free-form so new niches need no code changes. */
export type UgcNiche = string;

export interface UgcVideo {
  slug: string; // used for deep links: /ugc?v=slug
  title: string;
  format: UgcFormat;
  niche: UgcNiche;
  productName?: string;
  isSpec: boolean; // true => "Spec ad" label
  /** My own content (not for a brand): labelled "Original content", not "Paid / commissioned". */
  isOriginal?: boolean;
  durationSec: number;
  src: string; // MP4 URL ("" = not uploaded yet)
  poster: string; // 9:16 image ("" = placeholder styling)
  previewSrc?: string; // short, low-bitrate muted clip for desktop hover
  captionsSrc?: string; // .vtt
  hook?: string; // first spoken line, shown as a pull quote
  breakdown?: { goal: string; hook: string; angle: string; cta: string };
  featured?: boolean; // include in VideoObject structured data
  externalUrl?: string; // organic posts: TikTok link
  views?: number; // only if real
  /** Seed/placeholder entry. Placeholder organic posts are hidden in production. */
  isPlaceholder?: boolean;
}

export interface UgcService {
  name: string;
  description: string;
  includes: string[];
  // No price field: every service shows "Enquire for rates".
}

export interface UgcTestimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  logo?: string;
}

export interface UgcConfig {
  name: string; // shown above the fold
  headline: {
    text: string;
    /** Hand-lettered headline image, matching the homepage "hi, i'm tiah" artwork. */
    image?: { src: string; width: number; height: number };
  };
  subheadline: string;
  /** Phrases in the subheadline shown in a slightly darker grey. */
  subheadlineHighlights: string[];
  niches: UgcNiche[]; // order of niche filter chips
  formatLabels: Record<UgcFormat, string>; // order = order of ad-style chips
  showreel: {
    src: string;
    poster: string;
    captionsSrc?: string;
    objectPosition?: string;
  };
  quickFacts: string[];
  videos: UgcVideo[];
  whyDeveloper: { title: string; description: string; bullets?: string[] }[];
  services: UgcService[];
  addOns: string[];
  testimonials: UgcTestimonial[];
  about: { paragraphs: string[]; links: { label: string; href: string }[] };
  faq: { q: string; a: string }[];
  organic: UgcVideo[];
  contact: {
    email: string;
    emailSubject: string;
    emailBodyTemplate: string;
    instagramUrl: string;
    tiktokUrl: string;
    replyTime: string;
  };
}

// ── Content ─────────────────────────────────────────────────────────────────

const TURNAROUND = "5–7 business days";
const REVISIONS = "2 rounds";

export const ugc: UgcConfig = {
  name: "Tiah Hind",

  headline: {
    // Matches the wording of the hand-lettered artwork (used as the accessible name).
    text: "Ideas into (UGC) reality.",
    image: {
      src: "/assets/ugc/ideas-into-ugc-reality.webp",
      width: 746,
      height: 520,
    },
  },

  subheadline:
    "I'm Tiah, a software developer making ad-ready UGC for tech, SaaS and AI brands.",
  subheadlineHighlights: ["software developer", "tech, SaaS", "AI"],

  // Chip order. Only niches with at least one video get a chip.
  niches: [
    "AI tool",
    "Game dev",
    "Web dev",
    "App",
    "SaaS / dev tool",
    "Tech gadget",
    "Accessories",
    "Desk setup",
    "Unboxing",
    "Pet",
    "Beauty",
    "Home",
    "Food & drink",
  ],

  // Chip order. Only styles with at least one video get a chip.
  formatLabels: {
    tutorial: "Tutorial / how-to",
    "dev-diary": "Dev diary",
    "honest-take": "Honest take",
    "product-demo": "Product demo",
    testimonial: "Testimonial",
    "problem-solution": "Problem → Solution",
    listicle: "Listicle / “3 reasons”",
    "unboxing-setup": "Unboxing / setup",
    organic: "Organic storytelling",
  },

  // Compressed copies; raw exports live in /.originals (git-ignored).
  showreel: {
    src: "/assets/ugc/videos/showreel.mp4",
    poster: "/assets/ugc/showreel-poster.jpg",
    // Framing inside the phone (CSS object-position). Lower x = shifts the picture right.
    objectPosition: "35% 50%",
  },

  quickFacts: ["5–7 day turnaround", "Raw + edited files", "UK-based"],

  videos: [
    {
      slug: "loop-engineering-claude",
      title: "Loop engineering a product with Claude",
      format: "tutorial",
      niche: "AI tool",
      productName: "Claude",
      isSpec: false,
      isOriginal: true,
      durationSec: 191,
      src: "/assets/ugc/videos/loop-engineering-claude.mp4",
      poster: "/assets/ugc/loop-engineering-claude-poster.jpg",
      previewSrc: "/assets/ugc/videos/loop-engineering-claude-preview.mp4",
      featured: true,
    },
    {
      slug: "game-jam-godot",
      title: "Building a game for a game jam (and why I picked Godot)",
      format: "dev-diary",
      niche: "Game dev",
      productName: "Godot",
      isSpec: false,
      isOriginal: true,
      durationSec: 111,
      src: "/assets/ugc/videos/game-jam-godot.mp4",
      poster: "/assets/ugc/game-jam-godot-poster.jpg",
      previewSrc: "/assets/ugc/videos/game-jam-godot-preview.mp4",
      featured: true,
    },
    {
      slug: "vibe-coding-portfolio",
      title: "How I vibe coded my portfolio, and what I thought",
      format: "honest-take",
      niche: "Web dev",
      productName: "Claude",
      isSpec: false,
      isOriginal: true,
      durationSec: 85,
      src: "/assets/ugc/videos/vibe-coding-portfolio.mp4",
      poster: "/assets/ugc/vibe-coding-portfolio-poster.jpg",
      previewSrc: "/assets/ugc/videos/vibe-coding-portfolio-preview.mp4",
      featured: true,
    },
    {
      slug: "food-charm-keychains",
      title: "Mini food charm keychains",
      format: "product-demo",
      niche: "Accessories",
      isSpec: false,
      isOriginal: true,
      durationSec: 7,
      src: "/assets/ugc/videos/food-charm-keychains.mp4",
      poster: "/assets/ugc/food-charm-keychains-poster.jpg",
      previewSrc: "/assets/ugc/videos/food-charm-keychains-preview.mp4",
      featured: true,
    },
  ],

  // Rendered with the homepage "what i do" component (accordion on mobile).
  whyDeveloper: [
    {
      title: "i understand the product",
      description:
        "I can explain APIs, AI tools and dev workflows without the script reading like a manual.",
      bullets: ["APIs & dev tools", "AI products", "SaaS workflows"],
    },
    {
      title: "i speak to technical audiences",
      description: "Developers can tell when a creator is faking it.",
      bullets: [
        "Real developer background",
        "Accurate, jargon-aware scripts",
        "Credible on camera",
      ],
    },
    {
      title: "i ship on time",
      description: "I treat briefs like tickets: scoped, estimated, delivered.",
      bullets: [
        "5–7 business day turnaround",
        `${REVISIONS} of revisions`,
        "No-drama communication",
      ],
    },
    {
      title: "i think in iterations",
      description: "Multiple hooks per video, so you can A/B test.",
      bullets: [
        "Hook variations",
        "Built for A/B testing",
        "Raw + clean files",
      ],
    },
  ],

  services: [
    {
      name: "Single UGC video",
      description: "One 15–60s ad, built around one strong hook.",
      includes: ["Edited with captions", "Clean version (no captions/music)"],
    },
    {
      name: "Hook-test pack",
      description: "One video body with three alternative hooks.",
      includes: ["4 hook variations", "Ready for A/B testing"],
    },
    {
      name: "Product demo / walkthrough",
      description: "Screen recording + face-cam. Ideal for apps and SaaS.",
      includes: ["Screen capture", "Face-cam voiceover", "Captions"],
    },
    {
      name: "Monthly content bundle",
      // TODO(owner): set the number of videos per month.
      description: "[X] videos a month for ongoing ad testing.",
      includes: ["Fresh hooks each month", "Priority scheduling"],
    },
  ],

  addOns: [
    "Extra hooks",
    "Usage-rights extension",
    "Whitelisting / Spark Ads",
    "Rush delivery",
  ],

  // Section is hidden while this is empty. Never add invented quotes or logos.
  testimonials: [],

  about: {
    paragraphs: [
      "I'm a full-stack developer who's spent the last few years helping early-stage startups turn messy ideas into real, working apps.",
      "UGC is the same job from the other side: taking a product and making people get it in seconds. I love apps, gadgets, a good desk setup and far too much tea.",
    ],
    links: [{ label: "dev portfolio →", href: "/" }],
  },

  faq: [
    {
      q: "Do you need me to send the product?",
      a: "For physical products, yes. Ship it to me in the UK. For software, a free account or licence is all I need.",
    },

    {
      q: "Can you post it on your own account?",
      a: "Yes, as an optional paid add-on.",
    },
    {
      q: "Do you do whitelisting / Spark Ads / Partnership Ads?",
      a: "Yes. These are available as an add-on, so you can run ads through my handle.",
    },
    {
      q: "What's your turnaround?",
      a: `${TURNAROUND} from an approved script, with ${REVISIONS} of revisions included.`,
    },
    {
      q: "How much do you charge?",
      a: "Rates depend on the brief. Get in touch by email or DM and I'll come back with a quote.",
    },
    {
      q: "Which niches do you cover?",
      a: "Mostly tech: apps, SaaS, dev tools, AI and gadgets. I'm also happy to talk about home, desk setup, pet, beauty and food & drink products.",
    },
  ],

  // Example TikTok posts. With `src` they play in place; with only
  // `externalUrl` they link out to TikTok. Covers are each video's first frame.
  organic: [
    {
      slug: "building-in-public-1",
      title: "Getting back to my side project",
      format: "organic",
      niche: "App",
      isSpec: false,
      durationSec: 44,
      src: "/assets/ugc/videos/building-in-public-1.mp4",
      poster: "/assets/ugc/building-in-public-1-poster.jpg",
    },
    {
      slug: "building-in-public-2",
      title: "Shipping updates to my side project",
      format: "organic",
      niche: "App",
      isSpec: false,
      durationSec: 69,
      src: "/assets/ugc/videos/building-in-public-2.mp4",
      poster: "/assets/ugc/building-in-public-2-poster.jpg",
    },
  ],

  contact: {
    email: "hello@tiahhind.com",
    emailSubject: "UGC enquiry – [your brand]",
    emailBodyTemplate: [
      "Hi Tiah,",
      "",
      "Brand:",
      "Product link:",
      "What we need (formats / number of videos):",
      "Timeline:",
      "",
      "Thanks!",
    ].join("\n"),
    instagramUrl: "", // TODO(owner): https://instagram.com/<handle>
    tiktokUrl: "https://www.tiktok.com/@toktish",
    replyTime: "24–48 hours", // TODO(owner): confirm reply time
  },
};

// ── Helpers ─────────────────────────────────────────────────────────────────

export const UGC_PATH = "/ugc";

export function slugifyNiche(niche: string): string {
  return niche
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function mailtoHref(c: UgcConfig["contact"]): string {
  return `mailto:${c.email}?subject=${encodeURIComponent(
    c.emailSubject,
  )}&body=${encodeURIComponent(c.emailBodyTemplate)}`;
}

/** Organic posts to render: placeholders only show in development. */
export function visibleOrganic(config: UgcConfig = ugc): UgcVideo[] {
  return config.organic.filter(
    (v) => !v.isPlaceholder || process.env.NODE_ENV === "development",
  );
}
