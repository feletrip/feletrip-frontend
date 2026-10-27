"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  CalendarDays,
  CircleDollarSign,
  Hash,
  MapPin,
  Moon,
  Phone,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatBookingCurrency, formatBookingDate, formatBookingCode } from "@/lib/booking-utils";
import type { Booking } from "@/types/user/booking";

import { BookingDetail } from "./BookingDetail";
import { BookingPaymentActions } from "./BookingPaymentActions";
import { BookingStatusBadge } from "./BookingStatusBadge";

type BookingDetailsProps = {
  booking: Booking;
};

export function BookingDetails({ booking }: BookingDetailsProps) {
  const coverImage = booking.hotel.hotelPhotos?.find(
    (photo) => photo.isCover || photo.photoUrl,
  )?.photoUrl;
  const hotelInitial = booking.hotel.name.trim().charAt(0).toUpperCase() || "H";
  const hasDiscount =
    Number(booking.totalAmount) !== Number(booking.finalAmount);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <Button variant="ghost" size="sm" className="w-fit" asChild>
        <Link href="/dashboard/user/myBookings">
          <ArrowLeft className="size-4" />
          Back to bookings
        </Link>
      </Button>

      <Card className="overflow-hidden border-border/70 bg-card py-0 shadow-sm">
        <div className="relative h-60 sm:h-72">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={`${booking.hotel.name} cover image`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1152px"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-accent via-accent to-primary/25">
              <div className="absolute -right-12 -top-12 size-52 rounded-full bg-primary/15" />
              <div className="absolute -bottom-20 -left-12 size-64 rounded-full bg-primary/10" />
              <div className="absolute inset-0 flex items-center justify-center text-8xl font-bold text-primary/80">
                {hotelInitial}
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 text-white sm:flex-row sm:items-end sm:justify-between sm:p-7">
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-sm text-white/80">
                <MapPin className="size-4" />
                {booking.hotel.city}
              </p>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {booking.hotel.name}
              </h1>
            </div>
            <BookingStatusBadge status={booking.status} />
          </div>
        </div>

        <CardContent className="p-5 sm:p-7">
          <div className="flex flex-col gap-4 border-b border-border/70 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Booking reference</p>
              <p className="mt-1 flex items-center gap-2 font-semibold">
                <Hash className="size-4 text-primary" />
                {formatBookingCode(booking.bookingCode)}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Booked on {formatBookingDate(booking.createdAt)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 py-6 sm:grid-cols-3 lg:grid-cols-5">
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
              value={`${booking.totalNights} ${booking.totalNights === 1 ? "night" : "nights"}`}
            />
            <BookingDetail
              icon={Users}
              label="Guests"
              value={`${booking.guestCount} ${booking.guestCount === 1 ? "guest" : "guests"}`}
            />
            <BookingDetail
              icon={BedDouble}
              label="Rooms"
              value={`${booking.roomsBooked} ${booking.roomsBooked === 1 ? "room" : "rooms"}`}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <Card className="border-border/70 bg-card py-0 shadow-sm">
          <CardHeader className="px-5 pt-5 sm:px-6 sm:pt-6">
            <CardTitle className="text-lg">Stay details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 px-5 pb-5 sm:px-6 sm:pb-6">
            <div className="flex items-start gap-3 rounded-xl bg-muted/60 p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <BedDouble className="size-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{booking.room.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {booking.room.bedType} · Up to {booking.room.maxGuests} guests
                </p>
                <p className="mt-2 text-sm font-medium">
                  {formatBookingCurrency(booking.room.pricePerNight)} / night
                </p>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Hotel address</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {booking.hotel.address}, {booking.hotel.city}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="font-medium">Contact hotel</p>
                  <a
                    href={`tel:${booking.hotel.phone}`}
                    className="mt-1 block text-sm text-primary hover:underline"
                  >
                    {booking.hotel.phone}
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit border-border/70 bg-card py-0 shadow-sm">
          <CardHeader className="px-5 pt-5 sm:px-6 sm:pt-6">
            <CardTitle className="text-lg">Payment summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-5 pb-5 sm:px-6 sm:pb-6">
            <div className="flex justify-between gap-4 text-sm">
              <span className="text-muted-foreground">Room total</span>
              <span>{formatBookingCurrency(booking.totalAmount)}</span>
            </div>
            {hasDiscount && (
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-muted-foreground">Discount</span>
                <span className="text-success">
                  −
                  {formatBookingCurrency(
                    Number(booking.totalAmount) - Number(booking.finalAmount),
                  )}
                </span>
              </div>
            )}
            <Separator />
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 font-semibold">
                <CircleDollarSign className="size-5 text-primary" />
                Total paid
              </span>
              <span className="text-xl font-bold">
                {formatBookingCurrency(booking.finalAmount)}
              </span>
            </div>
            <BookingPaymentActions booking={booking} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
