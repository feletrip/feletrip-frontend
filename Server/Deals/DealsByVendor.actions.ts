"use server";

import serverFetch from "@/lib/serverFetch";

// API response
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// deal data
export interface DealsData {
  id: string;
  title: string;
  description: string;
  promoCode: string;
  image: string;
  dealType: "PERCENTAGE" | "FIXED_AMOUNT"; 
  discountValue: number;
  maxDiscount: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usedCount: number;
  status: "PENDING";     
  createdAt: string;
  updatedAt: string;
}

// create deal
export const createDealsAction = async (formData:FormData): Promise<ApiResponse<DealsData | null>> => {
  try {
    const response = await serverFetch.post<ApiResponse<DealsData>>("/deals/vendor/create-deal", formData);
    
    if (!response) {
      return {
        success: false,
        message: "No response received from the server.",
        data: null,
      };
    }
    return response;
  } catch (error) {
    console.error("Create Deals Error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create deal.",
      data: null,
    };
  }
};

// get my deal
export const getMyDealsAction = async (): Promise<ApiResponse<DealsData[]>> => {
  try {
    const response = await serverFetch.get<ApiResponse<DealsData[]>>("/deals/vendor/my-deals");
    
    if (!response) {
      return {
        success: false,
        message: "No response received from the server.",
        data: [],
      };
    }
    return response;
  } catch (error) {
    console.error("Get My Deals Error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch deals.",
      data: [],
    };
  }
};

// ৩. update deal
export const updateDealsAction = async (id: string, updateData: Partial<DealsData>): Promise<ApiResponse<DealsData | null>> => {
  try {
    const response = await serverFetch.patch<ApiResponse<DealsData>>(`/deals/vendor/update-deal/${id}`, updateData);
    
    if (!response) {
      return {
        success: false,
        message: "No response received from the server.",
        data: null,
      };
    }
    return response;
  } catch (error) {
    console.error("Update Deals Error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update deal.",
      data: null,
    };
  }
};

// delete deal
export const deleteDealsAction = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const response = await serverFetch.delete<ApiResponse<null>>(`/deals/vendor/delete-deal/${id}`);
    
    if (!response) {
      return {
        success: false,
        message: "No response received from the server.",
        data: null,
      };
    }
    return response;
  } catch (error) {
    console.error("Delete Deals Error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete deal.",
      data: null,
    };
  }
};