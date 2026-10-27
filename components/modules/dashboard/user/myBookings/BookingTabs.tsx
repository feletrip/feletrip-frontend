"use client";

import {
  CheckCircle2,
  Clock3,
  Search,
  XCircle,
  type LucideIcon,
} from "lucide-react";

import { Motion } from "@/components/Reuseable/common/Framermotion";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import type { Booking } from "@/types/user/booking";

import type { BookingCategory } from "@/lib/booking-utils";

import { BookingList } from "./BookingList";
import { TabCount } from "./TabCount";

type BookingTab = {
  value: BookingCategory;
  label: string;
  icon: LucideIcon;
};

type BookingTabsProps = {
  search: string;
  onSearchChange: (value: string) => void;
  bookingsByCategory: Record<BookingCategory, Booking[]>;
};

const TAB_LIST_CLASS =
  "h-auto min-w-max gap-1 rounded-full border border-border/50 bg-muted/70 p-1.5 shadow-none";

const TAB_TRIGGER_CLASS = cn(
  "min-w-fit flex-none cursor-pointer gap-2 rounded-xl border-0 px-4 py-2.5 text-sm font-normal text-muted-foreground shadow-none transition-all",
  "hover:text-foreground",
  "data-[state=active]:bg-background data-[state=active]:font-semibold data-[state=active]:text-foreground",
  "data-[state=active]:shadow-[0_1px_3px_rgba(15,23,42,0.08)]",
  "dark:data-[state=active]:bg-background dark:data-[state=active]:text-foreground",
);

const TAB_CONFIG: BookingTab[] = [
  {
    value: "active",
    label: "Active Trips",
    icon: Clock3,
  },
  {
    value: "completed",
    label: "Past Stays",
    icon: CheckCircle2,
  },
  {
    value: "cancelled",
    label: "Cancelled & Refunded",
    icon: XCircle,
  },
];

export function BookingTabs({
  search,
  onSearchChange,
  bookingsByCategory,
}: BookingTabsProps) {
  const tabs = TAB_CONFIG.map((tab) => ({
    ...tab,
    bookings: bookingsByCategory[tab.value],
  }));

  return (
    <Tabs defaultValue="active" className="space-y-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <Motion
          animationType="fadeUp"
          delay={0.1}
          className="hide-scrollbar overflow-x-auto"
        >
          <TabsList className={TAB_LIST_CLASS}>
            {tabs.map(({ value, label, icon: Icon, bookings }) => (
              <TabsTrigger
                key={value}
                value={value}
                className={TAB_TRIGGER_CLASS}
              >
                <Icon className="size-4 shrink-0" />
                {label}
                <TabCount count={bookings.length} />
              </TabsTrigger>
            ))}
          </TabsList>
        </Motion>

        <Motion
          animationType="fadeLeft"
          delay={0.15}
          className="relative w-full xl:w-80"
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search hotel, city or booking ID..."
            className="h-10 pl-9"
          />
        </Motion>
      </div>

      {tabs.map(({ value, bookings }) => (
        <TabsContent key={value} value={value}>
          <Motion animationType="fadeUp" delay={0.05}>
            <BookingList bookings={bookings} />
          </Motion>
        </TabsContent>
      ))}
    </Tabs>
  );
}
