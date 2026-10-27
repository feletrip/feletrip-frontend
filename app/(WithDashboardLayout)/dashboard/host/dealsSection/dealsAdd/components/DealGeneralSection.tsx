"use client";

import { useFormContext } from "react-hook-form";
import { AlertCircle, Loader2, Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DealFormValues } from "../type/type";
import { HotelRoom } from "@/types/vendor/room";

interface HotelOption {
  id: string;
  title: string;
}

interface DealGeneralSectionProps {
  hotels: HotelOption[];
  rooms: HotelRoom[];
  isLoadingRooms: boolean;
  hasMoreHotels?: boolean;
  isLoadingMoreHotels?: boolean;
  onLoadMoreHotels?: () => void;
  hasMoreRooms?: boolean;
  isLoadingMoreRooms?: boolean;
  onLoadMoreRooms?: () => void;
}

export function DealGeneralSection({
  hotels,
  rooms = [],
  isLoadingRooms,
  hasMoreHotels = false,
  isLoadingMoreHotels = false,
  onLoadMoreHotels,
  hasMoreRooms = false,
  isLoadingMoreRooms = false,
  onLoadMoreRooms,
}: DealGeneralSectionProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<DealFormValues>();

  const selectedHotelId = watch("hotelId");
  const selectedRoomIds = watch("roomIds") || [];

  // Determine current value displayed in the Room Select dropdown
  const getSelectedRoomValue = () => {
    if (!selectedRoomIds.length) return "";
    if (selectedRoomIds.length === rooms.length && rooms.length > 0)
      return "ALL";
    return selectedRoomIds[0];
  };

  // Handle Hotel Selection
  const handleHotelChange = (hotelId: string) => {
    setValue("hotelId", hotelId, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    // Reset selected rooms when target hotel changes
    setValue("roomIds", [], { shouldValidate: true });
  };

  // Handle Room Selection via standard Select
  const handleRoomChange = (value: string) => {
    const updatedRoomIds =
      value === "ALL" ? rooms.map((room) => room.id) : [value];

    setValue("roomIds", updatedRoomIds, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Hotel & Room Selection Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Hotel Selector */}
        <div className="space-y-2">
          <Label htmlFor="hotel-select" className="text-sm font-semibold">
            Select Target Hotel <span className="text-rose-500">*</span>
          </Label>
          <Select
            value={selectedHotelId || ""}
            onValueChange={handleHotelChange}
          >
            <SelectTrigger
              id="hotel-select"
              className={`h-11 w-full rounded-xl bg-background transition-colors ${
                errors.hotelId
                  ? "border-rose-500 focus:ring-rose-500"
                  : "border-border"
              }`}
            >
              <SelectValue placeholder="Choose a hotel for this deal" />
            </SelectTrigger>
            <SelectContent className="rounded-xl py-1 max-h-60">
              {hotels.map((hotel) => (
                <SelectItem key={hotel.id} value={hotel.id}>
                  {hotel.title}
                </SelectItem>
              ))}

              {/* Dynamic Load More Option */}
              {hasMoreHotels && (
                <div className="p-1 pt-2 border-t border-border mt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isLoadingMoreHotels}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onLoadMoreHotels?.();
                    }}
                    className="w-11/12 mx-auto text-xs flex items-center justify-center gap-1.5 text-primary h-8 font-medium rounded-lg"
                  >
                    {isLoadingMoreHotels ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        Load More Hotels
                      </>
                    )}
                  </Button>
                </div>
              )}
            </SelectContent>
          </Select>
          {errors.hotelId && (
            <p className="text-xs text-rose-500">
              {errors.hotelId.message || "Please select a hotel."}
            </p>
          )}
        </div>

        {/* Room Selector using Shadcn Select */}
        <div className="space-y-2">
          <Label htmlFor="room-select" className="text-sm font-semibold">
            Select Target Rooms <span className="text-rose-500">*</span>{" "}
            {selectedHotelId && `(${rooms.length} loaded)`}
          </Label>

          {!selectedHotelId ? (
            <div className="flex h-9 w-full items-center rounded-xl border border-dashed border-border bg-muted/20 px-3 text-xs text-muted-foreground">
              Select a hotel first
            </div>
          ) : isLoadingRooms ? (
            <div className="flex h-9 w-full animate-pulse items-center rounded-xl border border-dashed border-border bg-muted/20 px-3 text-xs text-muted-foreground">
              Loading hotel rooms...
            </div>
          ) : rooms.length === 0 ? (
            <div className="flex h-9 w-full items-center gap-2 rounded-xl border border-dashed border-rose-500/30 bg-rose-500/10 px-3 text-xs font-medium text-rose-500">
              <AlertCircle size={14} /> No rooms available for this hotel.
            </div>
          ) : (
            <Select
              value={getSelectedRoomValue()}
              onValueChange={handleRoomChange}
            >
              <SelectTrigger
                id="room-select"
                className={`h-11 w-full rounded-xl bg-background transition-colors ${
                  errors.roomIds
                    ? "border-rose-500 focus:ring-rose-500"
                    : "border-border"
                }`}
              >
                <SelectValue placeholder="Choose room(s) for this deal" />
              </SelectTrigger>
              <SelectContent className="rounded-xl py-1 max-h-60">
                {rooms.length > 1 && (
                  <SelectItem
                    value="ALL"
                    className="font-semibold text-primary"
                  >
                    All Loaded Rooms ({rooms.length})
                  </SelectItem>
                )}
                {rooms.map((room) => (
                  <SelectItem key={room.id} value={room.id}>
                    {room.name} — {room.bedType} ({room.totalRooms} Left)
                  </SelectItem>
                ))}

                {/* Dynamic Load More Option for Rooms */}
                {hasMoreRooms && (
                  <div className="p-1 pt-2 border-t border-border mt-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isLoadingMoreRooms}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onLoadMoreRooms?.();
                      }}
                      className="w-11/12 mx-auto text-xs flex items-center justify-center gap-1.5 text-primary h-8 font-medium rounded-lg"
                    >
                      {isLoadingMoreRooms ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          Load More Rooms
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </SelectContent>
            </Select>
          )}

          {errors.roomIds && (
            <p className="text-xs text-rose-500">
              {errors.roomIds.message || "You must select at least one room."}
            </p>
          )}
        </div>
      </div>

      {/* Campaign Title & Promo Code Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-semibold">
            Deal Campaign Title <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="e.g., Exclusive Summer Flash Sale"
            className={`h-9 w-full rounded-xl border-border ${
              errors.title ? "border-rose-500 focus-visible:ring-rose-500" : ""
            }`}
            {...register("title")}
          />
          {errors.title && (
            <p className="text-xs text-rose-500">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="promoCode" className="text-sm font-semibold">
            Promo Coupon Code <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="promoCode"
            placeholder="e.g., SUMMERSALE30"
            className={`h-9 w-full rounded-xl border-border font-mono uppercase tracking-wider ${
              errors.promoCode
                ? "border-rose-500 focus-visible:ring-rose-500"
                : ""
            }`}
            {...register("promoCode")}
          />
          {errors.promoCode && (
            <p className="text-xs text-rose-500">{errors.promoCode.message}</p>
          )}
        </div>
      </div>

      {/* Campaign Description Row */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-semibold">
          Campaign Description
        </Label>
        <Textarea
          id="description"
          placeholder="Provide enticing details about what this deal offers..."
          className="min-h-28 w-full rounded-xl border-border resize-y"
          {...register("description")}
        />
      </div>
    </div>
  );
}
