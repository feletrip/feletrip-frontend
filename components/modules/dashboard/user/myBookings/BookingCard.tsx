import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  MapPin,
  Moon,
  ReceiptText,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

import type { Booking } from "@/types/user/booking";
import Image from "next/image";
import { formatBookingCurrency, formatBookingDate } from "@/lib/booking-utils";

import { BookingDetail } from "./BookingDetail";
import { BookingStatusBadge } from "./BookingStatusBadge";

type BookingCardProps = {
  booking: Booking;
};

export function BookingCard({ booking }: BookingCardProps) {
  const hasDiscount = booking.totalAmount !== booking.finalAmount;
  const coverImage = booking.hotel.hotelPhotos?.find((photo) => photo.photoUrl)?.photoUrl;

const hotelInitial =booking.hotel.name?.trim().charAt(0).toUpperCase() || "H";
  return (
    <Card className="group overflow-hidden border-border/70 bg-card py-0 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-primary/40 hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          <div className="relative flex min-h-36 items-center justify-center overflow-hidden lg:w-52 lg:shrink-0">
            {coverImage ? (
              <Image
                src={coverImage}
                alt={`${booking.hotel.name} cover image`}
                fill
                sizes="(max-width: 1024px) 100vw, 208px"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-accent via-accent to-primary/20 p-6">
                {/* Original decorative circles */}
                <div className="absolute -right-8 -top-8 size-28 rounded-full bg-primary/15" />

                <div className="absolute -bottom-10 -left-8 size-32 rounded-full bg-primary/10" />

                {/* Hotel first letter */}
                <div className="relative flex size-20 items-center justify-center rounded-2xl bg-background/80 text-4xl font-bold text-primary shadow-sm backdrop-blur-sm">
                  {hotelInitial}
                </div>
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <BookingStatusBadge status={booking.status} />

                  <span className="text-xs text-muted-foreground">
                    Booked on {formatBookingDate(booking.createdAt)}
                  </span>
                </div>

                <h2 className="text-xl font-semibold tracking-tight">
                  {booking.hotel.name}
                </h2>

                <div className="mt-1.5 flex items-start gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />

                  <span>
                    {booking.hotel.address}, {booking.hotel.city}
                  </span>
                </div>
              </div>

              <div className="shrink-0 sm:text-right">
                <p className="text-xs text-muted-foreground">Total paid</p>

                <p className="mt-1 text-2xl font-bold tracking-tight">
                  {formatBookingCurrency(booking.finalAmount)}
                </p>

                {hasDiscount && (
                  <p className="text-xs text-muted-foreground line-through">
                    {formatBookingCurrency(booking.totalAmount)}
                  </p>
                )}
              </div>
            </div>

            <div className="my-5 grid grid-cols-2 gap-3 border-y border-border/70 py-4 sm:grid-cols-3 xl:grid-cols-5">
              <BookingDetail
                icon={CalendarDays}
                label="Check-in"
                value={formatBookingDate(booking.checkInDate)}
              />

              <BookingDetail
                icon={CalendarDays}
                label="Check-out"
                value={formatBookingDate(booking.checkOutDate)}
              />

              <BookingDetail
                icon={Moon}
                label="Duration"
                value={`${booking.totalNights} ${
                  booking.totalNights === 1 ? "night" : "nights"
                }`}
              />

              <BookingDetail
                icon={Users}
                label="Guests"
                value={`${booking.guestCount} ${
                  booking.guestCount === 1 ? "guest" : "guests"
                }`}
              />

              <BookingDetail
                icon={BedDouble}
                label="Rooms"
                value={`${booking.roomsBooked} ${
                  booking.roomsBooked === 1 ? "room" : "rooms"
                }`}
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <BedDouble className="size-5 text-primary" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {booking.room.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {booking.room.bedType} ·{" "}
                    {formatBookingCurrency(booking.room.pricePerNight)}
                    /night
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <ReceiptText className="size-4" />
                  Receipt
                </Button>

                <Button size="sm" asChild>
                  <Link href={`/dashboard/user/myBookings/${booking.id}`}>
                    View Details
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
