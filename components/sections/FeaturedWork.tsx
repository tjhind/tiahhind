import Image from "next/image";
import Tag from "@/components/ui/Tag";

interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  type: "mobile" | "laptop";
  icon: string;
}

const projects: Project[] = [
  {
    id: "pim",
    name: "pim",
    description:
      "A travel app that helps you remember all of the amazing people you've met, and their words of wisdom.",
    tags: ["React Native", "TypeScript", "Supabase", "Tailwind"],
    type: "mobile",
    icon: "/assets/header/blue-heart-button.webp",
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

function PhoneMockup() {
  const phones = [
    {
      screenshot: "/assets/featured-work/mobile-screenshot-1.png",
      mobileTransform: "translateX(24px) rotate(-6deg)",
      desktopTransform: "translateX(0) rotate(0deg)",
      zIndex: 10,
      mobileScale: 0.88,
      desktopScale: 1,
    },
    {
      screenshot: "/assets/featured-work/mobile-screenshot-2.png",
      mobileTransform: "translateY(8px)",
      desktopTransform: "translateX(0) rotate(0deg)",
      zIndex: 20,
      mobileScale: 1,
      desktopScale: 1,
    },
    {
      screenshot: "/assets/featured-work/mobile-screenshot-3.png",
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
            {/* Screenshot clipped to the screen area of the phone */}
            <div
              className="absolute overflow-hidden rounded-[10%] pointer-events-none"
              style={{ top: "10%", left: "6%", right: "6%", bottom: "10%" }}
            >
              <Image
                src={phone.screenshot}
                alt="App screenshot"
                fill
                sizes="(max-width: 640px) 150px, 170px"
                className="object-cover pointer-events-none"
              />
            </div>

            {/* Frame on top */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: 10 }}
            >
              <Image
                src="/assets/featured-work/iphone-frame.png"
                alt=""
                fill
                sizes="(max-width: 640px) 150px, 170px"
                className="object-cover pointer-events-none"
                style={{ mixBlendMode: "multiply" as const }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LaptopMockup() {
  return (
    <div className="relative w-full max-w-[600px] mx-auto pointer-events-none">
      {/* Screenshot clipped to the screen area of the laptop */}
      <div
        className="absolute overflow-hidden pointer-events-none"
        style={{ top: "7%", left: "12%", right: "12%", bottom: "23%" }}
      >
        <Image
          src="/assets/featured-work/computer-screenshot.png"
          alt="denbee honey website"
          fill
          sizes="(max-width: 900px) 65vw, 40vw"
          className="object-cover object-top pointer-events-none"
        />
      </div>

      {/* Laptop frame on top */}
      <Image
        src="/assets/featured-work/laptop-frame.png"
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
  return (
    <section id="work" className="relative isolate z-0 bg-[#EEEAE4]">
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-10 md:pt-12 pb-16 md:pb-20">
        {/* Section label */}
        <div className="flex items-center">
          <span className="font-medium font-semibold tracking-wide text-xl lg:text-2xl">
            featured work
          </span>

          <Image
            src="/assets/throughout/3-line-sparkle-accent.png"
            alt=""
            width={96}
            height={96}
            className="-ml-10"
            style={{ height: "auto" }}
          />
        </div>

        {/* Project cards */}
        <div className="flex flex-col gap-16 md:gap-24">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`flex flex-col ${
                i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-10 lg:gap-16 items-center`}
            >
              {/* Mockup */}
              <div className="w-full lg:w-1/2 flex items-center justify-center pointer-events-none">
                {project.type === "mobile" ? <PhoneMockup /> : <LaptopMockup />}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
