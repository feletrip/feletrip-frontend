"use server";

import serverFetch, { IApiResponse } from "@/lib/serverFetch";

export interface IWithdrawalLimitAndCommission {
  id: string;
  minimumWithdrawal: string;
  commissionRate: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateWithdrawalLimitAndCommissionPayload {
  minimumWithdrawal?: number;
  commissionRate?: number;
}

export const getWithdrawalLimitAndCommission =
  async (): Promise<IApiResponse<IWithdrawalLimitAndCommission> | null> => {
    try {
      const response = await serverFetch.get<
        IApiResponse<IWithdrawalLimitAndCommission>
      >("/withdrawal-setting");

      return response;
    } catch (error) {
      console.error("Failed to fetch withdrawal limit and commission:", error);
      return null;
    }
  };

export const updateWithdrawalLimitAndCommission = async (
  payload: IUpdateWithdrawalLimitAndCommissionPayload,
): Promise<IApiResponse<IWithdrawalLimitAndCommission> | null> => {
  try {
    const response = await serverFetch.patch<
      IApiResponse<IWithdrawalLimitAndCommission>
    >("/withdrawal-setting", payload);

    return response;
  } catch (error) {
    console.error("Failed to update withdrawal limit and commission:", error);
    return null;
  }
};
