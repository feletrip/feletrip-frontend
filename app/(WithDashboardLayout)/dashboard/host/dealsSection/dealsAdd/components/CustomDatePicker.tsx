"use client";

import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DealFormValues } from "../type/type";
const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 11 }, (_, i) => String(currentYear + i));

const parseDateValue = (value?: string) => {
  if (!value) return { day: "", month: "", year: "" };
  const cleanDate = value.split("T")[0];
  const parts = cleanDate.split("-");
  if (parts.length !== 3) return { day: "", month: "", year: "" };
  return { year: parts[0], month: parts[1], day: parts[2] };
};

const formatDateValue = (day: string, month: string, year: string) => {
  return `${year}-${month}-${day}`;
};

interface CustomDatePickerProps {
  fieldName: "startDate" | "endDate";
}

export function CustomDatePicker({ fieldName }: CustomDatePickerProps) {
  const { watch, setValue } = useFormContext<DealFormValues>();
  const rawValue = watch(fieldName) || "";
  const { day, month, year } = parseDateValue(rawValue);

  const today = new Date();
  const defaultDay = String(today.getDate()).padStart(2, "0");
  const defaultMonth = String(today.getMonth() + 1).padStart(2, "0");
  const defaultYear = String(today.getFullYear());

  return (
    <div className="flex items-center gap-2">
      <Select
        value={day}
        onValueChange={(selectedDay) => {
          setValue(fieldName, formatDateValue(selectedDay, month || defaultMonth, year || defaultYear), { shouldValidate: true });
        }}
      >
        <SelectTrigger className="h-11 w-20 rounded-xl border-border bg-background">
          <SelectValue placeholder="DD" />
        </SelectTrigger>
        <SelectContent className="max-h-56 rounded-xl">
          {days.map((d) => (
            <SelectItem key={d} value={d}>
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={month}
        onValueChange={(selectedMonth) => {
          setValue(fieldName, formatDateValue(day || defaultDay, selectedMonth, year || defaultYear), { shouldValidate: true });
        }}
      >
        <SelectTrigger className="h-11 flex-1 min-w-30 rounded-xl border-border bg-background">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          {months.map((m) => (
            <SelectItem key={m.value} value={m.value}>
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={year}
        onValueChange={(selectedYear) => {
          setValue(fieldName, formatDateValue(day || defaultDay, month || defaultMonth, selectedYear), { shouldValidate: true });
        }}
      >
        <SelectTrigger className="h-11 w-24 rounded-xl border-border bg-background">
          <SelectValue placeholder="YYYY" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          {years.map((y) => (
            <SelectItem key={y} value={y}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}