"use server";

import serverFetch from "@/lib/serverFetch";

export interface IPaymentInitiateData {
  gatewayPageURL: string;
}

export interface IApiResponse<T = IPaymentInitiateData> {
  success: boolean;
  message: string;
  data?: T | null;
}

export const initiatePaymentAction = async (
  bookingId: string,
): Promise<IApiResponse<IPaymentInitiateData>> => {
  try {
    const res = await serverFetch.post<IApiResponse<IPaymentInitiateData>>(
      "/payments/initiate",
      { bookingId },
    );

    return {
      success: res?.success ?? false,
      message: res?.message || "Failed to initiate payment session.",
      data: res?.data ?? null,
    };
  } catch (error) {
    const err = error as {
      response?: { data?: IApiResponse<IPaymentInitiateData> };
      message?: string;
    };
    const apiError = err?.response?.data;

    return {
      success: false,
      message:
        apiError?.message || err?.message || "An unexpected error occurred.",
      data: null,
    };
  }
};
