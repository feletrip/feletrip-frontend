import StatsCounter from "@/components/shared/StatsCounter";
import { features } from "@/data/aboutData";
import AboutHero from "@/components/about/AboutHero";
import AboutPurposeSection from "@/components/about/AboutPurposeSection";
import WhyChooseUs from "@/components/about/WhyChoseUs";
import { getAboutDetails } from "@/Server/about/about.action";

export default async function AboutPage() {
  const aboutRes = await getAboutDetails();

  const avgRatings = aboutRes?.data?.avgRatings ?? 0;
  const happyGuests = aboutRes?.data?.happyGuests ?? 0;
  const premiumRooms = aboutRes?.data?.premiumRooms ?? 0;
  const successfulBookings = aboutRes?.data?.successfullBookings ?? 0;
  const totalAvailableRooms = aboutRes?.data?.totalAvailableRooms ?? 0;
  const totalDestinations = aboutRes?.data?.totalDestinations ?? 0;
  const totalHotels = aboutRes?.data?.totalHotels ?? 0;
  const totalTravelers = aboutRes?.data?.totalTravellers ?? 0;
  return (
    <div className="bg-background text-primary h-full">
      <AboutHero
        avgRatings={avgRatings}
        happyGuests={happyGuests}
        totalHotels={totalHotels}
        totalDestinations={totalDestinations}
      />
      <AboutPurposeSection
        premiumRooms={premiumRooms}
        totalDestinations={totalDestinations}
      />

      <StatsCounter
        successfulBookings={successfulBookings}
        totalAvailableRooms={totalAvailableRooms}
        totalTravelers={totalTravelers}
      />

      {/* Why Choose Us */}
      <WhyChooseUs features={features} />
    </div>
  );
}
