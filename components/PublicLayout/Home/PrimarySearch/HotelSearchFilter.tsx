"use client";

import { useState, useEffect, useCallback } from "react";
import { MapPin, CalendarDays, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, startOfDay } from "date-fns";
import { DateRange } from "react-day-picker";
import { Counter } from "./GuestCounter";
import { DateFieldDisplay } from "./DateFieldDisplay";
import { GuestFieldDisplay } from "./GuestFieldDisplay";
import { LocationFieldDisplay, SelectedLocation } from "./LocationFieldDisplay";
import { useCurrentLocation } from "./useCurrentLocation";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HotelSearchFilter() {
  const router = useRouter();

  const {
    district: autoDistrict,
    address,
    setAddress,
    isLoading,
    detectLocation,
    isAutoDetected,
    locationData,
  } = useCurrentLocation();

  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null);

  const [hasManuallySelected, setHasManuallySelected] = useState(false);

  // Derived values for GPS handling
  const useAutoLocation = isAutoDetected && !hasManuallySelected;

  const effectiveSelectedLocation =
    useAutoLocation && locationData ? locationData : selectedLocation;

  const displayDistrict =
    useAutoLocation && autoDistrict
      ? autoDistrict
      : selectedLocation?.city ||
        selectedLocation?.district ||
        "Select Location";

  // Default to today and 2 days out (normalized to midnight)
  const [date, setDate] = useState<DateRange | undefined>(() => {
    const today = startOfDay(new Date());
    return {
      from: today,
      to: addDays(today, 2),
    };
  });

  const [openCalendar, setOpenCalendar] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Responsive screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 640);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Prevent background scroll on mobile calendar modal
  useEffect(() => {
    if (openCalendar && !isLargeScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openCalendar, isLargeScreen]);

  const handleDetectLocation = useCallback(() => {
    setSelectedLocation(null);
    setHasManuallySelected(false);
    detectLocation();
  }, [detectLocation]);

  const checkAvailability = () => {
    if (!date?.from || !date?.to) return;

    const latitude = effectiveSelectedLocation?.lat;
    const longitude = effectiveSelectedLocation?.lng;
    if (latitude == null || longitude == null) return;

    const query = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      radius: "10",
      checkIn: date.from.toISOString(),
      checkOut: date.to.toISOString(),
      adults: adults.toString(),
      children: children.toString(),
      rooms: rooms.toString(),
    });

    router.push(`/hotels/search?${query.toString()}`);
  };

  // Selection Handler matching Booking.com range logic
  const handleDateSelect = (
    _range: DateRange | undefined,
    selectedDay: Date,
  ) => {
    const normalizedDay = startOfDay(selectedDay);

    if (!date?.from || (date.from && date.to)) {
      setDate({ from: normalizedDay, to: undefined });
    } else {
      if (normalizedDay < date.from) {
        setDate({ from: normalizedDay, to: undefined });
      } else if (normalizedDay.getTime() === date.from.getTime()) {
        setDate({ from: normalizedDay, to: undefined });
      } else {
        setDate({ from: date.from, to: normalizedDay });
        setOpenCalendar(false);
      }
    }
  };

  const handleQuickDateSelect = (daysCount: number) => {
    const today = startOfDay(new Date());
    setDate({ from: today, to: addDays(today, daysCount) });
    setOpenCalendar(false);
  };

  return (
    <div className="relative w-full rounded-2xl bg-background shadow-xl">
      <div className="grid grid-cols-1 gap-1 p-2 pb-12 lg:grid-cols-12 lg:gap-0 lg:pb-10">
        {/* Location Section */}
        <div className="m-2 flex flex-col gap-3 rounded-lg border px-4 py-2 lg:col-span-4">
          <div className="flex items-center gap-2">
            <MapPin className="text-foreground/30" size={24} />
            <span className="max-w-full truncate text-lg font-semibold">
              {displayDistrict}
            </span>
          </div>

          <LocationFieldDisplay
            address={address}
            onAddressChange={setAddress}
            onDetectLocation={handleDetectLocation}
            isLoading={isLoading}
            isAutoDetected={useAutoLocation}
            onLocationSelect={(location) => {
              setHasManuallySelected(true);
              setSelectedLocation(location);
            }}
            onClearLocation={() => {
              setHasManuallySelected(true);
              setSelectedLocation(null);
            }}
          />
        </div>

        {/* Date Range Section */}
        <div
          onClick={() => setOpenCalendar(true)}
          className="grid cursor-pointer grid-cols-1 sm:grid-cols-2 lg:col-span-5"
        >
          {/* Check In */}
          <div className="m-2 flex flex-col gap-3 rounded-lg border px-4 py-2 transition hover:bg-muted/30">
            <div className="flex items-center gap-2">
              <CalendarDays className="text-foreground/30" size={24} />
              <span className="text-lg font-semibold">Check In</span>
            </div>
            <DateFieldDisplay value={date?.from} />
          </div>

          {/* Check Out */}
          <div className="m-2 flex flex-col gap-3 rounded-lg border px-4 py-2 transition hover:bg-muted/30">
            <div className="flex items-center gap-2">
              <CalendarDays className="text-foreground/30" size={24} />
              <span className="text-lg font-semibold">Check Out</span>
            </div>
            <DateFieldDisplay value={date?.to} />
          </div>
        </div>

        {/* Guests Section */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="m-2 flex cursor-pointer flex-col gap-3 rounded-lg border px-4 py-2 transition hover:bg-muted/30 lg:col-span-3">
              <div className="flex items-center gap-2">
                <Users className="text-foreground/30" size={22} />
                <span className="text-lg font-semibold">Guests</span>
              </div>
              <GuestFieldDisplay adults={adults} rooms={rooms}>
                {children}
              </GuestFieldDisplay>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-70 p-4" align="end">
            <Counter
              label="Adults"
              value={adults}
              setValue={setAdults}
              min={1}
            />
            <Counter label="Children" value={children} setValue={setChildren} />
            <Counter label="Rooms" value={rooms} setValue={setRooms} min={1} />
          </PopoverContent>
        </Popover>

        {/* Search / Check Availability Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 translate-y-1/2"
        >
          <Button
            className="rounded-2xl border-2 border-background px-8 py-6.5 text-xl font-medium text-white shadow-xl md:text-2xl"
            onClick={checkAvailability}
          >
            <span>Check Availability</span>
          </Button>
        </motion.div>
      </div>

      {/* Calendar Modal */}
      <AnimatePresence>
        {openCalendar && (
          <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 pt-24 backdrop-blur-sm">
            <div
              className="absolute inset-0"
              onClick={() => setOpenCalendar(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative z-10 my-4 mt-12 flex max-w-fit flex-col overflow-auto rounded-2xl border bg-background p-0 shadow-2xl lg:flex-row"
            >
              {/* Quick Preset Selections */}
              <div className="w-full shrink-0 space-y-2 border-b p-4 lg:w-40 lg:border-b-0 lg:border-r lg:pt-6">
                <p className="mb-2 hidden text-sm font-semibold lg:block">
                  Quick Selection
                </p>
                <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:pb-0">
                  <Button
                    className="justify-start text-xs text-foreground! hover:scale-100! hover:bg-accent bg-muted shrink-0 lg:w-full lg:text-sm"
                    onClick={() => handleQuickDateSelect(2)}
                  >
                    Weekend
                  </Button>
                  <Button
                    className="justify-start text-xs text-foreground! hover:scale-100! hover:bg-accent bg-muted shrink-0 lg:w-full lg:text-sm"
                    onClick={() => handleQuickDateSelect(7)}
                  >
                    1 Week
                  </Button>
                  <Button
                    className="justify-start text-xs text-foreground! hover:scale-100! hover:bg-accent bg-muted shrink-0 lg:w-full lg:text-sm"
                    onClick={() => handleQuickDateSelect(3)}
                  >
                    3 Nights
                  </Button>
                </div>
              </div>

              {/* Calendar Grid View */}
              <div className="flex flex-col items-center justify-center p-4">
                <Calendar
                  mode="range"
                  selected={date}
                  onSelect={handleDateSelect}
                  numberOfMonths={isLargeScreen ? 2 : 1}
                  defaultMonth={date?.from}
                  disabled={{ before: startOfDay(new Date()) }}
                  className="max-w-full rounded-lg"
                  classNames={{
                    months:
                      "flex flex-col sm:flex-row gap-6 justify-center relative",
                    month: "space-y-4",
                    caption: "flex justify-center relative items-center",
                    caption_label: "text-sm font-semibold",

                    nav: "absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-20 w-full justify-center z-20",
                    nav_button:
                      "h-9 w-9 rounded-md bg-muted/40 hover:bg-muted flex items-center justify-center transition border",
                    table: "w-full border-collapse mx-auto",
                    head_row: "flex justify-center",
                    head_cell:
                      "text-muted-foreground rounded-md w-9 sm:w-10 font-normal text-xs",
                    row: "flex w-full mt-2 justify-center",
                    cell: "relative text-center text-sm p-0",
                    day: "h-9 w-9 sm:h-10 sm:w-10 rounded-full hover:bg-amber-100 transition-all duration-200 flex items-center justify-center",
                    day_selected: "bg-amber-600 text-white hover:bg-amber-600",
                    day_today: "border border-amber-400",
                    day_range_middle: "bg-amber-100 rounded-none",
                    day_range_start: "bg-amber-600 text-white rounded-full",
                    day_range_end: "bg-amber-600 text-white rounded-full",
                  }}
                />

                {date?.from && date?.to && (
                  <div className="mt-4 rounded-full bg-amber-50 px-4 py-1.5 text-center text-sm font-medium text-destructive">
                    {Math.ceil(
                      (date.to.getTime() - date.from.getTime()) /
                        (1000 * 60 * 60 * 24),
                    )}{" "}
                    nights selected
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
