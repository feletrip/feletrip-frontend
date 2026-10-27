"use client";

import AdminChatWithHotelButton from "@/components/Chat/adminChatWithHotelButton";
import ChatWithVendorButton from "@/components/Chat/ChatWithVendorButton";
import AreaDetails from "@/components/modules/HotelDetails/AreaDetails";
import HotelFeatures from "@/components/modules/HotelDetails/HotelFeatures";
import HotelOverview from "@/components/modules/HotelDetails/HotelOverview";
import { ImageGallery } from "@/components/modules/HotelDetails/ImageGallery";
import MapLocation from "@/components/modules/HotelDetails/MapLocation";
import PaymentMethodsSection from "@/components/modules/HotelDetails/PaymentMethodsSection";
import RoomsSection from "@/components/modules/HotelDetails/RoomsSection";
import PoliciesSection from "@/components/modules/HotelDetails/PoliciesSection";
import ReviewsSection from "@/components/modules/HotelDetails/ReviewsSection";
import { Container } from "@/components/PublicLayout/Shared/Container";
import { INearbyPlace } from "@/Server/Hotels/getNearbyPlaces";
import { THotelDetails } from "@/types/hotel";
import { TReview } from "@/types/review";
import { Button } from "@heroui/react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import HotelWishlistButton from "./WishlistButton";
import { Motion } from "@/components/Reuseable/common/Framermotion";

const brandLogoMap = {
  bkash: {
    alt: "bKash Payment",
    src: "https://www.tbsnews.net/sites/default/files/styles/big_2/public/images/2019/07/11/bkash_logo_0.jpg",
  },
  nagad: {
    alt: "Nagad Payment",
    src: "https://www.tbsnews.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2020/07/23/nagad-logo_-tbs.jpg",
  },
  rocket: {
    alt: "Rocket Payment",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZOtUyyZjuUZGdV-J0jgcugcm9cW8gnQqSnnhX_JnJ4ku1nabFqhGbus4&s=10",
  },
  visa: {
    alt: "Visa Card",
    src: "https://1000logos.net/wp-content/uploads/2021/11/VISA-logo.png",
  },
  mastercard: {
    alt: "Mastercard",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1280px-MasterCard_Logo.svg.png",
  },
  amex: {
    alt: "American Express",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvnYDkAUCDIctJYhq6ZIjGcNBncvc2J5Ptfekq2iwH86DEbDdh5_yBPRpO&s=10",
  },
};

// dummy review data formatted to match api output
const demoReviews: TReview[] = [
  {
    id: "demo-rev-1",
    rating: 5,
    comment:
      "Exceptional hospitality! The room was spotless, the bed was extremely comfortable, and the view from the balcony was absolutely breathtaking.",
    createdAt: "2026-03-15T10:30:00.000Z",
    customer: {
      id: "cust-1",
      name: "Sophia Reynolds",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
  },
  {
    id: "demo-rev-2",
    rating: 4,
    comment:
      "Great stay overall. Check-in was fast and the room service was top notch. Would definitely recommend for short family weekend stays.",
    createdAt: "2026-02-20T14:15:00.000Z",
    customer: {
      id: "cust-2",
      name: "Liam Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
  },
  {
    id: "demo-rev-3",
    rating: 5,
    comment:
      "The staff went above and beyond to accommodate our late arrival. Delicious breakfast spread every morning!",
    createdAt: "2026-01-11T09:45:00.000Z",
    customer: {
      id: "cust-3",
      name: "Emma Watson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    },
  },
];

interface HotelDetailsClientProps {
  hotel: THotelDetails | null;
  nearbyPlaces: INearbyPlace[];
  error: string | null;
  isLoggedIn?: boolean;
}

export default function HotelDetailsClient({
  hotel,
  nearbyPlaces,
  error,
  isLoggedIn = true,
}: HotelDetailsClientProps) {
  // error state layout
  if (error || !hotel) {
    return (
      <Container className="relative flex min-h-[70vh] items-center justify-center overflow-x-hidden px-4 pt-28 pb-8">
        <div className="absolute left-1/2 top-1/2 -z-10 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/10 blur-3xl" />

        <div className="flex max-w-2xl flex-col items-center text-center">
          <Motion
            animationType="scale"
            duration={0.5}
            className="mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-destructive/20 bg-destructive/10"
          >
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </Motion>

          <Motion animationType="fadeDown" delay={0.15}>
            <h1 className="text-5xl font-bold tracking-tight">Oops!</h1>
          </Motion>

          <Motion animationType="fadeUp" delay={0.25}>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {error || "Something went wrong. Please try again in a moment."}
            </p>
          </Motion>

          <Motion animationType="scale" delay={0.35} className="mt-10">
            <Button
              onClick={() => window.location.reload()}
              size="lg"
              className="group h-12 rounded-full px-8 shadow-lg shadow-primary/20"
            >
              <RefreshCcw className="mr-2 h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
              Try Again
            </Button>
          </Motion>

          <Motion animationType="fadeUp" delay={0.45}>
            <div className="mt-16 h-px w-40 origin-center bg-linear-to-r from-transparent via-border to-transparent" />
          </Motion>
        </div>
      </Container>
    );
  }

  const defaultSSLCommerceChannels = [
    "bKash",
    "Nagad",
    "Rocket",
    "Visa",
    "Mastercard",
    "Amex",
  ];

  // fallback to demo reviews when no ratings exist
  const displayReviews =
    hotel.reviews && hotel.reviews.length > 0 ? hotel.reviews : demoReviews;

  return (
    <div className="w-full overflow-x-clip">
      <Container className="pt-28! pb-8">
        {/* overview section */}
        <Motion
          animationType="fadeDown"
          delay={0.05}
          duration={0.5}
          className="mb-6"
        >
          <HotelOverview hotel={hotel} />

          <div className="flex items-center flex-wrap gap-4 mt-2">
            <ChatWithVendorButton hotelId={hotel.id} />
            <HotelWishlistButton hotelId={hotel.id} isLoggedIn={isLoggedIn} />
          </div>
        </Motion>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* left column content */}
          <div className="lg:col-span-2 space-y-8 min-w-0">
            {/* main hero gallery */}
            <Motion animationType="scale" delay={0.15} duration={0.5}>
              <ImageGallery
                images={hotel.hotelPhotos || []}
                description={hotel.description}
              />
            </Motion>

            <Motion
              animationType="fadeUp"
              delay={0.25}
              duration={0.45}
              className="border-b pb-6"
            >
              <h2 className="text-2xl font-bold mb-3">About this property</h2>
              {hotel.description ? (
                <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {hotel.description.split("\n\n").map((paragraph, pIdx) => {
                    const lines = paragraph.split("\n");
                    return (
                      <div key={pIdx} className="space-y-1">
                        {lines.map((line, lIdx) => {
                          const trimmed = line.trim();
                          const isBullet = trimmed.startsWith("•");
                          const isHeading =
                            trimmed.endsWith(":") ||
                            (trimmed.startsWith("**") && trimmed.includes(":**")) ||
                            (trimmed.startsWith("**") && trimmed.endsWith("**"));

                          if (isHeading) {
                            return (
                              <h3
                                key={lIdx}
                                className="font-bold text-foreground text-base tracking-tight pt-1.5"
                              >
                                {trimmed.replace(/\*\*/g, "")}
                              </h3>
                            );
                          }

                          if (isBullet) {
                            return (
                              <p
                                key={lIdx}
                                className="pl-3 text-foreground/90 font-medium text-sm"
                              >
                                {trimmed}
                              </p>
                            );
                          }

                          return (
                            <p key={lIdx} className="text-muted-foreground">
                              {trimmed.replace(/\*\*/g, "")}
                            </p>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-muted-foreground leading-relaxed">
                  {`Welcome to ${hotel.name}, a standard hotel category property located in the heart of ${hotel.city}. Perfect for comfortable stays with excellent hospitality and accessible facilities.`}
                </p>
              )}
            </Motion>

            <Motion animationType="fadeUp" delay={0.35} duration={0.45}>
              <HotelFeatures facilities={hotel.facilities || []} />
            </Motion>

            {/* rooms section */}
            <Motion animationType="fadeUp" delay={0.45} duration={0.5}>
              <RoomsSection rooms={hotel.roomCategories || []} />
            </Motion>

            {/* policies */}
            <Motion animationType="fadeUp" delay={0.55} duration={0.45}>
              <PoliciesSection
                policies={{
                  checkIn: hotel.checkInTime,
                  checkOut: hotel.checkOutTime,
                  cancellation: hotel.cancellationPolicy,
                }}
              />
            </Motion>

            {/* reviews section with fallback data */}
            <Motion animationType="fadeUp" delay={0.55} duration={0.45}>
              <ReviewsSection reviews={displayReviews} />
            </Motion>
          </div>

          {/* sidebar column */}
          <div className="lg:col-span-1 min-w-0">
            <Motion
              animationType="fadeUp"
              delay={0.2}
              duration={0.5}
              className="sticky top-28 space-y-6"
            >
              <AdminChatWithHotelButton hotelId={hotel.id} />

              <MapLocation
                coordinates={{
                  lat: Number(hotel.latitude),
                  lng: Number(hotel.longitude),
                }}
                location={hotel.address}
                name={hotel.name}
              />

              <AreaDetails places={nearbyPlaces} />

              <PaymentMethodsSection
                methods={hotel?.paymentMethods || defaultSSLCommerceChannels}
                brandLogoMap={brandLogoMap}
              />
            </Motion>
          </div>
        </div>
      </Container>
    </div>
  );
}
