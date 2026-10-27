"use server";

import serverFetch from "@/lib/serverFetch";

export interface IVideoItem {
  id: string;
  title: string;
  url: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
}

export interface IVideosResponseBody {
  statusCode: number;
  message: string;
  meta: IMeta;
  data: IVideoItem[];
}

export interface IVideosApiResponse {
  success: boolean;
  message: string;
  data: IVideosResponseBody;
}

export interface IGetVideosParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
}

export async function getVideos(
  params: IGetVideosParams = {},
): Promise<IVideosApiResponse | null> {
  try {
    const searchParams = new URLSearchParams({
      page: String(params.page ?? 1),
      limit: String(params.limit ?? 1),
    });

    if (params.searchTerm?.trim()) {
      searchParams.set("searchTerm", params.searchTerm.trim());
    }

    const endpoint = `/videos?${searchParams.toString()}`;

    return await serverFetch.get<IVideosApiResponse>(endpoint);
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    return null;
  }
}
