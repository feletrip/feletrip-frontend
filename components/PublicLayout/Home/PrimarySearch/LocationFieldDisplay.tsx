"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Locate, LocateFixed, MapPin } from "lucide-react";

export interface SelectedLocation {
  address: string;
  district: string;
  city: string;
  lat: number;
  lng: number;
}

interface LocationFieldDisplayProps {
  district?: string; // <-- Added district prop
  address: string;
  onAddressChange: (value: string) => void;
  onDetectLocation: () => void;
  onLocationSelect?: (data: SelectedLocation) => void;
  onClearLocation?: () => void;
  isLoading?: boolean;
  isAutoDetected?: boolean;
}

interface GeoapifySuggestion {
  properties: {
    place_id: string;
    formatted: string;
    city?: string;
    county?: string;
    state?: string;
    country?: string;
  };
  geometry: {
    coordinates: [number, number];
  };
}

const DISTRICT_CLEAN_REGEX = /\s*(District|Division)\s*/gi;

function getLocationLabel(
  properties: GeoapifySuggestion["properties"],
): string {
  const label =
    properties.city ||
    properties.county ||
    properties.state ||
    properties.country ||
    "";

  return label.replace(DISTRICT_CLEAN_REGEX, "").trim();
}

export const LocationFieldDisplay = ({
  district,
  address,
  onAddressChange,
  onDetectLocation,
  onLocationSelect,
  onClearLocation,
  isLoading = false,
  isAutoDetected = false,
}: LocationFieldDisplayProps) => {
  const [suggestions, setSuggestions] = useState<GeoapifySuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Search locations logic with debouncing and fetch cancellation
  useEffect(() => {
    // Only search if user is actively typing and threshold is met
    if (!isTyping || address.trim().length < 3) {
      return;
    }

    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      try {
        setIsSearching(true);

        const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
            address,
          )}&filter=countrycode:bd&limit=5&apiKey=${apiKey}`,
          { signal: controller.signal },
        );

        if (!response.ok)
          throw new Error("Failed to fetch autocomplete suggestions");

        const data = await response.json();
        setSuggestions(data.features || []);
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Geoapify location search failed:", error);
          setSuggestions([]);
        }
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [address, isTyping]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle selecting a suggestion from dropdown
  const handleSelectSuggestion = (item: GeoapifySuggestion) => {
    const fullAddress = item.properties.formatted;
    const districtName = getLocationLabel(item.properties);
    const cityName = item.properties.city || districtName;
    const [lng, lat] = item.geometry.coordinates;

    setIsTyping(false);
    setSuggestions([]);

    onAddressChange(fullAddress);

    onLocationSelect?.({
      address: fullAddress,
      district: districtName,
      city: cityName,
      lat,
      lng,
    });
  };

  // Handle detecting GPS location button click
  const handleCurrentLocationClick = () => {
    setIsTyping(false);
    setSuggestions([]);
    onDetectLocation();
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div className="flex items-center gap-2 lg:flex-row-reverse">
        <button
          type="button"
          onClick={handleCurrentLocationClick}
          disabled={isLoading}
          aria-label="Detect current location"
          className="cursor-pointer p-0.5 transition disabled:opacity-50"
        >
          <span
            className={`transition-all hover:text-foreground/50 ${
              isAutoDetected ? "text-foreground/30" : "text-foreground/20"
            } ${isLoading || isSearching ? "animate-pulse duration-500" : ""}`}
          >
            {isAutoDetected ? <LocateFixed size={20} /> : <Locate size={20} />}
          </span>
        </button>

        <div className="h-10 w-px shrink-0 bg-border" />

        <div className="flex w-full flex-col">
          <div className="relative flex w-full items-center">
            <Input
              type="text"
              value={isLoading ? "Getting your location..." : address}
              disabled={isLoading}
              placeholder={district || "Enter your destination"}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                const newValue = e.target.value;
                setIsTyping(true);

                // Clear suggestions immediately on input change
                if (newValue.trim().length < 3) {
                  setSuggestions([]);
                }

                onClearLocation?.();
                onAddressChange(newValue);
              }}
              className="w-full text-sm lg:text-base"
            />

            {isSearching && (
              <div className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            )}
          </div>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 z-[1000] mt-2 overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
          {suggestions.map((item, index) => (
            <button
              key={item.properties.place_id || index}
              type="button"
              onClick={() => handleSelectSuggestion(item)}
              className="flex w-full items-center gap-3 border-b border-border/40 px-4 py-3 text-left transition-colors hover:bg-accent hover:text-accent-foreground last:border-b-0"
            >
              <MapPin size={16} className="shrink-0 text-primary" />
              <p className="line-clamp-2 flex-1 text-sm leading-5 text-foreground/90">
                {item.properties.formatted}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
