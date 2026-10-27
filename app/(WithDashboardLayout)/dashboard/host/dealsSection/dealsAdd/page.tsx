import { getVendorHotel } from "@/Server/Vendor/vendorHotel.action";
import CreateDealPage from "./components/CreateDealPage";

export default async function Page() {
  const response = await getVendorHotel(1, 10);

  const initialHotels = response?.success && response.data ? response.data : [];
  const initialPagination = response?.pagination || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  return (
    <div>
      <CreateDealPage
        initialHotels={initialHotels}
        initialPagination={initialPagination}
      />
    </div>
  );
}