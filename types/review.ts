export interface TReviewCustomer {
  id: string;
  name: string;
  avatar?: string;
}

export interface TReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  customer?: TReviewCustomer;

  hotelId?: string;
  userName?: string;
  date?: string;
  userAvatar?: string;
  roomType?: string;
  guestPhotos?: string[];
}
