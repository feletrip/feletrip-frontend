"use server";

import serverFetch from "@/lib/serverFetch";
import { IAdvertisement, IApiResponse } from "@/types/advertisements";

// get advertisements public
export const getAdvertisements = async () => {
  try {
    const result =
      await serverFetch.get<IApiResponse<IAdvertisement[]>>("/advertisement");

    return result;
  } catch (error) {
    console.error("Failed to fetch advertisements:", error);
    return null;
  }
};
