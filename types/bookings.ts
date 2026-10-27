export interface Booking {
  id: string;
  guestName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
}