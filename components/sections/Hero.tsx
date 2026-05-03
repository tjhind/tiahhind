import Image from "next/image";
import Button from "@/components/ui/Button";

interface Sticker {
  src: string;
  alt: string;
  // Encodes all breakpoint-aware positioning, visibility, and sizing
  className: string;
  maxSize: number;
}

const stickers: Sticker[] = [
  // fan
  {
    src: "/assets/header/fan.webp",
    alt: "fan",
    className:
      "rotate-[-30deg] top-[3%] left-[2%] w-[100px] md:w-[148px] lg:w-[180px] md:-left-[1%]",
    maxSize: 180,
  },
  // pastel de nata
  {
    src: "/assets/header/pastel-de-nata.webp",
    alt: "pastel de nata",
    className: "rotate-[-10deg] hidden lg:block top-[6%] left-[18%] w-[130px]",
    maxSize: 130,
  },
  // sushi
  {
    src: "/assets/header/sushi.webp",
    alt: "sushi",
    className:
      "rotate-[-20deg] w-[50px] top-[20%] left-[6%] md:left-[8%] md:w-[100px] lg:w-[140px]",
    maxSize: 140,
  },
  // laptop
  {
    src: "/assets/header/laptop.webp",
    alt: "laptop",
    className:
      "rotate-[-15deg] top-[32%] md:top-[42%] left-[1%] w-[90px] md:-left-[1%] md:w-[140px] lg:w-[160px]",
    maxSize: 160,
  },
  // plant
  {
    src: "/assets/header/plant.webp",
    alt: "houseplant",
    className:
      "rotate-[-10deg] top-[63%] left-[1%] w-[78px] lg:left-[6%] md:w-[120px]",
    maxSize: 120,
  },
  // hello-kitty-bee
  {
    src: "/assets/header/hello-kitty-bee.webp",
    alt: "hello kitty dressed as a bee",
    className:
      "w-[150px] rotate-[5deg] top-[16%] right-[-10%] md:w-[100px] md:left-[50%] md:top-auto md:bottom-[5%] lg:left-[20%] lg:bottom-[5%] lg:w-[200px]",
    maxSize: 300,
  },
  // bow
  {
    src: "/assets/header/bow.webp",
    alt: "yellow bow",
    className:
      "block rotate-[9deg] top-[2%] left-[44%] w-[80px] md:w-[58px] lg:w-[70px] lg:top-[40%] lg:left-[20%]",
    maxSize: 80,
  },
  // green star
  {
    src: "/assets/header/green-fabric-star.webp",
    alt: "green star",
    className: "rotate-[0deg] top-[40%] right-[10%] w-[45px]",
    maxSize: 36,
  },
  // fish
  {
    src: "/assets/header/fish.webp",
    alt: "fish",
    className:
      "block rotate-[15deg] top-[6%] right-[2%] w-[100px] md:w-[116px] lg:w-[155px] md:-right-[0%]",
    maxSize: 155,
  },
  // roman-statue
  {
    src: "/assets/header/roman-statue.webp",
    alt: "roman statue",
    className:
      "hidden md:block rotate-[-4deg] top-[26%] right-[1%] md:w-[86px] lg:right-[4%] lg:w-[130px] lg:top-[20%]",
    maxSize: 130,
  },
  // flowers
  {
    src: "/assets/about-me/flowers.webp",
    alt: "a bunch of tulips",
    className:
      "hidden md:block rotate-[-13deg] top-[16%] right-[15%] md:w-[86px] lg:right-[16%] lg:w-[120px] lg:top-[20%]",
    maxSize: 130,
  },
  // hotpot
  {
    src: "/assets/header/hotpot.webp",
    alt: "bowl of hotpot",
    className:
      "hidden md:block rotate-[6deg] top-[50%] right-[1%] md:w-[88px] lg:right-[9%] lg:w-[130px]",
    maxSize: 130,
  },

  // green button
  {
    src: "/assets/throughout/green-flower-button.webp",
    alt: "green button shaped as a flower",
    className:
      "md:hidden lg:block rotate-[6deg] top-[46%] lg:right-[20%] lg:w-[40px] w-[20px] right-[5%] ",
    maxSize: 40,
  },
  // latte
  {
    src: "/assets/header/latte.webp",
    alt: "coffee cup",
    className:
      "rotate-[10deg] top-[70%] right-[1%] w-[60px] lg:right-[4%] lg:w-[80px]",
    maxSize: 80,
  },
  // croissant
  {
    src: "/assets/header/croissant.webp",
    alt: "croissant",
    className:
      "hidden md:block rotate-[-8deg] bottom-[5%] right-[10%] w-[104px] lg:right-[20%] lg:w-[132px] lg:bottom-[15%]",
    maxSize: 132,
  },
  // dumplings
  {
    src: "/assets/header/dumplings.webp",
    alt: "basket of steamed dumplings",
    className:
      "hidden md:block rotate-[5deg] bottom-[10%] left-[12%] w-[80px] lg:left-[20%] lg:bottom-[30%] lg:w-[120px]",
    maxSize: 120,
  },
  // goldfish-snack
  {
    src: "/assets/header/goldfish-snack.webp",
    alt: "goldfish snack",
    className:
      "hidden xl:block rotate-[-6deg] bottom-[8%] right-[12%] lg:w-[80px]",
    maxSize: 90,
  },
];

export default function Hero() {
  return (
    <section
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
          <div
            key={sticker.src}
            className={`absolute select-none pointer-events-none ${sticker.className}`}
          >
            <Image
              src={sticker.src}
              alt={sticker.alt}
              width={sticker.maxSize}
              height={sticker.maxSize}
              className="block w-full object-contain drop-shadow-sm"
              style={{ height: "auto" }}
            />
          </div>
        ))}

        {/* Central content — stickers are rendered first in DOM so content paints on top without needing z-index */}
        <div className="relative flex flex-col items-center text-center max-w-xl mx-auto pt-12 md:pt-0">
          {/* Handwritten heading */}
          <div className="relative w-[350px] md:w-[540px] lg:w-[600px] my-8">
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
          </div>

          <p className="text-lg sm:text-xl md:-mt-8 md:text-2xl font-medium leading-snug text-foreground max-w-xs md:max-w-md lg:max-w-none px-2">
            I build thoughtful digital products
            <br /> that turn{" "}
            <span className="font-bold underline text-coral underline-offset-4">
              ideas
            </span>{" "}
            into reality.
          </p>

          <p className="text-sm md:text-base text-foreground/60 leading-relaxed my-8 max-w-xs md:max-w-sm">
            full-stack software developer
            <br />
            based in the UK, available worldwide
          </p>

          <div className="flex items-center gap-3 flex-wrap justify-center my-6 md:my-0 xl:mt-4">
            <Button href="#work">view my work ↗</Button>
            <Button href="#contact" variant="outline">
              work with me ↗
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
