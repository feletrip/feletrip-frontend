export type Booking = {
  id: string;
  guestName: string;
  email: string;
  hotelName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  amount: number;
  status:any
};
export type bookingProps = {
  booking: Booking;
  actions: {
    key: string;
    icon: string;
  }[];
};

export interface Action {
  id: string;
  label: string;
  variant: "default" | "secondary" | "destructive";
  icon?: string;
}