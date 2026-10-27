"use server";
import serverFetch from "@/lib/serverFetch";

export const getAllreviews = async (params?: {
  page?: number;
  limit?: number;
}): Promise<any> => {
  try {
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const response = await serverFetch.get(`/reviews/all?page=${page}&limit=${limit}`);
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, message: error.message, data: [] };
  }
};

export const deleteReview = async (id: string): Promise<any> => {
  try {
    const response = await serverFetch.delete(`/reviews/${id}`);
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
