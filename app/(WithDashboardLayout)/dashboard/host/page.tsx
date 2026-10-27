import BookingDistribution from "@/components/vendor/dashboard/BookingDistribution";
import GuestOverview from "@/components/vendor/dashboard/GuestOverview";
import LatestBooking from "@/components/vendor/dashboard/LatestBooking";
import LatestReview from "@/components/vendor/dashboard/LatestReview";
import RecentActivities from "@/components/vendor/dashboard/RecentActivities";
import RevenueOverview from "@/components/vendor/dashboard/RevenueOverview";
import RoomOverview from "@/components/vendor/dashboard/RoomOverview";
import VendorHeader from "@/components/vendor/dashboard/VendorHeader";
import VendorStates from "@/components/vendor/dashboard/VendorStates";

const HostDashboard = () => {
  return (
    <div>
      <VendorHeader />
      <VendorStates />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        <div className="lg:col-span-3 flex flex-col gap-5">
          <RevenueOverview />
          <BookingDistribution />
          <LatestBooking />
          <RecentActivities />
        </div>

        <div className="lg:col-span-2 flex h-full flex-col gap-5">
          <RoomOverview />
          <GuestOverview />
          <LatestReview />
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
