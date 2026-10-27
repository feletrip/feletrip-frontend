export type TripCalendarStatus =
  | "current"
  | "upcoming";

export interface CalendarTrip {
  id: string;
  hotelName: string;
  location: string;
  image?: string;
  from: Date;
  to: Date;
  status: TripCalendarStatus;
}