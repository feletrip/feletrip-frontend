import AdminDashboard from "@/components/admin/AdminDashboard";
import {
  getAdminHotels,
  getAdminUsers,
  getBookingDetails,
  getBookingDistribution,
  getLatestReviews,
  getOccupancyAnalytics,
  getRecentActivities,
  getRevenueOverview,
} from "@/Server/Admin/dashboard.admin";
import {
  BookingDistributionItem,
  RecentActivityItem,
  StatisticItem,
} from "@/types/admin/dashboard";

export default async function Page() {
  const users = await getAdminUsers();
  const allHotels = await getAdminHotels();
  const analyticsRes = await getOccupancyAnalytics();
  const revenueRes = await getRevenueOverview();
  const reviewRes = await getLatestReviews();
  const distributionRes = await getBookingDistribution();
  const activitiesRes = await getRecentActivities();
  const bookingRes = await getBookingDetails();

  // Create a proper response fallback object to maintain type integrity
  const latestReviewsData = reviewRes || {
    success: false,
    message: "No response data available",
    data: [],
  };

  const recentActivities: RecentActivityItem[] = activitiesRes?.data || [];
  const bookingDistribution: BookingDistributionItem[] =
    distributionRes?.data || [];

  const revenueData = revenueRes?.data || {
    totalRevenue: 0,
    monthlyRevenue: 0,
    revenueGrowth: 0,
    averageBookingValue: 0,
    revenueChart: [],
  };

  const analyticsData = analyticsRes?.data || {
    totalRooms: 0,
    occupiedRooms: 0,
    availableRooms: 0,
    occupancyRate: 0,
    occupancyChart: [],
  };

  const bookingDetails = bookingRes?.data?.data || undefined;
  const bookingMetaData = bookingRes?.data?.meta || undefined;

  const statisticsData: StatisticItem[] = [
    {
      title: "Total Bookings",
      value: distributionRes?.data[0]?.count || 0,
      icon: "bookings",
      // trend: hotelBooking?.data[0]?.percentage,
    },
    {
      title: "Total Users",
      value: users?.data?.users || 0,
      icon: "users",
      // trend: overviewData.checkInGrowth,
    },
    {
      title: "Total Properties",
      value: allHotels?.data?.hotels || 0,
      icon: "hotels",
      // trend: overviewData.checkOutGrowth,
    },
    {
      title: "Revenue",
      value: revenueRes?.data?.totalRevenue,
      icon: "revenue",
      // trend: overviewData.revenueGrowth,
    },
  ];

  return (
    <AdminDashboard
      statisticsData={statisticsData}
      analyticsData={analyticsData}
      revenueData={revenueData}
      latestReviews={latestReviewsData}
      bookingDistribution={bookingDistribution}
      recentActivities={recentActivities}
      bookingDetails={bookingDetails}
      bookingMetaData={bookingMetaData}
    />
  );
}
