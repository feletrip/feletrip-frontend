import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, DollarSign } from "lucide-react";

import { formatBookingDate, formatBookingCode } from "@/lib/booking-utils";
import { Booking } from "@/types/user/booking";
import { EmptyState } from "@/components/shared/EmptyState";
import { BookingStatusBadge } from "../../myBookings/BookingStatusBadge";

interface RecentBookingsProps {
  bookings: Booking[];
}

export function RecentBookings({
  bookings,
}: RecentBookingsProps) {
  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-4 sm:px-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground sm:text-base">
            Recent Bookings
          </h3>

          <p className="mt-0.5 text-xs text-muted-foreground">
            Your latest booking activity
          </p>
        </div>

        <Link
          href="/dashboard/user/myBookings"
          className="group inline-flex items-center gap-1 text-xs font-medium text-primary transition-opacity hover:opacity-80"
        >
          View all

          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {recentBookings.length > 0 ? (
        <div className="divide-y divide-border">
          <div className="hidden border-b border-border/60 bg-muted/40 px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground lg:grid lg:grid-cols-12 lg:gap-4">
            <div className="lg:col-span-3">Booking</div>
            <div className="lg:col-span-3">Hotel</div>
            <div className="lg:col-span-2">Check-in</div>
            <div className="lg:col-span-2">Amount</div>
            <div className="lg:col-span-2 lg:text-right">Status</div>
          </div>

          {recentBookings.map((booking) => (
            <div
              key={booking.id}
              className="p-4 sm:p-5 transition-colors hover:bg-accent/20 lg:grid lg:grid-cols-12 lg:items-center lg:gap-4 lg:px-6 lg:py-4 space-y-3 lg:space-y-0"
            >
              {/* Desktop Layout */}
              <div className="hidden lg:block lg:col-span-3">
                <span className="font-semibold text-foreground">
                  {formatBookingCode(booking.bookingCode)}
                </span>
              </div>

              <div className="hidden lg:block lg:col-span-3 min-w-0">
                <p className="truncate font-medium text-foreground">
                  {booking.hotel.name}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {booking.hotel.city}
                </p>
              </div>

              <div className="hidden lg:block lg:col-span-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="size-3.5 shrink-0" />
                  <span className="text-xs">
                    {formatBookingDate(booking.checkInDate)}
                  </span>
                </div>
              </div>

              <div className="hidden lg:block lg:col-span-2">
                <span className="font-semibold text-foreground">
                  ৳{Number(booking.finalAmount).toLocaleString("en-BD")}
                </span>
              </div>

              <div className="hidden lg:flex lg:col-span-2 lg:justify-end">
                <BookingStatusBadge status={booking.status} />
              </div>

              {/* Mobile/Tablet Layout */}
              <div className="lg:hidden space-y-3">
                {/* Top row: Booking code + Status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                      Booking Code
                    </p>
                    <p className="font-semibold text-foreground text-sm truncate">
                      {formatBookingCode(booking.bookingCode)}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <BookingStatusBadge status={booking.status} />
                  </div>
                </div>

                {/* Hotel Information Card */}
                <div className="rounded-lg bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20 p-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                        Hotel
                      </p>
                      <p className="font-semibold text-foreground text-sm truncate">
                        {booking.hotel.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {booking.hotel.city}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Check-in Date */}
                  <div className="rounded-lg bg-accent/40 border border-border/50 p-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                      Check-in
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
                      <CalendarDays className="size-3.5 text-muted-foreground shrink-0" />
                      <span>{formatBookingDate(booking.checkInDate)}</span>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="rounded-lg bg-accent/40 border border-border/50 p-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                      Total Amount
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                      <DollarSign className="size-3.5 text-primary shrink-0" />
                      <span>৳{Number(booking.finalAmount).toLocaleString("en-BD")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<CalendarDays className="size-5 text-accent-foreground" />}
          title="No bookings yet"
          description="Your latest hotel bookings will appear here."
          actionLabel="Explore hotels"
          actionHref="/hotels"
          actionType="link"
          containerClassName="min-h-52 py-10"
          iconContainerClassName="size-12 rounded-full bg-accent"
        />
      )}
    </div>
  );
}