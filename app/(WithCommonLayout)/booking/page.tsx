"use client";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Hotel } from "@/types/singleHotel";
import Image from "next/image";
import { ChevronRight, Home, Pencil } from "lucide-react";
import Link from "next/link";
import { BookingInfoForm } from "@/components/modules/Booking/BookingInfoFrom";
import { CouponSection } from "@/components/modules/Booking/Coupon";
import { PaymentDetailsSection } from "@/components/modules/Booking/PaymentDetails";
import { BookingOrderDetails } from "@/components/modules/Booking/BookingOrderDetails";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { api } from "@/lib/api";

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 60, // start 60px below
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};
const fadeLeftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};
const fadeRightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const BookingPage = () => {
  useSmoothScroll();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const searchParams = useSearchParams();
  const booking = {
    hotelId: Number(searchParams.get("hotelId") ?? 0),
    checkInDate: searchParams.get("checkInDate") ?? "",
    checkOutDate: searchParams.get("checkOutDate") ?? "",
    roomId: Number(searchParams.get("roomid") ?? 0),
    rooms: Number(searchParams.get("rooms") ?? 1),
    adults: Number(searchParams.get("adults") ?? 2),
    children: Number(searchParams.get("children") ?? 0),
    roomType: searchParams.get("roomType") ?? "Standard",
    checkInTime: searchParams.get("checkInTime") ?? "14:00",
    checkOutTime: searchParams.get("checkOutTime") ?? "12:00",
  };

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await api.get("/data/hotels.json");
        const allHotels: Hotel[] = res.data.hotels;
        const singleHotel = allHotels.find(
          (h: Hotel) => h.id === booking.hotelId,
        );
        setHotel(singleHotel ?? null);
      } catch {
      }
    };

    if (booking.hotelId) {
      fetchHotel();
    }
  }, [booking.hotelId]);

  // if (!hotel) return "Loading";

  return (
    <section>
      <motion.div
        className="lg:col-span-2 space-y-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="relative">
          <Image
            src={"https://i.ibb.co.com/NcWQSMT/Hotel-Booking.jpg"}
            alt="HotelBooningBg"
            width={900}
            height={300}
            className="w-full h-[40vh] object-cover object-bottom rounded-sm"
          />
          <div className="mt-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
            <h1 className="text-3xl font-bold text-center">Hotel Booking</h1>
            <div className="flex items-center justify-center mt-2 text-sm text-gray-100">
              <Link
                href="/"
                className="hover:text-primary flex items-center gap-1"
              >
                <Home className="mx-auto" />
              </Link>
              <ChevronRight />
              <p>Hotel Booking</p>
            </div>
          </div>
        </div>
        <Container className="grid grid-cols-3 gap-8 mt-10">
          {/* Left Side */}
          <div className="col-span-2">
            {/* heading */}
            <motion.div
              variants={fadeLeftVariants}
              className="border border-gray-300 rounded-md mb-6"
            >
              <h2 className="text-xl font-semibold p-4 bg-brand-primary text-muted rounded-t-md">
                Secure Checkout
              </h2>
              <BookingInfoForm />
            </motion.div>
            {/* Primary Contact Info */}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUpVariants}
              className="border border-gray-300 rounded-md mb-6"
            >
              <h2 className="text-xl font-semibold p-4 border-b bg-brand-primary text-muted rounded-t-md">
                Coupon
              </h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUpVariants}
              transition={{ delay: 0.15 }}
              className="border border-gray-300 rounded-md mb-6 bg-brand-primary text-muted rounded-t-md"
            >
              <h2 className="text-xl font-semibold p-4 border-b ">
                Payment Details
              </h2>
              <PaymentDetailsSection />
            </motion.div>
          </div>

          {/* Right Side */}
          <motion.div variants={fadeRightVariants}>
            <div className="border border-gray-300 rounded-md mb-6 sticky top-0">
              <div className="flex items-center justify-between p-4 border-b bg-brand-primary text-muted rounded-t-md">
                <h2 className="text-xl font-semibold">Review Order Details</h2>
                <button
                  type="button"
                  className="text-gray-500 hover:text-red-600 transition-colors"
                  aria-label="Edit order details"
                >
                  <Pencil className="h-5 w-5" color="white" />
                </button>
              </div>

              <BookingOrderDetails />
            </div>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
};

export default BookingPage;
