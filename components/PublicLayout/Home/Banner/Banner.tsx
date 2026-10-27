"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "../../Shared/Container";
import HotelSearchFilter from "../PrimarySearch/HotelSearchFilter";

const Banner = () => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 800], [1, 1.2]);

  return (
    <section className="relative mb-8">
      <div className="relative overflow-hidden">
        {/* Background Video */}
        <motion.div
          style={{ scale }}
          className="absolute inset-0 will-change-transform"
        >
          <video
            src="https://assets.sharetrip.net/hero-bg-cover.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="bg-black/60 w-full h-full object-cover object-top-left mask-[linear-gradient(to_bottom,black_20%,transparent)]"
          />
        </motion.div>

        {/* Content */}
        <Container className="relative z-10">
          <div className="mx-auto flex pt-25 sm:pt-35 lg:pt-45 max-w-5xl items-end px-4 pb-24">
            <div className="text-white [text-shadow:4px_4px_8px_rgba(0,0,0,0.5)]">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-2 text-2xl font-medium md:text-4xl"
              >
                Welcome to <span className="font-bold">ObeoRooms!</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="md:text-md [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]"
              >
                From luxury suites to cozy stays - find the perfect hotel for
                every journey.
              </motion.p>
            </div>
          </div>
        </Container>
      </div>

      {/* Search */}
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative z-20 mx-auto -mt-18 max-w-5xl"
        >
          <HotelSearchFilter />
        </motion.div>
      </Container>
    </section>
  );
};

export default Banner;
