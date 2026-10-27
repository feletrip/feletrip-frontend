"use server";

import serverFetch from "@/lib/serverFetch";
import { THotelDetails } from "@/types/hotel";

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const getHotel = async (id: string) => {
  try {
    const res = await serverFetch.get<IApiResponse<THotelDetails>>(`/hotels/${id}`);

    return res.data;
  } catch (error) {
    console.error("Failed to fetch hotel:", error);
    return null;
  }
};
