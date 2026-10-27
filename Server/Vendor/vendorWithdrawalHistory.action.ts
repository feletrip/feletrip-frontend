"use server";

import serverFetch, { IApiResponse } from "@/lib/serverFetch";

export type WithdrawalStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "completed";

export interface IWithdrawalItem {
  id: string;
  vendorId: string;
  amount: number;
  paymentMethod: string;
  accountNumber: string;
  accountName: string;
  status: WithdrawalStatus | string;
  adminNote?: string | null;
  requestedAt: string;
  processedAt?: string;
  createdAt: string;
  updatedAt: string;
  commissions?: unknown[];
}

export const getVendorWithdrawalHistory = async () => {
  try {
    const endpoint = "/vendor-withdrawal";

    const result =
      await serverFetch.get<IApiResponse<IWithdrawalItem[]>>(endpoint);

    return result;
  } catch (error) {
    console.error("Failed to fetch vendor withdrawal history:", error);
    return null;
  }
};
