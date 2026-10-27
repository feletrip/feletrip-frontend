"use server";

import serverFetch from "@/lib/serverFetch";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactData extends ContactPayload {
  id: string;
}

export const createContactAction = async (
  payload: ContactPayload
): Promise<ApiResponse<ContactData | null>> => {
  try {
    const response = await serverFetch.post<ApiResponse<ContactData>>(
      "/contact",
      payload
    );

    if (!response) {
      return {
        success: false,
        message: "No response received from the server.",
        data: null,
      };
    }

    return response;
  } catch (error) {
    console.error("Create Contact Action Error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to submit contact message.",
      data: null,
    };
  }
};