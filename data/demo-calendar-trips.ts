import { CalendarTrip } from "@/types/user/trip-calendar";

export const demoCalendarTrips: CalendarTrip[] = [
  {
    id: "trip-1",
    hotelName: "Sea Pearl Beach Resort",
    location: "Cox's Bazar, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    from: new Date(2026, 6, 8),
    to: new Date(2026, 6, 10),
    status: "current",
  },
  {
    id: "trip-2",
    hotelName: "Grand Sylhet Hotel & Resort",
    location: "Sylhet, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    from: new Date(2026, 6, 15),
    to: new Date(2026, 6, 18),
    status: "upcoming",
  },
];