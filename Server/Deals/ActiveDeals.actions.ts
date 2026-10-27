"use server";

import serverFetch from "@/lib/serverFetch";

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IRoomCategory {
  id: string;
  name: string;
}

export interface IRoom {
  id: string;
  name: string;
  maxGuests: number;
  pricePerNight: number;
  roomCategory: IRoomCategory;
}

export interface IDealRoom {
  room: IRoom;
}

export interface IDeals {
  id: string;
  title: string;
  description: string;
  image: string;
  promoCode: string;
  status: "ACTIVE" | "INACTIVE";
  dealType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  maxDiscount: number;
  startDate?: string;
  endDate?: string;
  usageLimit?: number;
  usedCount?: number;
  hotelId?: string;
  isHighlighted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  hotel: {
    id: string;
    name: string;
    city: string;
  };
  dealrooms?: IDealRoom[];
}

/** all active deals list */
export const ActiveDealsActions = async (): Promise<IApiResponse<IDeals[]>> => {
  try {
    const response = await serverFetch.get<IApiResponse<IDeals[]>>(
      "/deals/active-deals",
    );

    if (!response) {
      return {
        success: false,
        message: "No response received from the server.",
        data: [],
      };
    }

    return response;
  } catch (error) {
    console.error("ActiveDealsActions Error:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch active deals.",
      data: [],
    };
  }
};

/** details of a single active deal */
export const GetActiveDealDetailsAction = async (
  id: string,
): Promise<IApiResponse<IDeals | null>> => {
  try {
    const response = await serverFetch.get<IApiResponse<IDeals>>(
      `/deals/active-deal/${id}`,
    );


    if (!response) {
      return {
        success: false,
        message: "No response received from the server.",
        data: null,
      };
    }

    return response;
  } catch (error) {
    console.error("GetActiveDealDetailsAction Error:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch deal details.",
      data: null,
    };
  }
};
