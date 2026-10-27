export type HotelUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "pending" | "suspended";
  role: {
    id: string;
    name: string;
  };
  isVerified: boolean;
  hotelName?: string;
  isAllHotels?: boolean;
  createdAt: string;
  updatedAt?: string;
};
