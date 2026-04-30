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
    tags: ["Next.js", "TypeScript", "Sanity", "Tailwind"],
    type: "laptop",
    icon: "/assets/header/yellow-plastic-star.webp",
  },
];

function PhoneMockup() {
  const phones = [
    {
      screenshot: "/assets/featured-work/mobile-screenshot-1.png",
      transform: "translateX(24px) rotate(-6deg)",
      zIndex: 10,
      scale: 0.88,
    },
    {
      screenshot: "/assets/featured-work/mobile-screenshot-2.png",
      transform: "translateY(8px)",
      zIndex: 20,
      scale: 1,
    },
    {
      screenshot: "/assets/featured-work/mobile-screenshot-3.png",
      transform: "translateX(-24px) rotate(6deg)",
      zIndex: 10,
      scale: 0.88,
    },
  ];

  return (
    <div className="flex items-center justify-center h-[380px] md:h-[460px]">
      {phones.map((phone, i) => {
        const w = Math.round(150 * phone.scale);
        const h = Math.round(w * 2.167);

        return (
          <div
            key={i}
            className="relative shrink-0"
            style={{
              transform: phone.transform,
              zIndex: phone.zIndex,
              width: `${w}px`,
              height: `${h}px`,
              marginInline: "-8px",
            }}
          >
            {/* Screenshot clipped to the screen area of the phone */}
            <div
              className="absolute overflow-hidden rounded-[10%]"
              style={{ top: "10%", left: "6%", right: "6%", bottom: "10%" }}
            >
              <Image
                src={phone.screenshot}
                alt="App screenshot"
                fill
                sizes={`${w}px`}
                className="object-cover"
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
                sizes={`${w}px`}
                className="object-cover"
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
    <div className="relative w-full max-w-[600px] mx-auto">
      {/* Screenshot clipped to the screen area of the laptop */}
      <div
        className="absolute overflow-hidden"
        style={{ top: "7%", left: "12%", right: "12%", bottom: "23%" }}
      >
        <Image
          src="/assets/featured-work/computer-screenshot.png"
          alt="denbee honey website"
          fill
          sizes="(max-width: 1024px) 65vw, 40vw"
          className="object-cover object-top"
        />
      </div>

      {/* Laptop frame on top */}
      <Image
        src="/assets/featured-work/laptop-frame.png"
        alt=""
        width={1536}
        height={1024}
        className="relative w-full h-auto"
        style={{ mixBlendMode: "multiply" as const }}
      />
    </div>
  );
}

export default function FeaturedWork() {
  return (
    <section id="work" className="bg-[#EEEAE4]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-10 md:pt-12 pb-16 md:pb-20">
        {/* Section label */}
        <div className="flex items-center">
          <span className="font-medium font-semibold tracking-wide text-xl">
            featured work
          </span>
          <Image
            src="/assets/throughout/3-line-sparkle-accent.png"
            alt=""
            width={96}
            height={96}
            className="-ml-10"
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
              <div className="w-full lg:w-1/2 flex items-center justify-center">
                {project.type === "mobile" ? <PhoneMockup /> : <LaptopMockup />}
              </div>

              {/* Project details */}
              <div className="w-full lg:w-1/2 max-w-md">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                  {project.name}
                </h3>

                <p className="text-sm md:text-base text-foreground/60 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
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
