import {
  ApiResponse,
  getVendorHotel,
  CreateHotelData,
} from "@/Server/Vendor/vendorHotel.action";
import VendorPropertyPage from "./VendorPropertyPage";
import { Motion } from "@/components/Reuseable/common/Framermotion";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

const PropertyPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const page = Number(params.page ?? 1);

  const response: ApiResponse<CreateHotelData[] | null> = await getVendorHotel(
    page,
    10,
  );

  if (!response.success || !response.data) {
    return (
      <div className="text-center text-2xl font-bold py-10 min-h-125 flex items-center justify-center">
        Failed to load properties.
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Motion animationType="fadeLeft" delay={0.1} duration={0.5}>
        <h1 className="text-2xl font-bold mb-9 text-primary">All Properties</h1>
      </Motion>

      <VendorPropertyPage
        properties={response.data}
        pagination={response.pagination!}
      />
    </div>
  );
};

export default PropertyPage;
