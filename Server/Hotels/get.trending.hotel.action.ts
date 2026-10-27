"use server";
import serverFetch from "@/lib/serverFetch";
import { THotel } from "@/types/hotel";

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const getTopHotels = async () => {
  try {
    const result =
      await serverFetch.get<IApiResponse<THotel[]>>("/hotels/top-hotels");

    return result;
  } catch (error) {
    console.error("Failed to fetch trending hotels:", error);
    return null;
  }
};
