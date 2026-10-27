"use client";

import { Motion } from "../../../../../../components/Reuseable/common/Framermotion";

export default function RolesSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <Motion
            key={index}
            animationType="slideUp"
            delay={index * 0.05}
            className="relative overflow-hidden rounded-2xl bg-linear-to-br from-background via-background to-muted/30 border border-border"
          >
            <div className="relative p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-muted/50 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-5 w-24 bg-muted/50 rounded animate-pulse" />
                    <div className="h-6 w-16 bg-muted/50 rounded-full animate-pulse" />
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-muted/50 animate-pulse" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-full bg-muted/50 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-muted/50 rounded animate-pulse" />
              </div>

              <div className="flex items-center gap-4 pt-3 border-t border-border/50">
                <div className="h-3 w-20 bg-muted/50 rounded animate-pulse" />
                <div className="h-3 w-20 bg-muted/50 rounded animate-pulse" />
              </div>

              <div className="h-10 w-full bg-muted/50 rounded-xl animate-pulse" />
            </div>
          </Motion>
        ))}
      </div>
    </div>
  );
}
