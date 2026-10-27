"use client";

import { CalendarDays } from "lucide-react";

import { Motion } from "@/components/Reuseable/common/Framermotion";
import { Badge } from "@/components/ui/badge";

import { MiniStat } from "./MiniStat";

type MyBookingsHeroProps = {
  activeCount: number;
  completedCount: number;
  cancelledCount: number;
};

const stats = [
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
] as const;

export function MyBookingsHero({
  activeCount,
  completedCount,
  cancelledCount,
}: MyBookingsHeroProps) {
  const values = { active: activeCount, completed: completedCount, cancelled: cancelledCount };

  return (
    <section className="relative overflow-hidden rounded-3xl border bg-linear-to-br from-accent/80 via-background to-primary/10 p-6 sm:p-8">
      <div className="absolute -right-16 -top-20 size-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <Motion animationType="badge">
            <Badge
              variant="outline"
              className="mb-3 border-primary/20 bg-background/60 text-accent-foreground backdrop-blur-sm"
            >
              <CalendarDays className="size-3.5" />
              Travel Dashboard
            </Badge>
          </Motion>

          <Motion animationType="slideUp" delay={0.1}>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Booking <span className="text-primary">History</span>
            </h1>
          </Motion>

          <Motion animationType="fadeUp" delay={0.15}>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Keep track of upcoming adventures, completed stays, and cancelled
              reservations from one place.
            </p>
          </Motion>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {stats.map((stat, index) => (
            <Motion key={stat.key} animationType="card" custom={index}>
              <MiniStat value={values[stat.key]} label={stat.label} />
            </Motion>
          ))}
        </div>
      </div>
    </section>
  );
}
