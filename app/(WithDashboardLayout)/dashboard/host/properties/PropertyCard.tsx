import { CreateHotelData } from "@/Server/Vendor/vendorHotel.action";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CameraOff, MapPin } from "lucide-react";
import Image from "next/image";
import PropertyDetails from "./PropertyDetails";
import EditProperties from "./EditProperties";
import DeleteProperties from "./DeleteProperties";
import { Motion } from "@/components/Reuseable/common/Framermotion";

interface PropertyCardProps {
  properties: CreateHotelData[];
  onDelete?: (id: string) => void;
}

const PropertyCard = ({ properties, onDelete }: PropertyCardProps) => {
  if (!properties || properties.length === 0) {
    return (
      <div className="flex min-h-125 w-full items-center justify-center text-center text-2xl font-bold text-muted-foreground">
        No properties found
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 items-stretch">
      {properties.map((hotel, index) => {
        const coverImage =
          hotel.hotelPhotos?.find((photo) => photo.isCover)?.photoUrl ||
          hotel.hotelPhotos?.[0]?.photoUrl;

        return (
          <Motion key={hotel.id} animationType="fadeUp" delay={index * 0.1}>
            <Card className="group flex flex-col h-full overflow-hidden rounded-2xl border shadow-sm transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl">
              {/* Image */}
              <div className="relative h-48 w-full bg-muted">
                {coverImage ? (
                  <Image
                    src={coverImage}
                    alt={hotel.name}
                    fill
                    sizes="(max-width:768px) 100vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-emerald-50 via-white to-teal-50">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_40%)]" />

                    <div className="relative z-10 flex flex-col items-center">
                      <div className="mb-4 rounded-2xl bg-primary/10 p-5 text-primary ">
                        <CameraOff className="h-6 w-6" />
                      </div>

                      <h3 className="text-sm text-primary ">
                        Image Not Available
                      </h3>
                    </div>
                  </div>
                )}
                {/* Status */}
                <span
                  className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                    hotel.status === "ACTIVE"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {hotel.status}
                </span>
                {/* Category */}
                <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black shadow">
                  {hotel.category?.name || "Hotel"}
                </span>
              </div>

              <CardHeader className="py-3 px-0">
                <div className="flex justify-between gap-3 px-4">
                  <div>
                    <CardTitle className="line-clamp-1 text-xl">
                      {hotel.name.trim()}
                    </CardTitle>
                    <div className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                      <span className="line-clamp-2 min-h-9">
                        {hotel.city}, {hotel.address}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 px-4">
                {/* Facilities */}
                <div className="flex flex-wrap gap-2">
                  {!hotel.facilities?.length ? (
                    <span className="flex items-center gap-1 text-primary font-bold rounded-full bg-muted px-3 py-1 text-xs">
                      No Facilities
                    </span>
                  ) : (
                    hotel.facilities.map((facility) => (
                      <span
                        key={facility.id}
                        className="flex items-center gap-1 text-primary font-bold rounded-full bg-muted px-3 py-1 text-xs"
                      >
                        {facility.name}
                      </span>
                    ))
                  )}
                </div>
              </CardContent>

              <CardFooter className="mt-auto flex flex-col gap-3 px-4 pb-4 pt-0">
                {/* Time */}
                {hotel.checkInTime && hotel.checkOutTime ? (
                  <div className="grid w-full grid-cols-2 gap-3 rounded-lg bg-muted p-3 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Check In</p>
                      <p className="font-semibold">{hotel.checkInTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Check Out</p>
                      <p className="font-semibold">{hotel.checkOutTime}</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full rounded-lg bg-muted p-3 text-sm py-4 text-center">
                    The hotel is not booked yet
                  </div>
                )}

                <div className="flex w-full flex-wrap gap-2">
                  <PropertyDetails hotelData={hotel} />
                  <EditProperties hotelData={hotel} />
                  <DeleteProperties hotelData={hotel} onDelete={onDelete} />
                </div>
              </CardFooter>
            </Card>
          </Motion>
        );
      })}
    </div>
  );
};

export default PropertyCard;
