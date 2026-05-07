import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Loader from "@/components/layout/Loader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tiah Hind — Full-Stack Developer",
  description:
    "Full-stack developer helping early-stage startups turn ideas into real, scalable products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* LCP resources — high priority */}
        <link
          rel="preload"
          as="image"
          href="/assets/header/hi-im-tiah-no-line.webp"
          fetchPriority="high"
        />
        {/* Hero stickers */}
        <link rel="preload" as="image" href="/assets/header/fan.webp" />
        <link
          rel="preload"
          as="image"
          href="/assets/header/pastel-de-nata.webp"
        />
        <link rel="preload" as="image" href="/assets/header/sushi.webp" />
        <link rel="preload" as="image" href="/assets/header/laptop.webp" />
        <link rel="preload" as="image" href="/assets/header/plant.webp" />
        <link
          rel="preload"
          as="image"
          href="/assets/header/hello-kitty-bee.webp"
        />
        <link rel="preload" as="image" href="/assets/header/bow.webp" />
        <link
          rel="preload"
          as="image"
          href="/assets/header/green-fabric-star.webp"
        />
        <link rel="preload" as="image" href="/assets/header/fish.webp" />
        <link
          rel="preload"
          as="image"
          href="/assets/header/roman-statue.webp"
        />
        <link rel="preload" as="image" href="/assets/about-me/flowers.webp" />
        <link rel="preload" as="image" href="/assets/header/hotpot.webp" />
        <link
          rel="preload"
          as="image"
          href="/assets/throughout/green-flower-button.webp"
        />
        <link rel="preload" as="image" href="/assets/header/latte.webp" />
        <link rel="preload" as="image" href="/assets/header/croissant.webp" />
        <link rel="preload" as="image" href="/assets/header/dumplings.webp" />
        <link
          rel="preload"
          as="image"
          href="/assets/header/goldfish-snack.webp"
        />

        {/* Featured work */}
        <link
          rel="preload"
          as="image"
          href="/assets/featured-work/iphone-frame.webp"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/featured-work/pim-screenshot-1.webp"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/featured-work/pim-screenshot-2.webp"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/featured-work/pim-screenshot-3.webp"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/featured-work/ticketdash-screenshot-2.webp"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/featured-work/ticketdash-screenshot-3.webp"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/featured-work/ticketdash-screenshot-4.webp"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/featured-work/computer-screenshot.webp"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/featured-work/laptop-frame.webp"
        />

        {/* Throughout / decorative */}
        <link
          rel="preload"
          as="image"
          href="/assets/throughout/3-line-sparkle-accent.webp"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/throughout/pink-sequin-star.webp"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/throughout/yellow-gingham-star.webp"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/throughout/red-fabric-star.webp"
        />

        {/* About-me photos */}
        <link rel="preload" as="image" href="/assets/about-me/1.webp" />
        <link rel="preload" as="image" href="/assets/about-me/2.webp" />
        <link rel="preload" as="image" href="/assets/about-me/3.webp" />
        <link rel="preload" as="image" href="/assets/about-me/4.webp" />

        {/* About-me collage stickers */}
        <link
          rel="preload"
          as="image"
          href="/assets/header/blue-heart-button.webp"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/header/banana-peanut-butter-honey-toast.webp"
        />
        <link rel="preload" as="image" href="/assets/about-me/notebook.webp" />
        <link
          rel="preload"
          as="image"
          href="/assets/about-me/pink-wax-seal-with-bow.webp"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/about-me/masking-tape.webp"
        />
        <link rel="preload" as="image" href="/assets/header/teabag.webp" />
        <link
          rel="preload"
          as="image"
          href="/assets/about-me/pink-washi-tape.webp"
        />

        {/* About-me hobby icons */}
        <link
          rel="preload"
          as="image"
          href="/assets/about-me/trainer-shoe.webp"
        />
        <link rel="preload" as="image" href="/assets/about-me/pen.webp" />
        <link
          rel="preload"
          as="image"
          href="/assets/about-me/headphones.webp"
        />
        <link rel="preload" as="image" href="/assets/about-me/globe.webp" />
        <link
          rel="preload"
          as="image"
          href="/assets/about-me/vinyl-record.webp"
        />
        <link rel="preload" as="image" href="/assets/about-me/tea.webp" />
      </head>
      <body className="antialiased">
        <Loader />
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 9999,
            opacity: 0.03,
            userSelect: "none",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            style={{ display: "block" }}
          >
            <filter id="grain-filter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain-filter)" />
          </svg>
        </div>
        {children}
      </body>
    </html>
  );
}
