"use client";

import { parse, differenceInDays, isValid } from "date-fns";

interface Hotel {
  pricePerNight: number;
  discountPrice?: number;
  name: string;
}

interface BookingInfo {
  checkInDate: string;
  checkOutDate: string;
  rooms: number;
}

interface Props {
  hotel: Hotel;
  booking: BookingInfo;
}

const DATE_FORMAT = "dd-MM-yy";

const HotelPriceSummary = ({ hotel, booking }: Props) => {
  const { pricePerNight, discountPrice } = hotel;
  const { checkInDate, checkOutDate, rooms } = booking;

  const checkIn = parse(checkInDate, DATE_FORMAT, new Date());
  const checkOut = parse(checkOutDate, DATE_FORMAT, new Date());

  if (!isValid(checkIn) || !isValid(checkOut)) {
    return (
      <div className="border border-destructive rounded-md p-4">
        Invalid booking dates.
      </div>
    );
  }

  const nights = Math.max(differenceInDays(checkOut, checkIn), 0);
  const price = discountPrice ?? pricePerNight;

  // Calculations
  const subtotal = nights * price * rooms;
  const tax = subtotal * 0.15; // 15% tax
  const serviceFee = 500; // fixed service charge
  const total = subtotal + tax + serviceFee;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="border border-primary rounded-md bg-background my-8 overflow-hidden">
      {/* Header */}
      <div className="border-b border-primary bg-primary/10 px-4 py-2 font-semibold">
        Price Summary
      </div>

      <div className="p-4 space-y-4 text-sm">
        {/* Room Price */}
        <div className="flex justify-between">
          <span>
            {formatCurrency(price)} × {nights}{" "}
            {nights === 1 ? "night" : "nights"} × {rooms}{" "}
            {rooms === 1 ? "room" : "rooms"}
          </span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        {/* Tax */}
        <div className="flex justify-between text-muted-foreground">
          <span>Tax (15%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>

        {/* Service Fee */}
        <div className="flex justify-between text-muted-foreground">
          <span>Service Charge</span>
          <span>{formatCurrency(serviceFee)}</span>
        </div>

        {/* Divider */}
        <div className="border-t pt-3 flex justify-between font-semibold text-base">
          <span>Total</span>
          <span className="text-primary">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default HotelPriceSummary;
