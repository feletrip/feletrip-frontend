import { isAfter, isWithinInterval, startOfDay } from "date-fns";

import { Booking } from "@/types/user/booking";
import { CalendarTrip, TripCalendarStatus } from "@/types/user/trip-calendar";

function getTripCalendarStatus(
  from: Date,
  to: Date,
): TripCalendarStatus | null {
  const today = startOfDay(new Date());

  if (
    isWithinInterval(today, {
      start: from,
      end: to,
    })
  ) {
    return "current";
  }

  if (isAfter(from, today)) {
    return "upcoming";
  }

  return null;
}

export function mapBookingsToCalendarTrips(
  bookings: Booking[],
): CalendarTrip[] {
  return bookings.flatMap((booking) => {
    const from = new Date(booking.checkInDate);
    const to = new Date(booking.checkOutDate);

    const status = getTripCalendarStatus(from, to);

    // Ignore past bookings
    if (!status) {
      return [];
    }

    const coverImage =booking.hotel.hotelPhotos?.find((photo) => photo.isCover)?.photoUrl ??
      booking.hotel.hotelPhotos?.[0]?.photoUrl;

    return [
      {
        id: booking.id,
        hotelName: booking.hotel.name,

        location: [booking.hotel.address, booking.hotel.city]
          .filter(Boolean)
          .join(", "),

        image: coverImage,
        from,
        to,
        status,
      },
    ];
  });
}
