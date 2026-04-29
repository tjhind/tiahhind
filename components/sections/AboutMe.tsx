import Image from "next/image";

const hobbies = [
  { icon: "/assets/header/roman-statue.webp", label: "going to art museums" },
  { icon: "/assets/header/plant.webp", label: "hiking" },
  { icon: "/assets/throughout/pink-sequin-star.webp", label: "reading poetry and writing (bad) poems" },
  { icon: "/assets/header/blue-heart-button.webp", label: "hip hop" },
  { icon: "/assets/header/fan.webp", label: "solo travel" },
  { icon: "/assets/header/teabag.webp", label: "yorkshire tea" },
  { icon: "/assets/throughout/yellow-gingham-star.webp", label: "road trips" },
  { icon: "/assets/header/laptop.webp", label: "working on my personal projects (like pim)" },
];

const photos = [
  {
    src: "/assets/about-me/2.png",
    alt: "Tiah Hind",
    rotate: "-6deg",
    style: { top: "0px", left: "0px" },
    width: 160,
    height: 210,
    zIndex: 2,
  },
  {
    src: "/assets/about-me/1.png",
    alt: "Tiah at the Great Wall of China",
    rotate: "5deg",
    style: { top: "16px", left: "130px" },
    width: 140,
    height: 185,
    zIndex: 3,
  },
  {
    src: "/assets/about-me/4.png",
    alt: "Tiah in Japan",
    rotate: "-3deg",
    style: { top: "155px", left: "20px" },
    width: 145,
    height: 190,
    zIndex: 4,
  },
  {
    src: "/assets/about-me/3.png",
    alt: "Tiah travelling",
    rotate: "7deg",
    style: { top: "170px", left: "165px" },
    width: 130,
    height: 170,
    zIndex: 5,
  },
];

function PhotoCollage() {
  return (
    <div className="relative w-[320px] h-[390px] md:w-[360px] md:h-[440px] shrink-0">
      {/* Pink/salmon backing card behind the photo stack */}
      <div
        className="absolute"
        style={{
          backgroundColor: "#F4928E",
          width: "170px",
          height: "220px",
          top: "-8px",
          left: "-12px",
          transform: "rotate(-8deg)",
          zIndex: 1,
        }}
      />

      {/* Raw photos — no border, no frame, no rounded corners */}
      {photos.map((photo, i) => (
        <div
          key={i}
          className="absolute overflow-hidden shadow-sm"
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

      {/* Camera emoji */}
      <div
        className="absolute text-xl select-none"
        style={{ top: "-20px", right: "50px", zIndex: 6 }}
      >
        📷
      </div>

      {/* Blue heart sticker */}
      <div
        className="absolute w-8 h-8"
        style={{ bottom: "24px", left: "4px", zIndex: 6 }}
      >
        <Image
          src="/assets/header/blue-heart-button.webp"
          alt=""
          fill
          sizes="32px"
          className="object-contain"
        />
      </div>

      {/* Green star sticker */}
      <div
        className="absolute w-6 h-6"
        style={{ top: "8px", right: "8px", zIndex: 6 }}
      >
        <Image
          src="/assets/header/green-fabric-star.webp"
          alt=""
          fill
          sizes="24px"
          className="object-contain"
        />
      </div>

      {/* Pause button */}
      <div
        className="absolute flex items-center justify-center"
        style={{ bottom: "56px", right: "16px", zIndex: 6 }}
      >
        <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2" y="1" width="4" height="12" rx="1" fill="#1a1a1a" />
            <rect x="8" y="1" width="4" height="12" rx="1" fill="#1a1a1a" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function AboutMe() {
  return (
    <section id="about" className="border-t border-foreground/10 bg-background">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-14 md:py-20">
        {/* Section label */}
        <div className="flex items-center gap-2 mb-10 md:mb-14">
          <span className="text-xs font-medium tracking-widest text-foreground/50">
            about me
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

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">
          {/* Photo collage */}
          <div className="flex justify-center w-full lg:w-auto">
            <PhotoCollage />
          </div>

          {/* Bio text */}
          <div className="w-full lg:flex-1 max-w-lg">
            <div className="space-y-4 text-sm md:text-base text-foreground/70 leading-relaxed mb-8">
              <p>
                I&apos;m a full-stack developer, problem solver and creative at
                heart.
              </p>
              <p>
                I love turning messy ideas into clean, intuitive products that
                people enjoy using.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll probably find me...
              </p>
            </div>

            {/* Hobbies grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {hobbies.map((hobby) => (
                <div
                  key={hobby.label}
                  className="flex items-start gap-2 text-sm text-foreground/70"
                >
                  <div className="relative w-4 h-4 mt-0.5 shrink-0">
                    <Image
                      src={hobby.icon}
                      alt=""
                      fill
                      sizes="16px"
                      className="object-contain"
                    />
                  </div>
                  <span>{hobby.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
