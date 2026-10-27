import { Booking } from "@/types/user/booking";
import { getNextUpcomingBooking } from "@/lib/booking-utils";
import UpcomingTrip from "./UpcomingTrip";
import { RecentBookings } from "./bookings/RecentBookings";
import CouponCodeOffer from "@/components/modules/offer/CouponCodeOffer";
import SupportCard from "@/components/modules/SupportCard";
import { IDeals } from "@/Server/Deals/ActiveDeals.actions";
interface DashboardContentProps {
  bookings: Booking[];
  activeDeals:IDeals[];
}

const DashboardContent = ({ bookings,activeDeals }: DashboardContentProps) => {
  const nextUpcomingBooking = getNextUpcomingBooking(bookings);

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <UpcomingTrip nextUpcomingBooking={nextUpcomingBooking} />

        {/* 2. Recent Activity Table */}
        <RecentBookings bookings={bookings}/>
      </div>

      <div className="space-y-6">
        {/* 3. Coupon Code Offer */}
        <CouponCodeOffer activeDeals={activeDeals}/>
        {/* 4. Quick Help & Support Card */}
        <SupportCard/>
      </div>
    </div>
  );
};

export default DashboardContent;
