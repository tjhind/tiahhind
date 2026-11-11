import Image from "next/image";
import type { ReactNode } from "react";

/** Same label style as the homepage "get in touch" / "about me" headings. */
export default function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-6 flex items-center gap-2 md:mb-8">
      <h2
        id={id}
        className="font-medium font-semibold tracking-wide text-xl lg:text-2xl"
      >
        {children}
      </h2>
      <Image
        src="/assets/throughout/3-line-sparkle-accent.webp"
        alt=""
        width={100}
        height={100}
        className="-ml-12"
      />
    </div>
  );
}
