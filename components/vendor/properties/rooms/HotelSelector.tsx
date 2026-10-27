"use client";

import { useState } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import RoomManagement from "./RoomManagement";

import {
  CreateHotelData,
  getVendorHotel,
} from "@/Server/Vendor/vendorHotel.action";

import { Building2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Motion } from "@/components/Reuseable/common/Framermotion";

interface HotelSelectorProps {
  properties: CreateHotelData[];

  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function HotelSelector({
  properties: initialProperties,
  pagination,
}: HotelSelectorProps) {
  const [properties, setProperties] =
    useState<CreateHotelData[]>(initialProperties || []);

  const [selectedHotel, setSelectedHotel] = useState<CreateHotelData | null>(
    null,
  );

  const [currentPage, setCurrentPage] = useState(pagination?.page || 1);

  const [loading, setLoading] = useState(false);

  const showLoadMore = pagination && currentPage < pagination.totalPages;

  async function handleLoadMore() {
    if (!showLoadMore || loading) return;

    try {
      setLoading(true);

      const nextPage = currentPage + 1;

      const response = await getVendorHotel(nextPage, pagination?.limit || 10);

      if (response.success && response.data) {
        setProperties((prev) => [...prev, ...response.data!]);

        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {(!properties || properties.length === 0) && (
        <Motion>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-sm">
            <div className="absolute -top-20 -right-20 size-56 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 size-64 rounded-full bg-accent/40 blur-3xl" />

            <div className="relative flex flex-col items-center text-center space-y-5">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                <Building2 className="size-8" />
              </div>

              <div className="space-y-2 max-w-md">
                <h3 className="text-xl font-semibold tracking-tight">
                  No Property Available
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  You don&apos;t have any hotel properties configured yet.
                  Create your first property to start managing rooms, amenities,
                  and inventory.
                </p>
              </div>

              <Link href="/vendor/properties/create">
                <Button className="rounded-xl px-6 h-11 gap-2">
                  <Building2 className="size-4" />
                  Add Property
                </Button>
              </Link>
            </div>
          </div>
        </Motion>
      )}
      <div className=" bg-card border border-border p-5  rounded-2xl flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <label className=" text-xs  font-bold uppercase text-muted-foreground">
            Active Workspace Property
          </label>

          <p className="text-sm flex items-center gap-2">
            Modifying records for:
            <span className="font-semibold text-primary">
              {selectedHotel?.name ?? "None"}
            </span>
          </p>
        </div>

        <div className="space-y-3">
          <Combobox<CreateHotelData>
            items={properties}
            value={selectedHotel}
            onValueChange={(hotel) => {
              setSelectedHotel(hotel ?? null);
            }}
            itemToStringLabel={(hotel) => hotel?.name ?? ""}
            itemToStringValue={(hotel) => hotel?.id ?? ""}
            isItemEqualToValue={(a, b) => a?.id === b?.id}
          >
            <ComboboxInput
              placeholder="Select a hotel"
              className="w-full sm:w-72"
              showClear
            />

            <ComboboxContent>
              <ComboboxEmpty>No properties found.</ComboboxEmpty>
              <ComboboxList>
                {(hotel: CreateHotelData) => (
                  <ComboboxItem key={hotel.id} value={hotel}>
                    <span className="truncate">{hotel.name}</span>
                  </ComboboxItem>
                )}
              </ComboboxList>

              {showLoadMore && (
                <div className="p-2 border-t border-border flex justify-center">
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleLoadMore();
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    disabled={loading}
                    className="w-full text-xs"
                    variant={"outline"}
                    size="sm"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="size-3.5 animate-spin text-primary mr-2" />
                        Loading...
                      </>
                    ) : (
                      "Load More Properties"
                    )}
                  </Button>
                </div>
              )}
            </ComboboxContent>
          </Combobox>
        </div>
      </div>

      {!selectedHotel && (
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-sm">
          <div className="absolute -top-20 -right-20 size-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 size-64 rounded-full bg-accent/40 blur-3xl" />

          <div className="relative flex flex-col items-center text-center space-y-5">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary">
              <Building2 className="size-8" />
            </div>

            <div className="space-y-2 max-w-md">
              <h3 className="text-xl text-destructive font-semibold tracking-tight">
                Select a Property Workspace
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Choose a property from the selection menu above to manage room
                layouts, amenities, inventory rules, and operational settings.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 px-4 py-3 text-left">
              <div className="size-2 rounded-full bg-primary animate-pulse" />

              <p className="text-xs text-muted-foreground">
                Your workspace is waiting for a property selection
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedHotel && <RoomManagement selectedHotel={selectedHotel} />}
    </div>
  );
}
