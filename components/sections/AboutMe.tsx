import Image from "next/image";
import Button from "@/components/ui/Button";

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
    src: "/assets/about-me/2.png",
    alt: "Tiah Hind",
    rotate: "-7deg",
    style: { top: "25px", left: "10px" },
    width: 155,
    height: 205,
    zIndex: 2,
  },
  {
    src: "/assets/about-me/1.png",
    alt: "Tiah at the Great Wall of China",
    rotate: "9deg",
    style: { top: "10px", left: "195px" },
    width: 135,
    height: 175,
    zIndex: 3,
  },
  {
    src: "/assets/about-me/4.png",
    alt: "Tiah in Japan",
    rotate: "-4deg",
    style: { top: "235px", left: "20px" },
    width: 140,
    height: 185,
    zIndex: 4,
  },
  {
    src: "/assets/about-me/3.png",
    alt: "Tiah travelling",
    rotate: "11deg",
    style: { top: "245px", left: "200px" },
    width: 125,
    height: 160,
    zIndex: 5,
  },
];

function PhotoCollage() {
  return (
    <div className="relative w-[360px] h-[460px] md:w-[400px] md:h-[480px] shrink-0">
      {/* Raw photos — no border, no frame, no rounded corners */}
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
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="object-cover"
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
          alt=""
          fill
          sizes="48px"
          className="object-contain"
        />
      </div>

      {/* Toast */}
      <div
        className="absolute w-24 h-24 pointer-events-none"
        style={{ top: "160px", right: "-10px", zIndex: 6 }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/assets/header/banana-peanut-butter-honey-toast.webp"
            alt=""
            fill
            sizes="200px"
            className="object-contain"
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
          alt=""
          fill
          sizes="64px"
          className="object-contain"
        />
      </div>

      {/* Notebook */}
      <div
        className="absolute flex items-center justify-center pointer-events-none"
        style={{ bottom: "12px", right: "-24px", zIndex: 6 }}
      >
        <div className="relative w-36 h-36">
          <Image
            src="/assets/about-me/notebook.png"
            alt=""
            fill
            sizes="96px"
            className="object-contain"
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
            alt=""
            fill
            sizes="100px"
            className="object-contain"
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
            src="/assets/about-me/masking-tape.png"
            alt=""
            fill
            sizes="100px"
            className="object-contain"
          />
        </div>
      </div>

      {/* Teabag */}
      <div
        className="absolute flex items-center justify-center pointer-events-none"
        style={{ top: "36px", left: "-100px", zIndex: 6 }}
      >
        <div className="relative w-36 h-36">
          <Image
            src="/assets/header/teabag.webp"
            alt=""
            fill
            sizes="400px"
            className="object-contain"
          />
        </div>
      </div>

      {/* Washi Tape */}
      <div
        className="absolute flex items-center justify-center pointer-events-none"
        style={{ bottom: "210px", left: "120px", zIndex: 6 }}
      >
        <div className="relative w-24 h-24">
          <Image
            src="/assets/about-me/pink-washi-tape.png"
            alt=""
            fill
            sizes="100px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default function AboutMe() {
  return (
    <section id="about" className="relative isolate bg-[#EEEAE4]">
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-14 md:pt-20 pb-36">
        {/* Section label */}
        <div className="flex items-center gap-2 mb-10 md:mb-14">
          <span className="font-medium font-semibold tracking-wide text-xl lg:text-2xl">
            about me
          </span>

          <Image
            src="/assets/throughout/3-line-sparkle-accent.png"
            alt=""
            width={96}
            height={96}
            className="-ml-12 h-auto"
          />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-14 xl:gap-20 items-start">
          {/* Photo collage */}
          <div className="flex justify-center w-full lg:w-auto">
            <PhotoCollage />
          </div>

          {/* Bio text */}
          <div className="w-full lg:flex-1 max-w-lg">
            <div className="space-y-4 text-sm text-foreground/60 leading-relaxed">
              <p>
                I&apos;m a full-stack developer, problem solver, and creative at
                heart - I enjoy building thoughtful and visually stunning
                products from the ground up.
              </p>

              <p>
                I&apos;ve spent the last few years working with early-stage
                startups, helping turn half-formed, messy ideas into real,
                working apps. Honestly, that&apos;s my favourite part - I love a
                bit of chaos. The more undefined and scrappy something is, the
                more excited I get.
              </p>

              <p>
                There&apos;s something really satisfying about taking something
                that feels all over the place and shaping it into something
                clear, simple, and genuinely enjoyable to use. That space
                between chaos and clarity is where I do my best work.
              </p>

              <p>
                When I&apos;m not coding, I&apos;m usually off doing something
                that fuels that same curiosity...
              </p>
            </div>
          </div>

          {/* Hobbies grid */}
          <div className="w-full lg:w-[360px] xl:w-[420px] grid grid-cols-2 gap-x-6 gap-y-3 lg:gap-y-10">
            {hobbies.map((hobby) => (
              <div
                key={hobby.label}
                className="flex items-center gap-4 text-sm text-foreground/70"
              >
                <div className="relative w-16 h-16 mt-0.5 shrink-0">
                  <Image
                    src={hobby.icon}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
                <span>{hobby.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact bar — mirrors the sticky footer; hides the sticky footer when visible */}
        <div
          id="about-bottom"
          className="mt-12 md:mt-16 pt-5 border-t border-foreground/10 flex items-center gap-3 flex-wrap"
        >
          <Button href="#contact">let&apos;s connect ↗</Button>

          <div className="w-px h-5 mx-2 shrink-0" />

          <div className="ml-auto flex items-center gap-4">
            <a
              href="mailto:hello@tiahhind.com"
              className="text-sm text-foreground/60 hover:text-foreground transition-colors"
            >
              hello@tiahhind.com
            </a>

            <a
              href="https://linkedin.com/in/tiahhind"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-2xl font-bold text-foreground/70 hover:text-foreground transition-colors"
            >
              in
            </a>
          </div>
        </div>
      </div>

      {/* Wave — decorative only, so it should never intercept taps/clicks */}
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
