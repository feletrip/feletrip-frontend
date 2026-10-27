"use server";

import serverFetch, { IApiResponse } from "@/lib/serverFetch";
import {
  IAdminWithdrawalItem,
  WithdrawalStatus,
} from "@/types/admin/withdrawal";

export const getAllAdminWithdrawals = async (
  status?: WithdrawalStatus,
): Promise<IApiResponse<IAdminWithdrawalItem[]> | null> => {
  try {
    const endpoint = status
      ? `/vendor-withdrawal/admin?status=${status}`
      : "/vendor-withdrawal/admin";

    const response =
      await serverFetch.get<IApiResponse<IAdminWithdrawalItem[]>>(endpoint);

    return response;
  } catch (error) {
    console.error("Failed to fetch admin withdrawals:", error);
    return null;
  }
};
