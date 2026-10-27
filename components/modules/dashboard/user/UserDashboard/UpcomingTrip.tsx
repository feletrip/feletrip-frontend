import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

import { formatBookingDate, getTripCountdown } from "@/lib/booking-utils";
import { Booking } from "@/types/user/booking";
import { EmptyState } from "@/components/shared/EmptyState";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UpcomingTripProps {
  nextUpcomingBooking: Booking | null;
}

const UpcomingTrip = ({ nextUpcomingBooking }: UpcomingTripProps) => {
  const coverImage =
    nextUpcomingBooking?.hotel.hotelPhotos?.find((photo) => photo.photoUrl)
      ?.photoUrl ??
    nextUpcomingBooking?.hotel.hotelPhotos?.[0]?.photoUrl ??
    undefined;

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b px-5 py-4 sm:px-6">
        <div>
          <h3 className="mt-0.5 text-sm font-semibold text-foreground sm:text-base">
            Your Next Upcoming Trip
          </h3>
        </div>

        {nextUpcomingBooking && (
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            {getTripCountdown(nextUpcomingBooking.checkInDate)}
          </span>
        )}
      </div>

      {nextUpcomingBooking ? (
        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <Avatar className="h-44 w-full shrink-0 rounded-xl sm:h-28 sm:w-36">
              <AvatarImage
                src={coverImage}
                alt={nextUpcomingBooking.hotel.name}
                className="object-cover transition-transform duration-300 hover:scale-105"
              />

              <AvatarFallback className="rounded-xl text-3xl font-semibold">
                {nextUpcomingBooking.hotel.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <h4 className="mt-1 truncate text-lg font-semibold text-foreground">
                {nextUpcomingBooking.hotel.name}
              </h4>

              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4 shrink-0" />
                  <span className="truncate">
                    {nextUpcomingBooking.hotel.city}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="size-4 shrink-0" />
                  <span>
                    {formatBookingDate(nextUpcomingBooking.checkInDate)}
                    {" — "}
                    {formatBookingDate(nextUpcomingBooking.checkOutDate)}
                  </span>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <Link
                href={`/dashboard/user/myBookings/${nextUpcomingBooking.id}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
              >
                View Details
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
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
    </div>
  );
};

export default UpcomingTrip;
