"use client";

import {
  CalendarX,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

interface PoliciesProps {
  policies: {
    checkIn: string | null;
    checkOut: string | null;
    cancellation: string | null;
  };
}

const PoliciesSection = ({ policies }: PoliciesProps) => {
  return (
    <section className="space-y-8 relative my-12 pt-10 border-t border-muted/60">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Property Policies
            </h2>
            <span className="text-xs bg-primary/10 text-primary font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Terms & Guidelines
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Please review the stay policies and schedule before booking your
            reservation.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ================= Timing Card ================= */}
        <div className="group relative overflow-hidden rounded-2xl border border-muted/80 bg-background p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5">
          {/* Subtle Decorative Background Glow */}
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-sky-500/5 blur-2xl" />

          {/* Background Grid Accent Pattern */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
            <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] bg-size-[16px_16px]" />
          </div>

          <div className="relative space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Clock className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-base font-bold text-foreground tracking-tight">
                  Timing Window
                </h3>
                <p className="text-xs text-muted-foreground">
                  Arrival & Departure Schedule
                </p>
              </div>
            </div>

            {/* Times Grid */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border/60 bg-muted/40 p-4 transition-colors group-hover:bg-muted/60">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Check-in Time
                </p>
                <p className="mt-1.5 text-lg font-bold tracking-tight text-foreground">
                  {policies?.checkIn || "--:--"}
                </p>
              </div>

              <div className="rounded-xl border border-border/60 bg-muted/40 p-4 transition-colors group-hover:bg-muted/60">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Check-out Time
                </p>
                <p className="mt-1.5 text-lg font-bold tracking-tight text-foreground">
                  {policies?.checkOut || "--:--"}
                </p>
              </div>
            </div>

            {/* Footer Note */}
            <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground font-medium">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>
                Please plan your arrival within the designated check-in window.
              </span>
            </div>
          </div>
        </div>

        {/* ================= Cancellation Card ================= */}
        <div className="group relative overflow-hidden rounded-2xl border border-muted/80 bg-background p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5">
          {/* Subtle Decorative Background Glow */}
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-violet-500/5 blur-2xl" />

          {/* Background Grid Accent Pattern */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
            <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] bg-size-[16px_16px]" />
          </div>

          <div className="relative space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <CalendarX className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-base font-bold text-foreground tracking-tight">
                  Cancellation Policy
                </h3>
                <p className="text-xs text-muted-foreground">
                  Terms for modified or cancelled stays
                </p>
              </div>
            </div>

            {/* Content Details */}
            <div className="rounded-xl border border-border/60 bg-muted/40 p-4 transition-colors group-hover:bg-muted/60 min-h-[92px] flex flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Policy Details
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground font-normal">
                {policies?.cancellation ||
                  "Guests may cancel anytime if no specific restriction policy has been established by this property."}
              </p>
            </div>

            {/* Footer Note */}
            <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground font-medium">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>
                Review cancellation rules prior to completing payment.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoliciesSection;
