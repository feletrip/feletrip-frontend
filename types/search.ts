export interface SearchParams {
  hotelName?: string;
  checkIn?: Date;
  checkOut?: Date;
  adults?:number;
  children?:number;
  totalGuests?:number;
  rooms: number;
}