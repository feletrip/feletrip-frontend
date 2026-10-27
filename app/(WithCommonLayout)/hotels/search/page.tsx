import { getHotels } from "@/Server/Hotels/getHotelsAction";
import HotelsPageClient from "./HotelsPageClient";

interface SearchParams {
  latitude?: string;
  longitude?: string;
  radius?: string;

  search?: string;
  location?: string;
  propertyType?: string;

  page?: string;
  limit?: string;

  sortBy?: "price" | "rating" | "name" | "city" | "createdAt";
  sortOrder?: "asc" | "desc";
}

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
    propertyType: params.propertyType,

    page: Number(params.page ?? 1),
    limit: Number(params.limit ?? 10),

    sortBy: params.sortBy ?? "rating",
    sortOrder: params.sortOrder ?? "desc",
  });

  if (!response.success || !response.data) {
    return (
      <HotelsPageClient
        hotels={[]}
        total={0}
        pagination={{
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 1,
        }}
      />
    );
  }
  

  return (
    <HotelsPageClient
      hotels={response.data}
      total={response.pagination?.total ?? response.data.length}
      pagination={response.pagination}
    />
  );
}
