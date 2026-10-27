"use server";
import serverFetch from "@/lib/serverFetch";
import { ApiResponse } from "../Vendor/vendorHotel.action";

export const getAllproperties = async (params?: {
  page?: number;
  limit?: number;
}): Promise<ApiResponse<any>> => {
  try {
    const { page = 1, limit = 10 } = params || {};
    const response = await serverFetch.get(
      `/hotels/admin/all?page=${page}&limit=${limit}`,
    );
    return {
      message: "Hotels fetched successfully",
      success: true,
      data: response,
    };
  } catch (error: any) {
    return { success: false, message: error.message, data: [] };
  }
};

export const EditHotelStatus = async (
  id: string,
  data: { status: string },
): Promise<ApiResponse<any>> => {
  try {
    const response = await serverFetch.patch(`/hotels/${id}/status`, data);
    return {
      message: "Hotel status updated successfully",
      success: true,
      data: response,
    };
  } catch (error: any) {
    return { success: false, message: error.message, data: [] };
  }
};
