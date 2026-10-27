import { ReactNode } from "react";
import { Tpolicies } from "./policies";
import { TReview } from "./review";
import { TRoom } from "./room";

export interface IHotelDetailsPhoto {
  id: string;
  photoUrl: string;
  isCover: boolean;
  createdAt?: string;
}

export interface ICoverPhoto {
  photoUrl: string;
}

export interface IHotelPhoto {
  photoUrl: string;
  isCover: boolean;
}

export interface IFacility {
  id: string;
  name: string;
}

export interface IHotelCategory {
  id: string;
  name: string;
  slug?: string;
  icon: string | null;
  backgroundImage?: string | null;
  description?: string;
}

export interface IHotelVendor {
  id: string;
  name: string;
  email: string;
}

export interface TRoomCategory {
  id: string;
  name: string;
  description: string | null;
  rooms: TRoom[];
}

export interface THotel {
  id: string;
  name: string;
  slug: string;

  category: string | IHotelCategory;

  description?: string | null;
  address: string;
  city: string;

  cancellationPolicy?: string | null;

  coverPhoto: string | ICoverPhoto | null;
  hotelPhotos?: IHotelPhoto[];

  facilities?: string[];

  averageRating: number;
  reviewCount: number;
  minPrice: number | null;

  availableRooms?: number;
  createdAt?: string;

  categoryId?: string;
  vendorId?: string;
  latitude?: number;
  longitude?: number;
  distance?: number;

  phone?: string;
  checkInTime?: string | null;
  checkOutTime?: string | null;
  status?: "ACTIVE" | "INACTIVE" | string;
  updatedAt?: string;
  vendor?: IHotelVendor;
  rooms?: TRoom[];
  policies?: Tpolicies;

  destination?: string;
  location?: string;

  rating?: number;
  reviewsCount?: number;

  pricePerNight?: number;
  originalPrice?: number;
  discountPrice?: number;
  totalPrice?: number;

  freeCancellation?: boolean;
  breakfastIncluded?: boolean;

  roomsLeft?: number;
  totalRoomsLeft?: ReactNode;

  reservationPolicy?: string[];
  bedPreference?: string[];
  paymentMethods?: string[];
}

export interface THotelDetails {
  id: string;
  categoryId: string;
  vendorId: string;
  name: string;
  slug: string;
  description: string | null;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  phone: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  cancellationPolicy: string | null;
  status: "ACTIVE" | "INACTIVE" | string;
  createdAt: string;
  updatedAt: string;

  category: IHotelCategory;
  vendor: IHotelVendor;
  hotelPhotos: IHotelDetailsPhoto[];
  facilities: IFacility[];

  roomCategories?: TRoomCategory[];
  reviews?: TReview[];
  // deals?: TDeal[];

  // Component UI Fallbacks & Search State Extensions
  minPrice?: number;
  availableRooms?: number;
  averageRating?: number;
  reviewCount?: number;
  destination?: string;
  totalRoomsLeft?: ReactNode;
  location?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  rating?: number;
  reviewsCount?: number;
  pricePerNight?: number;
  discountPrice?: number;
  originalPrice?: number;
  totalPrice?: number;
  freeCancellation?: boolean;
  breakfastIncluded?: boolean;
  roomsLeft?: number;
  images?: string[];
  rooms?: TRoom[];
  policies?: Tpolicies;
  reservationPolicy?: string[];
  bedPreference?: string[];
  paymentMethods?: string[];
}
