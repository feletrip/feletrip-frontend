"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import { ICategory } from "@/types/category";
import { MdOutlineCategory } from "react-icons/md";

interface CategoryCardProps extends ICategory {
  index: number;
}

export default function CategoryCard({
  index,
  name,
  icon,
  backgroundImage,
  _count,
}: CategoryCardProps) {
  return (
    <Link
      href={`/hotels/search?propertyType=${encodeURIComponent(name)}`}
      className="group block shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 rounded-3xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: index * 0.2,
          type: "spring",
          stiffness: 200,
        }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl border-2 border-background"
      >
        {/* Image */}
        <div className="relative aspect-4/3 overflow-hidden">
          {backgroundImage ? (
            <Image
              src={backgroundImage}
              alt={name}
              fill
              sizes="(min-width: 1066px) 320px, 30vw"
              loading="lazy"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="relative overflow-hidden bg-linear-to-tr from-primary/40 to-muted w-full h-full">
              <motion.div
                initial={{ opacity: 0, x: 10, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
                className="w-2/3 aspect-square rounded-full absolute top-0 -right-1/4 bg-linear-to-tr from-primary/30"
              />
              <motion.div
                initial={{ opacity: 0, x: 10, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8,
                  type: "spring",
                  stiffness: 200,
                }}
                className="w-2/4 aspect-square rounded-full absolute top-0 -right-1/4 bg-linear-to-tr from-primary/20"
              />

              <MdOutlineCategory
                size={120}
                className="text-accent/50 absolute left-1/8 bottom-1/4"
              />
            </div>
          )}

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent" />

          {/* Floating Badge */}
          <div className="absolute top-4 left-4 rounded-full bg-linear-to-r from-white/90 to-white/30 border border-white/80 px-4 py-1.5 text-xs font-medium text-gray-900 shadow-lg">
            {_count?.hotels ?? 0} Properties
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-0 left-0 w-full p-5">
            <div className="flex items-end justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="relative bg-white/20 border text-white border-white/30 rounded-xl h-10 aspect-square mt-1 shadow-[0_0px_10px_rgba(255,255,255,0.50)] overflow-hidden group-hover:bg-primary/30 transition-all duration-500">
                  {icon ? (
                    <Image
                      src={icon}
                      alt={name}
                      fill
                      sizes="60px"
                      loading="lazy"
                      className="p-1 rounded-xl"
                    />
                  ) : (
                    <div className="flex justify-center items-center h-full w-full font-extrabold text-background/50 group-hover:text-background transition-all duration-500">
                      {name.split("")[0]}
                    </div>
                  )}
                </span>
                <div className="text-sm text-white/80">
                  <h3 className="text-2xl font-semibold text-white">{name}</h3>
                  <span>Explore destination</span>
                </div>
              </div>

              {/* arrow */}
              <div className="relative overflow-hidden text-black bg-white group-hover:shadow-xl group-hover:scale-105 h-10 w-10 rounded-full -rotate-35 transition-all duration-500">
                <span className="absolute bottom-3 left-3 group-hover:left-12 transition-all duration-500">
                  <FaArrowRightLong size={16} />
                </span>
                <span className="absolute bottom-3 group-hover:left-3 -left-12 transition-all duration-500">
                  <FaArrowRightLong size={16} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
