
export const bookings = [
  {
    id: "1",
    guestName: "John Doe",
    email: "john.doe@email.com",
    hotelName: "Grand Palace Hotel",
    roomType: "Deluxe Room",
    checkIn: "2026-03-10",
    checkOut: "2026-03-12",
    amount: 220,
    status: "Pending",
  },
  {
    id: "2",
    guestName: "Sarah Ahmed",
    email: "sarah.ahmed@email.com",
    hotelName: "Royal Inn",
    roomType: "Suite Room",
    checkIn: "2026-03-15",
    checkOut: "2026-03-18",
    amount: 450,
    status: "Pending",
  },
];

export type BookingAction =
  | "view"
  | "confirm"
  | "cancel"
  | "refund";

export interface Action {
  id: BookingAction;
  label: string;
  variant: "default" | "secondary" | "destructive";
}