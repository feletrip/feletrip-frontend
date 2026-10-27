"use server";

import serverFetch, { IApiResponse } from "@/lib/serverFetch";

export type ITotalEarnings = string;

export interface IVendorWallet {
  id: string;
  vendorId: string;
  totalEarning?: string;
  availableBalance: string;
  blockedBalance: string;
  totalWithdrawn?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IVendorWalletData {
  totalEarnings: number;
  availableBalance: number;
  blockedBalance: number;
  totalWithdrawn: number;
  walletId: string | null;
  vendorId: string | null;
}

export const getVendorWalletData =
  async (): Promise<IApiResponse<IVendorWalletData> | null> => {
    try {
      const [earningsRes, walletRes] = await Promise.allSettled([
        serverFetch.get<IApiResponse<ITotalEarnings>>(
          "/vendor-withdrawal/total-earning",
        ),
        serverFetch.get<IApiResponse<IVendorWallet>>(
          "/vendor-withdrawal/wallet",
        ),
      ]);

      const earningsData =
        earningsRes.status === "fulfilled" && earningsRes.value?.success
          ? earningsRes.value.data
          : null;

      const walletData =
        walletRes.status === "fulfilled" && walletRes.value?.success
          ? walletRes.value.data
          : null;

      if (earningsRes.status === "rejected") {
        console.error("Failed to fetch total earnings:", earningsRes.reason);
      }
      if (walletRes.status === "rejected") {
        console.error("Failed to fetch wallet data:", walletRes.reason);
      }

      const parsedEarnings = earningsData ? Number(earningsData) : 0;

      const availableBalance = Number(walletData?.availableBalance ?? 0);
      const blockedBalance = Number(walletData?.blockedBalance ?? 0);
      const totalWithdrawn = Number(walletData?.totalWithdrawn ?? 0);

      return {
        success: true,
        message: "Vendor balance retrieved successfully",
        data: {
          totalEarnings: Number.isNaN(parsedEarnings) ? 0 : parsedEarnings,
          availableBalance: Number.isNaN(availableBalance)
            ? 0
            : availableBalance,
          blockedBalance: Number.isNaN(blockedBalance) ? 0 : blockedBalance,
          totalWithdrawn: Number.isNaN(totalWithdrawn) ? 0 : totalWithdrawn,
          walletId: walletData?.id ?? null,
          vendorId: walletData?.vendorId ?? null,
        },
      };
    } catch (error) {
      console.error("Failed to fetch vendor balance data:", error);
      return null;
    }
  };
