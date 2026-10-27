import { getHotel } from "@/Server/Hotels/hotelDetailsActions";
import { getNearbyPlaces, INearbyPlace } from "@/Server/Hotels/getNearbyPlaces";
import HotelDetailsClient from "./HotelDetailsClient";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  let hotel = null;
  let errorStatus = null;
  let nearbyPlaces: INearbyPlace[] = [];

  try {
    hotel = await getHotel(id);
    if (!hotel) {
      errorStatus = "Hotel details could not be found.";
    } else {
      const lat = Number(hotel.latitude);
      const lng = Number(hotel.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        nearbyPlaces = await getNearbyPlaces(lat, lng);
      }
    }
  } catch (error) {
    console.error("Error loading hotel page on server:", error);
    errorStatus = "Something went wrong while loading this page.";
  }

  if (errorStatus || !hotel) {
    return (
      <HotelDetailsClient
        error={errorStatus || "Hotel not found"}
        hotel={null}
        nearbyPlaces={[]}
      />
    );
  }
  return (
    <HotelDetailsClient
      hotel={hotel}
      nearbyPlaces={nearbyPlaces}
      error={null}
    />

  );
}
