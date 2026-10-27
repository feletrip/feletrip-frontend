"use server";

import serverFetch from "@/lib/serverFetch";

export interface IValidationError {
  code: string;
  message: string;
  path: (string | number)[];
}

export interface IApiResponse {
  success: boolean;
  message: string;
  data?: null;
  retryAfter?: number;
  errors?: IValidationError[];
}

export interface IContact {
  name: string;
  email: string;
  subject?: string;
  message: string;
  website?: string;
}

export const createContactAction = async (
  data: IContact,
): Promise<IApiResponse> => {
  try {
    const res = await serverFetch.post<IApiResponse>("/contact", data);

    return {
      success: res?.success ?? false,
      message: res?.message || "Something went wrong.",
      data: null,
      errors: res?.errors,
      retryAfter: res?.retryAfter,
    };
  } catch (error) {
    const err = error as {
      response?: { data?: IApiResponse };
      message?: string;
    };
    const apiError = err?.response?.data;

    return {
      success: false,
      message: apiError?.message || err?.message || "Internal server error.",
      data: null,
      errors: apiError?.errors,
      retryAfter: apiError?.retryAfter,
    };
  }
};
