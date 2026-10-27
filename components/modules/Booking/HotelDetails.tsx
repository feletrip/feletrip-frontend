"use client";

import { MapPin, Check } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Hotel } from "@/types/singleHotel";
import Image from "next/image";

interface Props {
  hotel: Hotel;
}

export function HotelDetails({ hotel }: Props) {
  const {
    name,
    address,
    rating,
    reviewsCount,
    facilities = [],
    images = [],
  } = hotel;

  const hotelImage = images[0];

  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 4) return "Very Good";
    if (rating >= 3) return "Good";
    return "Average";
  };

  return (
    <div className="bg-white dark:bg-gray-900 space-y-2 border border-primary rounded-md">
      <CardHeader className="p-0">
        <Image
          src={hotelImage}
          alt="Hotel Iamge"
          width={200}
          height={200}
          className="w-full object-cover rounded-t-md"
        />
        <CardTitle className="text-xl font-bold text-primary px-4">
          {name}
        </CardTitle>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground px-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {address}
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Tooltip>
            <TooltipTrigger>
              <div className="bg-primary text-white rounded text-center p-2">
                <div className="text-sm font-bold">{rating}</div>
              </div>
            </TooltipTrigger>
            <TooltipContent>{getRatingLabel(rating)}</TooltipContent>
          </Tooltip>
          <div className="">
            <p className="font-semibold text-md">{getRatingLabel(rating)}</p>
            <p className="text-xs text-muted-foreground">
              {reviewsCount} Reviews
            </p>
          </div>
        </div>

        <Separator />
        <div>
          <div className="flex flex-wrap gap-3 mb-4">
            {facilities.map((facility, i) => (
              <Badge
                key={i}
                variant="outline"
                className="rounded-md border-primary"
              >
                <Check /> {facility}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </div>
  );
}
