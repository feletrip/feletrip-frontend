"use server"
import serverFetch from "@/lib/serverFetch";
import { ApiResponse } from "../Vendor/vendorHotel.action";

export const getAllRoomcategories = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await serverFetch.get(`/room-categories`);
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, message: error.message, data: [] };
  }
};

export const AddRoomCetagories = async (data: { name: string; description: string}): Promise<ApiResponse<any>> => {
  try {
    const response = await serverFetch.post(`/room-categories`, data);
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, message: error.message, data: [] };
  }
}

export const UpdateRoomCetagories= async (data: { id: string; name: string; description: string }): Promise<ApiResponse<any>> => {
  try {
    const response = await serverFetch.patch(`/room-categories/${data.id}`, data);
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, message: error.message, data: [] };
  }
};

export const DeleteRoomCategory = async (id: string): Promise<ApiResponse<any>> => {
  try {
    const response = await serverFetch.delete(`/room-categories/${id}`);
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, message: error.message, data: [] };
  }
};


