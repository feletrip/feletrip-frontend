"use server";

import serverFetch from "@/lib/serverFetch";
import {
  VendorApiResponse,
  VendorBookingOverview,
  VendorBookingTrend,
  VendorGuestOverview,
  VendorLatestReview,
  VendorOverview,
  VendorRecentActivities,
  VendorRecentBooking,
  VendorRevenueAnalytics,
  VendorRevenueOverview,
  VendorRoomOverview,
} from "@/types/vendor/dashboard";

const REVALIDATE_TIME = 60;

export async function getVendorOverview(): Promise<VendorApiResponse<VendorOverview> | null> {
  try {
    const data = await serverFetch.get("/dashboard/vendor/overview", {
      next: {
        revalidate: REVALIDATE_TIME,
      },
    });

    return data as VendorApiResponse<VendorOverview>;
  } catch (error) {
    console.error("Error fetching vendor overview", error);
    return null;
  }
}

export async function getRevenueOverview(): Promise<VendorApiResponse<VendorRevenueOverview> | null> {
  try {
    const data = await serverFetch.get("/dashboard/vendor/revenue-overview", {
      next: {
        revalidate: REVALIDATE_TIME,
      },
    });

    return data as VendorApiResponse<VendorRevenueOverview>;
  } catch (error) {
    console.error("Error fetching vendor overview", error);
    return null;
  }
}

export async function getVendorRevenueAnalytics(): Promise<VendorApiResponse<
  VendorRevenueAnalytics[]
> | null> {
  try {
    const data = await serverFetch.get("/dashboard/vendor/revenue-analytics", {
      next: {
        revalidate: REVALIDATE_TIME,
      },
    });

    return data as VendorApiResponse<VendorRevenueAnalytics[]>;
  } catch (error) {
    console.error("Error fetching vendor overview", error);
    return null;
  }
}

export async function getVendorBookingOverview(): Promise<VendorApiResponse<VendorBookingOverview> | null> {
  try {
    const data = await serverFetch.get("/dashboard/vendor/booking-overview", {
      next: {
        revalidate: REVALIDATE_TIME,
      },
    });

    return data as VendorApiResponse<VendorBookingOverview>;
  } catch (error) {
    console.error("Error fetching vendor overview", error);
    return null;
  }
}

export async function getVendorBookingTrend(): Promise<VendorApiResponse<
  VendorBookingTrend[]
> | null> {
  try {
    const data = await serverFetch.get("/dashboard/vendor/booking-trends", {
      next: {
        revalidate: REVALIDATE_TIME,
      },
    });

    return data as VendorApiResponse<VendorBookingTrend[]>;
  } catch (error) {
    console.error("Error fetching vendor overview", error);
    return null;
  }
}

export async function getVendorRoomOverview(): Promise<VendorApiResponse<VendorRoomOverview> | null> {
  try {
    const data = await serverFetch.get("/dashboard/vendor/room-overview", {
      next: {
        revalidate: REVALIDATE_TIME,
      },
    });

    return data as VendorApiResponse<VendorRoomOverview>;
  } catch (error) {
    console.error("Error fetching vendor overview", error);
    return null;
  }
}

export async function getVendorGuestOverview(): Promise<VendorApiResponse<VendorGuestOverview> | null> {
  try {
    const data = await serverFetch.get("/dashboard/vendor/guest-overview", {
      next: {
        revalidate: REVALIDATE_TIME,
      },
    });

    return data as VendorApiResponse<VendorGuestOverview>;
  } catch (error) {
    console.error("Error fetching vendor overview", error);
    return null;
  }
}

export async function getVendorLatestReview(): Promise<VendorApiResponse<
  VendorLatestReview[]
> | null> {
  try {
    const data = await serverFetch.get("/dashboard/vendor/latest-reviews", {
      next: {
        revalidate: REVALIDATE_TIME,
      },
    });

    return data as VendorApiResponse<VendorLatestReview[]>;
  } catch (error) {
    console.error("Error fetching vendor overview", error);
    return null;
  }
}

export async function getVendorRecentBooking(): Promise<VendorApiResponse<
  VendorRecentBooking[]
> | null> {
  try {
    const data = await serverFetch.get("/dashboard/vendor/recent-bookings", {
      next: {
        revalidate: REVALIDATE_TIME,
      },
    });

    return data as VendorApiResponse<VendorRecentBooking[]>;
  } catch (error) {
    console.error("Error fetching vendor overview", error);
    return null;
  }
}

export async function getVendorRecentActivities(): Promise<VendorApiResponse<
  VendorRecentActivities[]
> | null> {
  try {
    const data = await serverFetch.get("/dashboard/vendor/recent-activities", {
      next: {
        revalidate: REVALIDATE_TIME,
      },
    });
    return data as VendorApiResponse<VendorRecentActivities[]>;
  } catch (error) {
    console.error("Error fetching vendor overview", error);
    return null;
  }
}
