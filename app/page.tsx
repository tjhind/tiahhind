import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import WhatIDo from "@/components/sections/WhatIDo";
import FeaturedWork from "@/components/sections/FeaturedWork";
import AboutMe from "@/components/sections/AboutMe";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pb-20">
        <Hero />
        <WhatIDo />
        <FeaturedWork />
        <AboutMe />
      </main>
      <Footer />
    </div>
  );
}
