export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "refunded";

export type HotelPhoto = {
  photoUrl: string;
  isCover: boolean;
};

export type BookingHotel = {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  hotelPhotos: HotelPhoto[];
};

export type BookingRoom = {
  id: string;
  name: string;
  bedType: string;
  maxGuests: number;
  totalRooms: number;
  pricePerNight: number;
};

export type Booking = {
  id: string;
  bookingCode: string;

  customerId: string;
  hotelId: string;
  roomId: string;

  checkInDate: string;
  checkOutDate: string;

  totalNights: number;
  roomsBooked: number;
  guestCount: number;

  totalAmount: number;
  finalAmount: number;

  status: BookingStatus;

  createdAt: string;

  room: BookingRoom;
  hotel: BookingHotel;
};

export type BookingMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type BookingPaginationData = {
  meta: BookingMeta;
  data: Booking[];
};

export type BookingApiResponse = {
  success: boolean;
  message: string;
  data: BookingPaginationData | null;
};