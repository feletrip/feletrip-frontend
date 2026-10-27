"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  value: "asc" | "desc";
  onChange: (value: "asc" | "desc") => void;
}

const items = [
  {
    label: "Newest",
    value: "desc",
  },
  {
    label: "Oldest",
    value: "asc",
  },
];

export default function MyBlogSort({ value, onChange }: Props) {
  return (
    <div className="flex justify-end w-full md:w-3/4">
      <Select
        value={value}
        onValueChange={(val) => onChange(val as "asc" | "desc")}
      >
        <SelectTrigger className="w-full md:w-48 rounded-xl border border-primary bg-background shadow-sm">
          <SelectValue placeholder="Sort blogs" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort Blogs</SelectLabel>

            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
