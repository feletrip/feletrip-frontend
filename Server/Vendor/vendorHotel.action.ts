"use server";
import serverFetch from "@/lib/serverFetch";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag, updateTag } from "next/cache";

export interface HotelCount {
  rooms: number;
  bookings: number;
}

export interface HotelCategory {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  backgroundImage: string | null;
  description: string;
}

export interface HotelVendor {
  id: string;
  name: string;
  email: string;
}

export interface HotelPhoto {
  id: string;
  photoUrl: string;
  isCover: boolean;
  createdAt: string;
}

export interface HotelFacility {
  id: string;
  name: string;
}

export interface HotelReview {
  id: string;
  // Add fields when review API is available
}

export interface HotelDeal {
  id: string;
  // Add fields when deal API is available
}

export interface RoomCategory {
  id: string;
  // Add fields when room category API is available
}

export interface CreateHotelData {
  id: string;
  categoryId?: string;
  vendorId?: string;
  name: string;
  slug?: string;
  description?: string;
  address: string;
  city?: string;
  _count?: HotelCount;
  latitude?: number;
  longitude?: number;
  phone?: string;
  checkInTime?: string;
  checkOutTime?: string;
  cancellationPolicy?: string;
  status: "ACTIVE" | "INACTIVE" | "DELETED";
  createdAt?: string;
  updatedAt?: string;
  category?: HotelCategory;
  vendor?: HotelVendor;
  hotelPhotos?: HotelPhoto[];
  facilities?: HotelFacility[];
  roomCategories?: RoomCategory[];
  reviews?: HotelReview[];
  deals?: HotelDeal[];
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: T;
}

export async function getVendorHotel(
  page = 1,
  limit = 10,
  search?: string,
): Promise<ApiResponse<CreateHotelData[] | null>> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy: "createdAt",
      sortOrder: "desc",
    });

    if (search) {
      params.append("search", search);
    }

    const data = await serverFetch.get(`/vendor/hotels?${params.toString()}`, {
      next: {
        tags: ["vendor-hotels"],
      },
    });

    return data as ApiResponse<CreateHotelData[]>;
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to fetch vendor hotels",
      data: null,
    };
  }
}

export async function getVendorHotelByHotelId(
  id: string,
): Promise<ApiResponse<CreateHotelData | null>> {
  try {
    const data = await serverFetch.get(`/hotels/${id}`, {
      next: {
        tags: ["vendor-hotels", `hotel-${id}`],
      },
    });
    return data as ApiResponse<CreateHotelData>;
  } catch (error) {
    console.error("Vendor hotel by id fetch error:", error);
    return {
      success: false,
      message: "Failed to fetch vendor hotel by id",
      data: null,
    };
  }
}

export async function updateHotel(
  id: string,
  formData: FormData,
): Promise<ApiResponse<CreateHotelData | null>> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        message: "Unauthorized user",
        success: false,
        data: null,
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/hotels/${id}`,
      {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const responseData = await response.json();
    if (!response.ok || !responseData?.success) {
      return {
        success: false,
        message: responseData?.message || "Update failed",
        data: null,
      };
    }

    // Invalidate old cache tags and full route caches on-demand
    updateTag("vendor-hotels");
    updateTag(`hotel-${id}`);
    revalidatePath("/dashboard/host/properties");
    revalidatePath("/dashboard/host/properties/rooms");
    revalidatePath(`/hotels/${id}`);

    return responseData;
  } catch {
    return {
      success: false,
      message: "Failed to update hotel",
      data: null,
    };
  }
}

export async function deleteHotel(
  id: string,
): Promise<ApiResponse<CreateHotelData | null>> {
  try {
    const response = await serverFetch.delete(`/hotels/${id}`);

    // Invalidate old cache tags and full route caches on-demand
    updateTag("vendor-hotels");
    updateTag(`hotel-${id}`);
    revalidatePath("/dashboard/host/properties");
    revalidatePath("/dashboard/host/properties/rooms");
    revalidatePath("/hotels");

    return response as ApiResponse<CreateHotelData>;
  } catch {
    return {
      success: false,
      message: "Failed to delete hotel",
      data: null,
    };
  }
}

export async function deleteHotelPhoto(
  hotelId: string,
  photoId: string,
): Promise<ApiResponse<any>> {
  try {
    const response = await serverFetch.delete(`/hotels/${hotelId}/photos/${photoId}`);

    // Invalidate old cache tags and full route caches on-demand
    updateTag("vendor-hotels");
    updateTag(`hotel-${hotelId}`);
    revalidatePath("/dashboard/host/properties");
    revalidatePath("/dashboard/host/properties/photos");
    revalidatePath(`/hotels/${hotelId}`);

    return response as ApiResponse<any>;
  } catch {
    return {
      success: false,
      message: "Failed to delete photo",
      data: null,
    };
  }
}
