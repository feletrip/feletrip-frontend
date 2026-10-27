import { Motion } from "@/components/Reuseable/common/Framermotion";
import SectionHeader from "@/components/Reuseable/SectionHeader";

const VendorBookingHeader = () => {
  return (
    <Motion>
      <div className="mb-9 flex flex-col lg:flex-row justify-between items-end lg:items-center gap-7 lg:gap-0 border rounded-xl p-9 border-ring/30 bg-primary/10">
        <SectionHeader
        highlight="Bookings"
          title="Vendor Bookings"
          description="Welcome to your Booking dashboard and manage your booking record"
        />
      </div>
    </Motion>
  );
};

export default VendorBookingHeader;
