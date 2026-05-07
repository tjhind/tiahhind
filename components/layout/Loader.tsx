"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Logo from "@/components/ui/Logo";

export default function Loader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    let timerFired = false;
    let assetsFired = false;

    function tryComplete() {
      if (timerFired && assetsFired) setIsLoaded(true);
    }

    const timer = setTimeout(() => {
      timerFired = true;
      tryComplete();
    }, 2600);

    // Hard fallback — dismiss after 3s regardless of asset state
    const absoluteTimeout = setTimeout(() => {
      assetsFired = true;
      tryComplete();
    }, 3000);

    function waitForImages(): Promise<void> {
      const imgs = Array.from(
        document.querySelectorAll<HTMLImageElement>("img"),
      );

      const promises = imgs.map((img) => {
        if (img.complete) return Promise.resolve();

        return new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        });
      });

      return Promise.all(promises).then(() => {});
    }

    const windowReady = new Promise<void>((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", () => resolve(), { once: true });
      }
    });

    windowReady.then(waitForImages).then(() => {
      assetsFired = true;
      clearTimeout(absoluteTimeout);
      tryComplete();
    });

    return () => {
      clearTimeout(timer);
      clearTimeout(absoluteTimeout);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
      initial={{ y: 0 }}
      animate={isLoaded ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (isLoaded) {
          window.dispatchEvent(new CustomEvent("loaderComplete"));
          setIsMounted(false);
        }
      }}
    >
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          initial={{ x: "105%" }}
          animate={{ x: "0%" }}
          transition={{
            duration: 1.5,
            ease: [0.76, 0, 0.24, 1],
            delay: 0,
          }}
        >
          <Logo />
        </motion.div>

        <motion.span
          className="absolute inset-0 bg-background"
          initial={{ x: "0%" }}
          animate={{ x: "-105%" }}
          transition={{
            duration: 1.5,
            ease: [0.76, 0, 0.24, 1],
            delay: 0,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
