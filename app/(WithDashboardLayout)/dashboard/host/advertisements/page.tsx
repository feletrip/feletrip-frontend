import AdvertisePageClient from "@/components/vendor/advertise/AdvertisePageClient";
import { getVendorAdvertisements } from "@/Server/Vendor/advertisementVendor.action";

export default async function AdvertisePage() {
  // Fetch initial vendor advertisements on the server
  const adsRes = await getVendorAdvertisements({ page: 1, limit: 10 });

  // Safely extract list and pagination
  const initialAds = adsRes?.success && adsRes.data ? adsRes.data : [];
  const initialPagination = adsRes?.pagination || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  return (
    <AdvertisePageClient
      initialAds={initialAds}
      initialPagination={initialPagination}
    />
  );
}
