"use server";
import { cookies } from "next/headers";

interface ProfileUpdateInput {
  businessName?: string;
}

// user profile dashboard action
export async function getVendorProfileAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) {
      return {
        success: false,
        message: "Unauthorized: No token found",
      };
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vendor/profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch vendor profile",
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch {
    return {
      success: false,
      message: "Server error while fetching profile",
    };
  }
}

// update profile information
export async function updateVendorProfileAction(data: ProfileUpdateInput) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, message: "Unauthorized: No token found" };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vendor/profile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to update profile",
      };
    }

    return { success: true, data: result.data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("UPDATE PROFILE ERROR:", error.message);
    }
    return { success: false, message: "Server error while updating profile" };
  }
}
