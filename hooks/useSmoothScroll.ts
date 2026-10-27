// hooks/useSmoothScroll.ts
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth ease
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false, // usually false on mobile
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // This is important when using Lenis + scroll-based libraries
    lenis.on("scroll", () => {
      // You can trigger ScrollTrigger.update() here if using GSAP ScrollTrigger
    });

    return () => {
      lenis.destroy();
    };
  }, []);
}
