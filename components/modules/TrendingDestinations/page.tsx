"use client";

import "swiper/css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
 
const TrendingDestinations = () => {
   const destinations = [
  {
    id: 1,
    name: "Cox's Bazar",
    image: "https://picsum.photos/400/300?1",
    hotels: 120,
    avgPrice: 85,
    startPrice: 45,
    rating: 4.6,
  },
  {
    id: 2,
    name: "Sylhet",
    image: "https://picsum.photos/400/300?2",
    hotels: 80,
    avgPrice: 70,
    startPrice: 40,
    rating: 4.4,
  },
  {
    id: 3,
    name: "Dhaka",
    image: "https://picsum.photos/400/300?3",
    hotels: 200,
    avgPrice: 95,
    startPrice: 55,
    rating: 4.5,
  },
  {
    id: 4,
    name: "Bandarban",
    image: "https://picsum.photos/400/300?4",
    hotels: 60,
    avgPrice: 65,
    startPrice: 35,
    rating: 4.3,
  },
  {
    id: 5,
    name: "Rangamati",
    image: "https://picsum.photos/400/300?5",
    hotels: 40,
    avgPrice: 60,
    startPrice: 30,
    rating: 4.2,
  },
];

    return (
     <section className="mt-20">
      <div className="text-center mt-20">
            <span className="text-sm text-blue-600 font-semibold">01 _ LEARN MORE ABOUT US</span>
            <h1 className="text-xl font-semibold mb-8">🌟Trending Destinations</h1>
            <p className="text-7xl font-bold text-blue-500">Create Memories Across The Globe
                with Journeys Designed Around You</p>
    </div>

        <Swiper
          modules={[EffectCoverflow, Navigation, Autoplay]}
          effect="coverflow"
          centeredSlides={true}
          loop={true}
          spaceBetween={40}
          slidesPerView={3}
          grabCursor={true}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: true,
          }}
          navigation
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2.5 },
            1280: { slidesPerView: 3 },
          }}
        >
          {destinations?.map((item) => (
            <SwiperSlide key={item.id} className="mt-20">
              <div className="bg-amber-200 rounded-2xl shadow-lg overflow-hidden h-112.5">
                
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image || "/placeholder.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {item.name}
                    </h3>
                    <p className="text-lg text-gray-500 mb-2 font-semibold">
                      {item.hotels} hotels
                    </p>
                    <p className="text-lg text-gray-500 mb-2 font-semibold space-x-1">
                      <span className="font-bold">
                        StartPrice:  ${item.startPrice}
                      </span><br/>
                       <span className="font-semibold">
                         AveragePrice: ${item.avgPrice}
                      </span> 
                   
                    
                    </p>
                  </div>

                  {item.rating && (
                    <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-lg text-sm font-semibold shadow">
                      ⭐ {item.rating}
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      
    
    </section>
  );
}

export default TrendingDestinations;