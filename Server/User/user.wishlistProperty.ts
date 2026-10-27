"use server";
import serverFetch from "@/lib/serverFetch";
import { WishlistApiResponse } from "@/types/user/wishlist";

export const getWishlistProperties = async (): Promise<WishlistApiResponse | null> => {
  try {
    const response =
      await serverFetch.get<WishlistApiResponse>("/hotel-wishlist");

    return response;
  } catch (error) {
    console.error("Failed to fetch user wishlist:", error);

    return null;
  }
};
