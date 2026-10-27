"use client";

import { RefObject, useLayoutEffect } from "react";

interface UseResizeObserverOptions {
  ref: RefObject<HTMLElement | null>;
  onResize: () => void;
}

export function useResizeObserver({
  ref,
  onResize,
}: UseResizeObserverOptions) {
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(onResize);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, onResize]);
}