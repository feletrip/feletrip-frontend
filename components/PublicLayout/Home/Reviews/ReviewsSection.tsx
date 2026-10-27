"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import { CardContent } from "@/components/ui/card";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import Image from "next/image";

interface Review {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

const reviews: Review[] = [
  {
    quote:
      "Staying at Hoteler was an unforgettable experience. The staff went above and beyond to ensure our comfort and satisfaction. The room was immaculate, with breath-taking views.",
    name: "Marvin McKinney",
    title: "President of Sales",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    quote:
      "The hospitality was unmatched. Every detail was carefully thought out, making our stay seamless and luxurious.",
    name: "Courtney Henry",
    title: "VP of Marketing",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    quote:
      "From check-in to check-out, everything felt premium. Highly recommend Hoteler for anyone seeking comfort and elegance.",
    name: "Theresa Webb",
    title: "CEO",
    avatar: "https://i.pravatar.cc/100?img=8",
  },
];

export default function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);

  return (
    <section className="relative w-full py-20 bg-brand-background overflow-hidden">
      {/* Background shape */}
      <div className="absolute bottom-0 left-0 opacity-30">
        <Image
          src="https://i.ibb.co.com/F4FfJMb0/testimunial-shape.png"
          alt="shape"
          width={800}
          height={800}
          className="max-w-2xl"
        />
      </div>

      <div className="mx-auto max-w-4xl px-6 relative">
        {/* Navigation */}
        <div className="absolute inset-y-1/2 -left-20 flex items-center z-10">
          <button className="swiper-button-prev">
            <IoIosArrowRoundBack size={40} className="text-foreground" />
          </button>
        </div>

        <div className="absolute inset-y-1/2 -right-20 flex items-center z-10">
          <button className="swiper-button-next">
            <IoIosArrowRoundForward size={40} className="text-foreground" />
          </button>
        </div>

        {/* Main Swiper */}
        <Swiper
          modules={[EffectFade, Navigation, Autoplay]}
          loop
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          onSwiper={setMainSwiper}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          className="pb-4"
        >
          {reviews.map((review, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Quote Icon */}
                <div className="flex justify-center text-brand-primary/50 mb-6">
                  <BiSolidQuoteAltLeft size={80} />
                </div>

                <CardContent className="px-6 md:px-10 space-y-6">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-xl md:text-2xl leading-relaxed text-gray-700 max-w-2xl mx-auto font-light"
                  >
                    “{review.quote}”
                  </motion.p>

                  <div>
                    <p className="font-semibold text-xl">{review.name}</p>
                    <p className="text-muted-foreground">{review.title}</p>
                  </div>
                </CardContent>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnails */}
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          centeredSlides
          className="testimonial-thumbs overflow-visible"
        >
          {reviews.map((review, idx) => {
            const isActive = activeIndex === idx;

            return (
              <SwiperSlide key={idx} className="flex justify-center w-20! p-2">
                <motion.div
                  onClick={() => mainSwiper?.slideToLoop(idx)}
                  animate={{
                    scale: isActive ? 1.15 : 0.85,
                    opacity: isActive ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative cursor-pointer"
                >
                  {/* Glow */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full scale-125" />
                  )}

                  {/* Avatar */}
                  <div
                    className={`rounded-full overflow-hidden border-2 transition-all duration-300 ${
                      isActive ? "border-brand-primary" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
