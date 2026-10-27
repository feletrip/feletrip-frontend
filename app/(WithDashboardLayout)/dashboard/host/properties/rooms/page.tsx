import { Motion } from "@/components/Reuseable/common/Framermotion";
import SectionHeader from "@/components/Reuseable/SectionHeader";
import HotelSelector from "@/components/vendor/properties/rooms/HotelSelector";
import { getVendorHotel } from "@/Server/Vendor/vendorHotel.action";

export default async function RoomsAmenitiesPage() {
  const response = await getVendorHotel();

  const properties = response?.data || [];

  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <Motion>
                    <div className="mb-9 flex flex-col lg:flex-row justify-between items-end lg:items-center gap-7 lg:gap-0 border rounded-xl p-9 border-ring/30 bg-primary/10">
                        <SectionHeader title="Room & Amenities" description="Manage the rooms your properties" />
                    </div>
                </Motion>
      </div>

      <HotelSelector
        properties={properties}
        pagination={response.pagination}
      />
    </div>
  );
}