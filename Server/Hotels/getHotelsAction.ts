"use server";

import serverFetch from "@/lib/serverFetch";
import { THotel } from "@/types/hotel";

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination?: IPagination;
}

interface GetHotelsParams {
  // Nearby geofencing
  latitude?: number;
  longitude?: number;
  radius?: number;

  // Search & Basic filters
  search?: string;
  location?: string;
  propertyType?: string | string[];

  // Common pagination & Sorting
  page?: number;
  limit?: number;
  sortBy?: "price" | "rating" | "name" | "city" | "createdAt" | string;
  sortOrder?: "asc" | "desc";

  // Date & Room Availability Filters
  checkin?: string; // YYYY-MM-DD
  checkout?: string; // YYYY-MM-DD
  rooms?: number;

  // Price Range Filters
  minPrice?: number;
  maxPrice?: number;

  // Multi-select Criteria (Arrays or Strings)
  rating?: string | number[];
  bed?: string | string[];
  facilities?: string | string[];
}

export const getHotels = async ({
  latitude,
  longitude,
  radius = 10,
  search,
  location,
  propertyType,
  page = 1,
  limit = 10,
  sortBy = "rating",
  sortOrder = "desc",
  checkin,
  checkout,
  rooms,
  minPrice,
  maxPrice,
  rating,
  bed,
  facilities,
}: GetHotelsParams): Promise<IApiResponse<THotel[]>> => {
  try {
    if (latitude && longitude) {
      const response = await serverFetch.get<IApiResponse<THotel[]>>(
        `/hotels/nearby?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
      );

      return (
        response || {
          success: false,
          message: "Hotel fetch error: Empty payload received",
          data: [],
        }
      );
    }

    const params = new URLSearchParams();

    // Reusable utility to handle both arrays and primitive values cleanly
    const appendFilter = (
      key: string,
      value: string | number | string[] | number[] | undefined,
    ) => {
      if (value === undefined || value === null || value === "") return;

      if (Array.isArray(value)) {
        if (value.length === 0) return;
        params.set(key, value.join(","));
      } else {
        params.set(key, String(value));
      }
    };

    // Standard pagination and baseline rules
    params.set("page", page.toString());
    params.set("limit", limit.toString());
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);

    // Text Search fields
    if (search) params.set("search", search);
    if (location) params.set("location", location);
    appendFilter("propertyType", propertyType);

    // Date & Availability Parameters
    if (checkin) params.set("checkin", checkin);
    if (checkout) params.set("checkout", checkout);
    if (rooms !== undefined) params.set("rooms", rooms.toString());

    // Numerical Price Ranges
    if (minPrice !== undefined) params.set("minPrice", minPrice.toString());
    if (maxPrice !== undefined) params.set("maxPrice", maxPrice.toString());

    // Advanced criteria tags
    appendFilter("rating", rating);
    appendFilter("bed", bed);
    appendFilter("facilities", facilities);

    const response = await serverFetch.get<IApiResponse<THotel[]>>(
      `/hotels/all?${params.toString()}`,
    );

    if (!response) {
      return {
        success: false,
        message: "Hotel fetch error: Empty payload received",
        data: [],
      };
    }
    return response;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Failed to fetch hotels server-side:", errorMessage);
    return {
      success: false,
      message: `Failed to fetch hotels: ${errorMessage}`,
      data: [],
    };
  }
};
