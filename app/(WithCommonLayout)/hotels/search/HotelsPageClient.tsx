"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FilterSidebar from "@/components/modules/Hotels/FilterSideBar";
import DetailsHotelCard from "@/components/modules/Hotels/DetailsHotelCard";
import { Button, Dropdown, Label } from "@heroui/react";
import { FilterPattern } from "@/components/modules/Hotels/Drawer";
import { TFilters } from "@/types/filters";
import ViewListGrid from "@/components/modules/Hotels/ViewListGrid";
import { Container } from "@/components/PublicLayout/Shared/Container";
import { THotel } from "@/types/hotel";
import MinimalSearchFilter from "../MinimalSearchFilter";
import { IPagination } from "@/Server/Hotels/getHotelsAction";
import HotelsPagination from "../HotelsPagination";

type TView = "grid" | "list";

interface HotelsPageClientProps {
  hotels: THotel[];
  total: number;
  pagination?: IPagination;
}

const defaultFilters: TFilters = {
  rating: 0,
  priceRange: [0, 20000],
  propertyType: [],
  reservationPolicy: [],
  bedPreference: [],
  facilities: [],
};

// sorting options
const sortOptionsMap: Record<string, string> = {
  "rating-desc": "Rating (High to Low ↓)",
  "price-asc": "Price (Low to High ↑)",
  "price-desc": "Price (High to Low ↓)",
  "name-asc": "Name (A to Z ↑)",
  "name-desc": "Name (Z to A ↓)",
  "city-asc": "City (A to Z ↑)",
  "city-desc": "City (Z to A ↓)",
  "createdAt-desc": "Newest First ↓",
};

const HotelsPageClient = ({
  hotels,
  total,
  pagination,
}: HotelsPageClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = pagination?.totalPages ?? 1;

  const [filters, setFilters] = useState<TFilters>(defaultFilters);
  const [view, setView] = useState<TView>("list");

  // Sync sorting UI state directly with what's currently active in the URL
  const currentSortBy = searchParams.get("sortBy") || "rating";
  const currentSortOrder = searchParams.get("sortOrder") || "desc";
  const currentSortKey = `${currentSortBy}-${currentSortOrder}`;

  const handleApplyFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    // --- Price Range Sync ---
    if (filters.priceRange && filters.priceRange.length === 2) {
      const [min, max] = filters.priceRange;
      params.set("minPrice", min.toString());
      params.set("maxPrice", max.toString());
    } else {
      params.delete("minPrice");
      params.delete("maxPrice");
    }

    // --- Rating ---
    if (filters.rating > 0) {
      params.set("rating", filters.rating.toString());
    } else {
      params.delete("rating");
    }

    // --- Property Type ---
    if (filters.propertyType.length > 0) {
      params.set("propertyType", filters.propertyType.join(","));
    } else {
      params.delete("propertyType");
    }

    // Reset to first page on new filter applied
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  const handleSortChange = (value: string | number) => {
    const stringValue = String(value);
    const [field, order] = stringValue.split("-") as [
      string,
      "asc" | "desc" | undefined,
    ];

    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", field);
    params.set("sortOrder", order || "desc");
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page.toString());

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="min-h-screen pt-28 pb-16">
      <Container className="grid grid-cols-12 gap-5">
        {/* DESKTOP SIDEBAR */}
        <div className="col-span-3 hidden lg:block sticky top-24 self-start">
          <aside className="w-full bg-background rounded-2xl p-4 shadow-xl border max-h-[calc(100vh-9rem)] overflow-y-auto hide-scrollbar">
            {/* Sidebar */}
            <div className="mb-5 pb-5 border-b border-border/60 flex flex-wrap items-center gap-2">
              <label className="text-xs font-bold text-muted-foreground/80 uppercase tracking-wider block shrink-0">
                Sort By :
              </label>
              <Dropdown>
                <Button
                  aria-label="Sort options"
                  variant="secondary"
                  className="grow justify-between text-left font-medium text-sm border bg-muted/20 rounded-lg"
                >
                  {sortOptionsMap[currentSortKey] || "Select Sorting"}
                </Button>
                <Dropdown.Popover>
                  <Dropdown.Menu onAction={handleSortChange}>
                    {Object.entries(sortOptionsMap).map(([key, labelText]) => (
                      <Dropdown.Item id={key} key={key} textValue={labelText}>
                        <Label className="cursor-pointer">{labelText}</Label>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>

            <FilterSidebar
              hotels={hotels}
              filters={filters}
              setFilters={setFilters}
              handleApplyFilter={handleApplyFilter}
            />
          </aside>
        </div>

        {/* Primary View Feed Content Section */}
        <main className="col-span-12 lg:col-span-9 rounded-lg">
          {/* Sticky Container for Minimal Search Panel */}
          <div className="xl:sticky top-24 z-40 px-4">
            <MinimalSearchFilter />
          </div>

          {/* Sub-header row directly sitting on top of the listing feed cards */}
          <div className="flex justify-between items-end flex-wrap pb-4 px-4 gap-3">
            <div className="flex items-center gap-4 flex-wrap">
              <h2 className="text-md md:text-lg font-semibold text-muted-foreground whitespace-nowrap">
                {`${total} hotels found`}
              </h2>

              {/* Mobile-visible sorting layout switcher */}
              <div className="block lg:hidden">
                <Dropdown>
                  <Button
                    aria-label="Sort options"
                    variant="secondary"
                    size="sm"
                    className="font-medium text-xs border bg-muted/10 h-9"
                  >
                    {sortOptionsMap[currentSortKey] || "Sort"}
                  </Button>
                  <Dropdown.Popover>
                    <Dropdown.Menu onAction={handleSortChange}>
                      {Object.entries(sortOptionsMap).map(
                        ([key, labelText]) => (
                          <Dropdown.Item
                            id={key}
                            key={key}
                            textValue={labelText}
                          >
                            <Label className="cursor-pointer text-xs">
                              {labelText}
                            </Label>
                          </Dropdown.Item>
                        ),
                      )}
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Grid / List controls display engine */}
              <div className="hidden lg:block">
                <ViewListGrid view={view} setView={setView} />
              </div>

              {/* Mobile filter sliding canvas trigger sheet */}
              <div className="text-center lg:hidden flex items-center gap-2">
                <FilterPattern
                  filters={filters}
                  setFilters={setFilters}
                  handleApplyFilter={handleApplyFilter}
                />
              </div>
            </div>
          </div>

          {/* Cards Render Pipeline wrapper loop */}
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                : "flex flex-col gap-6"
            }
          >
            {hotels.length === 0 && (
              <div className="rounded-xl border border-dashed p-6 text-center text-muted-foreground w-full">
                No hotels found matching your search options.
              </div>
            )}

            {hotels.map((hotel, idx) => (
              <DetailsHotelCard
                key={hotel.id}
                hotel={hotel}
                view={view}
                idx={idx}
              />
            ))}
            {pagination && pagination.totalPages > 1 && (
              <HotelsPagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </main>
      </Container>
    </div>
  );
};

export default HotelsPageClient;
