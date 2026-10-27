"use client";

import { Motion } from "@/components/Reuseable/common/Framermotion";
import { StatusBadge } from "@/components/Reuseable/common/StatusBadge";
import { VendorRecentBooking } from "@/types/vendor/dashboard";
import { Building2, Calendar, Receipt, User } from "lucide-react";
import { formatBookingCode } from "@/lib/booking-utils";
import { Reservation } from "./types";

interface StatementTableProps {
  recentBookings?: VendorRecentBooking[] | null;
  reservations?: Reservation[];
  isPending?: boolean;
}

function formatDate(dateStr: string) {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function StatementTable({
  recentBookings,
  reservations = [],
  isPending = false,
}: StatementTableProps) {
  const hasRecentBookings =
    Array.isArray(recentBookings) && recentBookings.length > 0;
  const dataSource = hasRecentBookings ? recentBookings : reservations;

  return (
    <div className="rounded-2xl border border-accent shadow-lg overflow-hidden bg-card">
      <div className="p-6 border-b border-border/60">
        <h2 className="text-xl font-semibold text-foreground">
          Recent Reservations
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Detailed list of guest bookings and status
        </p>
      </div>

      {/* Header - Hidden on mobile/tablet, aligns directly with grid items on xl screens */}
      <div className="hidden xl:grid grid-cols-12 gap-4 border-b border-border/60 bg-primary px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-background">
        <div className="col-span-3">Hotel & Booking Code</div>
        <div className="col-span-3">Guest</div>
        <div className="col-span-2">Check-In / Out</div>
        <div className="col-span-2 text-right">Amount & Date</div>
        <div className="col-span-2 text-right">Status</div>
      </div>

      {/* Items Container */}
      <div
        className={`divide-y divide-border ${
          isPending ? "opacity-50 transition-opacity" : ""
        }`}
      >
        {dataSource.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/40 text-muted-foreground mb-2">
              <Receipt className="h-6 w-6 text-muted-foreground/60" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              No reservations found
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Try adjusting your search terms or filters.
            </p>
          </div>
        ) : hasRecentBookings ? (
          (recentBookings as VendorRecentBooking[]).map((booking, idx) => (
            <Motion key={booking.id} animationType="fadeUp" delay={idx * 0.2}>
              <div className="group p-4 xl:px-6 xl:py-3.5 transition-colors hover:bg-accent/20 grid grid-cols-2 xl:grid-cols-12 gap-3 xl:gap-4 items-center text-sm">
                {/* Hotel & Booking Code */}
                <div className="order-1 col-span-1 xl:col-span-3 min-w-0">
                  <h4 className="font-semibold text-foreground truncate flex items-center gap-1.5">
                    <Building2 className="h-4 w-4 text-primary shrink-0" />
                    <span className="truncate">
                      {booking.hotelName || "N/A"}
                    </span>
                  </h4>
                  <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-sm bg-accent/40 border border-border/40 font-mono text-[10px] xl:text-[11px] text-muted-foreground">
                    {formatBookingCode(booking.bookingCode) || "N/A"}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="order-2 col-span-1 xl:col-span-2 flex justify-end xl:order-5">
                  <StatusBadge status={booking.status} />
                </div>

                {/* Customer Info */}
                <div className="order-3 col-span-1 xl:col-span-3 min-w-0 rounded-xl xl:rounded-none bg-accent/30 xl:bg-transparent border border-border/50 xl:border-none p-2.5 xl:p-0">
                  <span className="text-muted-foreground block text-[10px] uppercase font-semibold xl:hidden">
                    Guest
                  </span>
                  <div className="font-medium text-foreground truncate flex items-center gap-1.5 xl:gap-2">
                    <User className="h-3.5 w-3.5 xl:h-4 xl:w-4 text-muted-foreground shrink-0 hidden sm:block" />
                    <span className="truncate">
                      {booking.customerName || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Amount */}
                <div className="order-4 col-span-1 xl:col-span-2 text-right rounded-xl xl:rounded-none bg-accent/30 xl:bg-transparent border border-border/50 xl:border-none p-2.5 xl:p-0">
                  <span className="text-muted-foreground block text-[10px] uppercase font-semibold xl:hidden">
                    Amount
                  </span>
                  <div className="font-bold text-foreground text-sm xl:text-base">
                    ${booking.totalAmount.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 hidden xl:flex items-center justify-end gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground/70" />
                    {formatDate(booking.checkInDate)}
                  </div>
                  <span className="text-muted-foreground text-[10px] block mt-0.5 xl:hidden">
                    In: {formatDate(booking.checkInDate)}
                  </span>
                </div>

                {/* Dates / Check-In Check-Out details */}
                <div className="order-5 col-span-2 xl:col-span-2 min-w-0 flex items-center justify-between xl:block xl:order-3 bg-accent/20 xl:bg-transparent p-2 xl:p-0 rounded-lg xl:rounded-none border border-border/30 xl:border-none font-mono text-[11px] xl:text-xs">
                  <div className="font-medium text-foreground truncate bg-transparent xl:bg-accent/40 xl:px-2 xl:py-1 xl:rounded-sm xl:border xl:border-border/40 w-fit max-w-full">
                    <span className="xl:hidden">In: </span>
                    {formatDate(booking.checkInDate)}
                  </div>
                  <div className="text-muted-foreground mt-0 xl:mt-1 flex items-center gap-1">
                    <span className="xl:hidden">
                      Out: {formatDate(booking.checkOutDate)}
                    </span>
                    <span className="hidden xl:flex items-center gap-1 text-xs">
                      Out: {formatDate(booking.checkOutDate)}
                    </span>
                  </div>
                </div>
              </div>
            </Motion>
          ))
        ) : (
          (reservations as Reservation[]).map((reservation, idx) => (
            <Motion
              key={reservation.id}
              animationType="fadeUp"
              delay={idx * 0.2}
            >
              <div className="group p-4 xl:px-6 xl:py-3.5 transition-colors hover:bg-accent/20 grid grid-cols-2 xl:grid-cols-12 gap-3 xl:gap-4 items-center text-sm">
                {/* Room & ID */}
                <div className="order-1 col-span-1 xl:col-span-3 min-w-0">
                  <h4 className="font-semibold text-foreground truncate flex items-center gap-1.5">
                    <Building2 className="h-4 w-4 text-primary shrink-0" />
                    <span className="truncate">
                      {reservation.room || "N/A"}
                    </span>
                  </h4>
                  <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-sm bg-accent/40 border border-border/40 font-mono text-[10px] xl:text-[11px] text-muted-foreground">
                    {reservation.id || "N/A"}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="order-2 col-span-1 xl:col-span-2 flex justify-end xl:order-5">
                  <StatusBadge status={reservation.status} />
                </div>

                {/* Guest Info */}
                <div className="order-3 col-span-1 xl:col-span-3 min-w-0 rounded-xl xl:rounded-none bg-accent/30 xl:bg-transparent border border-border/50 xl:border-none p-2.5 xl:p-0">
                  <span className="text-muted-foreground block text-[10px] uppercase font-semibold xl:hidden">
                    Guest
                  </span>
                  <div className="font-medium text-foreground truncate flex items-center gap-1.5 xl:gap-2">
                    <User className="h-3.5 w-3.5 xl:h-4 xl:w-4 text-muted-foreground shrink-0 hidden sm:block" />
                    <span className="truncate">
                      {reservation.guest || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Amount */}
                <div className="order-4 col-span-1 xl:col-span-2 text-right rounded-xl xl:rounded-none bg-accent/30 xl:bg-transparent border border-border/50 xl:border-none p-2.5 xl:p-0">
                  <span className="text-muted-foreground block text-[10px] uppercase font-semibold xl:hidden">
                    Amount
                  </span>
                  <div className="font-bold text-foreground text-sm xl:text-base">
                    ${reservation.amount.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 hidden xl:flex items-center justify-end gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground/70" />
                    {reservation.checkIn}
                  </div>
                </div>

                {/* Check-In Details */}
                <div className="order-5 col-span-2 xl:col-span-2 min-w-0 flex items-center justify-between xl:block xl:order-3 bg-accent/20 xl:bg-transparent p-2 xl:p-0 rounded-lg xl:rounded-none border border-border/30 xl:border-none font-mono text-[11px] xl:text-xs">
                  <div className="font-medium text-foreground truncate bg-transparent xl:bg-accent/40 xl:px-2 xl:py-1 xl:rounded-sm xl:border xl:border-border/40 w-fit max-w-full">
                    <span className="xl:hidden">In: </span>
                    {reservation.checkIn}
                  </div>
                  <div className="text-muted-foreground mt-0 xl:mt-1 flex items-center gap-1">
                    <span className="xl:hidden">Out: -</span>
                    <span className="hidden xl:flex items-center gap-1 text-xs">
                      Out: -
                    </span>
                  </div>
                </div>
              </div>
            </Motion>
          ))
        )}
      </div>
    </div>
  );
}
