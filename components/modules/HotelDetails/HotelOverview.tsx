import { THotelDetails } from "@/types/hotel";
import { MapPin, Star } from "lucide-react";
interface Props {
  hotel: THotelDetails;
}

export default function HotelOverview({ hotel }: Props) {
  const { name, address, averageRating, reviewCount } = hotel;

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Star className="text-yellow-500 w-4 h-4" />
          <span className="font-bold">{averageRating}</span>
          <span className="text-muted-foreground text-sm">
            ({reviewCount || 0} reviews)
          </span>
        </div>
      </div>

      <h1 className="text-4xl font-bold capitalize">{name}</h1>
      <p className="text-muted-foreground text-sm flex gap-1 items-center">
        <MapPin className="w-4 h-4 inline-block text-primary" />
        <span>{address}</span>
      </p>
    </div>
  );
}
