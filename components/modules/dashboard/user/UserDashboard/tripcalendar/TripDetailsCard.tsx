import Link from "next/link";

import {
  CalendarDays,
  MapPin,
  Moon,
  PlaneTakeoff,
} from "lucide-react";

import {
  differenceInCalendarDays,
  format,
} from "date-fns";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { CalendarTrip } from "@/types/user/trip-calendar";

import { TripInfoItem } from "./TripInfoItem";

interface TripDetailsCardProps {
  trip: CalendarTrip;
}

export function TripDetailsCard({
  trip,
}: TripDetailsCardProps) {
  const nights = differenceInCalendarDays(
    trip.to,
    trip.from
  );

  return (
    <div className="flex h-full flex-col">
      <div className="relative h-44 overflow-hidden rounded-2xl sm:h-52">
        <Avatar className="h-full w-full rounded-2xl">
          <AvatarImage
            src={trip.image || undefined}
            alt={trip.hotelName}
            className="object-cover transition-transform duration-500 hover:scale-105"
          />

          <AvatarFallback className="h-full w-full rounded-2xl bg-accent text-5xl font-semibold text-accent-foreground">
            {trip.hotelName
              .charAt(0)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <Badge
          className="absolute top-3 right-3"
          variant={
            trip.status === "current"
              ? "default"
              : "secondary"
          }
        >
          {trip.status === "current"
            ? "Current Stay"
            : "Upcoming Trip"}
        </Badge>

        <div className="pointer-events-none absolute right-4 bottom-4 left-4 text-white">
          <h3 className="text-lg font-semibold sm:text-xl">
            {trip.hotelName}
          </h3>

          <div className="mt-1 flex items-center gap-1.5 text-sm text-white/85">
            <MapPin className="size-4 shrink-0" />

            <span className="truncate">
              {trip.location}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <TripInfoItem
          icon={
            <CalendarDays className="size-4" />
          }
          label="Check-in"
          value={format(
            trip.from,
            "dd MMM yyyy"
          )}
        />

        <TripInfoItem
          icon={
            <CalendarDays className="size-4" />
          }
          label="Check-out"
          value={format(
            trip.to,
            "dd MMM yyyy"
          )}
        />

        <TripInfoItem
          icon={<Moon className="size-4" />}
          label="Duration"
          value={`${nights} ${
            nights === 1
              ? "Night"
              : "Nights"
          }`}
        />

        <TripInfoItem
          icon={
            <PlaneTakeoff className="size-4" />
          }
          label="Trip status"
          value={
            trip.status === "current"
              ? "You're staying here"
              : "Ready for your trip"
          }
        />
      </div>

      <Button
        asChild
        className="mt-5 w-full sm:w-fit"
      >
        <Link
          href={`/dashboard/my-bookings/${trip.id}`}
        >
          View booking details
        </Link>
      </Button>
    </div>
  );
}