"use client";

import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { FormValues } from "@/types/vendor/property";
import { LocationFieldDisplay } from "@/components/PublicLayout/Home/PrimarySearch/LocationFieldDisplay";
import PropertyLocationPicker from "./PropertyLocationPicker";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ICategory } from "@/types/category";

interface GeneralDetailsSectionProps {
  locationData: {
    district: string;
    city: string;
    address: string;
    lat: number;
    lng: number;
  } | null;
  isLoading: boolean;
  isAutoDetected: boolean;
  detectLocation: () => void;
  categoryData: ICategory[] | null;
}

const createSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const GeneralDetailsSection = ({
  isLoading,
  isAutoDetected,
  detectLocation,
  categoryData,
}: GeneralDetailsSectionProps) => {
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FormValues>();

  // Single subscription for watched fields
  const [
    selectedDestination,
    selectedCity,
    selectedAddress,
    selectedLat,
    selectedLng,
  ] = watch([
    "destination",
    "city",
    "address",
    "latitude",
    "longitude",
  ]);

  const propertyName = watch("name") || "";
  const slug = watch("slug") || "";

  const isSlugEdited = useRef(false);

  useEffect(() => {
    if (isSlugEdited.current) return;

    setValue("slug", createSlug(propertyName), {
      shouldDirty: true,
    });
  }, [propertyName, setValue]);

  return (
    <div className="space-y-4">
      <label className="text-xs xl:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        General Details
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          placeholder="Property Name (e.g. Ocean View Hotel)"
          className="h-11 rounded-xl bg-background border-border"
          {...register("name", {
            required: true,
          })}
        />

        <Input
          placeholder="property-slug"
          className="h-11 rounded-xl bg-background border-border"
          value={slug}
          onChange={(e) => {
            isSlugEdited.current = true;

            const value = createSlug(e.target.value);

            setValue("slug", value, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />

        <input
          type="hidden"
          {...register("slug", {
            required: true,
          })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="w-full">
          <Input
            placeholder="Contact Phone Number"
            className="h-11 rounded-xl bg-background border-border text-sm xl:text-base"
            {...register("phone", {
              required: "Phone number is required",
            })}
          />
          {errors.phone && (
            <p className="text-xs text-destructive mt-1">
              {errors.phone.message as string}
            </p>
          )}
        </div>

        <div className="w-full">
          <Select
            value={watch("categoryId") || ""}
            onValueChange={(value) => {
              setValue("categoryId", value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          >
            <SelectTrigger className="h-11! w-full rounded-xl border-border bg-background">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>

            <SelectContent>
              {categoryData?.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <input
            type="hidden"
            {...register("categoryId", {
              required: true,
            })}
          />
          {errors.categoryId && (
            <p className="text-xs text-destructive">
              {errors.categoryId.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs xl:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Location
          </p>
          {typeof selectedLat === "number" && typeof selectedLng === "number" && (
            <span className="text-xs text-muted-foreground font-mono bg-muted px-2.5 py-0.5 rounded-full border border-border">
              {selectedLat.toFixed(4)}, {selectedLng.toFixed(4)}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center relative z-20">
          <div className="sm:col-span-2 w-full">
            <LocationFieldDisplay
              district={selectedDestination}
              address={selectedAddress}
              isLoading={isLoading}
              isAutoDetected={isAutoDetected}
              onAddressChange={(value) => {
                setValue("address", value, { shouldDirty: true });
                setValue("city", "", { shouldDirty: true });
                setValue("latitude", undefined);
                setValue("longitude", undefined);
              }}
              onDetectLocation={detectLocation}
              onLocationSelect={(location) => {
                setValue("city", location.city, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
                setValue("address", location.address, { shouldDirty: true });
                setValue("latitude", location.lat, { shouldDirty: true });
                setValue("longitude", location.lng, { shouldDirty: true });
              }}
            />
          </div>

          <Input
            placeholder="City / District"
            readOnly
            value={selectedCity}
            {...register("city", {
              required: "City is required",
            })}
          />
        </div>

        {/* Interactive Map Picker with Draggable Pin & Geoapify Reverse Geocoding */}
        <PropertyLocationPicker
          latitude={selectedLat}
          longitude={selectedLng}
          address={selectedAddress}
          city={selectedCity}
          onLocationSelect={(location) => {
            setValue("city", location.city, {
              shouldValidate: true,
              shouldDirty: true,
            });
            setValue("address", location.address, {
              shouldValidate: true,
              shouldDirty: true,
            });
            setValue("latitude", location.lat, {
              shouldValidate: true,
              shouldDirty: true,
            });
            setValue("longitude", location.lng, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />
      </div>
    </div>
  );
};
