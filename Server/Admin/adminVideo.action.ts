"use server";

import { cookies } from "next/headers";
import serverFetch, { IApiResponse } from "@/lib/serverFetch";
import {
  ICreateVideoPayload,
  IGetVideosQueryParams,
  IVideoPaginatedData,
  IUpdateVideoPayload,
  IVideoItem,
} from "@/types/admin/video";

export const getAdminAuthToken = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies();
    return cookieStore.get("accessToken")?.value || null;
  } catch {
    return null;
  }
};

// add video
export const createVideo = async (
  payload: ICreateVideoPayload | FormData,
): Promise<IApiResponse<IVideoItem> | null> => {
  try {
    const response = await serverFetch.post<IApiResponse<IVideoItem>>(
      "/admin/videos",
      payload,
    );

    return response;
  } catch (error) {
    console.error("Failed to create video:", error);
    return null;
  }
};

// get all videos
export const getAllAdminVideos = async (
  params?: IGetVideosQueryParams,
): Promise<IApiResponse<IVideoPaginatedData> | null> => {
  try {
    const query = new URLSearchParams();

    if (params?.page !== undefined)
      query.append("page", params.page.toString());
    if (params?.limit !== undefined)
      query.append("limit", params.limit.toString());
    if (params?.searchTerm) query.append("searchTerm", params.searchTerm);
    if (params?.isActive !== undefined)
      query.append("isActive", params.isActive.toString());

    const queryString = query.toString();
    const endpoint = queryString
      ? `/admin/videos?${queryString}`
      : "/admin/videos";

    const response =
      await serverFetch.get<IApiResponse<IVideoPaginatedData>>(endpoint);

    return response;
  } catch (error) {
    console.error("Failed to fetch admin videos:", error);
    return null;
  }
};

// edit video
export const updateVideo = async (
  id: string,
  payload: IUpdateVideoPayload | FormData,
): Promise<IApiResponse<IVideoItem> | null> => {
  try {
    const response = await serverFetch.patch<IApiResponse<IVideoItem>>(
      `/admin/videos/${id}`,
      payload,
    );

    return response;
  } catch (error) {
    console.error(`Failed to update video with ID ${id}:`, error);
    return null;
  }
};

// delete
export const deleteVideo = async (
  id: string,
): Promise<IApiResponse<null> | null> => {
  try {
    const response = await serverFetch.delete<IApiResponse<null>>(
      `/admin/videos/${id}`,
    );

    return response;
  } catch (error) {
    console.error(`Failed to delete video with ID ${id}:`, error);
    return null;
  }
};

// status toggle
export const toggleVideoStatus = async (
  id: string,
): Promise<IApiResponse<IVideoItem> | null> => {
  try {
    const response = await serverFetch.patch<IApiResponse<IVideoItem>>(
      `/admin/videos/${id}/toggle-status`,
      {},
    );

    return response;
  } catch (error) {
    console.error(`Failed to toggle video status for ID ${id}:`, error);
    return null;
  }
};
