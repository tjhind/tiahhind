import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import WhatIDo from "@/components/sections/WhatIDo";
import FeaturedWork from "@/components/sections/FeaturedWork";
import AboutMe from "@/components/sections/AboutMe";
import Loader from "@/components/layout/Loader";
import { preload } from "react-dom";

// Homepage-only image preloads (moved out of the root layout so other routes,
// e.g. /ugc, don't download the homepage's stickers and collage).
const HOMEPAGE_PRELOADS = [
  "/assets/header/fan.webp",
  "/assets/header/pastel-de-nata.webp",
  "/assets/header/sushi.webp",
  "/assets/header/laptop.webp",
  "/assets/header/plant.webp",
  "/assets/header/hello-kitty-bee.webp",
  "/assets/header/bow.webp",
  "/assets/header/green-fabric-star.webp",
  "/assets/header/fish.webp",
  "/assets/header/roman-statue.webp",
  "/assets/about-me/flowers.webp",
  "/assets/header/hotpot.webp",
  "/assets/throughout/green-flower-button.webp",
  "/assets/header/latte.webp",
  "/assets/header/croissant.webp",
  "/assets/header/dumplings.webp",
  "/assets/header/goldfish-snack.webp",
  "/assets/featured-work/iphone-frame.webp",
  "/assets/featured-work/pim-screenshot-1.webp",
  "/assets/featured-work/pim-screenshot-2.webp",
  "/assets/featured-work/pim-screenshot-3.webp",
  "/assets/featured-work/ticketdash-screenshot-2.webp",
  "/assets/featured-work/ticketdash-screenshot-3.webp",
  "/assets/featured-work/ticketdash-screenshot-4.webp",
  "/assets/featured-work/computer-screenshot.webp",
  "/assets/featured-work/laptop-frame.webp",
  "/assets/throughout/3-line-sparkle-accent.webp",
  "/assets/throughout/pink-sequin-star.webp",
  "/assets/throughout/yellow-gingham-star.webp",
  "/assets/throughout/red-fabric-star.webp",
  "/assets/about-me/1.webp",
  "/assets/about-me/2.webp",
  "/assets/about-me/3.webp",
  "/assets/about-me/4.webp",
  "/assets/header/blue-heart-button.webp",
  "/assets/header/banana-peanut-butter-honey-toast.webp",
  "/assets/about-me/notebook.webp",
  "/assets/about-me/pink-wax-seal-with-bow.webp",
  "/assets/about-me/masking-tape.webp",
  "/assets/header/teabag.webp",
  "/assets/about-me/pink-washi-tape.webp",
  "/assets/about-me/trainer-shoe.webp",
  "/assets/about-me/pen.webp",
  "/assets/about-me/headphones.webp",
  "/assets/about-me/globe.webp",
  "/assets/about-me/vinyl-record.webp",
  "/assets/about-me/tea.webp",
];

export default function Home() {
  preload("/assets/header/hi-im-tiah-no-line.webp", {
    as: "image",
    fetchPriority: "high",
  });
  HOMEPAGE_PRELOADS.forEach((href) => preload(href, { as: "image" }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Loader />
      <Navbar />
      <main className="flex-1 pb-8">
        <Hero />
        <WhatIDo />
        <FeaturedWork />
        <AboutMe />
        <div className="flex w-full justify-center text-xs text-foreground/60 px-6 pt-6">
          © {new Date().getFullYear()} tiah hind. all rights reserved.
        </div>
      </main>
      <Footer />
    </div>
  );
}
