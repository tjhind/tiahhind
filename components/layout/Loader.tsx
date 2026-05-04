"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Logo from "@/components/ui/Logo";

export default function Loader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    let windowLoaded = document.readyState === "complete";
    let timerFired = false;

    function tryComplete() {
      if (windowLoaded && timerFired) setIsLoaded(true);
    }

    const timer = setTimeout(() => {
      timerFired = true;
      tryComplete();
    }, 1200);

    function onLoad() {
      windowLoaded = true;
      tryComplete();
    }

    if (!windowLoaded) {
      window.addEventListener("load", onLoad);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
      initial={{ y: 0 }}
      animate={isLoaded ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (isLoaded) setIsMounted(false);
      }}
    >
      <Logo />
    </motion.div>
  );
}
