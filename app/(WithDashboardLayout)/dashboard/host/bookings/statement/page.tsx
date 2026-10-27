import { reservationChart, reservations } from "@/data/statments";
import {
  getVendorBookingOverview,
  getVendorRecentBooking,
} from "@/Server/Vendor/dashboard.action";
import StatementHeader from "@/components/modules/dashboard/host/statement/StatementHeader";
import StatementStats from "@/components/modules/dashboard/host/statement/StatementStats";
import StatementAnalyticsChart from "@/components/modules/dashboard/host/statement/StatementAnalyticsChart";
import StatementTable from "@/components/modules/dashboard/host/statement/StatementTable";
import { Reservation, ReservationChartItem } from "@/components/modules/dashboard/host/statement/types";

export default async function ReservationStatementPage() {
  const [overviewRes, recentBookingsRes] = await Promise.all([
    getVendorBookingOverview(),
    getVendorRecentBooking(),
  ]);

  const bookingOverview = overviewRes?.data ?? null;
  const recentBookings = recentBookingsRes?.data ?? null;

  const typedReservations = reservations as Reservation[];
  const typedChartData = reservationChart as ReservationChartItem[];

  return (
    <div className="p-6 md:p-8 space-y-8 bg-background min-h-screen">
      <StatementHeader recentBookings={recentBookings} reservations={typedReservations} />
      <StatementStats bookingOverview={bookingOverview} reservations={typedReservations} />
      <StatementAnalyticsChart bookingOverview={bookingOverview} chartData={typedChartData} />
      <StatementTable recentBookings={recentBookings} reservations={typedReservations} />
    </div>
  );
}