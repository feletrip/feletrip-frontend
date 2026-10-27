"use server";
import serverFetch from "@/lib/serverFetch";
import { BookingApiResponse } from "@/types/user/booking";

export const getMyBookings = async (): Promise<BookingApiResponse | null> => {
  try {
    const response = await serverFetch.get<BookingApiResponse>("/users/my-bookings");

    return response;
  } catch (error) {
    console.error("Failed to fetch user bookings:", error);

    return null;
  }
};
