"use client";

import { useState } from "react";
import Image from "next/image";

interface Service {
  title: string;
  description: string;
  bullets: string[];
}

const services: Service[] = [
  {
    title: "MVP Development",
    description:
      "Validate your idea quickly with a lean, functional MVP that's ready for users.",
    bullets: ["Rapid prototyping", "Scalable architecture", "Investor-ready"],
  },
  {
    title: "Full-Stack Engineering",
    description:
      "End-to-end development with clean code and great user experience.",
    bullets: ["Frontend & Backend", "API design", "Database design"],
  },
  {
    title: "Product & Tech Strategy",
    description:
      "Helping founders make smart technical decisions for long-term success.",
    bullets: ["Tech strategy", "Roadmapping", "Scalability planning"],
  },
  {
    title: "Ongoing Support",
    description:
      "Reliable partner for maintenance, iteration and continuous improvement.",
    bullets: ["Feature improvements", "Performance", "Bug fixes"],
  },
];

function AccordionItem({ service }: { service: Service }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-foreground/10">
      <button
        className="w-full flex items-center justify-between py-4 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-sm font-semibold">{service.title}</span>
        <span className="text-lg leading-none text-foreground/50">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="pb-5">
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
        </div>
      )}
    </div>
  );
}

export default function WhatIDo() {
  return (
    <section id="skills" className="relative bg-[#EEEAE4]">
      {/* Decorative stickers */}
      <div className="absolute top-6 right-8 w-7 h-7 hidden md:block select-none pointer-events-none">
        <Image
          src="/assets/throughout/pink-sequin-star.webp"
          alt=""
          fill
          sizes="28px"
          className="object-contain"
        />
      </div>
      <div className="absolute bottom-8 left-12 w-5 h-5 hidden md:block select-none pointer-events-none">
        <Image
          src="/assets/throughout/yellow-gingham-star.webp"
          alt=""
          fill
          sizes="20px"
          className="object-contain"
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-14 md:py-16">
        {/* Section label */}
        <div className="flex items-center gap-2 mb-10 md:mb-12">
          <span className="text-xs font-medium uppercase tracking-widest text-foreground/50">
            what i do
          </span>
          <Image
            src="/assets/throughout/3-line-sparkle-accent.png"
            alt=""
            width={16}
            height={16}
            className="opacity-50"
            style={{ height: "auto" }}
          />
        </div>

        {/* Desktop: 4-column grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {services.map((service) => (
            <div key={service.title}>
              <h3 className="text-sm font-semibold mb-3">{service.title}</h3>
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
            </div>
          ))}
        </div>

        {/* Mobile: accordion */}
        <div className="md:hidden">
          {services.map((service) => (
            <AccordionItem key={service.title} service={service} />
          ))}
          <div className="border-t border-foreground/10" />
        </div>
      </div>
    </section>
  );
}
