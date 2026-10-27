"use client";

import React from "react";

import { Motion } from "@/components/Reuseable/common/Framermotion";

import type { Booking } from "@/types/user/booking";

import {
  filterBookingsBySearch,
  groupBookingsByCategory,
} from "@/lib/booking-utils";

import { BookingTabs } from "./BookingTabs";

type MyBookingsClientProps = {
  initialBookings: Booking[];
};

export function MyBookingsClient({ initialBookings }: MyBookingsClientProps) {
  const [search, setSearch] = React.useState("");

  const bookingsByCategory = React.useMemo(() => {
    const filtered = filterBookingsBySearch(initialBookings, search);
    return groupBookingsByCategory(filtered);
  }, [initialBookings, search]);

  return (
    <Motion animationType="fadeUp" delay={0.2}>
      <BookingTabs
        search={search}
        onSearchChange={setSearch}
        bookingsByCategory={bookingsByCategory}
      />
    </Motion>
  );
}
