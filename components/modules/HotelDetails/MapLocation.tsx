"use client";

import dynamic from "next/dynamic";
const MapWithNoSSR = dynamic(
  () => import("@/components/modules/HotelDetails/LocationSection"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-87 sm:h-112 rounded-2xl bg-muted animate-pulse flex items-center justify-center text-sm text-muted-foreground">
        Loading interactive map...
      </div>
    ),
  },
);

interface Props {
  coordinates: { lat: number; lng: number };
  location: string;
  name: string;
}

const MapLocation = ({ coordinates, location, name }: Props) => {
  return (
    <div className="w-full">
      <MapWithNoSSR coordinates={coordinates} location={location} name={name} />
    </div>
  );
};

export default MapLocation;
