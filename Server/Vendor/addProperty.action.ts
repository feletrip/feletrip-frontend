"use server";

import { cookies } from "next/headers";
import serverFetch from "@/lib/serverFetch";
import { revalidatePath, updateTag } from "next/cache";

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const getVendorAuthToken = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies();
    return cookieStore.get("accessToken")?.value || null;
  } catch {
    return null;
  }
};

export const revalidatePropertiesAction = async (): Promise<void> => {
  try {
    try {
      updateTag("vendor-hotels");
    } catch {}
    revalidatePath("/dashboard/host/properties");
    revalidatePath("/dashboard/host/properties/rooms");
    revalidatePath("/hotels");
  } catch (error) {
    console.error("Failed to revalidate properties cache:", error);
  }
};

export const addPropertyAction = async (
  formData: FormData,
): Promise<IApiResponse<null>> => {
  try {
    const result: IApiResponse<null> = await serverFetch.post(
      "/hotels",
      formData,
    );

    if (!result.success) {
      return {
        success: false,
        message:
          result.message ||
          "Failed to create the property. Please try again later.",
        data: null,
      };
    }

    // Invalidate old cache tags and route caches on-demand
    updateTag("vendor-hotels");
    revalidatePath("/dashboard/host/properties");
    revalidatePath("/dashboard/host/properties/rooms");

    return {
      success: true,
      message: result.message || "Property has been created successfully.",
      data: result.data,
    };
  } catch (error) {
    console.error("Failed to add property:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again later.",
      data: null,
    };
  }
};
