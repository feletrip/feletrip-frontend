"use client"

import Link from "next/link";
import Image from "next/image"

type Feature = {
  icon: string
  title: string
}

type Room = {
  title: string
  image: string
}

const features: Feature[] = [
  { icon: "⭐", title: "350 Best Rooms 5 Star" },
  { icon: "☕", title: "Breakfast each morning" },
  { icon: "🛁", title: "Double Whirlpool Jacuzzi Tub" },
  { icon: "🍷", title: "Wet Bar with Refrigerator" },
]

const rooms: Room[] = [
  {
    title: "King Room",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0",
  },
  {
    title: "Suits Room",
    image:
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8",
  },
  {
    title: "Lake View",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  },
  {
    title: "City View",
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb",
  },
  {
    title: "Family Room",
    image:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
  },
]

export default function Luxury() {
  return (
    <section className="py-24">
      <div className="max-w-7xl w-full mx-auto px-4">

        {/* TOP GRID */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* IMAGE SIDE */}
          <div className="relative w-full">
    <div className="absolute -top-6 -left-6 h-40 w-40 bg-primary/10 z-0" />
            {/* BIG IMAGE */}
            <Image
              src="https://images.unsplash.com/photo-1590490360182-c33d57733427"
              alt="Luxury Room"
              width={600}
              height={700}
              className="rounded-md object-cover w-full h-125"
            />

            {/* SMALL OVERLAP IMAGE */}
            <div className="hidden md:block absolute -bottom-20 left-10 md:left-32 lg:left-40">
              <Image
                src="https://images.unsplash.com/photo-1560185893-a55cbc8c57e8"
                alt="Preview"
                width={260}
                height={200}
                className="rounded-md shadow-xl"
              />
            </div>

          </div>

          {/* CONTENT */}
          <div className="space-y-6 relative z-10">

            <p className="text-primary-foreground uppercase tracking-widest text-sm mt-5 sm:mt-30">
                <Link href="/about" className="hover:underline bg-primary px-4 py-3 rounded">
                  About Us
                </Link>
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Welcome To Our
              <span className="text-primary"> Best luxury stay</span>{" "} in the city.
            </h2>

            <p className="text-muted-foreground">
              Welcome to Hotel Mania, where luxury meets comfort.
              Since 1999 we provide premium experiences combining
              elegance, comfort and modern facilities.
            </p>

            {/* FEATURES MAP */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-primary">
                  <span className="text-lg">{feature.icon}</span>
                  <p className="font-medium">{feature.title}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ROOMS SECTION */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">

          {rooms.map((room, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg group"
            >
              <Image
                src={room.image}
                alt={room.title}
                width={300}
                height={200}
                className="h-44 w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/40 flex items-end p-3">
                <p className="text-white font-semibold">
                  {room.title}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}