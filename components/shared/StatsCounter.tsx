"use client";

import CountUp from "react-countup";
import { FaHotel, FaUsers, FaBed } from "react-icons/fa";
import { Motion } from "../Reuseable/common/Framermotion";
import { Binoculars } from "lucide-react";

interface AboutExperienceProps {
  successfulBookings: number;
  totalAvailableRooms: number;
  totalTravelers: number;
}

export default function ExperienceStats({
  successfulBookings,
  totalAvailableRooms,
  totalTravelers,
}: AboutExperienceProps) {
  const stats = [
    {
      id: 1,
      number: successfulBookings,
      label: "Successful Bookings",
      icon: FaHotel,
    },
    {
      id: 2,
      number: totalTravelers,
      label: "Happy Guests",
      icon: FaUsers,
    },
    {
      id: 3,
      number: totalAvailableRooms,
      label: "Premium Rooms Available",
      icon: FaBed,
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center py-24 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url('https://i.ibb.co/0R57jTjz/img3.jpg')",
      }}
    >
      {/* Dynamic Overlays for depth */}
      <div className="absolute inset-0 bg-linear-to-r from-neutral-950/90 via-neutral-900/75 to-neutral-900/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_40%)]" />

      <div className="container relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* Content Section */}
          <div>
            <Motion animationType="fade" delay={0.3}>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur-md">
                <Binoculars className="text-primary"/> The Next Generation of Travel
              </span>
            </Motion>
            <Motion animationType="fadeLeft" delay={0.5} duration={0.7} max-w-4xl>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight text-white ">
                Setting a new standard for modern{" "}
                <span className="bg-linear-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  hospitality
                </span>
              </h2>
            </Motion>

            <Motion
              animationType="fadeLeft"
              duration={0.7}
              delay={0.7}
              className="max-w-2xl"
            >
              <p className="mt-6 text-base text-white/70 sm:text-lg sm:leading-8">
                Built for the modern traveler, we are reinventing how you find
                and book your next stay. By combining cutting-edge technology
                with curated, high-quality stays, we deliver a seamless,
                transparent, and refreshing booking experience from day one.
              </p>
            </Motion>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-6 sm:grid-cols-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <Motion
                  key={stat.id}
                  animationType="card"
                  custom={index*3}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/6 p-6 text-center shadow-xl backdrop-blur-xl hover:border-white/20 hover:bg-white/10"
                >
                  {/* Subtle top accent bar */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary to-primary/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Icon Wrapper */}
                  <Motion animationType="iconHover">
                    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30">
                      <Icon className="text-2xl" />
                    </div>
                  </Motion>

                  {/* Number */}
                  <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    <CountUp end={stat.number} duration={3} enableScrollSpy />+
                  </h3>

                  {/* Label */}
                  <p className="mt-2.5 text-xs font-medium tracking-wide text-white/80 uppercase">
                    {stat.label}
                  </p>
                </Motion>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
