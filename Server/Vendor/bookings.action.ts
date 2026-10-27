"use server";

import serverFetch from "@/lib/serverFetch";
import { BookingResponse, BookingStatus } from "@/types/vendor/bookings";

export interface GetVendorBookingsParams {
  page?: number;
  limit?: number;
  status?: BookingStatus;
  sortOrder?: "asc" | "desc";
}

export async function getVendorBookings(
  params: GetVendorBookingsParams = {},
): Promise<BookingResponse> {
  try {
    const queryParams = new URLSearchParams({
      page: String(params.page ?? 1),
      limit: String(params.limit ?? 10),
      sortOrder: params.sortOrder ?? "desc",
    });

    if (params.status) {
      queryParams.append("status", params.status);
    }

    const response = await serverFetch.get<BookingResponse>(
      `/users/vendor/bookings?${queryParams.toString()}`,
    );

    return response;
  } catch (error: unknown) {
    console.error("Failed to fetch vendor bookings:", error);

    return {
      success: false,
      message: "failed to load data",
      data: {
        meta: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
        data: [],
      },
    };
  }
}
