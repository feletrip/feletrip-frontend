export interface Reservation {
  id: string;
  guest: string;
  room: string;
  checkIn: string;
  amount: number;
  status: "confirmed" | "cancelled" | "pending" | string;
}

export interface ReservationChartItem {
  date: string;
  confirmed: number;
  pending: number;
}
