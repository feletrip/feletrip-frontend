import serverFetch from "@/lib/serverFetch";
import {
  AdminHotel,
  AdminUsers,
  AnalyticsDataPayload,
  ApiResponse,
  BookingApiResponse,
  BookingDistributionItem,
  RecentActivityItem,
  RevenueOverviewData,
  ReviewItem,
} from "@/types/admin/dashboard";

//get total users
export async function getAdminUsers(): Promise<ApiResponse<AdminUsers> | null> {
  try {
    const data = await serverFetch.get("/dashboard/admin/user-stats", {
      next: {
        revalidate: 60,
      },
    });
    return data as ApiResponse<AdminUsers>;
  } catch {
    return null;
  }
}

//get total hotel
export async function getAdminHotels(): Promise<ApiResponse<AdminHotel> | null> {
  try {
    const data = await serverFetch.get("/dashboard/admin/hotel-stats", {
      next: {
        revalidate: 60,
      },
    });
    return data as ApiResponse<AdminHotel>;
  } catch{
    return null;
  }
}

// Fetches the room occupancy charts timeline data.
export async function getOccupancyAnalytics(): Promise<ApiResponse<AnalyticsDataPayload> | null> {
  try {
    const data = await serverFetch.get("/dashboard/admin/occupancy-analytics", {
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    });

    // Cast the returned data to our explicit type
    return data as ApiResponse<AnalyticsDataPayload>;
  } catch (error) {
    console.error("Error fetching occupancy analytics:", error);
    return null;
  }
}

export async function getRevenueOverview(): Promise<ApiResponse<RevenueOverviewData> | null> {
  try {
    const data = await serverFetch.get("/dashboard/admin/revenue-overview", {
      next: {
        revalidate: 0,
      },
    });

    return data as ApiResponse<RevenueOverviewData>;
  } catch (error) {
    console.error("Error fetching revenue overview:", error);
    return null;
  }
}

// Fetches the latest customer reviews and ratings.
export async function getLatestReviews(): Promise<ApiResponse<
  ReviewItem[]
> | null> {
  try {
    const data = await serverFetch.get("/dashboard/admin/latest-reviews", {
      next: {
        revalidate: 60,
      },
    });

    return data as ApiResponse<ReviewItem[]>;
  } catch (error) {
    console.error("Error fetching latest reviews:", error);
    return null;
  }
}

// Fetches the categorical distribution of bookings by status.
export async function getBookingDistribution(): Promise<ApiResponse<
  BookingDistributionItem[]
> | null> {
  try {
    const data = await serverFetch.get(
      "/dashboard/admin/booking-distribution",
      {
        next: {
          revalidate: 60,
        },
      },
    );

    return data as ApiResponse<BookingDistributionItem[]>;
  } catch (error) {
    console.error("Error fetching booking distribution:", error);
    return null;
  }
}

//booking details
export async function getBookingDetails(): Promise<BookingApiResponse | null> {
  try {
    const data = await serverFetch.get("/users/admin/bookings", {
      next: {
        revalidate: 60,
      },
    });
    return data as BookingApiResponse;
  } catch{
    return null;
  }
}

// Fetches the recent platform and administrative actions log.
export async function getRecentActivities(): Promise<ApiResponse<
  RecentActivityItem[]
> | null> {
  try {
    const data = await serverFetch.get("/dashboard/admin/recent-activities", {
      next: {
        revalidate: 60,
      },
    });

    return data as ApiResponse<RecentActivityItem[]>;
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    return null;
  }
}
