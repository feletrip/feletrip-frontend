import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { THotel } from "@/types/hotel";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

  iconSize: [20, 31],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MyMap = ({ hotels }: { hotels?: THotel[] }) => {
  const position: [number, number] =
    hotels && hotels.length > 0
      ? [Number(hotels[0].latitude), Number(hotels[0].longitude)]
      : [21.2787, 92.0153];
  return (
    <div>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="h-32 w-full z-40"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hotels?.map((hotel) => (
          <Marker
            key={hotel.id}
            position={[Number(hotel.latitude), Number(hotel.longitude)]}
            icon={customIcon}
          >
            <Popup>
              <strong>{hotel.name}</strong> <br /> {hotel.location}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MyMap;
