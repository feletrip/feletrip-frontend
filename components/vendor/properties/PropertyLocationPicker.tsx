"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Loader2, MapPin } from "lucide-react";
export interface SelectedMapLocation {
  address: string;
  city: string;
  lat: number;
  lng: number;
}

interface PropertyLocationPickerProps {
  latitude?: number;
  longitude?: number;
  address?: string;
  city?: string;
  onLocationSelect: (location: SelectedMapLocation) => void;
}

const PropertyLocationPickerMap = dynamic(
  () => import("./PropertyLocationPickerMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[450px] sm:h-[520px] md:h-[580px] lg:h-[640px] w-full rounded-2xl border border-border bg-muted/40 flex flex-col items-center justify-center gap-3 animate-pulse">
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
          <MapPin size={18} className="text-primary animate-bounce" />
          <span>Loading Interactive Map...</span>
        </div>
        <p className="text-xs text-muted-foreground/70">
          Powered by Google Maps
        </p>
      </div>
    ),
  }
);

export default function PropertyLocationPicker(
  props: PropertyLocationPickerProps
) {
  return <PropertyLocationPickerMap {...props} />;
}
