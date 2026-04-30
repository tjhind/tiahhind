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
      "A travel app that helps you remember all of the amazing people you met.",
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
      style: { transform: "translateX(28px) rotate(-6deg)", zIndex: 10 },
      scale: 0.88,
    },
    {
      screenshot: "/assets/featured-work/mobile-screenshot-2.png",
      style: { transform: "translateY(8px)", zIndex: 20 },
      scale: 1,
    },
    {
      screenshot: "/assets/featured-work/mobile-screenshot-3.png",
      style: { transform: "translateX(-28px) rotate(6deg)", zIndex: 10 },
      scale: 0.88,
    },
  ];

  return (
    <div className="flex items-center justify-center h-[380px] md:h-[460px]">
      {phones.map((phone, i) => (
        <div
          key={i}
          className="relative shrink-0"
          style={{
            ...phone.style,
            width: `${Math.round(160 * (phone.scale ?? 1))}px`,
            marginInline: "-10px",
          }}
        >
          {/* Screenshot behind the frame */}
          <div
            className="absolute overflow-hidden rounded-[14%]"
            style={{ top: "7.5%", left: "6%", right: "6%", bottom: "7.5%" }}
          >
            <Image
              src={phone.screenshot}
              alt="App screenshot"
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>
          {/* Frame on top */}
          <Image
            src="/assets/featured-work/iphone-frame.png"
            alt=""
            width={260}
            height={530}
            className="relative w-full h-auto"
            style={{ mixBlendMode: "multiply" as const }}
          />
        </div>
      ))}
    </div>
  );
}

function LaptopMockup() {
  return (
    <div className="relative w-full max-w-[600px] mx-auto">
      {/* Screenshot behind the frame */}
      <div
        className="absolute overflow-hidden"
        style={{ top: "5.5%", left: "12%", right: "12%", bottom: "19%" }}
      >
        <Image
          src="/assets/featured-work/computer-screenshot.png"
          alt="denbee honey website"
          fill
          sizes="(max-width: 1024px) 65vw, 40vw"
          className="object-cover"
        />
      </div>
      {/* Laptop frame on top */}
      <Image
        src="/assets/featured-work/laptop-frame.png"
        alt=""
        width={600}
        height={380}
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
                <p className="text-xs font-medium uppercase tracking-widest text-foreground/40 mb-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 flex items-center ">
                  {project.name}
                  <span className="relative inline-block w-24 h-24 shrink-0">
                    <Image
                      src={project.icon}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-contain"
                    />
                  </span>
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
