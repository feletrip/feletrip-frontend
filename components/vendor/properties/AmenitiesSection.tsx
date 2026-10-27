import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormValues } from "@/types/vendor/property";
import { ICategory } from "@/types/category";
import PropertyDescriptionEditor from "./PropertyDescriptionEditor";

interface AmenitiesSectionProps {
  categoryData?: ICategory[] | null;
}

const hours = Array.from({ length: 12 }, (_, index) =>
  String(index + 1).padStart(2, "0"),
);
const minutes = Array.from({ length: 60 }, (_, index) =>
  String(index).padStart(2, "0"),
);
const periods = ["AM", "PM"];

const parseTimeValue = (value?: string) => {
  // Return empty strings if there's no value so placeholders show up
  if (!value) return { hour: "", minute: "", period: "" };

  const match = value.match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i);
  if (!match) {
    return { hour: "", minute: "", period: "" };
  }

  let hour = Number(match[1]);
  const minute = match[2];
  const period = (match[3] || (hour >= 12 ? "PM" : "AM")).toUpperCase();

  if (period === "PM" && hour < 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  return {
    hour: String(hour % 12 || 12).padStart(2, "0"),
    minute,
    period,
  };
};

const formatTimeValue = (hour: string, minute: string, period: string) => {
  const hourNumber = Number(hour);
  const normalizedHour =
    period === "PM" && hourNumber < 12
      ? hourNumber + 12
      : period === "AM" && hourNumber === 12
        ? 0
        : hourNumber;
  return `${String(normalizedHour).padStart(2, "0")}:${minute}`;
};

export const AmenitiesSection = ({ categoryData }: AmenitiesSectionProps) => {
  const { register, watch, setValue } = useFormContext<FormValues>();

  const [
    propertyName,
    selectedCity,
    selectedAddress,
    selectedLat,
    selectedLng,
    selectedCategoryId,
    checkInTime,
    checkOutTime,
    cancellationPolicy,
    facilities,
    description,
  ] = watch([
    "name",
    "city",
    "address",
    "latitude",
    "longitude",
    "categoryId",
    "checkInTime",
    "checkOutTime",
    "cancellationPolicy",
    "facilities",
    "description",
  ]);

  const selectedCategoryObj = categoryData?.find(
    (c) => c.id === selectedCategoryId
  );
  const categoryName = selectedCategoryObj?.name || "Hotel";

  const renderTimePicker = (
    fieldName: "checkInTime" | "checkOutTime",
    value: string,
  ) => {
    const { hour, minute, period } = parseTimeValue(value);

    return (
      <div className="flex items-center gap-2">
        {/* Hour Select */}
        <Select
          value={hour}
          onValueChange={(selectedHour) => {
            // Fallback to "00" and "AM" if they haven't been picked yet
            setValue(
              fieldName, 
              formatTimeValue(selectedHour, minute || "00", period || "AM")
            );
          }}
        >
          <SelectTrigger className="h-11 w-20 rounded-xl border-border bg-background">
            <SelectValue placeholder="HH" />
          </SelectTrigger>
          <SelectContent>
            {hours.map((hourOption) => (
              <SelectItem key={hourOption} value={hourOption}>
                {hourOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-sm text-muted-foreground">:</span>

        {/* Minute Select */}
        <Select
          value={minute}
          onValueChange={(selectedMinute) => {
            // Fallback to "12" and "AM" if they haven't been picked yet
            setValue(
              fieldName, 
              formatTimeValue(hour || "12", selectedMinute, period || "AM")
            );
          }}
        >
          <SelectTrigger className="h-11 w-20 rounded-xl border-border bg-background">
            <SelectValue placeholder="MM" />
          </SelectTrigger>
          <SelectContent>
            {minutes.map((minuteOption) => (
              <SelectItem key={minuteOption} value={minuteOption}>
                {minuteOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Period Select (AM/PM) */}
        <Select
          value={period}
          onValueChange={(selectedPeriod) => {
            // Fallback to "12" and "00" if they haven't been picked yet
            setValue(
              fieldName, 
              formatTimeValue(hour || "12", minute || "00", selectedPeriod)
            );
          }}
        >
          <SelectTrigger className="h-11 w-24 rounded-xl border-border bg-background">
            <SelectValue placeholder="AM/PM" />
          </SelectTrigger>
          <SelectContent>
            {periods.map((periodOption) => (
              <SelectItem key={periodOption} value={periodOption}>
                {periodOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <label className="text-xs xl:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Amenities & Policies
      </label>
      <Input
        placeholder="Facilities (e.g. WiFi, Pool, Gym, Parking)"
        className="h-11 rounded-xl bg-background border-border mt-3 text-sm xl:text-base"
        {...register("facilities")}
      />
      <Input
        placeholder="Cancellation Policy Details"
        className="h-11 rounded-xl bg-background border-border text-sm xl:text-base"
        {...register("cancellationPolicy")}
      />
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 mt-3">
        <div className="">
          <label className="text-xs xl:text-sm font-semibold uppercase text-muted-foreground">
            Check-In Time
          </label>
          <div className="mt-3 text-sm xl:text-base">
            {renderTimePicker("checkInTime", checkInTime)}
          </div>
        </div>
        <div className="">
          <label className="text-xs xl:text-sm uppercase font-semibold text-muted-foreground">
            Check-Out Time
          </label>
          <div className="mt-3">
            {renderTimePicker("checkOutTime", checkOutTime)}
          </div>
        </div>
      </div>

      <div className="pt-2">
        <PropertyDescriptionEditor
          value={description || ""}
          onChange={(val) => {
            setValue("description", val, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
          propertyName={propertyName || ""}
          categoryName={categoryName}
          city={selectedCity}
          address={selectedAddress}
          latitude={selectedLat}
          longitude={selectedLng}
          checkInTime={checkInTime}
          checkOutTime={checkOutTime}
          cancellationPolicy={cancellationPolicy}
          facilities={facilities}
        />
        <input type="hidden" {...register("description")} />
      </div>
    </div>
  );
};