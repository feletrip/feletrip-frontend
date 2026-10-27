"use server";

import serverFetch from "@/lib/serverFetch";
import {
  BlogDetailsResponse,
  DeleteApiResponse,
  MyBlogResponse,
} from "@/types/vendor/blog";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface GetMyBlogsParams {
  page?: number;
  limit?: number;
  sortOrder?: "asc" | "desc";
}

export const createVendorBlog = async (formData: FormData) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized: Missing access token",
      };
    }

    const response = await fetch(`${API_URL}/blogs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
      next: {
        revalidate: 60,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Blog creation failed",
      };
    }

    return {
      success: true,
      message: "Blog created successfully",
      data: result.data,
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : "Something went wrong";
    return {
      success: false,
      message,
    };
  }
};

export async function getVendorBlogs(
  params: GetMyBlogsParams = {},
): Promise<MyBlogResponse> {
  try {
    const queryParams = new URLSearchParams({
      page: String(params.page ?? 1),
      limit: String(params.limit ?? 10),
      sortBy: "createdAt",
      sortOrder: params.sortOrder ?? "desc",
    });

    const response = await serverFetch.get<MyBlogResponse>(
      `/blogs/my-blogs?${queryParams.toString()}`,
    );

    return response;
  } catch (error: unknown) {
    console.error("Failed to fetch vendor blogs:", error);

    return {
      success: false,
      message: "failed to load data",
      data: {
        statusCode: 500,
        message: "Failed to fetch blogs",
        meta: {
          page: params.page ?? 1,
          limit: params.limit ?? 10,
          total: 0,
          totalPage: 0,
        },
        data: [],
      },
    };
  }
}

export const getBlogDetailsBySlug = async (
  slug: string,
): Promise<BlogDetailsResponse> => {
  try {
    const response = await serverFetch.get<BlogDetailsResponse>(
      `/blogs/${slug}`,
    );

    return response;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
};

export const deleteVendorBlog = async (
  id: string,
): Promise<DeleteApiResponse<null>> => {
  const data = await serverFetch.delete<DeleteApiResponse<null>>(
    `/blogs/${id}`,
  );

  // If serverFetch handles HTTP errors automatically, check API success status
  if (!data.success) {
    throw new Error(data.message || "Failed to delete blog");
  }

  return data;
};

export async function editBlog(id: string, formData: FormData) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized: Missing access token",
      };
    }

    const response = await fetch(`${API_URL}/blogs/${id}`, {
      method: "PATCH", // Or "PUT", depending on your API specification
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to update blog",
      };
    }

    return {
      success: true,
      message: "Blog updated successfully",
      data: data.data || data,
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : "Something went wrong while updating the blog";

    return {
      success: false,
      message,
    };
  }
}
