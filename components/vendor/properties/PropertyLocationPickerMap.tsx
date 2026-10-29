"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { Loader2, MapPin, Navigation } from "lucide-react";

const customIcon =
  typeof window !== "undefined"
    ? new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })
    : undefined;

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

// Helper component to smoothly center map when coordinates change externally
function MapCenterController({ center }: { center: [number, number] }) {
  const map = useMap();
  const prevCenterRef = useRef<[number, number] | null>(null);

  useEffect(() => {
    if (!prevCenterRef.current) {
      prevCenterRef.current = center;
      map.setView(center, map.getZoom());
      return;
    }

    const [prevLat, prevLng] = prevCenterRef.current;
    const [lat, lng] = center;
    const diff = Math.abs(prevLat - lat) + Math.abs(prevLng - lng);

    // Only fly to new center if difference is noticeable
    if (diff > 0.0001) {
      prevCenterRef.current = center;
      map.flyTo(center, Math.max(map.getZoom(), 15), {
        duration: 1.2,
      });
    }
  }, [center, map]);

  return null;
}

// Click listener to place marker anywhere on map
function MapClickHandler({
  onMapClick,
}: {
  onMapClick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
}

export default function PropertyLocationPickerMap({
  latitude,
  longitude,
  address,
  city,
  onLocationSelect,
}: PropertyLocationPickerMapProps) {
  // Default coordinates (Dhaka, Bangladesh) if nothing selected yet
  const defaultCenter: [number, number] = [23.8103, 90.4125];

  const currentPosition: [number, number] = useMemo(() => {
    if (
      typeof latitude === "number" &&
      !Number.isNaN(latitude) &&
      typeof longitude === "number" &&
      !Number.isNaN(longitude)
    ) {
      return [latitude, longitude];
    }
    return defaultCenter;
  }, [latitude, longitude]);

  const [markerPos, setMarkerPos] = useState<[number, number]>(currentPosition);
  const [isResolving, setIsResolving] = useState(false);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    setMarkerPos(currentPosition);
  }, [currentPosition]);

  // Reverse geocoding using Geoapify API
  const reverseGeocode = async (lat: number, lng: number) => {
    const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
    if (!apiKey) {
      console.warn("NEXT_PUBLIC_GEOAPIFY_API_KEY is not defined.");
      onLocationSelect({
        address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
        city: city || "",
        lat,
        lng,
      });
      return;
    }

    try {
      setIsResolving(true);
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${apiKey}`
      );

      if (!res.ok) {
        throw new Error("Failed to reverse geocode location");
      }

      const data = await res.json();
      const feature = data.features?.[0];
      const props = feature?.properties;

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
      } else {
        onLocationSelect({
          address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
          city: city || "",
          lat,
          lng,
        });
      }
    } catch (err) {
      console.error("Geoapify Reverse Geocode error:", err);
      onLocationSelect({
        address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
        city: city || "",
        lat,
        lng,
      });
    } finally {
      setIsResolving(false);
    }
  };

  const handleMarkerDragEnd = () => {
    const marker = markerRef.current;
    if (marker) {
      const latlng = marker.getLatLng();
      setMarkerPos([latlng.lat, latlng.lng]);
      reverseGeocode(latlng.lat, latlng.lng);
    }
  };

  const handleMapClick = (lat: number, lng: number) => {
    setMarkerPos([lat, lng]);
    reverseGeocode(lat, lng);
  };

  const hasCoordinates =
    typeof latitude === "number" && typeof longitude === "number";

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-border shadow-sm bg-muted">
      {/* Interactive Map */}
      <div className="h-[450px] sm:h-[520px] md:h-[580px] lg:h-[640px] w-full">
        <MapContainer
          center={currentPosition}
          zoom={hasCoordinates ? 15 : 12}
          scrollWheelZoom={true}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapCenterController center={currentPosition} />
          <MapClickHandler onMapClick={handleMapClick} />

          <Marker
            position={markerPos}
            icon={customIcon}
            draggable={true}
            eventHandlers={{
              dragend: handleMarkerDragEnd,
            }}
            ref={markerRef}
          >
            <Popup>
              <div className="text-xs">
                <strong className="block font-semibold mb-1">
                  Property Location
                </strong>
                <p className="text-muted-foreground text-[11px] mb-1">
                  {address || "Drag pin or click map to move"}
                </p>
                <div className="text-[10px] text-primary font-mono">
                  {markerPos[0].toFixed(5)}, {markerPos[1].toFixed(5)}
                </div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Bottom Status & Instruction Bar */}
      <div className="bg-background/95 border-t border-border px-3.5 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>💡 Click anywhere on map or drag pin to set location</span>
          {isResolving && (
            <span className="flex items-center gap-1.5 text-primary font-medium">
              <Loader2 size={12} className="animate-spin" /> Resolving with Geoapify...
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
