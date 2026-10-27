import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import type { Booking } from "@/types/user/booking";

import { UpcomingBookingItem } from "./bookings/UpcomingBookingItem";

import { EmptyState } from "@/components/shared/EmptyState";

import { getUpcomingBookings } from "./bookings/booking-section.utils";

type BookingsSectionProps = {
  bookings: Booking[];
};

export default function BookingsSection({
  bookings = [],
}: BookingsSectionProps) {
  const upcomingBookings =
    getUpcomingBookings(bookings);

  return (
    <Card className="overflow-hidden border-border/70 bg-card shadow-sm">
      <CardHeader className="border-b border-border/60 px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
              <CalendarDays className="size-4.5 text-primary" />
            </div>

            <div>
              <h2 className="font-semibold tracking-tight sm:text-lg">
                Upcoming Bookings
              </h2>

              <p className="mt-0.5 text-xs text-muted-foreground">
                Your next confirmed and pending stays
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="shrink-0 text-primary hover:text-primary"
          >
            <Link href="/dashboard/user/myBookings">
              View all

              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-3 sm:p-4">
        {upcomingBookings.length > 0 ? (
          <div className="space-y-3">
            {upcomingBookings.map((booking) => (
              <UpcomingBookingItem
                key={booking.id}
                booking={booking}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<CalendarDays className="size-6 text-primary" />}
            title="No upcoming trips"
            description="Your upcoming hotel reservations will appear here once you make a booking."
            actionLabel="Explore Hotels"
            actionHref="/hotels"
            actionType="button"
            containerClassName="min-h-52 rounded-2xl border border-dashed bg-muted/20 p-6"
            iconContainerClassName="size-12 rounded-2xl bg-primary/10"
          />
        )}
      </CardContent>
    </Card>
  );
}