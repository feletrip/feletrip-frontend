import { isAfter, isWithinInterval, startOfDay } from "date-fns";

import { CalendarTrip } from "@/types/user/trip-calendar";

export function getTripForDate(
  date: Date,
  trips: CalendarTrip[],
): CalendarTrip | undefined {
  return trips.find((trip) =>
    isWithinInterval(date, {
      start: trip.from,
      end: trip.to,
    }),
  );
}

export function getInitialTrip(
  trips: CalendarTrip[],
): CalendarTrip | undefined {
  const today = startOfDay(new Date());

  const currentTrip = trips.find((trip) =>
    isWithinInterval(today, {
      start: trip.from,
      end: trip.to,
    }),
  );

  if (currentTrip) {
    return currentTrip;
  }

  const upcomingTrip = trips
    .filter((trip) => isAfter(trip.from, today))
    .sort((a, b) => a.from.getTime() - b.from.getTime())[0];

  return upcomingTrip;
}
