import { notFound } from "next/navigation";

import { BookingDetails } from "@/components/modules/dashboard/user/myBookings/BookingDetails";
import { getMyBookings } from "@/Server/User/user.bookingManagement";

type BookingDetailsPageProps = {
  params: Promise<{ bookingId: string }>;
};

export default async function BookingDetailsPage({ params }: BookingDetailsPageProps) {
  const { bookingId } = await params;
  const response = await getMyBookings();
  const booking = response?.data?.data.find((item) => item.id === bookingId);

  if (!booking) {
    notFound();
  }

  return <BookingDetails booking={booking} />;
}
