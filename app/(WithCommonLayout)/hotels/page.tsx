import { getHotels } from "@/Server/Hotels/getHotelsAction";
import HotelsPageClient from "./search/HotelsPageClient";

interface SearchParams {
  latitude?: string;
  longitude?: string;
  radius?: string;

  search?: string;
  location?: string;

  checkin?: string;
  checkout?: string;
  rooms?: string;

  minPrice?: string;
  maxPrice?: string;

  rating?: string;
  propertyType?: string;
  bed?: string;
  facilities?: string;

  page?: string;
  limit?: string;

  sortBy?: "price" | "rating" | "name" | "city" | "createdAt";
  sortOrder?: "asc" | "desc";
}

const parseArray = (value?: string) => {
  if (!value) return undefined;
  return value.split(",").map((item) => item.trim());
};

const parseNumberArray = (value?: string) => {
  if (!value) return undefined;

  return value
    .split(",")
    .map(Number)
    .filter((n) => !Number.isNaN(n));
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const response = await getHotels({
    latitude: params.latitude ? Number(params.latitude) : undefined,
    longitude: params.longitude ? Number(params.longitude) : undefined,
    radius: params.radius ? Number(params.radius) : 10,

    search: params.search,
    location: params.location,

    checkin: params.checkin,
    checkout: params.checkout,
    rooms: params.rooms ? Number(params.rooms) : undefined,

    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,

    propertyType: parseArray(params.propertyType),
    rating: parseNumberArray(params.rating),
    bed: parseArray(params.bed),
    facilities: parseArray(params.facilities),

    page: Number(params.page ?? 1),
    limit: Number(params.limit ?? 10),

    sortBy: params.sortBy ?? "rating",
    sortOrder: params.sortOrder ?? "desc",
  });

  if (!response.success || !response.data) {
    return <HotelsPageClient hotels={[]} total={0} />;
  }

  return (
    <HotelsPageClient
      hotels={response.data}
      total={response.pagination?.total ?? response.data.length}
      pagination={response.pagination}
    />
  );
}
