import Image from "next/image";
import Button from "@/components/ui/Button";

const stickers = [
  // Left side
  {
    src: "/assets/header/fan.webp",
    alt: "open book",
    style: { top: "8%", left: "3%" },
    size: 108,
    rotate: "-10deg",
    mobileHidden: false,
  },
  {
    src: "/assets/header/sushi.webp",
    alt: "sushi",
    style: { top: "18%", left: "14%" },
    size: 68,
    rotate: "8deg",
    mobileHidden: true,
  },
  {
    src: "/assets/header/laptop.webp",
    alt: "laptop",
    style: { top: "40%", left: "2%" },
    size: 96,
    rotate: "5deg",
    mobileHidden: true,
  },
  {
    src: "/assets/header/plant.webp",
    alt: "cactus",
    style: { top: "60%", left: "6%" },
    size: 80,
    rotate: "-4deg",
    mobileHidden: true,
  },

  // Top center
  {
    src: "/assets/header/bow.webp",
    alt: "yellow bow",
    style: { top: "3%", left: "47%" },
    size: 64,
    rotate: "4deg",
    mobileHidden: true,
  },
  {
    src: "/assets/header/green-fabric-star.webp",
    alt: "green star",
    style: { top: "30%", left: "39%" },
    size: 32,
    rotate: "0deg",
    mobileHidden: true,
  },

  // Right side
  {
    src: "/assets/header/fish.webp",
    alt: "fish",
    style: { top: "5%", right: "4%" },
    size: 124,
    rotate: "10deg",
    mobileHidden: false,
  },
  {
    src: "/assets/header/roman-statue.webp",
    alt: "robot character",
    style: { top: "26%", right: "3%" },
    size: 88,
    rotate: "-4deg",
    mobileHidden: true,
  },
  {
    src: "/assets/header/hotpot.webp",
    alt: "bowl of food",
    style: { top: "52%", right: "12%" },
    size: 100,
    rotate: "6deg",
    mobileHidden: true,
  },
  {
    src: "/assets/header/latte.webp",
    alt: "coffee cup",
    style: { top: "68%", right: "4%" },
    size: 84,
    rotate: "-6deg",
    mobileHidden: true,
  },

  // Bottom area
  {
    src: "/assets/header/dumplings.webp",
    alt: "basket of dumplings",
    style: { bottom: "10%", left: "27%" },
    size: 72,
    rotate: "5deg",
    mobileHidden: true,
  },
  {
    src: "/assets/header/goldfish-snack.webp",
    alt: "wooden box",
    style: { bottom: "8%", right: "38%" },
    size: 56,
    rotate: "-6deg",
    mobileHidden: true,
  },
  {
    src: "/assets/header/blue-heart-button.webp",
    alt: "blue heart",
    style: { bottom: "5%", left: "44%" },
    size: 48,
    rotate: "5deg",
    mobileHidden: false,
  },
  {
    src: "/assets/header/croissant.webp",
    alt: "croissant",
    style: { bottom: "8%", right: "12%" },
    size: 92,
    rotate: "-8deg",
    mobileHidden: true,
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[560px] flex flex-col items-center justify-center px-6 bg-background">
      {/* Wave divider — rendered first so stickers sit on top */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full block"
        >
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            fill="#EEEAE4"
          />
        </svg>
      </div>

      {/* Stickers */}
      {stickers.map((sticker) => (
        <div
          key={sticker.src}
          className={`absolute select-none pointer-events-none ${
            sticker.mobileHidden ? "hidden md:block" : "block"
          }`}
          style={{
            ...sticker.style,
            transform: `rotate(${sticker.rotate})`,
          }}
        >
          <Image
            src={sticker.src}
            alt={sticker.alt}
            width={sticker.size}
            height={sticker.size}
            className="object-contain drop-shadow-sm"
            style={{ height: "auto" }}
          />
        </div>
      ))}

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto py-12">
        {/* Handwritten heading */}
        <div className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] mb-6">
          <Image
            src="/assets/header/hi-im-tiah.png"
            alt="hi, i'm tiah"
            width={520}
            height={300}
            className="w-full"
            style={{ height: "auto" }}
            priority
          />
        </div>

        <p className="text-lg sm:text-xl md:text-2xl font-medium leading-snug text-foreground mb-3 max-w-sm md:max-w-md">
          I build thoughtful digital products that turn{" "}
          <span className="italic">ideas</span> into reality.
        </p>

        <p className="text-sm md:text-base text-foreground/60 leading-relaxed mb-8 max-w-xs md:max-w-sm">
          Full-stack developer helping early-stage startups turn ideas into
          real, scalable products.
        </p>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          <Button href="#work">view my work ↗</Button>
          <Button href="#contact" variant="outline">
            work with me ↗
          </Button>
        </div>
      </div>
    </section>
  );
}
