"use client";

import { Motion } from "../../../../../../components/Reuseable/common/Framermotion";

export default function PermissionsSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4].map((index) => (
        <Motion
          key={index}
          animationType="slideUp"
          delay={index * 0.05}
          className="relative overflow-hidden rounded-xl bg-linear-to-br from-muted/50 via-muted/30 to-background border border-border/50"
        >
          <div className="relative p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-muted/50 animate-pulse shrink-0" />
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-5 w-32 bg-muted/50 rounded animate-pulse" />
                <div className="h-4 w-full bg-muted/50 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </Motion>
      ))}
    </div>
  );
}
