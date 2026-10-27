"use server";

const API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY!;

export interface INearbyPlace {
  id: string;
  name: string;
  address: string;
  category: string;
  distanceKm: number;
}

interface GeoapifyResponse {
  features: {
    properties: {
      place_id: string;
      name?: string;
      formatted?: string;
      distance?: number;
      categories?: string[];
    };
  }[];
}

export async function getNearbyPlaces(
  latitude: number,
  longitude: number,
): Promise<INearbyPlace[]> {
  const params = new URLSearchParams({
    categories: [
      "tourism.sights",
      "tourism.attraction",
      "entertainment.museum",
      "entertainment.culture",
      "leisure.park",
      "natural",
      "heritage",
      "tourism",
      "airport",
      "public_transport.train",
    ].join(","),
    filter: `circle:${longitude},${latitude},50000`,
    bias: `proximity:${longitude},${latitude}`,
    limit: "30",
    apiKey: API_KEY,
  });

  try {
    const res = await fetch(
      `https://api.geoapify.com/v2/places?${params.toString()}`,
    );

    if (!res.ok) {
      return [];
    }

    const data: GeoapifyResponse = await res.json();
    const seenNames = new Set<string>();

    const validPlaces: INearbyPlace[] = [];

    for (const { properties } of data.features || []) {
      const rawName = properties.name?.trim();
      if (!rawName || rawName.toLowerCase() === "unknown" || rawName.length < 2) {
        continue;
      }

      const lowerName = rawName.toLowerCase();
      if (seenNames.has(lowerName)) {
        continue;
      }
      seenNames.add(lowerName);

      validPlaces.push({
        id: properties.place_id,
        name: rawName,
        address: properties.formatted || "Address unavailable",
        category: properties.categories?.join(",") || "tourism",
        distanceKm: Number(((properties.distance ?? 0) / 1000).toFixed(1)),
      });
    }

    // Sort by nearest distance first
    validPlaces.sort((a, b) => a.distanceKm - b.distanceKm);

    return validPlaces;
  } catch (error) {
    console.error("Failed to fetch nearby places:", error);
    return [];
  }
}