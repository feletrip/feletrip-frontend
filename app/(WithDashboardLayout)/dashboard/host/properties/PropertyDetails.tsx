import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateHotelData } from "@/Server/Vendor/vendorHotel.action";
import { MapPin, Phone, Clock } from "lucide-react";

const PropertyDetails = ({ hotelData }: { hotelData: CreateHotelData }) => {
  const coverImage =
    hotelData.hotelPhotos?.find((photo) => photo.isCover)?.photoUrl ||
    hotelData.hotelPhotos?.[0]?.photoUrl;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex-1">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl no-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {hotelData.name.trim()}
          </DialogTitle>
          <DialogDescription>
            Complete hotel information and configuration
          </DialogDescription>
        </DialogHeader>
        {/* IMAGE */}
        <div className="relative h-64 w-full overflow-hidden rounded-xl bg-muted">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={hotelData.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Image not found
            </div>
          )}
        </div>
        {/* BASIC INFO */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Category</p>
            <p className="font-medium">{hotelData.category?.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <p
              className={`font-semibold ${
                hotelData.status === "ACTIVE"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {hotelData.status}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={15} />
              Location
            </p>
            <p className="font-medium">{hotelData.address}</p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone size={15} />
              Phone
            </p>
            <p className="font-medium">{hotelData.phone}</p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={15} />
              Check In / Out
            </p>
            <p className="font-medium">
              {hotelData.checkInTime} - {hotelData.checkOutTime}
            </p>
          </div>
        </div>
        {/* FACILITIES */}
        <div className="mt-6">
          <h3 className="mb-3 font-semibold">Facilities</h3>

          <div className="flex flex-wrap gap-2">
            {hotelData.facilities?.map((facility) => (
              <p
                key={facility.id}
                className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground font-bold capitalize"
              >
                {facility.name}
              </p>
            ))}
          </div>
        </div>
        {/* DESCRIPTION */}
        <div className="mt-6">
          <h3 className="mb-2 font-semibold">Description</h3>
          <p className="text-sm leading-relaxed text-muted-foreground text-justify ">
            {hotelData.description}
          </p>
        </div>
        {/* POLICY */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold">Cancellation Policy</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-justify ">
              {hotelData.cancellationPolicy}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Vendor</p>
            <p className="font-medium">{hotelData.vendor?.name}</p>
            <p className="text-xs text-muted-foreground">
              {hotelData.vendor?.email}
            </p>
          </div>
        </div>
        {/* META */}
        <div className="mt-5 text-xs text-muted-foreground">
          Created:
          {hotelData.createdAt
            ? new Date(hotelData.createdAt).toLocaleString()
            : "N/A"}
        </div>
        <DialogFooter className="mt-5">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetails;
