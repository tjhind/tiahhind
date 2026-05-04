"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

interface StickerData {
  src: string;
  alt: string;
  className: string;
  maxSize: number;
  floatDuration: number;
  floatDelay: number;
  floatAmplitude: number;
  converge: {
    x: number;
    y: number;
    scrollStart: number;
    scrollEnd: number;
  };
}

const stickers: StickerData[] = [
  // fan — top-left corner
  {
    src: "/assets/header/fan.webp",
    alt: "fan",
    className:
      "rotate-[-30deg] top-[3%] left-[2%] w-[100px] md:w-[148px] lg:w-[180px] md:-left-[1%]",
    maxSize: 180,
    floatDuration: 4.2,
    floatDelay: 0,
    floatAmplitude: 8,
    converge: { x: 500, y: 550, scrollStart: 0.05, scrollEnd: 0.65 },
  },
  // pastel de nata — top-left area (lg only)
  {
    src: "/assets/header/pastel-de-nata.webp",
    alt: "pastel de nata",
    className: "rotate-[-10deg] hidden lg:block top-[6%] left-[18%] w-[130px]",
    maxSize: 130,
    floatDuration: 3.8,
    floatDelay: 0.4,
    floatAmplitude: 7,
    converge: { x: 350, y: 520, scrollStart: 0.1, scrollEnd: 0.7 },
  },
  // sushi — left side
  {
    src: "/assets/header/sushi.webp",
    alt: "sushi",
    className:
      "rotate-[-20deg] w-[50px] top-[20%] left-[6%] md:left-[8%] md:w-[100px] lg:w-[140px]",
    maxSize: 140,
    floatDuration: 5.1,
    floatDelay: 0.8,
    floatAmplitude: 9,
    converge: { x: 480, y: 420, scrollStart: 0.0, scrollEnd: 0.6 },
  },
  // laptop — left side
  {
    src: "/assets/header/laptop.webp",
    alt: "laptop",
    className:
      "rotate-[-15deg] top-[32%] md:top-[42%] left-[1%] w-[90px] md:-left-[1%] md:w-[140px] lg:w-[160px]",
    maxSize: 160,
    floatDuration: 3.5,
    floatDelay: 1.2,
    floatAmplitude: 6,
    converge: { x: 520, y: 340, scrollStart: 0.15, scrollEnd: 0.75 },
  },
  // plant — lower-left
  {
    src: "/assets/header/plant.webp",
    alt: "houseplant",
    className:
      "rotate-[-10deg] top-[63%] left-[1%] w-[78px] lg:left-[6%] md:w-[120px]",
    maxSize: 120,
    floatDuration: 4.7,
    floatDelay: 0.3,
    floatAmplitude: 7,
    converge: { x: 500, y: 80, scrollStart: 0.2, scrollEnd: 0.8 },
  },
  // hello-kitty-bee — right/bottom area
  {
    src: "/assets/header/hello-kitty-bee.webp",
    alt: "hello kitty dressed as a bee",
    className:
      "w-[150px] rotate-[5deg] top-[16%] right-[-10%] md:w-[100px] md:left-[50%] md:top-auto md:bottom-[5%] lg:left-[20%] lg:bottom-[5%] lg:w-[200px]",
    maxSize: 300,
    floatDuration: 5.5,
    floatDelay: 1.8,
    floatAmplitude: 8,
    converge: { x: 200, y: -80, scrollStart: 0.1, scrollEnd: 0.7 },
  },
  // bow — near center-top
  {
    src: "/assets/header/bow.webp",
    alt: "yellow bow",
    className:
      "block rotate-[9deg] top-[2%] left-[44%] w-[80px] md:w-[58px] lg:w-[70px] lg:top-[40%] lg:left-[20%]",
    maxSize: 80,
    floatDuration: 3.2,
    floatDelay: 0.6,
    floatAmplitude: 10,
    converge: { x: 80, y: 550, scrollStart: 0.05, scrollEnd: 0.65 },
  },
  // green star — right-middle
  {
    src: "/assets/header/green-fabric-star.webp",
    alt: "green star",
    className: "rotate-[0deg] top-[40%] right-[10%] w-[45px]",
    maxSize: 36,
    floatDuration: 4.4,
    floatDelay: 1.0,
    floatAmplitude: 6,
    converge: { x: -380, y: 250, scrollStart: 0.1, scrollEnd: 0.7 },
  },
  // fish — top-right
  {
    src: "/assets/header/fish.webp",
    alt: "fish",
    className:
      "block rotate-[15deg] top-[6%] right-[2%] w-[100px] md:w-[116px] lg:w-[155px] md:-right-[0%]",
    maxSize: 155,
    floatDuration: 5.8,
    floatDelay: 1.4,
    floatAmplitude: 9,
    converge: { x: -550, y: 540, scrollStart: 0.0, scrollEnd: 0.6 },
  },
  // roman-statue — right side
  {
    src: "/assets/header/roman-statue.webp",
    alt: "roman statue",
    className:
      "hidden md:block rotate-[-4deg] top-[26%] right-[1%] md:w-[86px] lg:right-[4%] lg:w-[130px] lg:top-[20%]",
    maxSize: 130,
    floatDuration: 4.0,
    floatDelay: 0.9,
    floatAmplitude: 7,
    converge: { x: -580, y: 390, scrollStart: 0.15, scrollEnd: 0.75 },
  },
  // flowers — right area
  {
    src: "/assets/about-me/flowers.webp",
    alt: "a bunch of tulips",
    className:
      "hidden md:block rotate-[-13deg] top-[16%] right-[15%] md:w-[86px] lg:right-[16%] lg:w-[120px] lg:top-[20%]",
    maxSize: 130,
    floatDuration: 3.6,
    floatDelay: 0.2,
    floatAmplitude: 8,
    converge: { x: -400, y: 430, scrollStart: 0.2, scrollEnd: 0.8 },
  },
  // hotpot — right side
  {
    src: "/assets/header/hotpot.webp",
    alt: "bowl of hotpot",
    className:
      "hidden md:block rotate-[6deg] top-[50%] right-[1%] md:w-[88px] lg:right-[9%] lg:w-[130px]",
    maxSize: 130,
    floatDuration: 5.3,
    floatDelay: 1.6,
    floatAmplitude: 7,
    converge: { x: -520, y: 190, scrollStart: 0.05, scrollEnd: 0.65 },
  },
  // green button — small, right area
  {
    src: "/assets/throughout/green-flower-button.webp",
    alt: "green button shaped as a flower",
    className:
      "md:hidden lg:block rotate-[6deg] top-[46%] lg:right-[20%] lg:w-[40px] w-[20px] right-[5%] ",
    maxSize: 40,
    floatDuration: 3.9,
    floatDelay: 0.7,
    floatAmplitude: 6,
    converge: { x: -300, y: 230, scrollStart: 0.1, scrollEnd: 0.7 },
  },
  // latte — lower-right
  {
    src: "/assets/header/latte.webp",
    alt: "coffee cup",
    className:
      "rotate-[10deg] top-[70%] right-[1%] w-[60px] lg:right-[4%] lg:w-[80px]",
    maxSize: 80,
    floatDuration: 4.5,
    floatDelay: 1.1,
    floatAmplitude: 8,
    converge: { x: -540, y: 40, scrollStart: 0.15, scrollEnd: 0.75 },
  },
  // croissant — bottom-right
  {
    src: "/assets/header/croissant.webp",
    alt: "croissant",
    className:
      "hidden md:block rotate-[-8deg] bottom-[5%] right-[10%] w-[104px] lg:right-[20%] lg:w-[132px] lg:bottom-[15%]",
    maxSize: 132,
    floatDuration: 4.8,
    floatDelay: 0.5,
    floatAmplitude: 7,
    converge: { x: -300, y: -100, scrollStart: 0.2, scrollEnd: 0.85 },
  },
  // dumplings — bottom-left
  {
    src: "/assets/header/dumplings.webp",
    alt: "basket of steamed dumplings",
    className:
      "hidden md:block rotate-[5deg] bottom-[10%] left-[12%] w-[80px] lg:left-[20%] lg:bottom-[30%] lg:w-[120px]",
    maxSize: 120,
    floatDuration: 3.4,
    floatDelay: 1.3,
    floatAmplitude: 9,
    converge: { x: 360, y: -50, scrollStart: 0.1, scrollEnd: 0.7 },
  },
  // goldfish-snack — bottom-right (xl only)
  {
    src: "/assets/header/goldfish-snack.webp",
    alt: "goldfish snack",
    className:
      "hidden xl:block rotate-[-6deg] bottom-[8%] right-[12%] lg:w-[80px]",
    maxSize: 90,
    floatDuration: 5.0,
    floatDelay: 0.1,
    floatAmplitude: 6,
    converge: { x: -420, y: -80, scrollStart: 0.15, scrollEnd: 0.75 },
  },
];

function StickerItem({
  sticker,
  scrollYProgress,
  prefersReducedMotion,
}: {
  sticker: StickerData;
  scrollYProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
}) {
  const scrollX = useTransform(
    scrollYProgress,
    [sticker.converge.scrollStart, sticker.converge.scrollEnd],
    [0, sticker.converge.x],
  );
  const scrollY = useTransform(
    scrollYProgress,
    [sticker.converge.scrollStart, sticker.converge.scrollEnd],
    [0, sticker.converge.y],
  );
  const scrollOpacity = useTransform(
    scrollYProgress,
    [sticker.converge.scrollStart, sticker.converge.scrollEnd],
    [1, 0],
  );
  const staticX = useMotionValue(0);
  const staticY = useMotionValue(0);
  const staticOpacity = useMotionValue(1);

  const x = prefersReducedMotion ? staticX : scrollX;
  const y = prefersReducedMotion ? staticY : scrollY;
  const opacity = prefersReducedMotion ? staticOpacity : scrollOpacity;

  return (
    // Outer: scroll-driven convergence + fade
    <motion.div
      style={{ x, y, opacity }}
      className={`absolute select-none pointer-events-none ${sticker.className}`}
    >
      {/* Inner: independent idle float */}
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, sticker.floatAmplitude] }}
        transition={
          prefersReducedMotion
            ? {}
            : {
                duration: sticker.floatDuration,
                delay: sticker.floatDelay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut" as const,
              }
        }
      >
        <Image
          src={sticker.src}
          alt={sticker.alt}
          width={sticker.maxSize}
          height={sticker.maxSize}
          className="block w-full object-contain drop-shadow-sm"
          style={{ height: "auto" }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  // useReducedMotion() returns null on the server and the real value on the client.
  // Initialising state to false means server and client first-render always produce
  // identical HTML (both "animated"), so hydration never mismatches.
  // After hydration the effect syncs the real OS preference.
  const rawReducedMotion = useReducedMotion();
  const prefersReducedMotion = rawReducedMotion ?? false;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[600px] md:min-h-[700px] xl:min-h-[800px] flex flex-col items-center justify-start sm:px-6 bg-background"
    >
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full block"
        >
          <path
            d="M0,60 C300,120 600,0 900,60 C1050,90 1200,30 1440,60 L1440,120 L0,120 Z"
            fill="#EEEAE4"
          />
        </svg>
      </div>

      <div className="relative overflow-hidden w-full max-w-[1500px] min-h-[600px] md:min-h-[700px] mx-auto">
        {/* Stickers */}
        {stickers.map((sticker) => (
          <StickerItem
            key={sticker.src}
            sticker={sticker}
            scrollYProgress={scrollYProgress}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}

        {/* Central content — stickers are rendered first in DOM so content paints on top without needing z-index */}
        <div className="relative flex flex-col items-center text-center max-w-xl mx-auto pt-12 md:pt-0">
          {/* Handwritten heading */}
          <motion.div
            className="relative w-[350px] md:w-[540px] lg:w-[600px] my-8"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" as const }}
          >
            <Image
              src="/assets/header/hi-im-tiah-no-line.png"
              alt="hi, i'm tiah"
              width={400}
              height={100}
              className="block w-full w-auto"
              style={{ height: "auto" }}
              priority
            />
            <Image
              src="/assets/header/header-lines-animation.png"
              alt="hi, i'm tiah"
              width={400}
              height={100}
              className="block w-full w-auto absolute inset-0"
              style={{ height: "auto" }}
              priority
            />
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl md:-mt-8 md:text-2xl font-medium leading-snug text-foreground max-w-xs md:max-w-md lg:max-w-none px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.3 }}
          >
            I build thoughtful digital products
            <br /> that turn{" "}
            <span className="font-bold underline text-coral underline-offset-4">
              ideas
            </span>{" "}
            into reality
          </motion.p>

          <motion.p
            className="text-sm md:text-base text-foreground/60 leading-relaxed my-8 max-w-xs md:max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.4 }}
          >
            full-stack software developer
            <br />
            based in the UK, available worldwide
          </motion.p>

          <motion.div
            className="flex items-center gap-3 flex-wrap justify-center my-6 md:my-0 xl:mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.5 }}
          >
            <Button href="#work">view my work ↗</Button>
            <Button href="#contact" variant="outline">
              work with me ↗
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
