"use server";

export interface THotelSearch {
  hotelName?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: string;
  children?: string;
  totalGuests?: string;
  rooms?: string;
  resultCount?: number;
}

export async function HotelSearchAction(data: THotelSearch) {
  try {
    return {
      success: true,
      loggedAt: new Date().toISOString(),
      payload: data,
    };
  } catch (error) {
    console.error("[HotelSearchAction] Error logging search:", error);
    return {
      success: false,
      message: "Failed to log hotel search",
    };
  }
}
