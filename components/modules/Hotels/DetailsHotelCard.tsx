"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  MapPin,
  ShieldCheck,
  MoveRight,
  ShieldAlert,
  Star,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, spring } from "framer-motion";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { THotel } from "@/types/hotel";
import OverflowBadgeGroup from "./OverflowBadgeGroup";

type TView = "grid" | "list";

type DetailsHotelCardHotel = Pick<
  THotel,
  | "id"
  | "name"
  | "address"
  | "city"
  | "coverPhoto"
  | "averageRating"
  | "reviewCount"
  | "minPrice"
> &
  Partial<
    Pick<
      THotel,
      | "description"
      | "facilities"
      | "cancellationPolicy"
      | "availableRooms"
      | "distance"
      | "slug"
    >
  >;

type Props = {
  hotel: DetailsHotelCardHotel;
  view: TView;
  idx: number;
};

const DetailsHotelCard = ({ hotel, view, idx }: Props) => {
  const {
    id,
    name,
    address,
    city,
    description,
    facilities,
    cancellationPolicy,
    averageRating,
    reviewCount,
    minPrice,
    availableRooms,
    coverPhoto: rawCoverPhoto,
    distance,
    slug,
  } = hotel;

  // Safe Cover Photo extraction
  const imageUrl: string | null =
    typeof rawCoverPhoto === "object" &&
    rawCoverPhoto !== null &&
    "photoUrl" in rawCoverPhoto
      ? rawCoverPhoto.photoUrl
      : typeof rawCoverPhoto === "string"
        ? rawCoverPhoto
        : null;

  const ratingLabel = !averageRating
    ? "No ratings"
    : averageRating >= 4.8
      ? "Exceptional"
      : averageRating >= 4.5
        ? "Wonderful"
        : averageRating >= 4
          ? "Excellent"
          : averageRating >= 3
            ? "Very Good"
            : "Good";

  const isList = view === "list";

  const DEFAULT_FEATURED_COMFORTS = [
    "Easy Booking",
    "Secure Payment",
    "24/7 Support",
    "Trusted Properties",
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: idx * 0.1,
        type: spring,
        stiffness: 200,
      }}
      className="w-full h-full"
    >
      <section
        className={cn(
          "group relative flex overflow-hidden rounded-2xl border bg-linear-to-b from-background to-accent text-foreground shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:border-primary/30 h-full w-full",
          isList ? "flex-col md:flex-row gap-0 md:gap-2" : "flex-col gap-0",
        )}
      >
        {/* Subtle Decorative Background Glow */}
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl transition-opacity duration-500 group-hover:bg-primary/10 pointer-events-none" />

        {/* IMAGE SECTION */}
        <div
          className={cn(
            "relative w-full z-10 shrink-0 overflow-hidden",
            isList
              ? "aspect-video sm:aspect-4/3 md:aspect-square w-full md:w-64 lg:w-72 xl:w-80"
              : "aspect-video sm:aspect-16/10",
          )}
        >
          <div className="absolute inset-0 overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-cover transition duration-700 ease-out group-hover:scale-105"
                sizes={
                  isList
                    ? "(max-width: 768px) 100vw, 320px"
                    : "(max-width: 640px) 100vw, 50vw"
                }
                priority={idx < 4}
              />
            ) : (
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-muted/30">
                {/* Background Glow */}
                <div className="absolute -top-12 -left-12 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
                <div className="absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-primary/10 blur-3xl" />

                {/* Decorative Shapes */}
                <div className="absolute top-6 left-6 h-20 w-20 rounded-full border border-primary/10 bg-background/30 backdrop-blur-md hidden sm:block" />
                <div className="absolute bottom-8 right-8 h-14 w-14 rotate-12 rounded-2xl bg-primary/10 backdrop-blur-md hidden sm:block" />

                {/* Center Content */}
                <div className="relative z-10 flex flex-col items-center gap-2 p-4 text-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-background/80 shadow-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary/70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16l4.5-5 3.5 4 3-3L20 17M4 7h.01M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      No Image Available
                    </p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      Hotel image coming soon
                    </p>
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-primary/10 to-transparent" />
              </div>
            )}
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="flex flex-1 flex-col justify-between w-full min-w-0">
          <CardContent
            className={cn(
              "flex flex-1 flex-col justify-center p-4 sm:p-5 md:p-6 w-full",
            )}
          >
            {/* Header Title Block */}
            <div className="flex justify-between items-start gap-3 w-full">
              <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                <h3 className="truncate text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-lg lg:text-xl capitalize">
                  {name}
                </h3>

                <Motion
                  animationType="fade"
                  delay={0.1}
                  className="flex flex-wrap items-center gap-x-2 gap-y-1"
                >
                  <div className="flex items-center gap-1 rounded-full bg-linear-to-r from-amber-500/20 to-orange-500/10 border border-amber-200/60 px-2 py-0.5 text-[11px] font-bold text-amber-700 shadow-sm whitespace-nowrap">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400 shrink-0" />
                    <span>
                      {averageRating ? averageRating.toFixed(1) : "0.0"}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold tracking-wide uppercase dark:text-amber-400 whitespace-nowrap">
                    {ratingLabel}
                  </span>

                  <span className="text-xs text-muted-foreground/40 font-light hidden xs:inline">
                    •
                  </span>

                  <span className="text-xs text-muted-foreground underline underline-offset-4 decoration-muted-foreground/20 hover:decoration-primary/60 hover:text-foreground transition-colors truncate">
                    {(reviewCount ?? 0).toLocaleString()} reviews
                  </span>
                </Motion>

                {/* Location metadata line */}
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1 min-w-0 max-w-full">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/70" />
                    <span className="truncate text-xs sm:text-sm font-medium">
                      {address}
                    </span>
                  </div>

                  {distance !== undefined && distance !== null && (
                    <Badge
                      variant="secondary"
                      className="text-[10px] font-bold py-0.5 px-2 rounded-full bg-primary/10 text-primary tracking-wide whitespace-nowrap border border-primary/5"
                    >
                      {distance.toFixed(2)} km away
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* STYLISH GRADIENT INLINE CARDS SPLIT */}
            <div
              className={cn(
                "mt-4 grid grid-cols-1 gap-3 w-full",
                isList
                  ? "sm:grid-cols-2"
                  : "xs:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2",
              )}
            >
              {/* Description */}
              <Motion
                animationType="scale"
                delay={0.2}
                className="flex flex-col justify-start rounded-xl border border-border/50 bg-background p-3 w-full min-w-0"
              >
                <div className="mb-1.5 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-primary/70 shrink-0" />
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/90 truncate">
                    The Property Experience
                  </h4>
                </div>

                <p className="line-clamp-2 sm:line-clamp-3 text-xs leading-relaxed text-muted-foreground/90 wrap-break-word">
                  {description ||
                    `${name} provides exceptional accommodation features situated beautifully within the heart of ${city}.`}
                </p>
              </Motion>

              {/* Amenities */}
              <Motion
                animationType="scale"
                delay={0.3}
                className="flex flex-col justify-start rounded-xl border border-border/50 bg-background p-3 w-full min-w-0"
              >
                <h4 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/90 truncate">
                  Featured Comforts
                </h4>

                <div className="w-full overflow-hidden">
                  <OverflowBadgeGroup
                    items={
                      facilities?.length
                        ? facilities.map(String)
                        : DEFAULT_FEATURED_COMFORTS
                    }
                  />
                </div>
              </Motion>
            </div>

            {/* Inclusions / Policies line */}
            <Motion
              animationType="fade"
              delay={0.4}
              className="my-3.5 flex flex-wrap items-center gap-3 w-full"
            >
              {cancellationPolicy ? (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  <span className="truncate">{cancellationPolicy}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                  <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                  <span className="truncate">Standard terms apply</span>
                </div>
              )}
            </Motion>

            {/* STYLISH UNIQUE PRICE SECTION */}
            <div
              className={cn(
                "mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t pt-4 w-full",
                isList
                  ? "md:flex-col lg:flex-row md:items-stretch lg:items-center"
                  : "",
              )}
            >
              <Motion
                animationType="fadeLeft"
                delay={0.2}
                className="shrink-0 w-full sm:w-auto"
              >
                <div className="flex items-center gap-3 bg-muted/20 border border-border/40 rounded-xl px-3 py-2 group-hover:bg-primary/2 group-hover:border-primary/20 transition-all duration-300 w-full sm:w-auto justify-start">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xl shadow-inner border border-primary/10">
                    ৳
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase leading-none mb-0.5 truncate">
                      Nightly Rate
                    </span>
                    <div className="flex items-baseline gap-0.5 flex-wrap">
                      <span className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl whitespace-nowrap">
                        {minPrice !== null &&
                        minPrice !== undefined &&
                        minPrice > 0 ? (
                          minPrice.toLocaleString()
                        ) : (
                          <span className="text-xs font-semibold text-muted-foreground">
                            Contact Property
                          </span>
                        )}
                      </span>
                      {minPrice !== null &&
                        minPrice !== undefined &&
                        minPrice > 0 && (
                          <span className="text-xs font-medium text-muted-foreground ml-0.5 whitespace-nowrap">
                            /night
                          </span>
                        )}
                    </div>
                  </div>
                </div>
              </Motion>

              <div className="flex flex-row sm:flex-col justify-between items-center sm:items-end gap-2 w-full sm:w-auto shrink-0">
                {availableRooms !== undefined &&
                  availableRooms !== null &&
                  availableRooms > 0 &&
                  availableRooms <= 5 && (
                    <Motion
                      animationType="fade"
                      delay={0.2}
                      className="px-1 text-xs font-bold text-red-600 tracking-wide whitespace-nowrap animate-pulse sm:mb-1"
                    >
                      Only {availableRooms} left!
                    </Motion>
                  )}

                <Motion
                  animationType="fadeRight"
                  delay={0.2}
                  className="w-full sm:w-auto"
                >
                  <Link href={`/hotels/${slug || id}`} className="w-full block">
                    <Button className="w-full sm:w-auto justify-center gap-2">
                      <span>View Details</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{
                          duration: 1.2,
                          ease: "easeInOut",
                          repeat: Infinity,
                        }}
                        className="shrink-0"
                      >
                        <MoveRight className="h-4 w-4" />
                      </motion.span>
                    </Button>
                  </Link>
                </Motion>
              </div>
            </div>
          </CardContent>
        </div>
      </section>
    </motion.section>
  );
};

export default DetailsHotelCard;
