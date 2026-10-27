"use server";

import serverFetch from "@/lib/serverFetch";
import { CategoryApiResponse, RoomCategory } from "@/types/vendor/availability";

export async function getVendorRoomCategory(): Promise<CategoryApiResponse<RoomCategory> | null> {
  try {
    const data = await serverFetch.get("/room-categories", {
      next: {
        revalidate: 60,
      },
    });
    return data as CategoryApiResponse<RoomCategory>;
  } catch{
    return null;
  }
}
