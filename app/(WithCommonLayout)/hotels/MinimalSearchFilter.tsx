"use client";

import { useState } from "react";
import {
  CalendarDays,
  Users,
  Search,
  User,
  Baby,
  BedDouble,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, format, startOfDay } from "date-fns";
import { DateRange } from "react-day-picker";
import { useRouter, useSearchParams } from "next/navigation";
import { useCurrentLocation } from "@/components/PublicLayout/Home/PrimarySearch/useCurrentLocation";
import { LocationFieldDisplay } from "@/components/PublicLayout/Home/PrimarySearch/LocationFieldDisplay";
import { Counter } from "@/components/PublicLayout/Home/PrimarySearch/GuestCounter";

interface SelectedLocation {
  address: string;
  district: string;
  city: string;
  lat: number;
  lng: number;
}

export default function MinimalSearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    useState<SelectedLocation | null>(() => {
      const lat = searchParams.get("latitude");
      const lng = searchParams.get("longitude");
      if (lat && lng) {
        return {
          address: "Selected Area",
          district: "",
          city: "",
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        };
      }
      return null;
    });

  const [hasManuallySelected, setHasManuallySelected] = useState(false);

  const useAutoLocation = isAutoDetected && !hasManuallySelected;
  const effectiveSelectedLocation =
    useAutoLocation && locationData ? locationData : selectedLocation;

  const displayDistrict =
    useAutoLocation && autoDistrict
      ? autoDistrict
      : selectedLocation?.city ||
        selectedLocation?.district ||
        "Select Location";

  const [date, setDate] = useState<DateRange | undefined>(() => {
    const checkInParam = searchParams.get("checkIn");
    const checkOutParam = searchParams.get("checkOut");
    const today = startOfDay(new Date());
    return {
      from: checkInParam ? startOfDay(new Date(checkInParam)) : today,
      to: checkOutParam
        ? startOfDay(new Date(checkOutParam))
        : addDays(today, 1),
    };
  });

  const [openCalendar, setOpenCalendar] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const handleDetectLocation = () => {
    setSelectedLocation(null);
    setHasManuallySelected(false);
    detectLocation();
  };

  const handleSearch = () => {
    if (!date?.from || !date?.to) return;

    const latitude = effectiveSelectedLocation?.lat;
    const longitude = effectiveSelectedLocation?.lng;
    if (latitude == null || longitude == null) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("latitude", latitude.toString());
    params.set("longitude", longitude.toString());
    params.set("radius", "10");
    params.set("checkIn", date.from.toISOString());
    params.set("checkOut", date.to.toISOString());
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  // Custom Selection Handler matching Booking.com logic
  const handleDateSelect = (
    range: DateRange | undefined,
    selectedDay: Date,
  ) => {
    const normalizedDay = startOfDay(selectedDay);

    // Case 1: No check-in date is selected, or both check-in and checkout are already selected.
    // We start a brand new selection.
    if (!date?.from || (date.from && date.to)) {
      setDate({ from: normalizedDay, to: undefined });
    }
    // Case 2: We have a start date but no end date yet.
    else {
      if (normalizedDay < date.from) {
        // If clicked day is before the start date, make it the new start date
        setDate({ from: normalizedDay, to: undefined });
      } else if (normalizedDay.getTime() === date.from.getTime()) {
        // If they click the start date again, keep it as start and clear the end
        setDate({ from: normalizedDay, to: undefined });
      } else {
        // Clicked date is after start date -> set checkout and close the calendar popover
        setDate({ from: date.from, to: normalizedDay });
        setOpenCalendar(false);
      }
    }
  };

  return (
    <div className="w-full bg-background backdrop-blur-md shadow-xl rounded-2xl p-2 mb-6 border border-border/50 transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 items-center gap-y-1 md:gap-y-0 divide-y md:divide-y-0 divide-border/40 xl:divide-x">
        {/* Destination (Location Field) */}
        <div className="col-span-1 md:col-span-2 xl:col-span-4 flex items-center gap-3.5 px-4 py-2.5 h-16 hover:bg-muted/30 rounded-t-xl xl:rounded-tr-none xl:rounded-l-xl transition-colors duration-200">
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-bold text-muted-foreground/80 block uppercase tracking-wider mb-0.5">
              Destination
            </span>
            <LocationFieldDisplay
              district={displayDistrict}
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
        </div>

        {/* Date Range Field */}
        <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
          <PopoverTrigger asChild>
            <button className="col-span-1 md:col-span-1 xl:col-span-3 flex items-center gap-3.5 px-5 py-2.5 text-left h-16 hover:bg-muted/30 transition-colors duration-200 focus:outline-none md:border-t md:border-b xl:border-t-0 xl:border-b-0 border-border/40">
              <div className="p-2.5 bg-primary/5 text-primary rounded-xl shrink-0">
                <CalendarDays size={18} className="stroke-[2.2]" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold text-muted-foreground/80 block uppercase tracking-wider mb-0.5">
                  Dates of Stay
                </span>
                <span className="text-sm font-semibold truncate block text-foreground/90">
                  {date?.from && date?.to
                    ? `${format(date.from, "dd MMM")} - ${format(date.to, "dd MMM")}`
                    : date?.from
                      ? `${format(date.from, "dd MMM")} - Select checkout`
                      : "Select dates"}
                </span>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 overflow-hidden rounded-3xl shadow-2xl border border-border/60"
            align="center"
          >
            <Calendar
              mode="range"
              selected={date}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              defaultMonth={date?.from}
              disabled={{ before: startOfDay(new Date()) }}
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        {/* Guests Configuration Selector */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="col-span-1 md:col-span-1 xl:col-span-3 flex items-center gap-3.5 px-5 py-2.5 text-left h-16 hover:bg-muted/30 transition-colors duration-200 focus:outline-none md:border-t md:border-b md:border-l xl:border-none border-border/40">
              <div className="p-2.5 bg-primary/5 text-primary rounded-xl shrink-0">
                <Users size={18} className="stroke-[2.2]" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold text-muted-foreground/80 block uppercase tracking-wider mb-0.5">
                  guest
                </span>

                <div className="flex items-center gap-3 mt-0.5">
                  <span className="flex items-center gap-1 text-sm font-semibold text-foreground/90">
                    <User size={13} className="text-muted-foreground/80" />
                    <span>{adults}</span>
                  </span>
                  <span className="text-muted-foreground/30 text-xs">•</span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-foreground/90">
                    <Baby size={13} className="text-muted-foreground/80" />
                    <span>{children}</span>
                  </span>
                  <span className="text-muted-foreground/30 text-xs">•</span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-foreground/90">
                    <BedDouble size={13} className="text-muted-foreground/80" />
                    <span>{rooms}</span>
                  </span>
                </div>
              </div>
              <ChevronDown
                size={14}
                className="text-muted-foreground/60 shrink-0 ml-auto"
              />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-72 p-5 rounded-3xl shadow-2xl border border-border/60"
            align="end"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1 border-b border-border/40">
                <h4 className="font-bold text-sm text-foreground/80">
                  Configure Rooms & Guests
                </h4>
              </div>

              <div className="space-y-3.5">
                {/* Adults Count */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-muted rounded-lg text-muted-foreground">
                      <User size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">Adults</span>
                      <span className="text-[10px] text-muted-foreground">
                        Age 13 or above
                      </span>
                    </div>
                  </div>
                  <Counter
                    label=""
                    value={adults}
                    setValue={setAdults}
                    min={1}
                  />
                </div>

                {/* Children Count */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-muted rounded-lg text-muted-foreground">
                      <Baby size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">Children</span>
                      <span className="text-[10px] text-muted-foreground">
                        Ages 0 to 12
                      </span>
                    </div>
                  </div>
                  <Counter label="" value={children} setValue={setChildren} />
                </div>

                {/* Rooms Count */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-muted rounded-lg text-muted-foreground">
                      <BedDouble size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold">Rooms</span>
                      <span className="text-[10px] text-muted-foreground">
                        Number of rooms needed
                      </span>
                    </div>
                  </div>
                  <Counter label="" value={rooms} setValue={setRooms} min={1} />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Action Search Button */}
        <div className="col-span-1 md:col-span-2 xl:col-span-2 p-2 h-16 flex items-center justify-center">
          <Button
            onClick={handleSearch}
            disabled={
              !effectiveSelectedLocation?.lat || !date?.from || !date?.to
            }
            className="w-full h-12 rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 active:scale-[0.98] transition-transform"
          >
            <Search size={18} className="stroke-[2.5]" />
            <span>Search</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
