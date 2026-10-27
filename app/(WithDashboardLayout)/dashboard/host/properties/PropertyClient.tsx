"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { CreateHotelData } from "@/Server/Vendor/vendorHotel.action";
import PropertyCard from "./PropertyCard";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import Pagination from "@/components/Reuseable/common/Pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  properties: CreateHotelData[];
  pagination: {
    page: number;
    totalPages: number;
    total: number;
    limit: number;
  };
}

export default function PropertyClient({ properties, pagination }: Props) {
  const [propertyList, setPropertyList] = useState<CreateHotelData[]>(properties);
  const [totalCount, setTotalCount] = useState<number>(pagination?.total ?? properties.length);
  const [search, setSearch] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setPropertyList(properties);
    setTotalCount(pagination?.total ?? properties.length);
  }, [properties, pagination?.total]);

  const handleDeleteProperty = (id: string) => {
    setPropertyList((prev) => prev.filter((property) => property.id !== id));
    setTotalCount((prev) => Math.max(0, prev - 1));
  };

  const filteredProperties = propertyList.filter((property) =>
    property.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page.toString());

    router.push(`/dashboard/host/properties?${params.toString()}`);
  };

  return (
    <div className="">
      <Motion animationType="fadeLeft" delay={0.1} duration={0.5}>
        <div className="w-full flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
          <p>
            Total property:{" "}
            <span className="text-primary font-bold">{totalCount}</span>
          </p>
          <div className="flex items-center gap-2 mb-5 lg:w-1/2 relative">
            <Search className="w-5 h-5 absolute left-3 text-primary font-bold" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Property"
              className="pl-10 w-full"
            />
          </div>
        </div>
      </Motion>
      <PropertyCard
        properties={filteredProperties}
        onDelete={handleDeleteProperty}
      />
      <div className="flex justify-center mt-8">
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          setCurrentPage={handlePageChange}
        />
      </div>
    </div>
  );
}
