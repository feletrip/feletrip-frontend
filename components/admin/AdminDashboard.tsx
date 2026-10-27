import OccupancyChart from "@/components/modules/dashboard/admin/OccupancyChart";
import BookingByPlatform from "@/components/modules/dashboard/admin/BookingByPlatform";
import RevenueOverviewCard from "@/components/modules/dashboard/admin/RevenueOverviewCard";
import { RecentActivity } from "@/components/modules/dashboard/admin/RecentActivity";
import { LatestReviews } from "@/components/modules/dashboard/admin/LatestReviews";
import { type AdminDashboardProps } from "@/types/admin/dashboard";
import AdminState from "./AdminState";
import AllBookingList from "@/components/modules/dashboard/admin/allBookingList";

export default function AdminDashboard({
  statisticsData,
  analyticsData,
  revenueData,
  latestReviews,
  bookingDistribution,
  recentActivities,
  bookingDetails,
  bookingMetaData,
}: AdminDashboardProps) {
  return (
    <>
      <AdminState statisticsData={statisticsData}></AdminState>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2 space-y-4">
          <OccupancyChart analyticsData={analyticsData} />
          <AllBookingList
            bookingDetails={bookingDetails}
            bookingMetaData={bookingMetaData}
          />
        </div>
        <div className="space-y-4 md:col-span-2 lg:col-span-1">
          <RevenueOverviewCard revenueData={revenueData} />
          <BookingByPlatform distributionData={bookingDistribution} />
          <RecentActivity activities={recentActivities} />
          <LatestReviews reviewsResponse={latestReviews} />
        </div>
      </div>
    </>
  );
}
