"use server";

import serverFetch from "@/lib/serverFetch";

import type {
  IHotelDetailsResponse,
  IReview,
  IReviewResponse,
} from "@/types/user/Review";
import type { IApiResponse } from "@/types/user/user";

export const getHotelById = async (
  hotelId: string,
): Promise<IApiResponse<IHotelDetailsResponse>> => {
  return serverFetch.get<IApiResponse<IHotelDetailsResponse>>(`/hotels/${hotelId}`);
};

export const getMyReviews = async (): Promise<IApiResponse<IReview[]>> => {
  try {
    const reviewsResponse = await serverFetch.get<IApiResponse<IReviewResponse[]>>(
      "/reviews/my-reviews",
    );
    const reviews = reviewsResponse.data ?? [];

    if (!reviewsResponse.success) {
      return {
        ...reviewsResponse,
        data: [],
      };
    }

    const uniqueHotelIds = [
      ...new Set(
        reviews
          .map((review) => review.hotelId)
          .filter((hotelId): hotelId is string => Boolean(hotelId)),
      ),
    ];

    const hotelResponses = await Promise.all(
      uniqueHotelIds.map((hotelId) => getHotelById(hotelId)),
    );

    const hotelMap = new Map(
      hotelResponses
        .filter((response) => response.success && response.data)
        .map((response) => [response.data!.id, response.data!] as const),
    );

    const enrichedReviews: IReview[] = reviews.map((review) => {
      const hotelFromResponse = review.hotel ??
        (review.hotelId
          ? hotelMap.get(review.hotelId)
          : undefined);
      const hotelName =
        hotelFromResponse?.name || review.customer?.name || "Hotel";

      return {
        id: review.id,
        bookingId: review.bookingId,
        customerId: review.customerId,
        customer: review.customer ?? null,
        hotel: {
          id: hotelFromResponse?.id ?? review.hotelId ?? "",
          name: hotelName,
          image: hotelFromResponse?.image,
        },
        rating: review.rating,
        comment: review.comment,
        hotelFeedback: review.ReviewReply ?? review.hotelFeedback ?? null,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt ?? review.createdAt,
      };
    });

    return {
      ...reviewsResponse,
      data: enrichedReviews,
    };
  } catch (error) {
    console.error("Failed to fetch user reviews:", error);

    throw error;
  }
};
