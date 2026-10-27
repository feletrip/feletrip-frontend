export interface TRoom {
  id: string;
  name: string;
  bedType: string;
  maxGuests: number;
  totalRooms: number;
  pricePerNight: string;
  description: string | null;
  status: "active" | "inactive";
  roomPhotos: string[];
  facilities: string[];
}
