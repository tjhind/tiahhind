import Image from "next/image";
import type { ReactNode } from "react";
import type { UgcConfig, UgcVideo } from "@/content/ugc";
import { mailtoHref } from "@/content/ugc";
import CopyEmail from "./CopyEmail";
import Poster from "./Poster";
import Reveal from "./Reveal";
import TrackedLink from "./TrackedLink";

/*
 * Below-the-fold sections for /ugc. Each is deliberately short (heading +
 * a few lines or a compact list) to keep the whole page skimmable in < 60s.
 */

const wrap = "mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-16";

function SectionHeading({
  id,
  kicker,
  children,
}: {
  id: string;
  kicker: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-6 sm:mb-8">
      <p className="mb-1 font-mono text-xs text-coral-deep">{kicker}</p>
      <h2
        id={id}
        className="text-2xl sm:text-3xl font-extrabold tracking-tight"
      >
        {children}
      </h2>
    </div>
  );
}

// ── Why a developer ─────────────────────────────────────────────────────────

export function WhyDeveloper({ items }: { items: UgcConfig["whyDeveloper"] }) {
  return (
    <section aria-labelledby="why-heading" className={`${wrap} py-12 sm:py-16`}>
      <Reveal>
        <SectionHeading id="why-heading" kicker="// the differentiator">
          why a developer?
        </SectionHeading>
      </Reveal>
      <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={i * 0.05} className="flex gap-3 lg:flex-col">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-foreground font-mono text-sm text-white"
              >
                {item.icon}
              </span>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-[15px] leading-snug text-foreground/75">
                  {item.body}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

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
        <SectionHeading id="services-heading" kicker="// what you can book">
          services
        </SectionHeading>
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
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-1 font-mono text-[11px]">
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
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 font-mono text-xs text-foreground/70">
            add-ons:
          </span>
          {addOns.map((a) => (
            <span
              key={a}
              className="rounded-full border border-foreground/15 px-2.5 py-1 text-xs text-foreground/80"
            >
              + {a}
            </span>
          ))}
        </div>
        <TrackedLink
          href="#contact"
          event={{ name: "ugc_cta_click", props: { location: "services" } }}
          className="inline-flex min-h-11 shrink-0 items-center self-start rounded-full bg-coral-deep px-5 text-sm font-semibold text-white hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
        >
          Enquire for rates →
        </TrackedLink>
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
        <SectionHeading id="process-heading" kicker="// how it works">
          process
        </SectionHeading>
      </Reveal>

      {/* Vertical stepper on mobile, horizontal on desktop */}
      <ol className="relative grid gap-4 border-l border-foreground/15 pl-5 md:grid-cols-5 md:gap-6 md:border-l-0 md:border-t md:pl-0 md:pt-5">
        {process.map((step, i) => (
          <li key={step.title} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[25px] top-1.5 h-2 w-2 rounded-full bg-coral md:-top-[25px] md:left-0"
            />
            <p className="font-mono text-xs text-coral-deep">
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
          <span className="ml-2 font-mono text-[11px] text-white/60">
            deliverables.spec
          </span>
        </div>
        <h3 className="sr-only">Deliverables spec sheet</h3>
        <dl className="grid gap-y-2 p-4 font-mono text-[13px] sm:grid-cols-[auto_1fr] sm:gap-x-6 sm:text-sm">
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
          <span className="absolute bottom-2 left-2 rounded bg-foreground/80 px-1.5 py-0.5 font-mono text-[11px] text-white">
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
        <SectionHeading id="organic-heading" kicker="// organic">
          I also build in public on TikTok.
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
        <SectionHeading id="testimonials-heading" kicker="// kind words">
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
        <SectionHeading id="faq-heading" kicker="// faq">
          questions
        </SectionHeading>
      </Reveal>
      {/* Native <details> accordion: keyboard + screen-reader friendly, no JS. */}
      <div className="max-w-3xl divide-y divide-foreground/10 border-y border-foreground/10">
        {items.map((item) => (
          <details key={item.q} className="group">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-medium [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral">
              {item.q}
              <span
                aria-hidden="true"
                className="font-mono text-coral-deep transition-transform group-open:rotate-45 motion-reduce:transition-none"
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

// ── Contact ────────────────────────────────────────────────────────────────

export function ContactSection({ contact }: { contact: UgcConfig["contact"] }) {
  const isDev = process.env.NODE_ENV === "development";
  const dms = [
    {
      label: "DM me on Instagram",
      url: contact.instagramUrl,
      method: "instagram" as const,
    },
    {
      label: "DM me on TikTok",
      url: contact.tiktokUrl,
      method: "tiktok" as const,
    },
  ];
  const dmBtn =
    "inline-flex min-h-11 items-center justify-center rounded-full border border-white/40 px-5 text-sm font-medium text-white hover:bg-white hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-foreground text-white scroll-mt-4"
    >
      <div className={`${wrap} py-14 sm:py-20`}>
        <Reveal>
          <p className="mb-2 font-mono text-xs text-coral">{"// contact"}</p>
          <h2
            id="contact-heading"
            className="max-w-2xl text-3xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight"
          >
            Got a product people should see? Let&apos;s make the ad.
          </h2>
        </Reveal>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <TrackedLink
            href={mailtoHref(contact)}
            event={{ name: "ugc_contact_click", props: { method: "email" } }}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-coral-deep px-6 text-sm font-semibold text-white hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Email me
          </TrackedLink>
          {dms.map((dm) =>
            dm.url ? (
              <TrackedLink
                key={dm.method}
                href={dm.url}
                external
                event={{
                  name: "ugc_contact_click",
                  props: { method: dm.method },
                }}
                className={dmBtn}
              >
                {dm.label}
              </TrackedLink>
            ) : isDev ? (
              <span
                key={dm.method}
                className={`${dmBtn} border-dashed opacity-60`}
              >
                {dm.label} (TODO: add URL)
              </span>
            ) : null,
          )}
        </div>

        <div className="mt-5 rounded-lg bg-white/5 px-4 py-3 [&_a]:text-white [&_a]:decoration-white/40 [&_button]:border-white/30 [&_button]:text-white">
          <span className="mr-2 font-mono text-xs text-white/70">or copy:</span>
          <CopyEmail email={contact.email} label="Copy email" />
        </div>

        <p className="mt-5 max-w-xl text-[15px] text-white/75">
          Tell me your brand, the product and what you need. I&apos;ll reply
          within {contact.replyTime}.
        </p>

        <p className="mt-12 text-xs text-white/60">
          © {new Date().getFullYear()} tiah hind. Samples marked “Spec ad” were
          made independently and are not sponsored by or affiliated with the
          brands shown.
        </p>
      </div>
    </section>
  );
}
