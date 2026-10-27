"use server";

import serverFetch from "@/lib/serverFetch";
import { ApiResponse } from "@/types/admin/dashboard";

type BlogImage = {
  id: string;
  image: string;
};

type Blog = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  status: "published" | "pending" | "rejected";
  createdBy: string;
  vendorId: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  blogImages: BlogImage[];
};

export const getAllPendingBlogs = async (): Promise<ApiResponse<{ data: Blog[] }>> => {
  try {
    const response = await serverFetch.get(
      `/blogs/pending`,
    );
    return {
      message: "Blogs fetched successfully",
      success: true,
      data: response as { data: Blog[] },
    };
  } catch (error: any) {
    return { success: false, message: error.message, data: { data: [] } };
  }
};

export const ApproveBlog = async (id: string): Promise<ApiResponse<any>> => {
  try {
    const response = await serverFetch.patch(`/blogs/${id}/approve`);
    return {
      message: "Blog approved successfully",
      success: true,
      data: response,
    };
  } catch (error: any) {
    return { success: false, message: error.message, data: [] };
  }
};


export const RejectBlog = async (id: string): Promise<ApiResponse<any>> => {
  try {
    const response = await serverFetch.patch(`/blogs/${id}/reject`);
    return {
      message: "Blog rejected successfully",
      success: true,
      data: response,
    };
  } catch (error: any) {
    return { success: false, message: error.message, data: [] };
  }
};
