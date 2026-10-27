export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "refunded"
  | "checked_out"
  | "checked_in";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
}

export interface Room {
  id: string;
  name: string;
  bedType: string;
  maxGuests: number;
  pricePerNight: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  checkInDate: string;
  checkOutDate: string;
  totalNights: number;
  roomsBooked: number;
  guestCount: number;
  totalAmount: string;
  finalAmount: string;
  status: BookingStatus;
  createdAt: string;
  customer: Customer;
  hotel: Hotel;
  room: Room;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    data: Booking[];
  };
}
