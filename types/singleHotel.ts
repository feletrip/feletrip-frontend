export interface Room {
  id: number;
  hotelId: number;
  name: string;
  image: string;
  description: string;
  maxGuests: number;
  bedType: string;
  pricePerNight: number;
  availableRooms: number;
  amenities?: string[];
  refundable?: boolean;
}

export interface Review {
  id: number;
  hotelId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Policies {
  checkIn: string;
  checkOut: string;
  cancellation: string;
  children: string;
  pets: string;
  smoking: string;
}

export interface Hotel {
  id: number;
  slug: string;
  name: string;
  propertyType: string;
  description: string;
  location: string;
  address: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  originalPrice?: number;
  discountPrice: number;
  totalPrice: number;
  freeCancellation: boolean;
  breakfastIncluded: boolean;
  roomsLeft: number;
  images: string[];
  facilities: string[];
  rooms: Room[];
  reviews: Review[];
  policies: Policies;
  paymentMethods: string[];
  specialOffers?: string[];
  nearbyAttractions?: string[];
  mapUrl?: string;
}
