export interface AdminReview {
  id: string;
  bookingId: string;
  customerId: string;
  hotelId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsResponse {
  success: boolean;
  message: string;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: AdminReview[];
}
