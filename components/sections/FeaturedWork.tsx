"use client";

import Image from "next/image";
import Tag from "@/components/ui/Tag";
import { motion, useReducedMotion } from "motion/react";

interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  type: "mobile" | "laptop";
  icon: string;
  screenshots?: string[];
}

const projects: Project[] = [
  {
    id: "pim",
    name: "pim",
    description:
      "A travel app that captures the unforgettable people you meet on the road, and the life advice they leave with you.",
    tags: ["React Native", "TypeScript", "Supabase", "Tailwind"],
    type: "mobile",
    icon: "/assets/header/blue-heart-button.webp",
    screenshots: [
      "/assets/featured-work/pim-screenshot-2.webp",
      "/assets/featured-work/pim-screenshot-1.webp",
      "/assets/featured-work/pim-screenshot-3.webp",
    ],
  },
  {
    id: "ticketdash",
    name: "ticketdash",
    description:
      "A real-time auction app for cinema tickets, helping users bid on available seats and secure tickets instantly.",
    tags: ["React Native", "JavaScript", "PostgreSQL"],
    type: "mobile",
    icon: "/assets/header/pink-sequin-star.webp",
    screenshots: [
      "/assets/featured-work/ticketdash-screenshot-2.webp",
      "/assets/featured-work/ticketdash-screenshot-4.webp",
      "/assets/featured-work/ticketdash-screenshot-3.webp",
    ],
  },
  {
    id: "denbee-honey",
    name: "denbee honey",
    description:
      "An e-commerce store for raw, natural honey built with a focus on storytelling and trust.",
    tags: ["Shopify"],
    type: "laptop",
    icon: "/assets/header/yellow-plastic-star.webp",
  },
];

function PhoneMockup({ screenshots }: { screenshots: string[] }) {
  const phones = [
    {
      screenshot: screenshots[0],
      mobileTransform: "translateX(24px) rotate(-6deg)",
      desktopTransform: "translateX(0) rotate(0deg)",
      zIndex: 10,
      mobileScale: 0.88,
      desktopScale: 1,
    },
    {
      screenshot: screenshots[1],
      mobileTransform: "translateY(8px)",
      desktopTransform: "translateX(0) rotate(0deg)",
      zIndex: 20,
      mobileScale: 1,
      desktopScale: 1,
    },
    {
      screenshot: screenshots[2],
      mobileTransform: "translateX(-24px) rotate(6deg)",
      desktopTransform: "translateX(0) rotate(0deg)",
      zIndex: 10,
      mobileScale: 0.88,
      desktopScale: 1,
    },
  ];

  return (
    <div className="pointer-events-none flex items-center justify-center h-[380px] sm:h-[430px] md:h-[460px] sm:gap-8 md:gap-12 lg:gap-14">
      {phones.map((phone, i) => {
        const mobileW = Math.round(150 * phone.mobileScale);
        const mobileH = Math.round(mobileW * 2.167);

        const desktopW = Math.round(150 * phone.desktopScale);
        const desktopH = Math.round(desktopW * 2.167);

        return (
          <div
            key={i}
            className="relative shrink-0 -mx-2 sm:mx-0 [transform:var(--mobile-transform)] sm:[transform:var(--desktop-transform)] w-[var(--mobile-w)] h-[var(--mobile-h)] sm:w-[var(--desktop-w)] sm:h-[var(--desktop-h)] pointer-events-none"
            style={
              {
                zIndex: phone.zIndex,
                "--mobile-transform": phone.mobileTransform,
                "--desktop-transform": phone.desktopTransform,
                "--mobile-w": `${mobileW}px`,
                "--mobile-h": `${mobileH}px`,
                "--desktop-w": `${desktopW}px`,
                "--desktop-h": `${desktopH}px`,
              } as React.CSSProperties & Record<string, string | number>
            }
          >
            {/* Screenshot clipped to the actual screen area */}
            <div
              className="absolute overflow-hidden rounded-[8%] pointer-events-none"
              style={{
                top: "7%",
                left: "7%",
                right: "7%",
                bottom: "7%",
              }}
            >
              <Image
                src={phone.screenshot}
                alt="App screenshot"
                fill
                sizes="(max-width: 640px) 150px, 170px"
                className="object-cover object-top pointer-events-none"
              />
            </div>

            {/* Frame on top */}
            <Image
              src="/assets/featured-work/iphone-frame.webp"
              alt=""
              fill
              sizes="(max-width: 640px) 150px, 170px"
              className="object-cover pointer-events-none"
              style={{ mixBlendMode: "multiply" as const }}
            />
          </div>
        );
      })}
    </div>
  );
}

function LaptopMockup() {
  return (
    <div className="relative w-full max-w-[600px] mx-auto pointer-events-none">
      {/* Website screenshot inside laptop screen */}
      <div
        className="absolute overflow-hidden pointer-events-none rounded-[2px]"
        style={{
          top: "20%",
          left: "18.8%",
          width: "62.8%",
          bottom: "18.2%",
        }}
      >
        <Image
          src="/assets/featured-work/computer-screenshot.webp"
          alt="denbee honey website"
          fill
          sizes="(max-width: 800px) 65vw, 40vw"
          className="pointer-events-none"
          style={{
            objectFit: "cover",
            objectPosition: "left top",
          }}
        />
      </div>

      {/* Laptop frame on top */}
      <Image
        src="/assets/featured-work/laptop-frame.webp"
        alt=""
        width={1536}
        height={1024}
        className="relative w-full h-auto pointer-events-none"
        style={{ mixBlendMode: "multiply" as const }}
      />
    </div>
  );
}

export default function FeaturedWork() {
  const rawReduced = useReducedMotion();
  const prefersReducedMotion = rawReduced ?? false;

  return (
    <section id="work" className="relative isolate z-0 bg-[#EEEAE4]">
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-10 md:pt-12 pb-16 md:pb-20">
        {/* Section label */}
        <motion.div
          className="flex items-center"
          initial={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="font-medium font-semibold tracking-wide text-xl lg:text-2xl">
            featured work
          </span>

          <Image
            src="/assets/throughout/3-line-sparkle-accent.webp"
            alt=""
            width={96}
            height={96}
            className="-ml-10"
            style={{ height: "auto" }}
          />
        </motion.div>

        {/* Project cards */}
        <div className="flex flex-col gap-16 md:gap-24">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className={`flex flex-col ${
                i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-10 lg:gap-16 items-center`}
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            >
              {/* Mockup */}
              <div className="w-full lg:w-1/2 flex items-center justify-center pointer-events-none">
                {project.type === "mobile" ? (
                  <PhoneMockup screenshots={project.screenshots ?? []} />
                ) : (
                  <LaptopMockup />
                )}
              </div>

              {/* Project details */}
              <div className="relative z-10 w-full lg:w-1/2 max-w-md pointer-events-auto">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                  {project.name}
                </h3>

                <p className="text-sm md:text-base text-foreground/60 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 -ml-1 sm:gap-4">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
