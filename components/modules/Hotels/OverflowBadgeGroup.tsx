"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useResizeObserver } from "@/hooks/use-resize-observer";

interface OverflowBadgeGroupProps {
  items: string[];
}

export default function OverflowBadgeGroup({ items }: OverflowBadgeGroupProps) {
  const visibleContainerRef = useRef<HTMLDivElement>(null);
  const hiddenContainerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  const [hiddenStartIndex, setHiddenStartIndex] = useState<number | null>(null);

  const checkOverflow = useCallback(() => {
    cancelAnimationFrame(frameRef.current);

    frameRef.current = requestAnimationFrame(() => {
      const hiddenContainer = hiddenContainerRef.current;
      if (!hiddenContainer) return;

      const badges = Array.from(hiddenContainer.children) as HTMLElement[];
      if (!badges.length) return;

      const firstRowTop = badges[0].offsetTop;
      let secondRowTop: number | null = null;

      for (const badge of badges) {
        if (badge.offsetTop > firstRowTop) {
          secondRowTop = badge.offsetTop;
          break;
        }
      }

      if (secondRowTop === null) {
        setHiddenStartIndex((prev) => (prev === null ? prev : null));
        return;
      }

      let hiddenIndex: number | null = null;

      for (let i = 0; i < badges.length; i++) {
        if (badges[i].offsetTop > secondRowTop) {
          hiddenIndex = Math.max(i - 1, 0);
          break;
        }
      }

      setHiddenStartIndex((prev) =>
        prev === hiddenIndex ? prev : hiddenIndex
      );
    });
  }, []);

  useResizeObserver({
    ref: visibleContainerRef,
    onResize: checkOverflow,
  });

  useLayoutEffect(() => {
    checkOverflow();

    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [items, checkOverflow]);

  const hiddenCount =
    hiddenStartIndex === null ? 0 : items.length - hiddenStartIndex;

  return (
    <div className="w-full relative">
      <div
        ref={visibleContainerRef}
        className="flex w-full flex-wrap gap-1.5 overflow-hidden"
      >
        {items.map((item, index) => {
          const hidden = hiddenStartIndex !== null && index >= hiddenStartIndex;
          if (hidden) return null;

          return (
            <Badge
              key={`visible-${item}-${index}`}
              className="whitespace-nowrap rounded-sm bg-primary px-2 py-0.5 text-xs font-medium text-background"
            >
              {item}
            </Badge>
          );
        })}

        {hiddenCount > 0 && (
          <Badge
            variant="outline"
            className="more-badge whitespace-nowrap rounded-sm border-dashed border-border/80 bg-background/40 px-2 py-0.5 text-xs font-semibold text-primary"
          >
            +{hiddenCount} more
          </Badge>
        )}
      </div>

      <div
        ref={hiddenContainerRef}
        aria-hidden="true"
        className="flex w-full flex-wrap gap-1.5 absolute pointer-events-none invisible opacity-0 top-0 left-0"
      >
        {items.map((item, index) => (
          <Badge
            key={`hidden-${item}-${index}`}
            className="whitespace-nowrap px-2 py-0.5 text-xs"
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}