export interface IHotelFeedback {
  id: string;
  comment: string;
  createdAt: string;
}

export interface IReviewCustomer {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
}

export interface IReviewHotel {
  id?: string;
  name?: string;
  image?: string;
}

export interface IReviewResponse {
  id: string;
  bookingId: string;
  customerId: string;
  hotelId: string;
  rating: number;
  comment: string;
  customer?: IReviewCustomer | null;
  hotel?: IReviewHotel | null;
  hotelFeedback?: IHotelFeedback | null;
  ReviewReply?: IHotelFeedback | null;
  createdAt: string;
  updatedAt?: string;
}

export interface IHotelDetailsResponse {
  id: string;
  name: string;
  image?: string;
}

export interface IHotelSummary {
  id: string;
  name: string;
  image?: string;
}

export interface IReview {
  id: string;
  bookingId: string;
  customerId: string;
  customer?: IReviewCustomer | null;
  hotel: IHotelSummary;
  rating: number;
  comment: string;
  hotelFeedback?: IHotelFeedback | null;
  createdAt: string;
  updatedAt: string;
}