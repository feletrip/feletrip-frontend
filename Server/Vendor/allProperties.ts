"use server";

import serverFetch from "@/lib/serverFetch";
import { THotel } from "@/types/hotel";

export async function getHotels(search?: string): Promise<{ data: THotel[] }> {
  try {
    const data = await serverFetch.get<{ data: THotel[] }>(
      `/hotels/all?search=${encodeURIComponent(search ?? "")}`
    );
    return data;
  } catch {
    return { data: [] };
  }
}

export async function updateInfo(
  payload: Partial<THotel>,
  id: number
  // selectedFacilities: string[]
): Promise<{ success: boolean; message: string } | undefined> {
  try {
    const res = (await serverFetch.patch(`/hotels/${id}`, payload)) as {
      success: boolean;
      message: string;
    };
    return res;
  } catch {
  }
}
