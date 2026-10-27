export interface AboutStats {
  avgRatings: number;
  totalTravellers: number;
  totalHotels: number;
  premiumRooms: number;
  totalDestinations: number;
  successfullBookings: number;
  happyGuests: number;
  totalAvailableRooms: number;
}

export interface AboutResponse {
  success: boolean;
  message: string;
  data: AboutStats;
}