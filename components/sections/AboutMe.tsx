"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Contact from "./Contact";

const hobbies = [
  {
    icon: "/assets/header/roman-statue.webp",
    label: "visiting art museums",
  },
  { icon: "/assets/about-me/trainer-shoe.webp", label: "going on hikes" },
  {
    icon: "/assets/about-me/pen.webp",
    label: "writing questionable poetry",
  },
  {
    icon: "/assets/about-me/headphones.webp",
    label: "listening to podcasts",
  },
  {
    icon: "/assets/about-me/globe.webp",
    label: "planning my next trip",
  },
  {
    icon: "/assets/about-me/vinyl-record.webp",
    label: "seeing live music",
  },
  {
    icon: "/assets/header/laptop.webp",
    label: "working on side projects",
  },
  {
    icon: "/assets/about-me/tea.webp",
    label: "drinking tea (yorkshire, obvs)",
  },
];

const photos = [
  {
    src: "/assets/about-me/2.webp",
    alt: "Tiah standing under a flower arch",
    rotate: "-7deg",
    style: { top: "25px", left: "10px" },
    width: 170,
    height: 205,
    sizes: "(max-width: 768px) 340px, 340px",
    zIndex: 2,
  },
  {
    src: "/assets/about-me/1.webp",
    alt: "Tiah in Japan",
    rotate: "9deg",
    style: { top: "10px", left: "195px" },
    width: 135,
    height: 175,
    sizes: "(max-width: 768px) 270px, 270px",
    zIndex: 3,
  },
  {
    src: "/assets/about-me/4.webp",
    alt: "Tiah at the great wall of China",
    rotate: "-4deg",
    style: { top: "235px", left: "20px" },
    width: 140,
    height: 185,
    sizes: "(max-width: 768px) 322px, 322px",
    zIndex: 4,
  },
  {
    src: "/assets/about-me/3.webp",
    alt: "Tiah on a hike",
    rotate: "11deg",
    style: { top: "245px", left: "200px" },
    width: 170,
    height: 160,
    sizes: "(max-width: 768px) 340px, 340px",
    zIndex: 5,
  },
];

function PhotoCollage() {
  return (
    <div className="relative w-[360px] h-[460px] md:w-[400px] md:h-[480px] shrink-0">
      {photos.map((photo, i) => (
        <div
          key={i}
          className="absolute overflow-hidden"
          style={{
            ...photo.style,
            transform: `rotate(${photo.rotate})`,
            width: `${photo.width}px`,
            height: `${photo.height}px`,
            zIndex: photo.zIndex,
          }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={photo.sizes}
            className="object-cover"
            priority={true}
          />
        </div>
      ))}

      {/* Blue heart sticker */}
      <div
        className="absolute w-16 h-16 pointer-events-none"
        style={{ bottom: "24px", left: "4px", zIndex: 6 }}
      >
        <Image
          src="/assets/header/blue-heart-button.webp"
          alt="blue button shaped as a heart"
          fill
          sizes="128px"
          className="object-contain"
          priority={true}
        />
      </div>

      {/* Toast */}
      <div
        className="absolute w-24 h-24 pointer-events-none"
        style={{ top: "160px", right: "15px", zIndex: 6 }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/assets/header/banana-peanut-butter-honey-toast.webp"
            alt="slice of toast with peanut butter, banana and honey"
            fill
            sizes="144px"
            className="object-contain"
            priority={true}
          />
        </div>
      </div>

      {/* Green star sticker */}
      <div
        className="absolute w-24 h-24 pointer-events-none"
        style={{ top: "8px", right: "8px", zIndex: 6 }}
      >
        <Image
          src="/assets/header/green-fabric-star.webp"
          alt="green fabric star"
          fill
          sizes="192px"
          className="object-contain"
          priority={true}
        />
      </div>

      {/* Notebook */}
      <div
        className="absolute flex items-center justify-center pointer-events-none"
        style={{ bottom: "12px", right: "-24px", zIndex: 6 }}
      >
        <div className="relative w-36 h-36">
          <Image
            src="/assets/about-me/notebook.webp"
            alt="open notebook"
            fill
            sizes="288px"
            className="object-contain"
            priority={true}
          />
        </div>
      </div>

      {/* Pink seal */}
      <div
        className="absolute flex items-center justify-center pointer-events-none"
        style={{ bottom: "190px", left: "170px", zIndex: 6 }}
      >
        <div className="relative w-24 h-24">
          <Image
            src="/assets/about-me/pink-wax-seal-with-bow.webp"
            alt="pink wax seal with bow"
            fill
            sizes="192px"
            className="object-contain"
            priority={true}
          />
        </div>
      </div>

      {/* Masking Tape */}
      <div
        className="absolute flex items-center justify-center pointer-events-none"
        style={{ top: "-36px", right: "120px", zIndex: 6 }}
      >
        <div className="relative w-24 h-24">
          <Image
            src="/assets/about-me/masking-tape.webp"
            alt="masking tape"
            fill
            sizes="192px"
            className="object-contain"
            priority={true}
          />
        </div>
      </div>

      {/* Teabag */}
      <div
        className="absolute flex items-center justify-center pointer-events-none"
        style={{ top: "-60px", left: "-70px", zIndex: 6, rotate: "30deg" }}
      >
        <div className="relative w-40 h-40">
          <Image
            src="/assets/header/teabag.webp"
            alt="teabag"
            fill
            sizes="320px"
            className="object-contain"
            priority={true}
          />
        </div>
      </div>

      {/* Red Star */}
      <div
        className="absolute flex items-center justify-center pointer-events-none"
        style={{ bottom: "25px", left: "-10px", zIndex: 6, rotate: "30deg" }}
      >
        <div className="relative w-10 h-10">
          <Image
            src="/assets/throughout/red-fabric-star.webp"
            alt="red fabric star"
            fill
            sizes="60px"
            className="object-contain"
            priority={true}
          />
        </div>
      </div>

      {/* Washi Tape */}
      <div
        className="absolute flex items-center justify-center pointer-events-none"
        style={{ bottom: "210px", left: "120px", zIndex: 6, rotate: "-15deg" }}
      >
        <div className="relative w-28 h-28">
          <Image
            src="/assets/about-me/pink-washi-tape.webp"
            alt="pink washi tape"
            fill
            sizes="224px"
            className="object-contain"
            priority={true}
          />
        </div>
      </div>
    </div>
  );
}

const bioParagraphs = [
  "I'm a full-stack developer, problem solver, and creative at heart. I enjoy building thoughtful and visually stunning products from the ground up.",
  "I've spent the last few years working with early-stage startups, helping turn half-formed, messy ideas into real, working apps. Honestly, that's my favourite part - I love a bit of chaos. The more undefined and scrappy something is, the more excited I get.",
  "There's something really satisfying about taking something that feels all over the place and shaping it into something clear, simple, and genuinely enjoyable to use. That space between chaos and clarity is where I do my best work.",
  "When I'm not coding, I'm usually off doing something that fuels that same curiosity...",
];

export default function AboutMe() {
  const rawReduced = useReducedMotion();
  const prefersReducedMotion = rawReduced ?? false;

  return (
    <section id="about" className="relative isolate bg-[#EEEAE4]">
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-4 lg:px-16 pt-14 md:pt-20 pb-18 lg:pb-36">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-2 mb-10 md:mb-14"
          initial={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="font-medium font-semibold tracking-wide text-xl lg:text-2xl">
            about me
          </span>

          <Image
            src="/assets/throughout/3-line-sparkle-accent.webp"
            alt=""
            width={100}
            height={100}
            className="-ml-12"
            priority={true}
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-14 xl:gap-20 items-start">
          {/* Photo collage */}
          <motion.div
            className="flex justify-center w-full lg:w-auto"
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            whileInView={
              prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
            }
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <PhotoCollage />
          </motion.div>

          {/* Bio + hobbies wrapper */}
          <div className="w-full flex flex-col xl:flex-row gap-12 lg:gap-14 xl:gap-20 lg:flex-1">
            {/* Bio text */}
            <div className="w-full max-w-lg xl:flex-1">
              <div className="space-y-4 text-sm text-foreground/60 leading-relaxed">
                {bioParagraphs.map((paragraph, i) => (
                  <motion.p
                    key={i}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 20 }
                    }
                    whileInView={
                      prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: i * 0.08,
                    }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Hobbies grid */}
            <div className="w-full lg:max-w-lg xl:max-w-none xl:w-[420px] grid grid-cols-2 xl:grid-cols-2 gap-x-6 gap-y-3 xl:gap-y-0">
              {hobbies.map((hobby, i) => (
                <motion.div
                  key={hobby.label}
                  className="flex items-center gap-4 text-sm tracking-tight text-foreground/70"
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  whileInView={
                    prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                  }
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: i * 0.08,
                  }}
                >
                  <div className="relative w-16 h-16 mt-0.5 shrink-0">
                    <Image
                      src={hobby.icon}
                      alt=""
                      fill
                      sizes="128px"
                      className="object-contain"
                      priority={true}
                    />
                  </div>
                  <span>{hobby.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <Contact />
      </div>

      <div className="absolute bottom-0 left-0 w-full leading-[0] pointer-events-none z-0">
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full block"
        >
          <path
            d="M0,60 C300,120 600,0 900,60 C1050,90 1200,30 1440,60 L1440,120 L0,120 Z"
            fill="#FAF8F5"
          />
        </svg>
      </div>
    </section>
  );
}
