"use server";

import serverFetch from "@/lib/serverFetch";
import {
  GetRoomAvailabilityParams,
  RoomApiResponse,
  RoomAvailabilityCalenderResponse,
  RoomAvailabilityDay,
  RoomAvailabilityResponse,
  ToggleRoomStatusData,
  ToggleRoomStatusResponse,
} from "@/types/vendor/room";

export async function getHotelRooms(
  hotelId: string,
  page = 1,
  limit = 10,
): Promise<RoomApiResponse> {
  try {
    const data = await serverFetch.get(
      `/rooms/${hotelId}/rooms?page=${page}&limit=${limit}`,
      {
        next: {
          revalidate: 60,
        },
      },
    );

    return data as RoomApiResponse;
  } catch (error) {
    console.error("Room fetching error", error);

    return {
      success: false,
      message: "Failed to fetch rooms",
      data: [],
    };
  }
}

export const getRoomAvailability = async (
  roomId: string,
  days: number = 30,
): Promise<RoomAvailabilityResponse> => {
  try {
    const data = await serverFetch.get(
      `/rooms/${roomId}/availability?days=${days}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      },
    );

    return data as RoomAvailabilityResponse;
  } catch (error) {
    console.error("Availability fetch error", error);

    return {
      success: false,
      message: "Failed to fetch availability",
      data: [],
    };
  }
};

export async function getRoomAvailabilityCalendar({
  hotelId,
  startDate,
  endDate,
  days,
}: GetRoomAvailabilityParams): Promise<RoomAvailabilityDay[]> {
  const params = new URLSearchParams();

  if (startDate && endDate) {
    params.set("startDate", startDate);
    params.set("endDate", endDate);
  } else if (days) {
    params.set("days", String(days));
  }

  const response = await serverFetch.get<RoomAvailabilityCalenderResponse>(
    `/rooms/${hotelId}/rooms-availability${
      params.toString() ? `?${params.toString()}` : ""
    }`,
    {
      headers: { accept: "application/json" },
      cache: "no-store",
    },
  );

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch room availability");
  }

  return response.data;
}

export async function toggleRoomAvailabilityStatus(
  roomId: string,
  date: string,
): Promise<ToggleRoomStatusData> {
  const response = await serverFetch.patch<ToggleRoomStatusResponse>(
    `/rooms/${roomId}/${date}/toggle-status`,
    {
      headers: { accept: "application/json" },
    },
  );

  if (!response.success) {
    throw new Error(response.message || "Failed to toggle room status");
  }

  return response.data;
}
