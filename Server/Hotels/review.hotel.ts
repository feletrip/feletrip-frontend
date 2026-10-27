"use server"

import serverFetch from "@/lib/serverFetch"

export interface Review {
    id: string;
    bookingId: string;
    customerId: string;
    hotelId: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

export interface ReviewsData {
    averageRating: string;
    reviews: Review[];
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ReviewsApiResponse {
    success: boolean;
    message: string;
    pagination: Pagination;
    data: ReviewsData;
}

export const getHotelReviewsByHotelId = async (
    hotelId: string
): Promise<ReviewsApiResponse> => {
    try {
        const response: ReviewsApiResponse = await serverFetch.get(
            `/reviews/hotel/${hotelId}`
        );

        return {
            success: true,
            message: "Hotel reviews fetched successfully",
            pagination: response.pagination,
            data: response.data,
        }
    } catch (error: any) {
        return {
            success: false,
            message:
                error?.response?.data?.message ||
                "Failed to fetch reviews",
            pagination: {
                page: 1,
                limit: 10,
                total: 0,
                totalPages: 0,
            },
            data: {
                averageRating: "0",
                reviews: [],
            },
        }
    }
};
