"use server";
import serverFetch from "@/lib/serverFetch";
import { ApiResponse } from "@/types/admin/dashboard";

export const getAllusersVendor = async (params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}): Promise<ApiResponse<any>> => {
  try {
    const { page = 1, limit = 10 } = params || {};
    const response: any = await serverFetch.get(
      `/role/vendor/users?page=${page}&limit=${limit}&sortBy=createdAt&sortOrder=desc`,
    );
    if (!response || !response.success) {
      return {
        success: false,
        message: response?.message || "Failed to fetch users",
        data: null,
      };
    }
    return {
      message: response.message || "Users fetched successfully",
      success: true,
      data: response.data || response,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "An unexpected error occurred",
      data: null,
    };
  }
};

export const AddUsersVendor = async (data: {
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  roleId: string;
  hotelId: string;
}): Promise<ApiResponse<any>> => {
  try {
    const response: any = await serverFetch.post(`/auth/vendor/create-user`, data);
    if (!response || !response.success) {
      return {
        success: false,
        message: response?.message || "Failed to add user",
        data: null,
      };
    }
    return {
      message: response.message || "User added successfully",
      success: true,
      data: response.data || response,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "An unexpected error occurred",
      data: null,
    };
  }
};

export const EdituserStatusVendor = async (
  id: string,
  data: { status: string },
): Promise<ApiResponse<any>> => {
  try {
    const response: any = await serverFetch.patch(
      `/role/vendor/users/${id}/status`,
      data,
    );
    if (!response || !response.success) {
      return {
        success: false,
        message: response?.message || "Failed to update user status",
        data: null,
      };
    }
    return {
      message: response.message || "User status updated successfully",
      success: true,
      data: response.data || response,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "An unexpected error occurred",
      data: null,
    };
  }
};

export const gethotelsundervendor = async (): Promise<ApiResponse<any>> => {
  try {
    const response: any = await serverFetch.get(
      `/vendor/hotels?page=1&limit=1000&sortBy=createdAt&sortOrder=desc`,
    );
    if (!response || !response.success) {
      return {
        success: false,
        message: response?.message || "Failed to fetch hotels",
        data: null,
      };
    }
    return {
      success: true,
      message: response.message || "Hotels fetched successfully",
      data: response.data || response,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "An unexpected error occurred",
      data: null,
    };
  }
};

