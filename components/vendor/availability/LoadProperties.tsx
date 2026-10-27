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

import { Button } from "@/components/ui/button";
import { getVendorHotel } from "@/Server/Vendor/vendorHotel.action";
import { CreateHotelData } from "@/Server/Vendor/vendorHotel.action";
import { useState } from "react";
import AvailableRoom from "./AvailableRoom";
import { BookCheck } from "lucide-react";
import { Motion } from "@/components/Reuseable/common/Framermotion";

interface Props {
  initialProperties: CreateHotelData[];

  propertyPagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const LoadProperties = ({ initialProperties, propertyPagination }: Props) => {
  const [properties, setProperties] =
    useState<CreateHotelData[]>(initialProperties);

  const [propertyPage, setPropertyPage] = useState(propertyPagination.page);

  const [propertyTotalPages] = useState(propertyPagination.totalPages);

  const [propertyLoading, setPropertyLoading] = useState(false);

  const [selectedHotel, setSelectedHotel] = useState<string>("");

  const loadMoreProperties = async (e: React.PointerEvent) => {
    // Prevent Select from closing
    e.preventDefault();

    if (propertyPage >= propertyTotalPages || propertyLoading) {
      return;
    }

    try {
      setPropertyLoading(true);

      const nextPage = propertyPage + 1;

      const response = await getVendorHotel(nextPage, 10);

      if (response.success && response.data) {
        setProperties((prev) => [...prev, ...response.data!]);

        setPropertyPage(nextPage);
      }
    } catch (error) {
      console.error("Property load error", error);
    } finally {
      setPropertyLoading(false);
    }
  };

  return (
    <div className="space-y-8 min-h-screen ">
      <Motion animationType="slideDown" delay={0.2}>
        <div className="border rounded-xl p-5">
          <h2 className="font-semibold mb-3 text-secondary-foreground">
            Select Property
          </h2>

          <Select value={selectedHotel} onValueChange={setSelectedHotel}>
            <SelectTrigger className="w-full cursor-pointer">
              <SelectValue placeholder="Choose Property" />
            </SelectTrigger>

            <SelectContent className="max-h-80">
              <SelectGroup>
                <SelectLabel>Properties</SelectLabel>

                {properties.map((property) => (
                  <SelectItem
                    key={property.id}
                    value={property.id}
                    className="cursor-pointer"
                  >
                    {property.name}
                  </SelectItem>
                ))}

                <div
                  className="sticky bottom-0 p-2 flex justify-center "
                  onPointerDown={(e) => e.preventDefault()}
                >
                  <Button
                    variant={"outline"}
                    className="w-11/12 mx-auto text-primary"
                    onPointerDown={loadMoreProperties}
                    disabled={
                      propertyLoading || propertyPage >= propertyTotalPages
                    }
                  >
                    {propertyLoading
                      ? "Loading..."
                      : propertyPage >= propertyTotalPages
                        ? "No More Properties"
                        : "Load More Properties"}
                  </Button>
                </div>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Motion>
      {selectedHotel.length === 0 && (
        <Motion animationType="slideDown" delay={0.5}>
          <div className="max-w-11/12 h-70 mt-9 mx-auto  flex flex-col justify-center items-center gap-5  rounded-2xl border  border-primary border-dashed bg-primary/5">
            {" "}
            <BookCheck className="text-primary" size={30} />
            <p className="text-lg font-semibold text-muted-foreground/70">
              Select A Property First
            </p>
          </div>
        </Motion>
      )}

      {selectedHotel && <AvailableRoom hotelId={selectedHotel} />}
    </div>
  );
};

export default LoadProperties;
