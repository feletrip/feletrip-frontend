"use server";
import serverFetch from "@/lib/serverFetch";
import { ApiResponse } from "@/types/admin/dashboard";

export const getAllusers = async (params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  rolePanel?: string;
}): Promise<ApiResponse<any>> => {
  try {
    const { page = 1, limit = 10, rolePanel = "ADMIN" } = params || {};
    const response = await serverFetch.get(
      `/users?page=${page}&limit=${limit}&rolePanel=${rolePanel}&includeDeleted=true&sortBy=rolePanel&sortOrder=desc`,
    );
    return {
      message: "Users fetched successfully",
      success: true,
      data: response,
    };
  } catch (error: any) {
    return { success: false, message: error.message, data: [] };
  }
};

export const AddUsers = async (data: {
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  roleId: string;
}): Promise<ApiResponse<any>> => {
  try {
    const response = await serverFetch.post(`/auth/admin/create-user`, data);
    return {
      message: "User added successfully",
      success: true,
      data: response,
    };
  } catch (error: any) {
    return { success: false, message: error.message, data: [] };
  }
};
export const EdituserStatus = async (id: string, data: { status: string }): Promise<ApiResponse<any>> => {
  try {
    const response = await serverFetch.patch(`/users/admin/${id}/status`, data);
    return {
      message: "User status updated successfully",
      success: true,
      data: response,
    };
  } catch (error: any) {
    return { success: false, message: error.message, data: [] };
  }
};
