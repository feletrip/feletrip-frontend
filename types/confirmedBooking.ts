export type ConfirmedBooking = {
  id: string;
  guest: string;
  room: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  total: number;
  payment:string;
};