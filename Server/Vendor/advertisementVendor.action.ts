"use server";

import serverFetch, { IApiResponse } from "@/lib/serverFetch";
import {
  ICreateVendorAdPayload,
  IGetMyAdsQueryParams,
  IUpdateVendorAdPayload,
  IVendorAdDetail,
  IVendorAdPaginatedResponse,
  IDeleteVendorAdData,
} from "@/types/vendor/vendorAdvertisement";

// create ad
export const createVendorAdvertisement = async (
  payload: ICreateVendorAdPayload,
): Promise<IApiResponse<IVendorAdDetail> | null> => {
  try {
    const response = await serverFetch.post<IApiResponse<IVendorAdDetail>>(
      "/advertisement",
      payload,
    );

    return response;
  } catch (error) {
    console.error("Failed to create vendor advertisement:", error);
    return null;
  }
};

// get vendor ads
export const getVendorAdvertisements = async (
  params?: IGetMyAdsQueryParams,
): Promise<IVendorAdPaginatedResponse | null> => {
  try {
    const query = new URLSearchParams();

    if (params?.page !== undefined)
      query.append("page", params.page.toString());
    if (params?.limit !== undefined)
      query.append("limit", params.limit.toString());

    const queryString = query.toString();
    const endpoint = queryString
      ? `/advertisement/my?${queryString}`
      : "/advertisement/my";

    const response =
      await serverFetch.get<IVendorAdPaginatedResponse>(endpoint);

    return response;
  } catch (error) {
    console.error("Failed to fetch vendor advertisements:", error);
    return null;
  }
};

// get single ad details
export const getMyAdvertisementById = async (
  id: string,
): Promise<IApiResponse<IVendorAdDetail> | null> => {
  try {
    const response = await serverFetch.get<IApiResponse<IVendorAdDetail>>(
      `/advertisement/${id}`,
    );

    return response;
  } catch (error) {
    console.error(`Failed to fetch advertisement with ID ${id}:`, error);
    return null;
  }
};

// edit ad
export const updateVendorAdvertisement = async (
  id: string,
  payload: IUpdateVendorAdPayload,
): Promise<IApiResponse<IVendorAdDetail> | null> => {
  try {
    const response = await serverFetch.patch<IApiResponse<IVendorAdDetail>>(
      `/advertisement/${id}`,
      payload,
    );

    return response;
  } catch (error) {
    console.error(`Failed to update advertisement with ID ${id}:`, error);
    return null;
  }
};

// delete ad
export const deleteVendorAdvertisement = async (
  id: string,
): Promise<IApiResponse<IDeleteVendorAdData> | null> => {
  try {
    const response = await serverFetch.delete<
      IApiResponse<IDeleteVendorAdData>
    >(`/advertisement/${id}`);

    return response;
  } catch (error) {
    console.error(`Failed to delete advertisement with ID ${id}:`, error);
    return null;
  }
};
