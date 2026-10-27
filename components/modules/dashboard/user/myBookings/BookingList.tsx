import type { Booking } from "@/types/user/booking";

import { BookingCard } from "./BookingCard";
import { BookingEmptyState } from "./BookingEmptyState";

type BookingListProps = {
  bookings: Booking[];
};

export function BookingList({ bookings }: BookingListProps) {
  if (bookings.length === 0) {
    return <BookingEmptyState />;
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
      ))} 
    </div>
  );
}
