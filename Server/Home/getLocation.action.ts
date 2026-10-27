"use server";

import serverFetch from "@/lib/serverFetch";

export interface ILocationItem {
  id: string;
  name: string;
  description: string;
  coverImg: string;
  coverImgKey: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  hotelCount: number;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
}

export interface ILocationsResponseBody {
  statusCode: number;
  message: string;
  meta: IMeta;
  data: ILocationItem[];
}

export interface ILocationsApiResponse {
  success: boolean;
  message: string;
  data: ILocationsResponseBody;
}

export interface IGetLocationsParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
}

export const getLocations = async (
  params?: IGetLocationsParams,
): Promise<ILocationsApiResponse | null> => {
  try {
    const queryParams = new URLSearchParams();
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 5;

    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());

    if (params?.searchTerm) queryParams.append("searchTerm", params.searchTerm);

    const queryString = queryParams.toString();
    const endpoint = `/locations${queryString ? `?${queryString}` : ""}`;

    const result = await serverFetch.get<ILocationsApiResponse>(endpoint, {
      next: { revalidate: 0, tags: ["locations"] },
    });

    return result;
  } catch (error) {
    console.error("Failed to fetch locations:", error);
    return null;
  }
};
