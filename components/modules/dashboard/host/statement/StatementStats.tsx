"use client";

import StatsCard from "@/components/Reuseable/admin/DashboardStatsCard";
import { CalendarCheck, Clock3, CheckCircle2, CalendarX } from "lucide-react";
import { Reservation } from "./types";
import { VendorBookingOverview } from "@/types/vendor/dashboard";

interface StatementStatsProps {
  bookingOverview?: VendorBookingOverview | null;
  reservations?: Reservation[];
}

export default function StatementStats({
  bookingOverview,
  reservations = [],
}: StatementStatsProps) {
  const totalBookings =
    bookingOverview?.totalBookings ?? reservations.length;

  const pendingBookings =
    bookingOverview?.pendingBookings ??
    reservations.filter((reservation) => reservation.status === "pending").length;

  const confirmedBookings =
    bookingOverview?.confirmedBookings ??
    reservations.filter((reservation) => reservation.status === "confirmed").length;

  const cancelledBookings =
    bookingOverview?.cancelledBookings ??
    reservations.filter((reservation) => reservation.status === "cancelled").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Bookings"
        value={totalBookings}
        icon={CalendarCheck}
        subtitle="All reservations"
        animationIndex={0}
        bgGlow="from-primary/25 via-primary/5 to-transparent"
        iconStyle="bg-primary text-primary-foreground"
        borderGlow="hover:border-primary/40"
      />

      <StatsCard
        title="Pending Booking"
        value={pendingBookings}
        icon={Clock3}
        subtitle="Pending status"
        animationIndex={1}
        bgGlow="from-amber-500/25 via-amber-500/5 to-transparent"
        iconStyle="bg-amber-500 text-white"
        borderGlow="hover:border-amber-500/40"
      />

      <StatsCard
        title="Confirmed Booking"
        value={confirmedBookings}
        icon={CheckCircle2}
        subtitle="Confirmed status"
        animationIndex={2}
        bgGlow="from-emerald-500/25 via-emerald-500/5 to-transparent"
        iconStyle="bg-emerald-500 text-white"
        borderGlow="hover:border-emerald-500/40"
      />

      <StatsCard
        title="Cancelled"
        value={cancelledBookings}
        icon={CalendarX}
        subtitle="Cancelled status"
        animationIndex={3}
        bgGlow="from-destructive/25 via-destructive/5 to-transparent"
        iconStyle="bg-destructive text-destructive-foreground"
        borderGlow="hover:border-destructive/40"
      />
    </div>
  );
}
