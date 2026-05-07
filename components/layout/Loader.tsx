"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Logo from "@/components/ui/Logo";

export default function Loader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    function waitForImages(): Promise<void> {
      return new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          const imgs = Array.from(
            document.querySelectorAll<HTMLImageElement>("img"),
          );

          if (imgs.length === 0) {
            resolve();
            return;
          }

          let remaining = imgs.length;

          function onSettle() {
            remaining--;
            if (remaining === 0) resolve();
          }

          imgs.forEach((img) => {
            if (img.complete) {
              onSettle();
            } else {
              img.addEventListener("load", onSettle, { once: true });
              img.addEventListener("error", onSettle, { once: true });
            }
          });
        });
      });
    }

    const windowReady = new Promise<void>((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", () => resolve(), { once: true });
      }
    });

    const minimumTimer = new Promise<void>((resolve) =>
      setTimeout(resolve, 2600),
    );

    const assetsReady = windowReady.then(waitForImages);

    const absoluteTimeout = setTimeout(() => setIsLoaded(true), 5000);

    Promise.all([minimumTimer, assetsReady])
      .then(() => {
        clearTimeout(absoluteTimeout);
        setIsLoaded(true);
      })
      .catch(() => {
        clearTimeout(absoluteTimeout);
        setIsLoaded(true);
      });

    return () => {
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
