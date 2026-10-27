"use client";

import { useCallback, useState } from "react";

export interface LocationData {
  district: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
}

interface GeoapifyReverseResponse {
  features?: Array<{
    properties?: {
      formatted?: string;
      city?: string;
      county?: string;
      state?: string;
      country?: string;
    };
    geometry?: {
      coordinates: [number, number];
    };
  }>;
}

const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 300000,
};

async function reverseGeocode(
  latitude: number,
  longitude: number,
): Promise<LocationData> {
  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

  if (!apiKey) {
    throw new Error(
      "NEXT_PUBLIC_GEOAPIFY_API_KEY is missing from environment variables",
    );
  }

  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`,
  );

  if (!response.ok) {
    throw new Error("Geoapify reverse geocoding failed");
  }

  const data: GeoapifyReverseResponse = await response.json();
  const location = data.features?.[0]?.properties;

  if (!location) {
    throw new Error("Location details not found");
  }

  const rawDistrict =
    location.city ||
    location.county ||
    location.state ||
    location.country ||
    "Current Location";

  const formattedDistrict = rawDistrict
    .replace(/\s*(District|Division)\s*/gi, "")
    .trim();

  return {
    district: formattedDistrict,
    city: location.city || formattedDistrict,
    address:
      location.formatted || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
    lat: latitude,
    lng: longitude,
  };
}

export function useCurrentLocation() {
  const [district, setDistrict] = useState<string>("");
  const [address, setAddressState] = useState<string>("");
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAutoDetected, setIsAutoDetected] = useState<boolean>(false);

  // Triggered manually when the user clicks a "Detect Location" button
  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setDistrict("Current Location");
      setAddressState("Geolocation is not supported");
      setLocationData(null);
      setIsAutoDetected(false);
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const location = await reverseGeocode(
            position.coords.latitude,
            position.coords.longitude,
          );

          setDistrict(location.district);
          setAddressState(location.address);
          setLocationData(location);
          setIsAutoDetected(true);
        } catch {
          setDistrict("Location Not Found");
          setAddressState("Enter your destination");
          setLocationData(null);
          setIsAutoDetected(false);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setDistrict("Location Denied");
        setAddressState("Enter your destination");
        setLocationData(null);
        setIsAutoDetected(false);
        setIsLoading(false);
      },
      GEOLOCATION_OPTIONS,
    );
  }, []);

  // Update address manually when the user types
  const setAddress = useCallback((value: string) => {
    setAddressState(value);
    setDistrict("");
    setLocationData(null);
    setIsAutoDetected(false);
  }, []);

  return {
    district,
    setDistrict,
    address,
    setAddress,
    locationData,
    setLocationData,
    isLoading,
    detectLocation,
    isAutoDetected,
  };
}
