import Image from "next/image";
import { BedDouble, CalendarDays, MapPin } from "lucide-react";
import { BookingStatusBadge } from "../../myBookings/BookingStatusBadge";
import { formatBookingDate } from "@/lib/booking-utils";
import type { Booking } from "@/types/user/booking";
import { getHotelCoverImage, getHotelInitial } from "./booking-section.utils";

type UpcomingBookingItemProps = {
  booking: Booking;
};

export function UpcomingBookingItem({ booking }: UpcomingBookingItemProps) {
  const coverImage = getHotelCoverImage(booking);

  const hotelInitial = getHotelInitial(booking.hotel.name);

  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-border/60 p-3 transition-all duration-300 hover:border-primary/30 hover:bg-muted/20 sm:flex-row sm:items-center">
      <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-28">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={`${booking.hotel.name} cover`}
            fill
            sizes="(max-width: 640px) 100vw, 112px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <HotelImageFallback initial={hotelInitial} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h3 className="truncate font-semibold">{booking.hotel.name}</h3>

            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3.5 shrink-0 text-primary" />

              <span className="truncate">{booking.hotel.city}</span>
            </div>
          </div>

          <BookingStatusBadge status={booking.status} />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-primary" />

            <span>{formatBookingDate(booking.checkInDate)}</span>

            <span>→</span>

            <span>{formatBookingDate(booking.checkOutDate)}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <BedDouble className="size-3.5 text-primary" />

            <span className="max-w-40 truncate">{booking.room.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HotelImageFallback({ initial }: { initial: string }) {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden bg-linear-to-br from-accent via-accent to-primary/20">
      <div className="absolute -right-5 -top-5 size-16 rounded-full bg-primary/15" />

      <div className="absolute -bottom-6 -left-5 size-20 rounded-full bg-primary/10" />

      <div className="relative flex size-12 items-center justify-center rounded-xl bg-background/80 text-xl font-bold text-primary shadow-sm backdrop-blur-sm">
        {initial}
      </div>
    </div>
  );
}
