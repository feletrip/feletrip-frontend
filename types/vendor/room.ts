export interface RoomFacility {
  facility: {
    id: string;
    name: string;
  };
}

export interface RoomCategory {
  id: string;
  name: string;
  description: string;
}

export interface HotelRoom {
  id: string;
  hotelId: string;
  name: string;
  bedType: string;
  maxGuests: number;
  totalRooms: number;
  pricePerNight: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;

  hotel: {
    id: string;
    name: string;
    address: string;
    city: string;
    phone: string;
  };

  roomCategory: RoomCategory;

  roomPhotos: {
    id: string;
    photoUrl: string;
  }[];

  roomFacilityAssignments: RoomFacility[];
}

export interface RoomApiResponse {
  success: boolean;
  message?: string;

  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  data: HotelRoom[];
}

export interface RoomAvailability {
  date: string;
  availableRooms: number;
  isAvailable: boolean;
}

export interface RoomAvailabilityResponse {
  success: boolean;
  message: string;
  data: RoomAvailability[];
}

export interface AvailableRoom {
  id: string;
  name: string;
  availableRooms: number;
  isAvailable: boolean;
}

export interface  RoomAvailabilityDay {
  date: string;
  isAvailable: boolean;
  rooms: AvailableRoom[];
}

export interface RoomAvailabilityCalenderResponse {
  success: boolean;
  message: string;
  data: RoomAvailabilityDay[];
}

export interface GetRoomAvailabilityParams {
  hotelId: string;
  startDate?: string; // "YYYY-MM-DD"
  endDate?: string; // "YYYY-MM-DD", exclusive
  days?: number; // used only if startDate/endDate are omitted
}

export interface ToggleRoomStatusData {
  roomId: string;
  date: string; // "YYYY-MM-DD"
  isClosed: boolean;
}

export interface ToggleRoomStatusResponse {
  success: boolean;
  message: string;
  data: ToggleRoomStatusData;
}