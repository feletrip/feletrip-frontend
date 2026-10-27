"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  CreateHotelData,
  getVendorHotel,
} from "@/Server/Vendor/vendorHotel.action";

import {
  AlertTriangle,
  Hotel,
  BedDouble,
  Building2,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import HotelGallery from "./HotelGallery";
import RoomGallery from "./RoomGallery";
import PhotoHeaderBanner from "./PhotoHeaderBanner";
import { Motion } from "@/components/Reuseable/common/Framermotion";

interface PhotosGalleryProps {
  hotels: CreateHotelData[];

  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

type GalleryType = "hotel" | "room";

const PhotosGallery = ({
  hotels: initialHotels,
  pagination,
}: PhotosGalleryProps) => {
  const [hotels, setHotels] = useState<CreateHotelData[]>(initialHotels);

  const [selectedHotelId, setSelectedHotelId] = useState<string>(
    initialHotels[0]?.id ? String(initialHotels[0].id) : "",
  );

  const [activeType, setActiveType] = useState<GalleryType>("hotel");

  const [page, setPage] = useState(pagination?.page || 1);

  const [loadingMore, setLoadingMore] = useState(false);

  const currentHotel = hotels.find((h) => String(h.id) === selectedHotelId);

  const hasMore = pagination && page < pagination.totalPages;

  async function handleLoadMore() {
    if (!hasMore || loadingMore) return;

    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      const response = await getVendorHotel(nextPage, pagination?.limit || 10);

      if (response.success && response.data) {
        setHotels((prev) => [...prev, ...response.data!]);

        setPage(nextPage);
      }
    } catch (error) {
      console.error("Failed loading more hotels", error);
    } finally {
      setLoadingMore(false);
    }
  }

  if (!initialHotels || initialHotels.length === 0) {
    return (
      <div className="max-w-2xl mx-auto my-8">
        <Motion className="relative overflow-hidden bg-destructive/5 border border-destructive/15 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center space-y-4 shadow-xs">
          <div className="p-3.5 bg-destructive/10 text-destructive rounded-full border border-destructive/20 animate-pulse">
            <AlertTriangle className="size-7" />
          </div>

          <div className="space-y-1.5 max-w-md">
            <h3 className="text-base font-bold text-foreground">
              No Active Workspace Property Found
            </h3>

            <p className="text-xs text-muted-foreground">
              It looks like you haven&apos;t boarded any operational hotels yet.
            </p>
          </div>
        </Motion>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PhotoHeaderBanner activeType={activeType} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border/60 shadow-xs">
        {/* Hotel Dropdown */}

        <div className="w-full md:max-w-xs space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="size-3.5 text-primary" />
            Select Property
          </label>

          <Select
            onValueChange={(value) => setSelectedHotelId(value)}
            value={selectedHotelId}
          >
            <SelectTrigger className="w-full h-11 bg-background border-border/80 hover:border-primary/50 transition-colors rounded-xl shadow-none">
              <SelectValue placeholder="Choose a hotel" />
            </SelectTrigger>

            <SelectContent className="rounded-xl border-border/80 shadow-lg">
              {hotels.map((hotel) => (
                <SelectItem
                  key={hotel.id}
                  value={String(hotel.id)}
                  className="rounded-lg cursor-pointer focus:bg-primary/10 focus:text-primary"
                >
                  <div className="flex items-center gap-2">

                    <span>{hotel.name}</span>
                  </div>
                </SelectItem>
              ))}
              <div className="flex justify-center">
                {hasMore && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="mt-6 mb-3"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load More Property"
                    )}
                  </Button>
                )}
              </div>
            </SelectContent>
          </Select>
        </div>

        {/* Gallery Toggle */}

        <div className="flex items-center gap-1.5 bg-muted/60 p-1.5 rounded-xl border border-border/40 w-full md:w-auto">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setActiveType("hotel")}
            className={`flex-1 md:flex-none h-10 px-5 rounded-lg text-sm font-semibold transition-all duration-200 gap-2 ${
              activeType === "hotel"
                ? "bg-background text-primary shadow-xs hover:bg-background hover:text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-transparent"
            }`}
          >
            <Hotel className="size-4" />
            Hotel Gallery
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => setActiveType("room")}
            className={`flex-1 md:flex-none h-10 px-5 rounded-lg text-sm font-semibold transition-all duration-200 gap-2 ${
              activeType === "room"
                ? "bg-background text-primary shadow-xs hover:bg-background hover:text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-transparent"
            }`}
          >
            <BedDouble className="size-4" />
            Room Gallery
          </Button>
        </div>
      </div>

      {activeType === "hotel" ? (
        <HotelGallery
          hotelName={currentHotel?.name}
          hotelId={selectedHotelId}
        />
      ) : (
        <RoomGallery hotelName={currentHotel?.name} hotelId={selectedHotelId} />
      )}
    </div>
  );
};

export default PhotosGallery;
