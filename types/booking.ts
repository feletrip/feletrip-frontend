export interface IHotelInfo {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
}

export interface IRoomInfo {
  id: string;
  name: string;
  bedType: string;
  maxGuests: number;
  totalRooms: number;
  pricePerNight: number;
  description: string;
}

export interface BookingDetails {
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
  status: "pending" | "confirmed" | "completed" | "cancelled";
  completedAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  hotel: IHotelInfo;
  room: IRoomInfo;
}
