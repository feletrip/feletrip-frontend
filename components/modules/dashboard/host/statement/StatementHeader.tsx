"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Reservation } from "./types";
import { VendorRecentBooking } from "@/types/vendor/dashboard";

interface StatementHeaderProps {
  recentBookings?: VendorRecentBooking[] | null;
  reservations?: Reservation[];
}

export default function StatementHeader({
  recentBookings,
  reservations = [],
}: StatementHeaderProps) {
  function handleDownload() {
    const hasRecent = Array.isArray(recentBookings) && recentBookings.length > 0;

    const headers = hasRecent
      ? ["Booking Code", "Guest", "Hotel", "Check-In", "Check-Out", "Amount", "Status"]
      : ["ID", "Guest", "Room", "Check-In", "Amount", "Status"];

    const rows = hasRecent
      ? recentBookings.map((recentBooking) => [
        recentBooking.bookingCode,
        `"${recentBooking.customerName}"`,
        `"${recentBooking.hotelName}"`,
        new Date(recentBooking.checkInDate).toLocaleDateString(),
        new Date(recentBooking.checkOutDate).toLocaleDateString(),
        "$" + recentBooking.totalAmount,
        recentBooking.status,
      ])
      : reservations.map((reservation) => [
        reservation.id,
        `"${reservation.guest}"`,
        `"${reservation.room}"`,
        reservation.checkIn,
        "$" + reservation.amount,
        reservation.status,
      ]);

    const csv = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "reservations-statement.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Reservations Statement
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of all guest bookings and revenue
        </p>
      </div>

      <Button
        onClick={handleDownload}
        className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 shadow-sm"
      >
        <Download className="w-4 h-4" />
        Download Statement
      </Button>
    </div>
  );
}
