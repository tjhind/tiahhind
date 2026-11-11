import type { Metadata } from "next";
import Link from "next/link";
import { preload } from "react-dom";
import AboutMe from "@/components/sections/AboutMe";
import Loader from "@/components/layout/Loader";
import WhatIDo from "@/components/sections/WhatIDo";
import Logo from "@/components/ui/Logo";
import UgcHero from "@/components/ugc/UgcHero";
import WorkSection, {
  type WorkInitialState,
} from "@/components/ugc/WorkSection";
import {
  Faq,
  Organic,
  Services,
  Testimonials,
} from "@/components/ugc/UgcSections";
import StickyCta from "@/components/ugc/StickyCta";
import SoundCoordinator from "@/components/ugc/SoundCoordinator";
import UgcChatButton from "@/components/ugc/UgcChatButton";
import UgcContact from "@/components/ugc/UgcContact";
import {
  UGC_PATH,
  slugifyNiche,
  ugc,
  visibleOrganic,
  type UgcFormat,
} from "@/content/ugc";

/*
 * /ugc — UGC creator portfolio. Intentionally NOT linked from the main site
 * nav; it's shared directly with brands (DMs, bios, emails).
 */

const SITE_URL = "https://tiahhind.com";
const TITLE = "Tiah | UGC Creator for Tech, SaaS & AI Brands";
const DESCRIPTION =
  "Ad-ready UGC from a software developer. Scroll-stopping vertical video for tech, SaaS, AI and gadget brands, delivered on time and to spec.";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function first(v: string | string[] | undefined): string | null {
  return (Array.isArray(v) ? v[0] : v) ?? null;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const slug = first((await searchParams).v);
  const video = slug ? ugc.videos.find((v) => v.slug === slug) : undefined;

  const title = video ? `${video.title} | Tiah, UGC Creator` : TITLE;
  const description = video?.hook
    ? `“${video.hook}” ${video.isSpec ? "Spec ad sample" : "UGC ad"} by Tiah.`
    : DESCRIPTION;
  const url = video
    ? `${SITE_URL}${UGC_PATH}?v=${video.slug}`
    : `${SITE_URL}${UGC_PATH}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${SITE_URL}${UGC_PATH}` },
    openGraph: {
      type: "website",
      url,
      siteName: "Tiah Hind",
      title,
      description,
      // Per-video poster when deep-linked; otherwise opengraph-image.tsx is used.
      ...(video?.poster ? { images: [{ url: video.poster }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(video?.poster ? { images: [video.poster] } : {}),
    },
  };
}

function parseInitial(params: {
  [key: string]: string | string[] | undefined;
}): WorkInitialState {
  const niche = first(params.niche);
  const format = first(params.format);
  const v = first(params.v);
  const validNiches = new Set(ugc.videos.map((x) => slugifyNiche(x.niche)));
  return {
    niche: niche && validNiches.has(niche) ? niche : null,
    format: format && format in ugc.formatLabels ? (format as UgcFormat) : null,
    video: v && ugc.videos.some((x) => x.slug === v) ? v : null,
  };
}

function isoDuration(sec: number) {
  return `PT${Math.floor(sec / 60)}M${Math.round(sec % 60)}S`;
}

function structuredData() {
  const { contact } = ugc;
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Tiah Hind",
    url: SITE_URL,
    email: contact.email,
    jobTitle: ["Software Developer", "UGC Creator"],
    sameAs: [
      "https://www.linkedin.com/in/tiahhind",
      "https://github.com/tjhind",
      `${SITE_URL}${UGC_PATH}`,
      contact.instagramUrl,
      contact.tiktokUrl,
    ].filter(Boolean),
  };
  // Only real, uploaded featured videos get VideoObject markup.
  const videos = ugc.videos
    .filter((v) => v.featured && v.src && v.poster && !v.isPlaceholder)
    .map((v) => ({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: v.title,
      description: v.hook ?? v.title,
      thumbnailUrl: new URL(v.poster, SITE_URL).toString(),
      contentUrl: new URL(v.src, SITE_URL).toString(),
      duration: isoDuration(v.durationSec),
      uploadDate: "2026-01-01", // TODO(owner): add real upload dates if desired
      embedUrl: `${SITE_URL}${UGC_PATH}?v=${v.slug}`,
      creator: { "@id": `${SITE_URL}/#person` },
    }));
  return [person, ...videos];
}

export default async function UgcPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // The headline underline animation (1.16 MB) is fetched while the loader
  // shows, so it's ready to play the moment the loader exits.
  preload("/assets/header/header-lines-animation.png", { as: "image" });
  const initial = parseInitial(await searchParams);
  const organic = visibleOrganic();

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
      />
      <Loader />
      <SoundCoordinator />

      <header className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-16">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
          aria-label="Tiah Hind, developer portfolio home"
        >
          <Logo />
        </Link>
        <div className="hidden sm:block">
          <UgcChatButton location="hero" />
        </div>
      </header>

      <main>
        <UgcHero config={ugc} />
        <WorkSection config={ugc} initial={initial} />

        {/* ── Below the fold: supporting content, kept short ── */}
        <WhatIDo
          id="why-developer"
          label="why a developer?"
          items={ugc.whyDeveloper}
          eager={false}
          innerClassName="pt-14 md:pt-16"
        />
        <Services services={ugc.services} addOns={ugc.addOns} />
        <Organic posts={organic} tiktokUrl={ugc.contact.tiktokUrl} />
        <Faq items={ugc.faq} />
        <Testimonials items={ugc.testimonials} />
        {/* overflow-x-clip: the collage's stickers poke past 320px viewports */}
        <div className="overflow-x-clip">
          <AboutMe
            id="about"
            bio={ugc.about.paragraphs}
            links={ugc.about.links}
            showHobbies={false}
            showContact={false}
            eager={false}
            compact
          />
        </div>
        <UgcContact contact={ugc.contact} />
      </main>

      <StickyCta />
    </div>
  );
}
