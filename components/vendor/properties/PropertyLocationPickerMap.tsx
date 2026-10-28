"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
  useMap,
  useMapsLibrary,
  MapMouseEvent,
} from "@vis.gl/react-google-maps";
import { Loader2, MapPin } from "lucide-react";

export interface SelectedMapLocation {
  address: string;
  city: string;
  lat: number;
  lng: number;
}

interface PropertyLocationPickerMapProps {
  latitude?: number;
  longitude?: number;
  address?: string;
  city?: string;
  onLocationSelect: (location: SelectedMapLocation) => void;
}

const GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

function MapCenterController({ center }: { center: { lat: number; lng: number } }) {
  const map = useMap();
  const prevCenterRef = useRef<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!map) return;
    if (!prevCenterRef.current) {
      prevCenterRef.current = center;
      map.setCenter(center);
      return;
    }

    const diff =
      Math.abs(prevCenterRef.current.lat - center.lat) +
      Math.abs(prevCenterRef.current.lng - center.lng);

    if (diff > 0.0001) {
      prevCenterRef.current = center;
      map.panTo(center);
    }
  }, [center, map]);

  return null;
}

function InnerLocationPicker({
  latitude,
  longitude,
  address,
  city,
  onLocationSelect,
}: PropertyLocationPickerMapProps) {
  const defaultCenter = useMemo(
    () => ({ lat: 23.8103, lng: 90.4125 }), // Dhaka, Bangladesh
    []
  );

  const currentPosition = useMemo(() => {
    if (
      typeof latitude === "number" &&
      !Number.isNaN(latitude) &&
      typeof longitude === "number" &&
      !Number.isNaN(longitude)
    ) {
      return { lat: latitude, lng: longitude };
    }
    return defaultCenter;
  }, [latitude, longitude, defaultCenter]);

  const [markerPos, setMarkerPos] = useState<{ lat: number; lng: number }>(
    currentPosition
  );
  const [isResolving, setIsResolving] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setMarkerPos(currentPosition);
  }, [currentPosition]);

  const geocodingLib = useMapsLibrary("geocoding");
  const geocoder = useMemo(
    () => (geocodingLib ? new geocodingLib.Geocoder() : null),
    [geocodingLib]
  );

  const reverseGeocode = useCallback(
    async (lat: number, lng: number) => {
      setIsResolving(true);

      // Method 1: Google Maps Geocoder (Native client)
      if (geocoder) {
        try {
          const response = await geocoder.geocode({
            location: { lat, lng },
          });

          if (response.results && response.results.length > 0) {
            const best = response.results[0];
            const fullAddress = best.formatted_address;

            let detectedCity = "";
            for (const comp of best.address_components) {
              if (
                comp.types.includes("locality") ||
                comp.types.includes("administrative_area_level_2")
              ) {
                detectedCity = comp.long_name;
                break;
              }
              if (
                !detectedCity &&
                comp.types.includes("administrative_area_level_1")
              ) {
                detectedCity = comp.long_name;
              }
            }

            onLocationSelect({
              address: fullAddress,
              city: detectedCity || city || "",
              lat,
              lng,
            });
            setIsResolving(false);
            return;
          }
        } catch (err) {
          console.warn("Google Geocoder warning/fallback:", err);
        }
      }

      // Method 2: Fallback to Geoapify if available
      const geoapifyKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
      if (geoapifyKey) {
        try {
          const res = await fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${geoapifyKey}`
          );
          if (res.ok) {
            const data = await res.json();
            const props = data.features?.[0]?.properties;
            if (props) {
              const fullAddress =
                props.formatted || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
              const rawCity =
                props.city || props.county || props.state || props.suburb || "";
              const cleanCity = rawCity
                .replace(/\s*(District|Division)\s*/gi, "")
                .trim();

              onLocationSelect({
                address: fullAddress,
                city: cleanCity || city || "",
                lat,
                lng,
              });
              setIsResolving(false);
              return;
            }
          }
        } catch (fallbackErr) {
          console.error("Geoapify fallback error:", fallbackErr);
        }
      }

      // Default fallback
      onLocationSelect({
        address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
        city: city || "",
        lat,
        lng,
      });
      setIsResolving(false);
    },
    [geocoder, city, onLocationSelect]
  );

  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarkerPos({ lat, lng });
      setShowInfo(true);
      reverseGeocode(lat, lng);
    }
  };

  const handleMapClick = (e: MapMouseEvent) => {
    if (e.detail?.latLng) {
      const { lat, lng } = e.detail.latLng;
      setMarkerPos({ lat, lng });
      setShowInfo(true);
      reverseGeocode(lat, lng);
    }
  };

  const hasCoordinates =
    typeof latitude === "number" && typeof longitude === "number";

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-border shadow-sm bg-muted">
      {/* Interactive Google Map */}
      <div className="h-[450px] sm:h-[520px] md:h-[580px] lg:h-[640px] w-full">
        <Map
          defaultCenter={currentPosition}
          defaultZoom={hasCoordinates ? 15 : 12}
          gestureHandling={"cooperative"}
          disableDefaultUI={false}
          className="h-full w-full"
          onClick={handleMapClick}
        >
          <MapCenterController center={currentPosition} />

          <Marker
            position={markerPos}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
            onClick={() => setShowInfo(!showInfo)}
          />

          {showInfo && (
            <InfoWindow
              position={markerPos}
              onCloseClick={() => setShowInfo(false)}
            >
              <div className="text-xs text-black p-1 max-w-xs">
                <strong className="block font-semibold mb-1">
                  Property Location
                </strong>
                <p className="text-gray-600 text-[11px] mb-1">
                  {address || "Drag pin or click map to move"}
                </p>
                <div className="text-[10px] text-blue-600 font-mono">
                  {markerPos.lat.toFixed(5)}, {markerPos.lng.toFixed(5)}
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>

      {/* Bottom Status & Instruction Bar */}
      <div className="bg-background/95 border-t border-border px-3.5 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>💡 Click anywhere on map or drag pin to set location</span>
          {isResolving && (
            <span className="flex items-center gap-1.5 text-primary font-medium">
              <Loader2 size={12} className="animate-spin" /> Resolving address...
            </span>
          )}
        </div>

        {hasCoordinates && (
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-foreground/80 bg-muted px-2.5 py-0.5 rounded-md border border-border">
            <MapPin size={11} className="text-primary shrink-0" />
            <span>
              {latitude?.toFixed(4)}, {longitude?.toFixed(4)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PropertyLocationPickerMap(
  props: PropertyLocationPickerMapProps
) {
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="h-[450px] w-full rounded-2xl border border-destructive/30 bg-destructive/5 flex items-center justify-center p-6 text-center text-sm text-destructive">
        Google Maps API key is missing. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        to your .env file.
      </div>
    );
  }

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY} libraries={["geocoding", "places"]}>
      <InnerLocationPicker {...props} />
    </APIProvider>
  );
}
