import { isSameDay } from "date-fns";

import { Calendar } from "@/components/ui/calendar";

import { CalendarTrip } from "@/types/user/trip-calendar";

import {
  getTripForDate,
} from "@/lib/trip-calendar-utils";

interface TripCalendarProps {
  trips: CalendarTrip[];

  selectedDate?: Date;
  defaultMonth?: Date;

  onDateSelect: (
    date: Date | undefined
  ) => void;
}

export function TripCalendar({
  trips,
  selectedDate,
  defaultMonth,
  onDateSelect,
}: TripCalendarProps) {
  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={onDateSelect}
      defaultMonth={defaultMonth}
      className="mx-auto w-full rounded-xl border bg-card p-3"
      modifiers={{
        tripDate: (date) =>
          !!getTripForDate(date, trips),

        currentTrip: (date) => {
          const trip = getTripForDate(
            date,
            trips
          );

          return trip?.status === "current";
        },

        upcomingTrip: (date) => {
          const trip = getTripForDate(
            date,
            trips
          );

          return trip?.status === "upcoming";
        },

        tripStart: (date) =>
          trips.some((trip) =>
            isSameDay(
              date,
              trip.from
            )
          ),

        tripEnd: (date) =>
          trips.some((trip) =>
            isSameDay(
              date,
              trip.to
            )
          ),
      }}
      modifiersClassNames={{
        tripDate:
          "font-semibold bg-accent text-accent-foreground",

        currentTrip:
          "bg-primary/20 text-accent-foreground",

        upcomingTrip:
          "bg-success/15 text-success",

        tripStart:
          "rounded-l-md",

        tripEnd:
          "rounded-r-md",
      }}
    />
  );
}