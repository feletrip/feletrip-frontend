"use client";

import { useEffect } from "react";

export default function ScrollToHash({ targetId }: { targetId: string }) {
  useEffect(() => {
    const handleScroll = () => {
      if (window.location.hash === `#${targetId}`) {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    const timer = setTimeout(handleScroll, 100);

    window.addEventListener("hashchange", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", handleScroll);
    };
  }, [targetId]);

  return null;
}
