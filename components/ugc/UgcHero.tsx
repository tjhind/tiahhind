import Image from "next/image";
import type { UgcConfig } from "@/content/ugc";
import Tag from "@/components/ui/Tag";
import HeadlineUnderline from "./HeadlineUnderline";
import HeroCtas from "./HeroCtas";
import Showreel from "./Showreel";

export default function UgcHero({ config }: { config: UgcConfig }) {
  const { headline } = config;

  return (
    <section
      id="ugc-hero"
      aria-labelledby="ugc-headline"
      className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-16 pt-4 pb-10 lg:pt-8 lg:pb-16"
    >
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div className="flex flex-col items-center gap-4 text-center sm:gap-5 lg:items-start lg:text-left">
          <h1 id="ugc-headline">
            {headline.image ? (
              <>
                <span className="sr-only">{headline.text}</span>
                <span className="relative mx-auto block w-[260px] sm:w-[340px] lg:mx-0 lg:w-[374px]">
                  <Image
                    src={headline.image.src}
                    alt=""
                    width={headline.image.width}
                    height={headline.image.height}
                    priority
                    className="block h-auto w-full"
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 340px, 374px"
                  />
                  {/* Homepage underline animation, tucked under "reality" */}
                  <HeadlineUnderline className="-mt-[4%] ml-[14%] w-[74%]" />
                </span>
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
          <div className="flex flex-col items-center gap-1 sm:flex-row sm:flex-wrap sm:gap-x-3">
            <span className="text-base font-semibold">{config.name}</span>
            <span
              aria-hidden="true"
              className="hidden sm:inline text-foreground/40"
            >
              ·
            </span>
            <a
              href={`mailto:${config.contact.email}`}
              className="select-text text-base text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-coral break-all"
            >
              {config.contact.email}
            </a>
          </div>

          <HeroCtas />

          <ul
            aria-label="Quick facts"
            className="mt-1 flex flex-wrap justify-center gap-x-2 gap-y-2 text-xs lg:justify-start"
          >
            {config.quickFacts.map((fact) => (
              <li key={fact}>
                <Tag>{fact}</Tag>
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
