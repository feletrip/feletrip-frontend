"use server";

import serverFetch, { IApiResponse } from "@/lib/serverFetch";
import { revalidatePath } from "next/cache";

export interface ICreateWithdrawalPayload {
  amount: number;
  paymentMethod: string;
  accountNumber: string;
  accountName: string;
}

export interface IWithdrawalItem {
  id: string;
  vendorId: string;
  amount: number;
  paymentMethod: string;
  accountNumber: string;
  accountName: string;
  status: "pending" | "approved" | "completed" | "rejected";
  adminNote?: string;
  requestedAt: string;
  processedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export const createWithdrawalRequest = async (
  payload: ICreateWithdrawalPayload,
): Promise<IApiResponse<IWithdrawalItem> | null> => {
  const { amount, paymentMethod, accountNumber, accountName } = payload;

  try {
    const response = await serverFetch.post<IApiResponse<IWithdrawalItem>>(
      "/vendor-withdrawal",
      {
        amount,
        paymentMethod: paymentMethod.trim(),
        accountNumber: accountNumber.trim(),
        accountName: accountName.trim(),
      },
    );

    if (response?.success) {
      revalidatePath("/dashboard/host/transections");
    }

    return response;
  } catch (error) {
    console.error("Failed to create withdrawal request:", error);
    return null;
  }
};
