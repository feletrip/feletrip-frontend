"use client";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet"

const customIcon = new L.Icon({
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
interface Props {
  coordinates: { lat: number; lng: number };
  location: string;
  name: string;
}
export default function LocationSection({
  location,
  coordinates,
  name,
}: Props) {
  const position: [number, number] = [coordinates.lat, coordinates.lng];
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Location</h2>

      <div className="h-70 border-2 border-background shadow-lg overflow-hidden rounded-2xl bg-muted flex items-center justify-center">
        <MapContainer
          center={position}
          zoom={10}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker icon={customIcon} position={position}>
            <Popup>
              {name} <br /> {location}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
