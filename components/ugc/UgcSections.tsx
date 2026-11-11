import Image from "next/image";
import type { UgcConfig, UgcVideo } from "@/content/ugc";
import Poster from "./Poster";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TrackedLink from "./TrackedLink";
import UgcChatButton from "./UgcChatButton";

/*
 * Below-the-fold sections for /ugc. Each is deliberately short (heading +
 * a few lines or a compact list) to keep the whole page skimmable in < 60s.
 */

const wrap = "mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-16";

// ── Services ────────────────────────────────────────────────────────────────

export function Services({
  services,
  addOns,
}: {
  services: UgcConfig["services"];
  addOns: string[];
}) {
  return (
    <section
      aria-labelledby="services-heading"
      className={`${wrap} py-12 sm:py-16`}
    >
      <Reveal>
        <SectionHeading id="services-heading">services</SectionHeading>
      </Reveal>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <li key={s.name}>
            <Reveal
              delay={i * 0.05}
              className="flex h-full flex-col gap-2 rounded-xl border border-foreground/10 bg-white/70 p-4"
            >
              <h3 className="font-semibold">{s.name}</h3>
              <p className="text-[15px] leading-snug text-foreground/75">
                {s.description}
              </p>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-1 text-[11px]">
                {s.includes.map((inc) => (
                  <li
                    key={inc}
                    className="rounded bg-foreground/[0.06] px-1.5 py-0.5 text-foreground/80"
                  >
                    {inc}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-foreground/75">Enquire for rates</span>
          <UgcChatButton location="services" />
        </div>
      </div>
    </section>
  );
}

// ── Organic ────────────────────────────────────────────────────────────────

function OrganicCard({ post }: { post: UgcVideo }) {
  const body = (
    <>
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-darkGrey/40">
        {post.poster || post.isPlaceholder ? (
          <Poster
            src={post.poster}
            alt=""
            sizes="(max-width: 768px) 50vw, 240px"
            label="tiktok poster"
          />
        ) : (
          // Real post without a cover image: a branded "watch on TikTok" tile.
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-foreground text-white">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="ml-0.5 h-5 w-5"
                fill="currentColor"
              >
                <path d="M4 2.5v11l9-5.5z" />
              </svg>
            </span>
            <span className="text-sm font-medium">watch on tiktok</span>
            <span className="text-xs text-white/60">@toktish</span>
          </div>
        )}
        {typeof post.views === "number" && (
          <span className="absolute bottom-2 left-2 rounded bg-foreground/80 px-1.5 py-0.5 text-[11px] text-white">
            {Intl.NumberFormat("en-GB", { notation: "compact" }).format(
              post.views,
            )}{" "}
            views
          </span>
        )}
      </div>
      <h3 className="mt-2 text-sm font-semibold leading-snug">{post.title}</h3>
    </>
  );

  if (!post.externalUrl) return <div className="opacity-80">{body}</div>;

  return (
    <TrackedLink
      href={post.externalUrl}
      external
      event={{ name: "ugc_outbound_click", props: { destination: "tiktok" } }}
      className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
      aria-label={`${post.title} (opens TikTok in a new tab)`}
    >
      {body}
    </TrackedLink>
  );
}

export function Organic({ posts }: { posts: UgcVideo[] }) {
  if (posts.length === 0) return null;
  return (
    <section
      aria-labelledby="organic-heading"
      className={`${wrap} py-12 sm:py-16`}
    >
      <Reveal>
        <SectionHeading id="organic-heading">
          i also build in public on tiktok
        </SectionHeading>
      </Reveal>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
        {posts.slice(0, 4).map((p) => (
          <li key={p.slug}>
            <OrganicCard post={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}

// ── Testimonials / brand logos ──────────────────────────────────────────────

export function Testimonials({ items }: { items: UgcConfig["testimonials"] }) {
  // Hidden entirely until there are real entries.
  if (items.length === 0) return null;
  return (
    <section
      aria-labelledby="testimonials-heading"
      className={`${wrap} py-12 sm:py-16`}
    >
      <Reveal>
        <SectionHeading id="testimonials-heading">
          what brands say
        </SectionHeading>
      </Reveal>
      <ul className="grid gap-4 md:grid-cols-2">
        {items.map((t) => (
          <li key={`${t.name}-${t.company}`}>
            <figure className="flex h-full flex-col gap-3 rounded-xl border border-foreground/10 bg-white/70 p-5">
              <blockquote className="text-[15px] leading-snug">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 text-sm">
                {t.logo && (
                  <Image
                    src={t.logo}
                    alt={`${t.company} logo`}
                    width={80}
                    height={28}
                    className="h-7 w-auto"
                  />
                )}
                <span>
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-foreground/70">
                    , {t.role} at {t.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ── FAQ ────────────────────────────────────────────────────────────────────

export function Faq({ items }: { items: UgcConfig["faq"] }) {
  return (
    <section aria-labelledby="faq-heading" className={`${wrap} py-12 sm:py-16`}>
      <Reveal>
        <SectionHeading id="faq-heading">questions</SectionHeading>
      </Reveal>
      {/* Native <details> accordion: keyboard + screen-reader friendly, no JS. */}
      <div className="max-w-3xl divide-y divide-foreground/10 border-y border-foreground/10">
        {items.map((item) => (
          <details key={item.q} className="group">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-medium [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral">
              {item.q}
              <span
                aria-hidden="true"
                className="text-coral-deep transition-transform group-open:rotate-45 motion-reduce:transition-none"
              >
                +
              </span>
            </summary>
            <p className="pb-4 pr-8 text-[15px] leading-snug text-foreground/75">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
