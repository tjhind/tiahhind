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

// ── Process + spec sheet ────────────────────────────────────────────────────

export function ProcessAndSpec({
  process,
  specSheet,
}: {
  process: UgcConfig["process"];
  specSheet: UgcConfig["specSheet"];
}) {
  const keyWidth = Math.max(...Object.keys(specSheet).map((k) => k.length));
  return (
    <section
      aria-labelledby="process-heading"
      className={`${wrap} py-12 sm:py-16`}
    >
      <Reveal>
        <SectionHeading id="process-heading">process</SectionHeading>
      </Reveal>

      {/* Vertical stepper on mobile, horizontal on desktop */}
      <ol className="relative grid gap-4 border-l border-foreground/15 pl-5 md:grid-cols-5 md:gap-6 md:border-l-0 md:border-t md:pl-0 md:pt-5">
        {process.map((step, i) => (
          <li key={step.title} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[25px] top-1.5 h-2 w-2 rounded-full bg-coral md:-top-[25px] md:left-0"
            />
            <p className="text-xs text-coral-deep">
              {String(i + 1).padStart(2, "0")} / {step.title}
            </p>
            <p className="mt-1 text-[15px] leading-snug text-foreground/75">
              {step.description}
            </p>
          </li>
        ))}
      </ol>

      <Reveal className="mt-8 overflow-hidden rounded-xl bg-foreground text-white">
        <div
          className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5"
          aria-hidden="true"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="ml-2 text-[11px] text-white/60">
            deliverables.spec
          </span>
        </div>
        <h3 className="sr-only">Deliverables spec sheet</h3>
        <dl className="grid gap-y-2 p-4 text-[13px] sm:grid-cols-[auto_1fr] sm:gap-x-6 sm:text-sm">
          {Object.entries(specSheet).map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-coral" style={{ minWidth: `${keyWidth}ch` }}>
                {k}
              </dt>
              <dd className="-mt-1.5 mb-1 text-white/90 sm:m-0">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

// ── Organic ────────────────────────────────────────────────────────────────

function OrganicCard({ post }: { post: UgcVideo }) {
  const body = (
    <>
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-darkGrey/40">
        <Poster
          src={post.poster}
          alt=""
          sizes="(max-width: 768px) 50vw, 240px"
          label="tiktok poster"
        />
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
