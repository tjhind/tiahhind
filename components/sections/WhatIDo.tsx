"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

interface Service {
  title: string;
  description: string;
  bullets: string[];
}

const services: Service[] = [
  {
    title: "mvp development",
    description:
      "I've shipped over 20 full-stack, fully coded apps for up-and-coming startups across 10+ business domains.",
    bullets: [
      "Rapid prototyping and iteration",
      "Scalable architecture",
      "Investor-ready builds",
    ],
  },
  {
    title: "full-stack engineering",
    description:
      "End-to-end development with clean code, stunning UI and a great user experience.",
    bullets: ["Frontend & Backend", "API design", "Database design"],
  },
  {
    title: "product & tech strategy",
    description:
      "Helping to shape ideas into the right product, with unique experiences that stand out.",
    bullets: [
      "Early-stage direction",
      "Practical decisions",
      "Long-term thinking",
    ],
  },
  {
    title: "ongoing support",
    description:
      "Sticking around to keep things running smoothly and improve the product as it grows.",
    bullets: ["Feature iteration", "Performance & polish", "Bug fixes"],
  },
];

function AccordionItem({
  service,
  index,
  prefersReducedMotion,
}: {
  service: Service;
  index: number;
  prefersReducedMotion: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="relative border-t border-foreground/10"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
    >
      <button
        type="button"
        className="relative z-10 w-full flex items-center justify-between py-4 text-left cursor-pointer touch-manipulation"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-semibold">{service.title}</span>

        <motion.span
          className="text-lg leading-none text-coral"
          animate={
            prefersReducedMotion ? undefined : { rotate: open ? 180 : 0 }
          }
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {open ? "−" : "+"}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="accordion-content"
            className="overflow-hidden pb-5"
            initial={
              prefersReducedMotion ? false : { opacity: 0, height: 0, y: -4 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1, height: "auto", y: 0 }
                : { opacity: 1, height: "auto", y: 0 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, height: 0, y: -4 }
            }
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <p className="text-sm text-foreground/60 mb-3 leading-relaxed">
              {service.description}
            </p>

            <ul className="space-y-1.5">
              {service.bullets.map((b) => (
                <li key={b} className="text-sm text-foreground/70 flex gap-2">
                  <span className="text-coral mt-px">—</span>
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function WhatIDo() {
  const rawReduced = useReducedMotion();
  const prefersReducedMotion = rawReduced ?? false;

  return (
    <section id="skills" className="relative isolate z-20 bg-[#EEEAE4]">
      {/* Decorative stickers */}
      <div className="absolute top-6 right-8 w-18 h-18 hidden md:block select-none pointer-events-none z-0">
        <Image
          src="/assets/throughout/pink-sequin-star.webp"
          alt=""
          fill
          sizes="96px"
          className="object-contain"
          priority={true}
        />
      </div>

      <div className="absolute bottom-0 left-12 w-12 h-12 hidden md:block select-none pointer-events-none z-0">
        <Image
          src="/assets/throughout/yellow-gingham-star.webp"
          alt=""
          fill
          sizes="24px"
          className="object-contain"
          priority={true}
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pb-14">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-2 mb-10 md:mb-12"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="font-medium font-semibold tracking-wide text-xl lg:text-2xl">
            what i do
          </span>

          <Image
            src="/assets/throughout/3-line-sparkle-accent.webp"
            alt=""
            width={100}
            height={100}
            className="-ml-12"
            style={{ height: "auto" }}
            priority={true}
          />
        </motion.div>

        {/* Desktop: 4-column grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-10">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="relative lg:px-8 first:lg:pl-0 last:lg:pr-0"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={
                prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1,
              }}
            >
              {index > 0 && (
                <span className="hidden lg:block absolute left-0 top-1/2 h-44 mt-6 -translate-y-1/2 border-l border-coral" />
              )}

              <h3 className="text-lg font-semibold mb-6 tracking-tight">
                {service.title}
              </h3>

              <p className="text-sm text-foreground/60 leading-relaxed mb-4">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.bullets.map((b) => (
                  <li key={b} className="text-sm text-foreground/70 flex gap-2">
                    <span className="text-coral shrink-0">—</span>
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Mobile: accordion */}
        <div className="relative z-30 md:hidden pointer-events-auto">
          {services.map((service, index) => (
            <AccordionItem
              key={service.title}
              service={service}
              index={index}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}

          <div className="border-t border-foreground/10" />
        </div>
      </div>
    </section>
  );
}
