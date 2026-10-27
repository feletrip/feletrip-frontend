"use client";

import { MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { THotel } from "@/types/hotel";

type Props = {
  hotel: THotel;
  index: number;
};

export default function HotelCard({ hotel, index }: Props) {
  // --- Dynamic Image Resolving Logic ---
  let displayImageUrl: string | null = null;

  // Check for coverPhoto
  if (hotel.coverPhoto) {
    displayImageUrl =
      typeof hotel.coverPhoto === "string"
        ? hotel.coverPhoto
        : hotel.coverPhoto.photoUrl;
  }

  // If no coverPhoto, search through hotelPhotos
  if (!displayImageUrl && hotel.hotelPhotos && hotel.hotelPhotos.length > 0) {
    const coverPhotoObj = hotel.hotelPhotos.find((photo) => photo.isCover);
    displayImageUrl = coverPhotoObj
      ? coverPhotoObj.photoUrl
      : hotel.hotelPhotos[0].photoUrl;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -4 }}
      transition={{ duration: 0.2 }}
      className="group h-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.2,
          delay: index * 0.05,
          ease: "easeOut",
        }}
        className="h-full"
      >
        <Card className="relative h-full overflow-hidden shadow-xl/5 hover:shadow-2xl/15 p-0 bg-background border hover:border-primary/30 transition-all duration-300 flex flex-col">
          {/* Image / Fallback Header Container */}
          <div className="relative h-48 w-full overflow-hidden shrink-0 bg-accent">
            {displayImageUrl ? (
              <Image
                src={displayImageUrl}
                alt={hotel.name}
                fill
                sizes="(min-width: 1066px) 320px, 30vw"
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              /* Stylish, unique fallback background when no images exist */
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-muted">
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

          {/* Content Section */}
          <CardContent className="flex flex-col flex-1 justify-between gap-1 p-5">
            <div className="flex flex-col gap-2">
              {/* Title Block with unified spacing */}
              <div className="space-y-1">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-xl font-bold drop-shadow-lg line-clamp-1 leading-snug capitalize"
                  title={hotel.name}
                >
                  {hotel.name}
                </motion.h3>

                {/* Facilities Section - minimum 2 lines */}
                <div className="flex flex-wrap items-center content-start gap-1.5 h-[54px] min-h-[54px] overflow-hidden py-0.5">
                  {hotel.facilities && hotel.facilities.length > 0 ? (
                    <>
                      {(hotel.facilities.length <= 6
                        ? hotel.facilities
                        : hotel.facilities.slice(0, 5)
                      ).map((facility, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground border truncate max-w-[100px]"
                          title={facility}
                        >
                          {facility}
                        </span>
                      ))}
                      {hotel.facilities.length > 6 && (
                        <span className="text-[10px] sm:text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-primary/10 text-primary shrink-0">
                          +{hotel.facilities.length - 5}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-xs text-muted-foreground/70 italic flex items-center h-full">
                      Standard facilities available
                    </span>
                  )}
                </div>
              </div>

              {/* Location & Rating row */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex justify-between items-center gap-2 h-8"
              >
                <span className="flex items-center gap-1 text-sm text-primary truncate max-w-[55%]">
                  <MapPin size={15} className="shrink-0" />
                  <span className="truncate">{hotel.city}</span>
                </span>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-1 rounded-md border border-yellow-500/15 bg-linear-to-l from-yellow-500/10 to-transparent px-2 py-0.5 shrink-0"
                >
                  <Star
                    size={13}
                    className={
                      hotel.averageRating > 0
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-muted-foreground"
                    }
                  />
                  <span className="text-xs font-semibold">
                    {hotel.averageRating > 0
                      ? hotel.averageRating.toFixed(1)
                      : "N/A"}
                  </span>
                  <span className="text-[10px] font-medium text-muted-foreground">
                    ({hotel.reviewCount ?? 0})
                  </span>
                </motion.div>
              </motion.div>

              {/* Divider decoration */}
              <div className="relative my-2">
                <div className="h-px w-full bg-border" />
                <div className="absolute left-1/2 top-1/2 h-1.5 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-all duration-300 shadow-lg shadow-primary/40" />
              </div>
            </div>

            {/* Price section - Fixed-height container alignment */}
            <div className="flex justify-between items-center gap-2 py-2 px-4 rounded-lg bg-linear-to-r from-primary/10 to-transparent shadow-sm my-2 h-11 shrink-0">
              {hotel.minPrice && hotel.minPrice > 0 ? (
                <>
                  <p className="text-xs text-muted-foreground">Starting from</p>
                  <motion.h4
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-lg font-bold tracking-tight"
                  >
                    <sup className="text-muted-foreground font-normal text-xs mr-0.5">
                      ৳
                    </sup>
                    {hotel.minPrice}
                  </motion.h4>
                </>
              ) : (
                <p className="text-xs font-medium text-muted-foreground py-0.5">
                  Contact for Pricing
                </p>
              )}
            </div>

            {/* Bottom Actions Row - Perfectly Aligned */}
            <div className="pt-2 mt-auto shrink-0">
              <Link href={`/hotels/${hotel.slug || hotel.id}`} className="block w-full">
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Button size="sm" className="w-full text-sm h-8.5">
                    View Details
                  </Button>
                </motion.div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
