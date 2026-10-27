"use server";

import serverFetch, { IApiResponse } from "@/lib/serverFetch";

export type WithdrawalStatus = "pending" | "approved" | "rejected" | "paid";

export interface IUpdateWithdrawalStatusPayload {
  status: WithdrawalStatus;
  adminNote?: string;
}

export interface IWithdrawalStatusData {
  id: string;
  vendorId: string;
  amount: number;
  paymentMethod: string;
  accountNumber: string;
  accountName: string;
  status: WithdrawalStatus;
  adminNote?: string;
  requestedAt: string;
  processedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export const updateWithdrawalStatus = async (
  id: string,
  payload: IUpdateWithdrawalStatusPayload,
): Promise<IApiResponse<IWithdrawalStatusData> | null> => {
  try {
    const response = await serverFetch.patch<
      IApiResponse<IWithdrawalStatusData>
    >(`/vendor-withdrawal/${id}/status`, payload);

    return response;
  } catch (error) {
    console.error(`Failed to update withdrawal status for ID ${id}:`, error);
    return null;
  }
};
