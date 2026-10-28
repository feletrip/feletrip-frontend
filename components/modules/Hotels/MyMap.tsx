"use client";

import React, { useState } from "react";
import { APIProvider, Map, Marker, InfoWindow } from "@vis.gl/react-google-maps";
import { THotel } from "@/types/hotel";

interface MyMapProps {
  hotels?: THotel[];
}

const GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

const MyMap = ({ hotels }: MyMapProps) => {
  const [selectedHotel, setSelectedHotel] = useState<THotel | null>(null);

  const defaultCenter =
    hotels && hotels.length > 0 && hotels[0].latitude && hotels[0].longitude
      ? {
          lat: Number(hotels[0].latitude) || 21.2787,
          lng: Number(hotels[0].longitude) || 92.0153,
        }
      : { lat: 21.2787, lng: 92.0153 };

  return (
    <div className="h-48 sm:h-64 md:h-72 w-full rounded-xl overflow-hidden border border-border">
      {GOOGLE_MAPS_API_KEY ? (
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <Map
            defaultCenter={defaultCenter}
            defaultZoom={12}
            gestureHandling={"cooperative"}
            disableDefaultUI={false}
            className="h-full w-full"
          >
            {hotels?.map((hotel) => {
              const lat = Number(hotel.latitude);
              const lng = Number(hotel.longitude);
              if (!lat || !lng || Number.isNaN(lat) || Number.isNaN(lng)) {
                return null;
              }
              return (
                <Marker
                  key={hotel.id}
                  position={{ lat, lng }}
                  title={hotel.name}
                  onClick={() => setSelectedHotel(hotel)}
                />
              );
            })}

            {selectedHotel && (
              <InfoWindow
                position={{
                  lat: Number(selectedHotel.latitude),
                  lng: Number(selectedHotel.longitude),
                }}
                onCloseClick={() => setSelectedHotel(null)}
              >
                <div className="p-1 text-xs text-black">
                  <strong className="block font-semibold text-sm mb-0.5">
                    {selectedHotel.name}
                  </strong>
                  <p className="text-gray-600">{selectedHotel.location}</p>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      ) : (
        <div className="h-full w-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
          Google Maps API Key missing
        </div>
      )}
    </div>
  );
};

export default MyMap;
