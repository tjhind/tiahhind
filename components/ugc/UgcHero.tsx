import Image from "next/image";
import type { UgcConfig } from "@/content/ugc";
import CopyEmail from "./CopyEmail";
import HeroCtas from "./HeroCtas";
import Showreel from "./Showreel";

/**
 * Above the fold: headline, name + selectable email, CTAs, quick facts,
 * with the showreel peeking in (mobile) or sitting alongside (desktop).
 * No entrance animations here: everything must be visible on first paint.
 */
export default function UgcHero({ config }: { config: UgcConfig }) {
  const { headline } = config;

  return (
    <section
      id="ugc-hero"
      aria-labelledby="ugc-headline"
      className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-16 pt-4 pb-10 lg:pt-8 lg:pb-16"
    >
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div className="flex flex-col gap-4 sm:gap-5">
          <p
            className="font-mono text-xs text-foreground/70"
            aria-hidden="true"
          >
            {config.terminalLine}
            <span className="ml-0.5 inline-block w-[0.6ch] animate-pulse motion-reduce:animate-none text-coral">
              ▍
            </span>
          </p>

          {/*
            Headline. Uses the same hand-lettered artwork treatment as the homepage
            "hi, i'm tiah" heading (an image, not a web font). Until the owner adds the
            artwork, a coral display-text fallback stands in.
          */}
          <h1 id="ugc-headline">
            {headline.image ? (
              <>
                <span className="sr-only">{headline.text}</span>
                <Image
                  src={headline.image.src}
                  alt=""
                  width={headline.image.width}
                  height={headline.image.height}
                  priority
                  className="block h-auto w-[260px] sm:w-[340px] lg:w-[374px]"
                  sizes="(max-width: 640px) 260px, (max-width: 1024px) 340px, 374px"
                />
              </>
            ) : (
              <span className="block text-[2.5rem] leading-[0.95] sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-coral">
                {headline.text}
              </span>
            )}
          </h1>

          <p className="max-w-xl text-base sm:text-lg leading-snug text-foreground/80">
            {config.subheadline}
          </p>

          {/* Name + email: real, selectable text, always above the fold */}
          <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
            <span className="text-base font-semibold">{config.name}</span>
            <span
              aria-hidden="true"
              className="hidden sm:inline text-foreground/40"
            >
              ·
            </span>
            <CopyEmail email={config.contact.email} />
          </div>

          <HeroCtas />

          <ul
            aria-label="Quick facts"
            className="mt-1 flex flex-wrap gap-x-2 gap-y-2 font-mono text-xs"
          >
            {config.quickFacts.map((fact) => (
              <li
                key={fact}
                className="rounded-md border border-foreground/15 bg-white/60 px-2.5 py-1.5 text-foreground/80"
              >
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <Showreel
          src={config.showreel.src}
          poster={config.showreel.poster}
          captionsSrc={config.showreel.captionsSrc}
        />
      </div>
    </section>
  );
}
