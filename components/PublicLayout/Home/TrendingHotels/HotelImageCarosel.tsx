"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  images: string[];
  name: string;
};

export default function HotelImageCarousel({ images, name }: Props) {
  const autoplay = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  return (
    <Carousel
      // plugins={[autoplay.current]}
      className="w-full cursor-pointer"
      onMouseEnter={() => autoplay.current.stop()}
      onMouseLeave={() => autoplay.current.reset()}
    >
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <div className="relative h-55 w-full overflow-hidden">
              <Image src={img} alt={name} fill className="object-cover" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-3 z-10 cursor-pointer bg-brand-primary/80 border-none text-brand-background" />
      <CarouselNext className="right-3 z-10 cursor-pointer bg-brand-primary/80 border-none text-brand-background" />
    </Carousel>
  );
}

// ------ redesigned code ------
// ("use client");

// import Image from "next/image";
// import { AnimatePresence, motion } from "framer-motion";
// import { useEffect, useRef, useState } from "react";

// type Props = {
//   images: string[];
//   name: string;
// };

// export default function HotelImageCarousel({ images, name }: Props) {
//   const [current, setCurrent] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   const touchStartX = useRef(0);
//   const touchEndX = useRef(0);

//   useEffect(() => {
//     if (isPaused || images.length <= 1) return;

//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [images.length, isPaused]);

//   const goToSlide = (index: number) => {
//     setCurrent(index);
//   };

//   const nextSlide = () => {
//     setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   };

//   const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
//     touchStartX.current = e.changedTouches[0].clientX;
//   };

//   const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
//     touchEndX.current = e.changedTouches[0].clientX;

//     const distance = touchStartX.current - touchEndX.current;

//     if (distance > 50) {
//       nextSlide();
//     }

//     if (distance < -50) {
//       prevSlide();
//     }
//   };

//   if (!images?.length) return null;

//   return (
//     <div
//       className="relative h-55 w-full overflow-hidden rounded-t-xl bg-black"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//       onTouchStart={handleTouchStart}
//       onTouchEnd={handleTouchEnd}
//     >
//       <AnimatePresence initial={false}>
//         <motion.div
//           key={current}
//           className="absolute inset-0"
//           initial={{
//             opacity: 0,
//             scale: 1.08,
//           }}
//           animate={{
//             opacity: 1,
//             scale: 1,
//           }}
//           exit={{
//             opacity: 0,
//             scale: 1,
//           }}
//           transition={{
//             opacity: {
//               duration: 2,
//               ease: "easeInOut",
//             },
//             scale: {
//               duration: 6,
//               ease: "linear",
//             },
//           }}
//         >
//           <Image
//             src={images[current]}
//             alt={`${name}-${current}`}
//             fill
//             priority={current === 0}
//             className="object-cover"
//             sizes="100vw"
//           />
//         </motion.div>
//       </AnimatePresence>

//       {/* Dots */}
//       {images.length > 1 && (
//         <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
//           {images.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               aria-label={`Go to image ${index + 1}`}
//               className="cursor-pointer"
//             >
//               <motion.div
//                 animate={{
//                   width: current === index ? 24 : 8,
//                   opacity: current === index ? 1 : 0.45,
//                 }}
//                 transition={{
//                   duration: 0.5,
//                 }}
//                 className="h-2 rounded-full bg-white"
//               />
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
