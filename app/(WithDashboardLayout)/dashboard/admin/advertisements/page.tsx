import AdminAdvertisementClient from "@/components/modules/dashboard/admin/AdminAdvertisementClient";
import {
  getAdminAdPricing,
  getAllAdminAdvertisements,
} from "@/Server/Admin/adminAdvertisement.action";

export default async function HomepageAdvertisement() {
  const [adsResponse, pricingResponse] = await Promise.all([
    getAllAdminAdvertisements({ page: 1, limit: 10 }),
    getAdminAdPricing(),
  ]);

  const initialAdsData = adsResponse?.data || null;
  const initialPricingData = pricingResponse?.data || [];

  return (
    <main className="w-full min-h-screen bg-background">
      <AdminAdvertisementClient
        initialAdsData={initialAdsData}
        initialPricingData={initialPricingData}
      />
    </main>
  );
}
