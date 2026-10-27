"use server";

import serverFetch, { IApiResponse } from "@/lib/serverFetch";

interface IWishlistStatus {
  isWishlisted: boolean;
}

// add to wishlist
export const addHotelToWishlistAction = async (
  hotelId: string,
): Promise<IApiResponse<null>> => {
  try {
    const response = await serverFetch.post<IApiResponse<null>>(
      `/hotel-wishlist/${hotelId}`,
    );

    return response;
  } catch (error) {
    console.error("Add Hotel Wishlist Error:", error);

    return {
      success: false,
      message: "Server error",
      data: null,
    };
  }
};

// check wishlist
export const getHotelWishlistStatusAction = async (
  hotelId: string,
): Promise<IApiResponse<IWishlistStatus | null>> => {
  try {
    const response = await serverFetch.get<IApiResponse<IWishlistStatus>>(
      `/hotel-wishlist/${hotelId}`,
    );

    return response;
  } catch (error) {
    console.error("Check Hotel Wishlist Error:", error);

    return {
      success: false,
      message: "Server error",
      data: null,
    };
  }
};

// remove wishlist
export const removeHotelWishlistAction = async (
  hotelId: string,
): Promise<IApiResponse<IWishlistStatus | null>> => {
  try {
    const response = await serverFetch.delete<IApiResponse<IWishlistStatus>>(
      `/hotel-wishlist/${hotelId}`,
    );

    return response;
  } catch (error) {
    console.error("Delete Hotel Wishlist Error:", error);

    return {
      success: false,
      message: "Server error",
      data: null,
    };
  }
};
