"use client";

import { useState, useCallback, useMemo, memo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import {
  Bed,
  User,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  CalendarX2,
  ChevronUp,
  ChevronDown,
  Trash2,
  Loader2,
  X,
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/Reuseable/common/toast";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { useAuth } from "@/providers/authProvider";

import RoomConfigModal from "./RoomConfigModal";
import { TRoomCategory } from "@/types/hotel";
import { TRoom } from "@/types/room";
import {
  createBookingAction,
  ICreateBooking,
} from "@/Server/Rooms/roomBooking.action";
import { initiatePaymentAction } from "@/Server/payments/paymentAction";

// --- Types ---
type TRoomPhoto = string | { id?: string; photoUrl: string };
type TFacility = string | { id?: string; name: string };

interface RoomsSectionProps {
  rooms: TRoomCategory[];
}

export interface TSelectedRoom {
  room: TRoom;
  quantity: number;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  promoCode?: string;
}

// --- Utility Helpers ---
const getStayNights = (inDate: string, outDate: string): number => {
  if (!inDate || !outDate) return 1;
  const diff = new Date(outDate).getTime() - new Date(inDate).getTime();
  const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : 1;
};

const getPhotoUrl = (photo: TRoomPhoto | undefined): string => {
  if (!photo) return "";
  return typeof photo === "string" ? photo : photo.photoUrl || "";
};

// --- Sub-component: Memoized Room Card ---
interface RoomCardProps {
  room: TRoom;
  categoryName: string;
  isAdded: boolean;
  isSubmitting: boolean;
  priorityImage: boolean;
  onOpenConfig: (room: TRoom, categoryName: string) => void;
  onClearCart: () => void;
}

const RoomCard = memo(function RoomCard({
  room,
  categoryName,
  isAdded,
  isSubmitting,
  priorityImage,
  onOpenConfig,
  onClearCart,
}: RoomCardProps) {
  const isRoomActive = room.status === "active";
  const roomCount = Number(room.totalRooms) || 0;

  const typedPhotos = room.roomPhotos as TRoomPhoto[] | undefined;
  const firstPhotoUrl =
    typedPhotos && typedPhotos.length > 0 ? getPhotoUrl(typedPhotos[0]) : "";

  const amenities = (room.facilities || [
    "Free Wifi",
    "Air Conditioned",
    "Complimentary Breakfast",
  ]) as TFacility[];

  const visibleAmenities = amenities.slice(0, 2);
  const extraAmenitiesCount = amenities.length - visibleAmenities.length;

  return (
    <div
      className={`group bg-background relative flex flex-col overflow-hidden rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl ${
        isAdded
          ? "shadow-primary/10 border-2 border-primary"
          : "border border-border/50 hover:-translate-y-0.5"
      }`}
    >
      <div className="relative aspect-video w-full bg-muted overflow-hidden shrink-0">
        {firstPhotoUrl ? (
          <Image
            src={firstPhotoUrl}
            alt={room.name}
            fill
            priority={priorityImage}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-neutral-900 via-neutral-800 to-stone-900 flex flex-col items-center justify-center">
            <Bed className="h-6 w-6 text-neutral-600 mb-1" />
            <span className="text-[8px] text-neutral-500 font-mono tracking-widest uppercase">
              {room.name}
            </span>
          </div>
        )}

        <span className="absolute top-2 left-2 bg-background/80 border text-foreground text-xs font-bold px-2 pb-1 pt-0.5 rounded-md backdrop-blur-xs shadow-xs uppercase tracking-wider">
          {categoryName}
        </span>

        {/* Selected Badge with Quick Remove Action */}
        {isAdded && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-bold py-1 px-2 rounded-md shadow-md animate-in fade-in zoom-in-95 duration-200">
            <CheckCircle2 className="h-3 w-3" />
            <span>Selected</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClearCart();
              }}
              aria-label="Remove selection"
              className="ml-1 p-0.5 rounded-full hover:bg-primary-foreground/20 text-primary-foreground transition-colors cursor-pointer"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col justify-between flex-1 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-bold text-foreground tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
            {room.name}
          </h4>
          <span className="text-sm font-black text-foreground shrink-0">
            ৳{room.pricePerNight}
          </span>
        </div>

        <div className="flex flex-col gap-3.5 border-t border-muted pt-3 mt-auto">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium min-w-0">
            <span className="flex items-center gap-1 shrink-0">
              <Bed className="h-3.5 w-3.5 text-primary/80" /> {room.bedType}
            </span>
            <span className="opacity-30 font-light">|</span>
            <span className="flex items-center gap-1 truncate">
              <User className="h-3.5 w-3.5 text-primary/80" /> Max{" "}
              {room.maxGuests} Guests
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 min-h-4.5">
            {visibleAmenities.map((facility, idx) => {
              const facilityName =
                typeof facility === "string" ? facility : facility?.name || "";
              return (
                <span
                  key={idx}
                  className="inline-flex items-center gap-0.5 text-[10px] bg-muted px-1.5 py-0.5 rounded-sm text-muted-foreground max-w-25 truncate"
                >
                  <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500 shrink-0" />
                  <span className="truncate">{facilityName}</span>
                </span>
              );
            })}
            {extraAmenitiesCount > 0 && (
              <span className="text-[9px] font-bold text-primary bg-primary/5 px-1 py-0.5 rounded-sm border border-primary/10 shrink-0">
                +{extraAmenitiesCount} More
              </span>
            )}
          </div>

          {/* Actions Bar */}
          <div className="flex items-center gap-2 w-full">
            <Button
              variant={isAdded ? "default" : "secondary"}
              disabled={!isRoomActive || roomCount === 0 || isSubmitting}
              onClick={() => onOpenConfig(room, categoryName)}
              className="flex-1 flex items-center justify-center gap-1.5"
            >
              {isAdded ? "Change Setup" : "Book This Room"}
              <ArrowRight className="h-3 w-3 opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </Button>

            {/* Quick Clear Button */}
            {isAdded && (
              <Button
                type="button"
                variant="warning"
                size="icon"
                disabled={isSubmitting}
                onClick={onClearCart}
                title="Clear Selection"
                className="shrink-0 h-9 w-9 text-destructive! border-none! bg-destructive/10! hover:bg-destructive/20! hover:scale-100!"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

// --- Main Component ---
export default function RoomsSection({ rooms }: RoomsSectionProps) {
  const { user } = useAuth();
  const router = useRouter();

  const [cart, setCart] = useState<TSelectedRoom | null>(null);
  const [activeModalData, setActiveModalData] = useState<{
    room: TRoom;
    categoryName: string;
  } | null>(null);
  const [isCartExpanded, setIsCartExpanded] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Modal actions
  const openConfigModal = useCallback((room: TRoom, categoryName: string) => {
    setActiveModalData({ room, categoryName });
  }, []);

  const handleSaveRoomConfig = useCallback((configuredRoom: TSelectedRoom) => {
    if (configuredRoom.quantity === 0) {
      setCart(null);
    } else {
      setCart(configuredRoom);
    }
    setActiveModalData(null);
  }, []);

  const removeItem = useCallback(() => {
    setCart(null);
    setIsCartExpanded(false);
  }, []);

  // Calculated Price and Totals
  const stayNights = useMemo(() => {
    if (!cart) return 1;
    return getStayNights(cart.checkInDate, cart.checkOutDate);
  }, [cart]);

  const totalSelectedRooms = cart ? cart.quantity : 0;

  const totalCartPrice = useMemo(() => {
    if (!cart) return 0;
    return Number(cart.room.pricePerNight) * cart.quantity * stayNights;
  }, [cart, stayNights]);

  // Handle Checkout & Payment Initiation Flow
  const handleCheckout = async () => {
    if (!user) {
      toast.error(
        "You are not logged in",
        "Please log in or register before booking.",
      );
      return;
    }

    if (user.role?.name !== "Customer") {
      toast.error("Permission denied", "Only customers can make bookings.");
      return;
    }

    if (!cart) {
      toast.error(
        "No room selected",
        "Please select a room before proceeding.",
      );
      return;
    }

    const payload: ICreateBooking = {
      roomId: cart.room.id,
      checkInDate: cart.checkInDate,
      checkOutDate: cart.checkOutDate,
      numberOfRooms: cart.quantity,
      guestCount: cart.guestCount,
      ...(cart.promoCode && { promoCode: cart.promoCode }),
    };

    setIsSubmitting(true);
    toast.loading("Processing booking", "Creating your booking request...");

    try {
      const bookingRes = await createBookingAction(payload);

      if (!bookingRes?.success || !bookingRes?.data?.id) {
        toast.error(
          "Booking failed",
          bookingRes?.message || "Unable to complete your booking.",
        );
        setIsSubmitting(false);
        return;
      }

      const bookingId = bookingRes.data.id;

      toast.success(
        "Booking created",
        "Complete payment to confirm your booking.",
      );

      const paymentRes = await initiatePaymentAction(bookingId);

      setCart(null);
      setIsCartExpanded(false);

      if (paymentRes?.success && paymentRes?.data?.gatewayPageURL) {
        router.push(paymentRes.data.gatewayPageURL);
      } else {
        toast.error(
          "Payment initiation failed",
          paymentRes?.message || "Redirecting to your bookings list...",
        );
        router.push("/dashboard/user/myBookings");
      }
    } catch (error) {
      console.error("Booking & Payment error:", error);
      toast.error("An error occurred", "Redirecting to your bookings page.");
      setCart(null);
      setIsCartExpanded(false);
      router.push("/dashboard/user/myBookings");
    } finally {
      setIsSubmitting(false);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Flatten all rooms across categories into a unified list
  const allCategoryRooms = useMemo(() => {
    return (rooms || []).flatMap((category, catIdx) =>
      (category.rooms || []).map((room: TRoom) => ({
        room,
        categoryName: category.name,
        categoryId: category.id,
        priorityImage: catIdx === 0,
      }))
    );
  }, [rooms]);

  const categoriesWithRooms = useMemo(() => {
    return (rooms || []).filter((cat) => cat.rooms && cat.rooms.length > 0);
  }, [rooms]);

  const filteredRooms = useMemo(() => {
    if (selectedCategory === "all") {
      return allCategoryRooms;
    }
    return allCategoryRooms.filter(
      (item) => item.categoryId === selectedCategory
    );
  }, [allCategoryRooms, selectedCategory]);

  if (!rooms || rooms.length === 0 || allCategoryRooms.length === 0) {
    return (
      <section className="border-t border-muted/60 py-8 flex flex-col items-center justify-center text-center max-w-xl mx-auto px-4">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-150 animate-pulse" />
          <div className="relative h-16 w-16 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive">
            <CalendarX2 className="h-8 w-8 stroke-2" />
          </div>
        </div>
        <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">
          No Rooms Available Right Now
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mb-6">
          All rooms are currently fully booked or undergoing maintenance. Please
          adjust your stay dates or check out our other listings.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Refresh Status
          </Button>
          <Button size="sm" onClick={() => window.history.back()}>
            Explore Other Hotels
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6 sm:space-y-8 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold tracking-tight">Select Your Space</h2>
          <span className="text-xs bg-primary/10 text-primary font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Single Selection Enabled
          </span>
        </div>
        {allCategoryRooms.length > 0 && (
          <span className="text-xs text-muted-foreground font-medium">
            {filteredRooms.length} {filteredRooms.length === 1 ? "Space" : "Spaces"} Available
          </span>
        )}
      </div>

      {/* Category Filter Pills (when multiple categories exist) */}
      {categoriesWithRooms.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            }`}
          >
            All Spaces ({allCategoryRooms.length})
          </button>
          {categoriesWithRooms.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {category.name} ({category.rooms?.length || 0})
            </button>
          ))}
        </div>
      )}

      {/* Responsive Rooms Grid across all devices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5 sm:gap-6">
        {filteredRooms.map(({ room, categoryName, priorityImage }) => (
          <RoomCard
            key={room.id}
            room={room}
            categoryName={categoryName}
            isAdded={cart?.room.id === room.id}
            isSubmitting={isSubmitting}
            priorityImage={priorityImage}
            onOpenConfig={openConfigModal}
            onClearCart={removeItem}
          />
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="border border-dashed rounded-xl p-8 text-center bg-card text-muted-foreground">
          <p className="text-sm">No rooms found in this category.</p>
        </div>
      )}

      {/* Summary Floating Bar Panel */}
      <AnimatePresence>
        {cart && (
          <Motion
            animationType="fadeUp"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl bg-foreground text-background shadow-2xl rounded-2xl border border-primary/20 backdrop-blur-md z-50 overflow-hidden flex flex-col"
          >
            {/* Detailed Breakdown */}
            {isCartExpanded && (
              <div className="p-4 border-b border-background/10 max-h-60 overflow-y-auto space-y-3 bg-foreground/95">
                <p className="text-xs font-bold tracking-wider text-primary uppercase">
                  Booking Breakdown
                </p>
                <div className="divide-y divide-background/10">
                  <div className="flex items-center justify-between py-2.5 text-xs gap-4">
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <p className="font-bold truncate text-background">
                        {cart.room.name}
                      </p>
                      <p className="opacity-70 text-[10px] text-background/80">
                        {cart.quantity} {cart.quantity === 1 ? "Room" : "Rooms"}{" "}
                        • {cart.guestCount}{" "}
                        {cart.guestCount === 1 ? "Guest" : "Guests"} •{" "}
                        {stayNights} {stayNights === 1 ? "Night" : "Nights"}
                      </p>
                      <p className="text-[9px] opacity-60 font-mono text-background/70">
                        ({cart.checkInDate} to {cart.checkOutDate})
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-black text-primary">
                        ৳{totalCartPrice}
                      </span>
                      <button
                        disabled={isSubmitting}
                        onClick={removeItem}
                        className="p-1 hover:text-destructive text-background/60 transition-colors disabled:opacity-40 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Main Summary Bar */}
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center justify-between sm:justify-start gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsCartExpanded(!isCartExpanded)}
                    className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 hover:bg-primary/20 transition-colors cursor-pointer"
                  >
                    {isCartExpanded ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronUp className="h-5 w-5" />
                    )}
                  </button>
                  <div
                    className="cursor-pointer"
                    onClick={() => setIsCartExpanded(!isCartExpanded)}
                  >
                    <p className="text-xs font-medium opacity-80">
                      Selected Summary
                    </p>
                    <p className="text-sm font-bold flex items-center gap-1">
                      {totalSelectedRooms}{" "}
                      {totalSelectedRooms === 1 ? "Room" : "Rooms"} Selected
                      <span className="text-[10px] opacity-60 font-normal underline">
                        (click to view details)
                      </span>
                    </p>
                  </div>
                </div>
                <div className="text-right sm:hidden">
                  <p className="text-xs opacity-70">Total Est.</p>
                  <p className="text-base font-black text-primary">
                    ৳{totalCartPrice}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-0 pt-3 sm:pt-0 border-background/10">
                <div className="text-right hidden sm:block">
                  <p className="text-xs opacity-70">Total Est. Price</p>
                  <p className="text-base font-black text-primary">
                    ৳{totalCartPrice}
                  </p>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-55 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer"
                >
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  Confirm Booking
                </button>
              </div>
            </div>
          </Motion>
        )}
      </AnimatePresence>

      {activeModalData && (
        <RoomConfigModal
          isOpen={activeModalData !== null}
          onClose={() => setActiveModalData(null)}
          room={activeModalData.room}
          categoryName={activeModalData.categoryName}
          existingConfig={
            cart?.room.id === activeModalData.room.id ? cart : undefined
          }
          onSave={handleSaveRoomConfig}
        />
      )}
    </section>
  );
}
