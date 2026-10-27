"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { Motion, AnimatePresence, motion } from "../../../../components/Reuseable/common/Framermotion";

const images = [
  {
    src: "https://i.ibb.co.com/LXbf6fR1/leo-visions-knhr826q-IMA-unsplash.jpg",
    alt: "Luxury hotel pool overlooking the ocean at sunset",
  },
  {
    src: "https://i.ibb.co.com/6RYMCDkW/valeriia-bugaiova-p-PHge-Hz1uk-unsplash.jpg",
    alt: "Elegant hotel lobby with modern architecture",
  },
  {
    src: "https://i.ibb.co.com/9kwFGDQF/sara-dubler-Koei-7y-Yt-Io-unsplash.jpg",
    alt: "Beachfront resort villa surrounded by palm trees",
  },
  {
    src: "https://i.ibb.co.com/Mb33wKf/pietro-de-grandi-T7-K4a-EPo-GGk-unsplash.jpg",
    alt: "Panoramic view of a coastal hotel destination",
  },
];

const AUTOPLAY_INTERVAL = 4000;

export default function BlogBanner() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    setIndex(i);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <header
      className="relative min-h-125 md:min-h-150 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="hidden">
        {images.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt=""
            width={1}
            height={1}
            priority={i !== 0}
            unoptimized
          />
        ))}
      </div>

      {/* Animated Images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[index].src}
            alt={images[index].alt}
            fill
            priority={index === 0}
            unoptimized
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        {/* Title */}
        <Motion animationType="slideUp" delay={0.2} duration={0.8}>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl text-white font-normal max-w-4xl leading-tight mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.01em" }}
          >
            Travel Stories &<br />Destination Guides
          </h1>
        </Motion>

        {/* Subtitle */}
        <Motion animationType="slideUp" delay={0.4} duration={0.8}>
          <p
            className="text-base md:text-lg text-white/80 max-w-2xl mb-8 font-light"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Discover hidden gems, local experiences, and insider tips from our travel experts
          </p>
        </Motion>

        {/* Stats */}
        <Motion animationType="slideUp" delay={0.6} duration={0.8}>
          <div className="flex items-center gap-8 text-white/70 text-sm tracking-wider uppercase">
            <div className="flex items-center gap-2">
              <span className="text-primary text-xl font-semibold">50+</span>
              <span>Destinations</span>
            </div>
            <div className="w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              <span className="text-primary text-xl font-semibold">200+</span>
              <span>Articles</span>
            </div>
            <div className="w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              <span className="text-primary text-xl font-semibold">10K+</span>
              <span>Readers</span>
            </div>
          </div>
        </Motion>

        {/* Slide Indicators */}
        <div className="flex items-center gap-2 mt-10">
          {images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <Motion animationType="fade" delay={1} duration={0.8}>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
          <div className="w-px h-12 bg-linear-to-b from-white/60 to-transparent" />
        </div>
      </Motion>
    </header>
  );
}