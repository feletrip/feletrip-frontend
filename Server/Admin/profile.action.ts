"use server";
import { cookies } from "next/headers";

// Admin/User Profile Fetch Action
export async function getAdminProfileAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) {
      return { success: false, message: "Unauthorized: No token found" };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch admin profile",
      };
    }

    return { success: true, data: result.data };
  } catch{
    return { success: false, message: "Server error while fetching profile" };
  }
}

// Admin Profile Update Action
export async function updateAdminProfileAction(
  formData: FormData,
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, message: "Unauthorized: No token found" };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
      method: "PATCH",
      headers: {
        
        Authorization: `Bearer ${token}`,
      },
      body: formData, 
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to update admin profile",
      };
    }

    return { success: true, data: result.data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("UPDATE ADMIN PROFILE ERROR:", error.message);
    }
    return { success: false, message: "Server error while updating profile" };
  }
}
