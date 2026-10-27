"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import TeamModal from "./TeamModal";
import { useState } from "react";

const teamMembers = [
  {
    name: "Sarah Williams",
    role: "General Manager",
    image: "https://i.ibb.co.com/HDFX9V6p/image.png",
    details:
      "Passionate about delivering world-class hospitality experiences with a personal touch.bespoke local experiences that turn ordinary stays into lasting memories.",
  },
  {
    name: "David Thompson",
    role: "Head Chef",
    image: "https://i.ibb.co.com/3ybVJZtf/image.png",
    details:
      "Crafting unforgettable culinary journeys with global flavors and local ingredients.bespoke local experiences that turn ordinary stays into lasting memories.",
  },
  {
    name: "Emma Rodriguez",
    role: "Guest Relations",
    image: "https://i.ibb.co.com/7xm8B3GP/image.png",
    details:
      "Ensuring every guest feels valued and cared for from arrival to departure.bespoke local experiences that turn ordinary stays into lasting memories.",
  },
  {
    name: "Michael Lee",
    role: "Operations Director",
    image: "https://i.ibb.co.com/SD8fZNs6/image.png",
    details:
      "Driving excellence behind the scenes every single day with innovative solutions.bespoke local experiences that turn ordinary stays into lasting memories.",
  },
  {
    name: "Anika Patel",
    role: "Spa & Wellness Lead",
    image: "https://i.ibb.co.com/20ncZvNT/image.png",
    details:
      "Creating restorative sanctuaries where guests find balance, calm, and renewal.",
  },
  {
    name: "James Okafor",
    role: "Concierge Director",
    image: "https://i.ibb.co.com/jP9z9wB9/image.png",
    details:
      "Curating bespoke local experiences that turn ordinary stays into lasting memories.bespoke local experiences that turn ordinary stays into lasting memories.",
  },
];

interface Member {
  name: string;
  role: string;
  image: string;
  details: string;
}

export default function MeetOurTeam() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  
  return (
    <section className="py-16 bg-neutral-50 dark:bg-neutral-950">
      
      <div className="max-w-3xl mx-auto text-center mb-12 px-6">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl mb-3">
          Meet the Minds Behind Your Comfort
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base font-light leading-relaxed">
          Our dedicated team of hospitality experts works tirelessly behind the scenes 
          to connect hosts with travelers, ensuring every stay feels like home.
        </p>
      </div>

      {/* ── Marquee strip ──────────────────────── */}
      <Marquee pauseOnHover gradient={false} speed={30} className="pb-16">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="mx-4 w-80 group cursor-pointer"
            onClick={() => setSelectedMember(member)}
          >
            {/* Main Wrapper */}
            <div className="relative transition-all duration-300 group-hover:-translate-y-2">
              {/* Portrait*/}
              <div className="relative w-full h-96 overflow-hidden rounded-3xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top grayscale-15 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />

                {/* Gold corner brackets */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#c9a96e] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#c9a96e] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Info Box */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[85%] bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 px-6 py-4 rounded-2xl shadow-lg text-center transition-all duration-300 group-hover:border-[#c9a96e]/50">
                <h3 className="text-neutral-800 dark:text-neutral-100 font-semibold text-lg tracking-wide">
                  {member.name}
                </h3>
                <p className="text-neutral-400 dark:text-neutral-500 text-sm mt-0.5 font-medium">
                  {member.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Marquee>

      <TeamModal
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        member={selectedMember}
      />
    </section>
  );
}