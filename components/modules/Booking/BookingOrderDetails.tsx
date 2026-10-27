"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export function BookingOrderDetails() {
  const roomDetails = {
    name: "Queen Room",
    imageUrl:
      "https://img.freepik.com/free-photo/small-hotel-room-interior-with-double-bed-bathroom_1262-12489.jpg?semt=ais_hybrid&w=740&q=80",
    rating: 5.0,
    reviewsCount: 400,
    price: 2000,
  };

  const orderInfo = {
    checkIn: "15 Sep 2025 at 10:10 AM",
    checkOut: "21 Sep 2025 at 09:15 AM",
    adults: 2,
    children: 2,
  };

  const paymentInfo = {
    subTotal: 8565,
    tax: 85,
    bookingFees: 89,
    discount: -20,
    total: 9569,
  };

  return (
    <Card className="rounded-md rounded-t-none border-0">
      <CardContent className="space-y-6 pb-6">
        {/* Room Image + Details */}
        <div className="space-y-4">
          <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={roomDetails.imageUrl}
              alt={roomDetails.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {roomDetails.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 font-medium">
                  {roomDetails.rating.toFixed(1)}
                </Badge>
                <span className="text-sm text-gray-600">
                  ({roomDetails.reviewsCount} Reviews)
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-gray-900">
                ${roomDetails.price}
              </span>
            </div>
          </div>
        </div>
        <Separator />
        {/* Order Info */}
        <div className="space-y-4">
          <h4 className="text-base font-medium text-red-600">Order Info</h4>
          <div className="space-y-2 text-md">
            <div className="flex items-center justify-between gap-3">
              {/* <div className="w-2 h-2 rounded-full bg-red-500" /> */}
              <span className="font-medium text-gray-900">Check In</span>
              <span className="text-gray-600 ">{orderInfo.checkIn}</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              {/* <div className="w-2 h-2 rounded-full bg-red-500 opacity-0" /> */}
              {/* spacer */}
              <span className="font-medium text-gray-900">Check Out</span>
              <span className="text-gray-600 ">{orderInfo.checkOut}</span>
            </div>

            <div className="flex items-center justify-between">
              {/* <div className="w-2 h-2 rounded-full bg-red-500 opacity-0" /> */}
              <span className="font-medium text-gray-900">Adults</span>
              <span className="text-gray-600">{orderInfo.adults} adults</span>
            </div>

            <div className="flex items-center justify-between">
              {/* <div className="w-2 h-2 rounded-full bg-red-500 opacity-0" /> */}
              <span className="font-medium text-gray-900">Children</span>
              <span className="text-gray-600">
                {orderInfo.children} children
              </span>
            </div>
          </div>
        </div>
        <Separator />
        {/* Payment Info */}
        <div className="space-y-4">
          <h4 className="text-base font-medium text-red-600">Payment Info</h4>

          <div className="space-y-2 text-md">
            <div className="flex justify-between">
              <span className="text-gray-600">Sub Total</span>
              <span className="font-medium text-gray-900">
                ${paymentInfo.subTotal}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Tax (10%)</span>
              <span className="font-medium text-gray-900">
                ${paymentInfo.tax}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Booking Fees</span>
              <span className="font-medium text-gray-900">
                ${paymentInfo.bookingFees}
              </span>
            </div>

            <div className="flex justify-between text-emerald-600">
              <span>Discount (10%)</span>
              <span className="font-medium">
                {paymentInfo.discount < 0 ? "" : "-"} $
                {Math.abs(paymentInfo.discount)}
              </span>
            </div>
            <Separator className="my-6" />
            <div className="flex justify-between font-semibold text-base">
              <span className="text-gray-900">Amount to Pay</span>
              <span className="text-red-600">${paymentInfo.total}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
