"use client";

import { Baby, User } from "lucide-react";

interface GuestFieldDisplayProps {
  adults: number;
  children: number;
  rooms: number;
}

export const GuestFieldDisplay = ({
  adults,
  children,
  rooms,
}: GuestFieldDisplayProps) => {
  const totalGuests = adults + children;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3">
        <span
          className={`${children < 10 || rooms < 2 ? "text-3xl" : "text-2xl"} font-bold leading-none text-foreground/40`}
        >
          {totalGuests}
        </span>
        <div className="h-10 w-px shrink-0 bg-border" />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
            <User size={14} className="text-muted-foreground shrink-0" />
            <span>
              {adults} Adult{adults !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Baby size={14} className="shrink-0" />
            <span>
              {children} Child{children !== 1 ? "ren" : ""}
            </span>
          </div>
        </div>
      </div>

      <div className="h-10 w-px shrink-0 bg-border" />

      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xl font-bold leading-none text-foreground/40">
          {rooms}
        </span>
        <span className="text-xs text-muted-foreground">
          Room{rooms !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
};
