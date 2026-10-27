"use server";

import serverFetch from "@/lib/serverFetch";
import { BookingDetails } from "@/types/booking";

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ICreateBooking {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfRooms: number;
  guestCount: number;
  promoCode?: string;
}

export const createBookingAction = async (
  data: ICreateBooking,
): Promise<IApiResponse<BookingDetails | null>> => {
  try {
    const response = await serverFetch.post<IApiResponse<BookingDetails>>(
      "/bookings",
      data,
    );

    if (!response?.success) {
      return {
        success: false,
        message: response?.message || "Booking failed.",
        data: null,
      };
    }

    return {
      success: true,
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    console.error("Create Booking Error:", error);

    return {
      success: false,
      message: "Server error",
      data: null,
    };
  }
};
