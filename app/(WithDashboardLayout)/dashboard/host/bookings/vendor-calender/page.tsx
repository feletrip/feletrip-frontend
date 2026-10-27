import { Motion } from "@/components/Reuseable/common/Framermotion";
import LoadProperties from "@/components/vendor/availability/LoadProperties";
import {
  ApiResponse,
  CreateHotelData,
  getVendorHotel,
} from "@/Server/Vendor/vendorHotel.action";

const RoomAvailability = async () => {
  const response: ApiResponse<CreateHotelData[] | null> = await getVendorHotel(
    1,
    10,
  );

  if (!response.success || !response.data) {
    return (
      <div className="text-center text-2xl min-h-screen flex justify-center items-center font-bold py-10">
        Failed to load properties.
      </div>
    );
  }

  return (
    <div>
      <Motion>
        <h1 className="text-3xl font-bold mb-5 text-primary">
          Room availability
        </h1>
      </Motion>

      <LoadProperties
        initialProperties={response.data}
        propertyPagination={response.pagination!}
      />
    </div>
  );
};

export default RoomAvailability;
