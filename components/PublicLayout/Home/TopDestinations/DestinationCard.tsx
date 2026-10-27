"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DestinationCard({
  itemIndex,
  name,
  hotels,
  img,
  description,
  className = "",
}: {
  itemIndex: number;
  name: string;
  hotels: number;
  img: string;
  description?: string;
  className?: string;
}) {
  const router = useRouter();

  const handleExplore = () => {
    const query = new URLSearchParams({
      location: name.toLowerCase(),
    }).toString();

    router.push(`/hotels/search?${query}`);
  };

  return (
    <div
      className={`h-60 transition-all duration-700 ${className}
      ${itemIndex === 0 || itemIndex === 4 ? "flex-1 xl:flex-2 hover:flex-2 sm:col-span-2" : "flex-1 md:hover:flex-2 xl:hover:flex-3"}
      `}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          layout: { duration: 0.4, ease: "easeOut" },
          opacity: { duration: 0.3 },
          scale: { type: "spring", stiffness: 200 },
          delay: itemIndex * 0.05,
        }}
        whileHover={{ scale: 1.02 }}
        className="group relative h-60 overflow-hidden rounded-2xl border-3 border-background/50 bg-white/5 shadow-xl"
      >
        {/* Image */}
        <Image
          src={img}
          alt={name}
          fill
          sizes="(min-width: 320px)"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/50 to-black/10" />

        {/* Bottom Content */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5 flex flex-col justify-end">
          {/* Hotel Count */}
          <div className="mb-1.5 inline-flex w-fit items-center gap-2 rounded-sm border border-white/10 bg-white/10 px-2 py-0.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
            <span className="text-[11px] sm:text-xs font-medium text-white/90 whitespace-nowrap">
              {hotels} {hotels === 1 ? "Hotel" : "Hotels"} Available
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold tracking-wide text-white transition-all duration-300 group-hover:translate-x-1 pl-1">
            {name}
          </h3>

          {/* Expandable/Responsive Content Section */}
          <div className="mt-1 sm:mt-0 sm:max-h-0 sm:opacity-0 sm:group-hover:max-h-40 sm:group-hover:opacity-100 sm:group-hover:mt-2 transition-all duration-500 overflow-hidden flex flex-col">
            {/* Animated Line */}
            <div className="mb-2 h-px w-0 bg-white/30 transition-all duration-700 delay-150 sm:group-hover:w-full" />

            {/* Description & Button wrapper */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
              {/* Description */}
              {description && (
                <p className="text-[11px] sm:text-xs text-white/80 line-clamp-2 pl-1 font-light leading-relaxed">
                  {description}
                </p>
              )}

              {/* Button */}
              <Button
                onClick={handleExplore}
                className="w-full sm:w-auto shrink-0 rounded-md border border-white/20 bg-white/10 px-4 py-1.5 text-xs text-white backdrop-blur-md transition-all hover:bg-primary cursor-pointer"
              >
                Explore Now
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
