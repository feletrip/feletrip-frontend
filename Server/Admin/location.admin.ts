"use server";

import serverFetch from "@/lib/serverFetch";
import { ApiResponse } from "@/types/admin/dashboard";




export const getAdminLocations = async (params?: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  isActive?: boolean;
}): Promise<ApiResponse<any>> => {
  try {
    const { page = 1, limit = 10, searchTerm, isActive } = params || {};
    const query = new URLSearchParams();

    query.append("page", String(page));
    query.append("limit", String(limit));
    if (searchTerm) query.append("searchTerm", searchTerm);
    if (typeof isActive === "boolean") query.append("isActive", String(isActive));

    const response = await serverFetch.get(`/admin/locations?${query.toString()}`);

    return {
      message: "Locations fetched successfully",
      success: true,
      data: response,
    };
  } catch (error: any) {
    return { success: false, message: error.message, data: [] };
  }
};

export const createAdminLocation = async (formData: FormData): Promise<ApiResponse<any>> => {
  try {
    const response = await serverFetch.post(`/admin/locations`, formData);
    return {
      message: "Location created successfully",
      success: true,
      data: response,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create location",
      data: null,
    };
  }
};

export const updateAdminLocation = async (
  id: string,
  formData: FormData,
): Promise<ApiResponse<any>> => {
  try {
    const response = await serverFetch.patch(`/admin/locations/${id}`, formData);
    return {
      message: "Location updated successfully",
      success: true,
      data: response,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to update location",
      data: null,
    };
  }
};

export const toggleAdminLocationStatus = async (id: string): Promise<ApiResponse<any>> => {
  try {
    const response = await serverFetch.patch(`/admin/locations/${id}/toggle-status`);
    return {
      message: "Location status updated successfully",
      success: true,
      data: response,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to toggle location status",
      data: null,
    };
  }
};

export const deleteAdminLocation = async (id: string): Promise<ApiResponse<any>> => {
  try {
    const response = await serverFetch.delete(`/admin/locations/${id}`);
    return {
      message: "Location deleted successfully",
      success: true,
      data: response,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to delete location",
      data: null,
    };
  }
};

