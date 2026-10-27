import {
  getVendorHotelByHotelId,
  CreateHotelData,
} from "@/Server/Vendor/vendorHotel.action";
import PropertyClient from "./PropertyClient";


interface VendorPropertyPageProps {
  properties: CreateHotelData[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const VendorPropertyPage = async ({
  properties,
  pagination,
}: VendorPropertyPageProps) => {
  const resolvedHotels = await Promise.all(
    properties.map(async (property) => {
      const res = await getVendorHotelByHotelId(property.id);
      return res.success ? res.data : null;
    }),
  );

  const hotels = resolvedHotels.filter(
    (hotel): hotel is CreateHotelData => hotel !== null,
  );

  return <PropertyClient properties={hotels} pagination={pagination} />;
};

export default VendorPropertyPage;
