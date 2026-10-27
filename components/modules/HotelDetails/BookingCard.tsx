"use client";

import { useState } from "react";
import { format, differenceInDays } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { THotel } from "@/types/hotel";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";

interface BookingFormProps {
  pricePerNight: number;
  hotel: THotel;
}

export default function BookingCard({
  pricePerNight,
  hotel,
}: BookingFormProps) {
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState<string>("1");
  const [coupon, setCoupon] = useState<string>("");
  const router = useRouter();
  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;

  const discount = coupon === "SAVE10" ? 0.1 : 0;

  const totalPrice = nights > 0 ? nights * pricePerNight * (1 - discount) : 0;

  const handleReserve = () => {
    if (!checkIn || !checkOut) {
      return;
    }

    const params = new URLSearchParams({
      hotelId: hotel.id.toString(),
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      guests,
    });

    router.push(`/booking?${params.toString()}`);
  };

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-xl font-bold text-center">Booking Form</h2>

        {/* Check-in */}
        <div className="space-y-2">
          <Label>Check-in date</Label>
          <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                {checkIn ? format(checkIn, "PPP") : "Select check-in"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={(data) => {
                  setCheckIn(data);
                  setCheckInOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out */}
        <div className="space-y-2">
          <Label>Check-out date</Label>
          <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                {checkOut ? format(checkOut, "PPP") : "Select check-out"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={(data) => {
                  setCheckOut(data);
                  setCheckOutOpen(false);
                }}
                disabled={(date) => (checkIn ? date <= checkIn : false)}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <Label>Guests</Label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger>
              <SelectValue placeholder="Select guests" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((g) => (
                <SelectItem key={g} value={g.toString()}>
                  {g} Guest{g > 1 && "s"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Coupon */}
        <div className="space-y-2">
          <Label>Coupon Discount</Label>
          <Input
            placeholder="Enter coupon (SAVE10)"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value.toUpperCase())}
          />
        </div>

        {/* Price Info */}
        <div className="space-y-1 text-sm">
          <p>
            Price per night:{" "}
            <span className="font-medium">{pricePerNight} BDT</span>
          </p>
          <p>
            Nights: <span className="font-medium">{nights}</span>
          </p>
          {discount > 0 && (
            <p className="text-green-600">
              Discount Applied: {discount * 100}%
            </p>
          )}
          <p className="text-lg font-bold">
            Total: {totalPrice.toFixed(2)} BDT
          </p>
        </div>

        <Button className="w-full" onClick={handleReserve}>
          Reserve Now
        </Button>
      </CardContent>
    </Card>
  );
}
