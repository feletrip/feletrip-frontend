"use server";

import serverFetch from "@/lib/serverFetch";

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IDailyAvailability {
  date: string;
  availableRooms: number;
  isAvailable: boolean;
}

export interface IRoomAvailabilityData {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  requestedRooms: number;
  availableRooms: number;
  isAvailable: boolean;
  dailyAvailability: IDailyAvailability[];
}

export interface ICheckAvailabilityParams {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfRooms?: number;
}

export const checkRoomAvailabilityAction = async ({
  roomId,
  checkInDate,
  checkOutDate,
  numberOfRooms,
}: ICheckAvailabilityParams): Promise<
  IApiResponse<IRoomAvailabilityData | null>
> => {
  try {
    const queryParams = new URLSearchParams({
      checkInDate,
      checkOutDate,
    });

    if (numberOfRooms !== undefined) {
      queryParams.append("numberOfRooms", numberOfRooms.toString());
    }

    const response = await serverFetch.get<IApiResponse<IRoomAvailabilityData>>(
      `/bookings/rooms/${roomId}/check-availability?${queryParams.toString()}`,
    );

    if (!response?.success) {
      return {
        success: false,
        message: response?.message || "Failed to check availability.",
        data: null,
      };
    }

    return {
      success: true,
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    console.error("Check Room Availability Error:", error);

    return {
      success: false,
      message: "Server error",
      data: null,
    };
  }
};
