"use client";

import React, { useState } from "react";
import { APIProvider, Map, Marker, InfoWindow } from "@vis.gl/react-google-maps";

interface Props {
  coordinates: { lat: number; lng: number };
  location: string;
  name: string;
}

const GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export default function LocationSection({
  location,
  coordinates,
  name,
}: Props) {
  const [openInfo, setOpenInfo] = useState(true);
  const position = {
    lat: Number(coordinates.lat) || 23.8103,
    lng: Number(coordinates.lng) || 90.4125,
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Location</h2>

      <div className="h-70 border-2 border-background shadow-lg overflow-hidden rounded-2xl bg-muted flex items-center justify-center">
        {GOOGLE_MAPS_API_KEY ? (
          <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
            <Map
              defaultCenter={position}
              defaultZoom={14}
              gestureHandling={"cooperative"}
              disableDefaultUI={false}
              className="h-full w-full"
            >
              <Marker position={position} onClick={() => setOpenInfo(true)} />
              {openInfo && (
                <InfoWindow
                  position={position}
                  onCloseClick={() => setOpenInfo(false)}
                >
                  <div className="p-1 text-xs text-black">
                    <strong className="block font-semibold text-sm mb-0.5">
                      {name}
                    </strong>
                    <p className="text-gray-600">{location}</p>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        ) : (
          <div className="text-sm text-muted-foreground">
            Google Maps API Key missing
          </div>
        )}
      </div>
    </div>
  );
}
