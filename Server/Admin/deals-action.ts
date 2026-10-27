"use server";

import serverFetch from "@/lib/serverFetch";
import { ApiResponse } from "../Vendor/vendorHotel.action";

export const getAllDeals = async (params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}): Promise<ApiResponse<any>> => {
  try {
    const { page = 1, limit = 10 } = params || {};
    const response = await serverFetch.get(
      `/deals/admin/all-deals?page=${page}&limit=${limit}`,
    );
    return {
      message: "Deals fetched successfully",
      success: true,
      data: response,
    };
  } catch (error: any) {
    return { success: false, message: error.message, data: [] };
  }
};

export const updateDeal = async(
  id: string,
  data: { status?: string; isHighlighted?: boolean },
): Promise<ApiResponse<any>> => {
  try {
    const response = await serverFetch.patch(`/deals/admin/update-deal/${id}`, data);
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, message: error.message, data: null };
  }
};

export const deleteDeal = async (id: string): Promise<ApiResponse<any>> => {
  try {
    const response = await serverFetch.delete(`/deals/admin/delete-deal/${id}`);
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, message: error.message, data: null };
  }
};

