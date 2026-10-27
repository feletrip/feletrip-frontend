import Marquee from "react-fast-marquee";
import {
  HiOutlineBuildingOffice2,
  HiOutlineClock,
  HiOutlineGift,
  HiOutlineTruck,
  HiOutlineBell,
  HiOutlineWifi,
} from "react-icons/hi2";

import { PiSwimmingPoolLight, PiWineLight, PiBowlFoodThin } from "react-icons/pi";

const deals = [
  {
    icon: <HiOutlineBuildingOffice2 />,
    text: "20% OFF Luxury Suites",
  },
  {
    icon: <PiBowlFoodThin />,
    text: "Free Breakfast on Weekends",
  },
  {
    icon: <HiOutlineClock />,
    text: "Early Check-in Available",
  },
  {
    icon: <HiOutlineGift />,
    text: "Book 3 Nights, Get 1 Free",
  },
  {
    icon: <HiOutlineTruck />,
    text: "Free Airport Pickup on Deluxe Rooms",
  },
  {
    icon: <PiSwimmingPoolLight />,
    text: "Complimentary Pool Access",
  },
  {
    icon: <PiWineLight />,
    text: "Free Welcome Drink on Arrival",
  },
  {
    icon: <HiOutlineBell />,
    text: "Late Checkout for Premium Guests",
  },
  {
    icon: <HiOutlineWifi />,
    text: "Free High-Speed WiFi",
  },
];
const TopNavbar = () => {
  return (
    <section className="hidden lg:block fixed bg-black/60 backdrop-blur-2xl top-0 left-0 w-full z-20">
      <Marquee
        gradient={false}
        speed={30}
        pauseOnHover={true}
        className="py-4 text-white/80"
      >
        {deals.map((deal, index) => (
          <span key={index} className="mx-6 flex items-center gap-2 animate-pulse">
            <span className="text-primary text-xl">{deal.icon}</span>
            <span className="text-sm">{deal.text}</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
};

export default TopNavbar;
