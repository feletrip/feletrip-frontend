"use server";

import serverFetch from "@/lib/serverFetch";
import { AboutResponse } from "@/types/about";

export async function getAboutDetails(): Promise<AboutResponse | null> {
  try {
    const data = await serverFetch.get("/public/about", {
      next: {
        revalidate: 60,
      },
    });

    return data as AboutResponse;
  } catch (error) {
    console.error("Vendor hotels fetch error:", error);

    return null;
  }
}
