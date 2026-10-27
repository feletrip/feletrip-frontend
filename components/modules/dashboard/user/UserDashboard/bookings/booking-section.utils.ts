import type { Booking } from "@/types/user/booking";

export function getUpcomingBookings(bookings: Booking[], limit = 5): Booking[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return bookings
    .filter(
      (booking) =>
        booking.status === "pending" || booking.status === "confirmed",
    )
    .filter(
      (booking) => new Date(booking.checkInDate).getTime() >= today.getTime(),
    )
    .sort(
      (a, b) =>
        new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime(),
    )
    .slice(0, limit);
}

export function getHotelCoverImage(booking: Booking): string | null {
  return (
    booking.hotel.hotelPhotos?.find(
      (photo) => Boolean(photo.photoUrl),
    )?.photoUrl ?? null
  );
}

export function getHotelInitial(hotelName: string): string {
  return hotelName.trim().charAt(0).toUpperCase() || "H";
}
