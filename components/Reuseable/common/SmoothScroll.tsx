"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: true,

      // ✅ Most stable approach for UI libraries (Radix/HeroUI/etc)
      prevent: (node) => {
        if (!(node instanceof HTMLElement)) return false;

        return (
          node.closest("[data-lenis-prevent]") !== null ||
          node.closest('[role="dialog"]') !== null ||
          node.closest('[role="menu"]') !== null ||
          node.closest('[role="listbox"]') !== null ||
          node.closest('[role="combobox"]') !== null ||
          node.closest("[data-radix-popper-content-wrapper]") !== null ||
          node.closest("[data-state='open']") !== null
        );
      },
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
