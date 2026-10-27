"use server";

import serverFetch, { IApiResponse, IPagination } from "@/lib/serverFetch";
import {
  IAdminAdDetail,
  IAdminAdPaginatedData,
  IAdminAdPricingItem,
  IAdvertisementItem,
  ICreateAdminAdPricingPayload,
  IGetAdminAdsQueryParams,
  IUpdateAdminAdPricingPayload,
  IUpdateAdStatusPayload,
} from "@/types/admin/adminAdvertisement";

// get all admin advertisements
export const getAllAdminAdvertisements = async (
  params?: IGetAdminAdsQueryParams,
): Promise<IApiResponse<IAdminAdPaginatedData> | null> => {
  try {
    const query = new URLSearchParams();

    if (params?.page !== undefined)
      query.append("page", params.page.toString());
    if (params?.limit !== undefined)
      query.append("limit", params.limit.toString());

    const queryString = query.toString();
    const endpoint = queryString
      ? `/advertisement/admin?${queryString}`
      : "/advertisement/admin";

    const response =
      await serverFetch.get<IApiResponse<IAdvertisementItem[]>>(endpoint);

    if (!response) return null;

    const responsePagination = response.pagination as IPagination | undefined;

    const normalizedData: IAdminAdPaginatedData | undefined = response.data
      ? {
          data: response.data,
          pagination: responsePagination || {
            page: params?.page ?? 1,
            limit: params?.limit ?? response.data.length,
            total: response.data.length,
            totalPages: 1,
          },
        }
      : undefined;

    return {
      ...response,
      data: normalizedData,
    };
  } catch (error) {
    console.error("Failed to fetch admin advertisements:", error);
    return null;
  }
};

// get all advertisement pricing
export const getAdminAdPricing = async (): Promise<IApiResponse<
  IAdminAdPricingItem[]
> | null> => {
  try {
    const response = await serverFetch.get<IApiResponse<IAdminAdPricingItem[]>>(
      "/advertisement/admin/pricing",
    );

    return response;
  } catch (error) {
    console.error("Failed to fetch advertisement pricing:", error);
    return null;
  }
};

// create advertisement pricing
export const createAdminAdPricing = async (
  payload: ICreateAdminAdPricingPayload,
): Promise<IApiResponse<IAdminAdPricingItem> | null> => {
  try {
    const response = await serverFetch.post<IApiResponse<IAdminAdPricingItem>>(
      "/advertisement/admin/pricing",
      payload,
    );

    return response;
  } catch (error) {
    console.error("Failed to create advertisement pricing:", error);
    return null;
  }
};

// update advertisement pricing
export const updateAdminAdPricing = async (
  id: string,
  payload: IUpdateAdminAdPricingPayload,
): Promise<IApiResponse<IAdminAdPricingItem> | null> => {
  try {
    const response = await serverFetch.patch<IApiResponse<IAdminAdPricingItem>>(
      `/advertisement/admin/pricing/${id}`,
      payload,
    );

    return response;
  } catch (error) {
    console.error(
      `Failed to update advertisement pricing for ID ${id}:`,
      error,
    );
    return null;
  }
};

// get advertisement by ID
export const getAdminAdvertisementById = async (
  id: string,
): Promise<IApiResponse<IAdminAdDetail> | null> => {
  try {
    const response = await serverFetch.get<IApiResponse<IAdminAdDetail>>(
      `/advertisement/admin/${id}`,
    );

    return response;
  } catch (error) {
    console.error(`Failed to fetch advertisement with ID ${id}:`, error);
    return null;
  }
};

// approve or reject advertisement
export const updateAdStatus = async (
  id: string,
  payload: IUpdateAdStatusPayload,
): Promise<IApiResponse<IAdminAdDetail> | null> => {
  try {
    const response = await serverFetch.patch<IApiResponse<IAdminAdDetail>>(
      `/advertisement/${id}/status`,
      payload,
    );

    return response;
  } catch (error) {
    console.error(`Failed to update advertisement status for ID ${id}:`, error);
    return null;
  }
};
