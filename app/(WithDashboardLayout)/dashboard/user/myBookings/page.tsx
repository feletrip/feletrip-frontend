import { MyBookingsClient } from "@/components/modules/dashboard/user/myBookings/MyBookingsClient";
import { MyBookingsHero } from "@/components/modules/dashboard/user/myBookings/MyBookingsHero";
import { getMyBookings } from "@/Server/User/user.bookingManagement";
import { filterBookingsByCategory } from "@/lib/booking-utils";

export default async function MyBookingsPage() {
  const response = await getMyBookings();

  const bookings = response?.data?.data ?? [];

  const activeCount = filterBookingsByCategory(bookings, "active").length;

  const completedCount = filterBookingsByCategory(bookings, "completed").length;

  const cancelledCount = filterBookingsByCategory(bookings, "cancelled").length;

  return (
    <div className="mx-auto w-full space-y-7 px-4 py-6 sm:px-6 lg:px-8">
      <MyBookingsHero
        activeCount={activeCount}
        completedCount={completedCount}
        cancelledCount={cancelledCount}
      />

      <MyBookingsClient initialBookings={bookings} />
    </div>
  );
}
