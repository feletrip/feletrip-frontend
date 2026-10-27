"use client";

import { useMemo, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Booking } from "@/types/user/booking";
import { CalendarTrip } from "@/types/user/trip-calendar";

import { getInitialTrip, getTripForDate } from "@/lib/trip-calendar-utils";
import { mapBookingsToCalendarTrips } from "@/lib/mapper/booking-calendar.mapper";
import { CalendarLegend } from "./tripcalendar/CalendarLegend";
import { TripCalendar } from "./tripcalendar/TripCalendar";
import { EmptyState } from "@/components/shared/EmptyState";
import { CalendarDays } from "lucide-react";
import { TripDetailsCard } from "./tripcalendar/TripDetailsCard";

interface CalendarSectionProps {
  bookings: Booking[];
}

export function CalendarSection({ bookings }: CalendarSectionProps) {
  const trips = useMemo(() => mapBookingsToCalendarTrips(bookings), [bookings]);

  const initialTrip = useMemo(() => getInitialTrip(trips), [trips]);

  const [selectedTrip, setSelectedTrip] = useState<CalendarTrip | undefined>(
    initialTrip,
  );

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialTrip?.from,
  );

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      return;
    }

    setSelectedDate(date);

    const trip = getTripForDate(date, trips);

    setSelectedTrip(trip);
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader className="border-b bg-muted/20 px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-semibold">
              Trip Calendar
            </CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              View your stays and upcoming travel plans.
            </p>
          </div>

          <div className="hidden items-center gap-4 text-xs sm:flex">
            <CalendarLegend
              label="Current stay"
              dotClassName="bg-primary"
              pulse
            />

            <CalendarLegend label="Upcoming" dotClassName="bg-success" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-0 lg:grid-cols-1 xl:grid-cols-2">
        <div className="border-b p-1 md:p-4 lg:border-r lg:border-b-0">
          <TripCalendar
            trips={trips}
            selectedDate={selectedDate}
            defaultMonth={selectedTrip?.from ?? initialTrip?.from}
            onDateSelect={handleDateSelect}
          />

          <div className="mt-4 flex items-center justify-center gap-5 text-xs sm:hidden">
            <CalendarLegend
              label="Current stay"
              dotClassName="bg-primary"
              pulse
            />

            <CalendarLegend label="Upcoming" dotClassName="bg-success" />
          </div>
        </div>

        <div className="min-h-97 p-4 sm:p-6">
          {trips.length === 0 ? (
            <EmptyState
              icon={<CalendarDays className="size-6 text-accent-foreground" />}
              title="No upcoming trips"
              description="Your current and upcoming stays will appear here."
              containerClassName="min-h-[340px] rounded-2xl border border-dashed bg-muted/20 px-6"
              iconContainerClassName="size-14 rounded-2xl bg-accent"
            />
          ) : selectedTrip ? (
            <TripDetailsCard trip={selectedTrip} />
          ) : (
            <EmptyState
              icon={<CalendarDays className="size-6 text-accent-foreground" />}
              title="No trip on this date"
              description="Select a highlighted date to view your trip details."
              containerClassName="min-h-[340px] rounded-2xl border border-dashed bg-muted/20 px-6"
              iconContainerClassName="size-14 rounded-2xl bg-accent"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
