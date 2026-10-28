"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { MapPin } from "lucide-react";
import { Container } from "./Container";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import FeleTripLogo from "@/components/shared/FeleTripLogo";

const SOCIAL_NETWORKS = [
  { Icon: FaFacebookF, href: "https://facebook.com/FeleTrip" },
  { Icon: FaInstagram, href: "https://instagram.com/FeleTrip" },
  { Icon: FaLinkedinIn, href: "https://linkedin.com/company/FeleTrip" },
  { Icon: FaWhatsapp, href: "https://wa.me/your-number" },
];

const SERVICES = [
  { label: "All Properties", href: "/hotels" },
  { label: "Top Hotels", href: "/#trending-hotels" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blogs", href: "/blogs" },
];

const FOOTER_BOTTOM_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms-and-conditions" },
  { label: "Cookies", href: "/cookie-policy" },
];

const LOCATIONS = [
  {
    title: "Registered Office",
    address:
      "52, STD Nahar Garden, Janata Housing, Road 5A, Ring Road, Adabor, Dhaka-1207",
  },
  {
    title: "Corporate Office",
    address: "15/12D, Block # F Hazi Chinu Mia Rd, Dhaka 1207",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black/96 text-muted-foreground backdrop-blur-3xl">
      <Container>
        {/* Subtle glow elements */}
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1/2 h-84 w-1/2 rounded-full bg-primary/10 blur-[128px]" />

        <div className="relative pt-16 pb-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-6">
              <Motion animationType="fadeLeft">
                <FeleTripLogo variant="dark" />
              </Motion>

              <Motion
                animationType="fadeDown"
                delay={0.3}
                className="text-sm leading-relaxed text-zinc-500"
              >
                <p>
                  Find exceptional hotels, premium stays and memorable travel
                  experiences across Bangladesh and beyond.
                </p>
              </Motion>

              {/* Newsletter */}
              <Motion animationType="scale" className="flex items-center">
                <Input
                  placeholder="Your email"
                  className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-600 rounded-r-none"
                />
                <Button className="bg-primary hover:bg-primary/90 rounded-l-none hover:scale-100!">
                  Send
                </Button>
              </Motion>

              {/* Social Icons */}
              <div className="flex gap-4">
                {SOCIAL_NETWORKS.map(({ Icon, href }, i) => (
                  <Motion key={i} animationType="fadeLeft" delay={i * 0.1}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 cursor-pointer items-center shadow-lg justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-0.5 hover:shadow-primary/30"
                    >
                      <Icon size={15} />
                    </a>
                  </Motion>
                ))}
              </div>
            </div>

            {/* Services Column */}
            <div>
              <Motion animationType="fadeDown">
                <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
                  Services
                </h4>
              </Motion>

              <ul className="space-y-3">
                {SERVICES.map((item, idx) => (
                  <Motion
                    animationType="fadeLeft"
                    delay={(idx + 1) * 0.1}
                    key={item.label}
                  >
                    <li>
                      <a
                        href={item.href}
                        className="cursor-pointer text-sm transition hover:text-white block"
                      >
                        {item.label}
                      </a>
                    </li>
                  </Motion>
                ))}
              </ul>
            </div>

            {/* Quick Links Column */}
            <div>
              <Motion animationType="fadeDown">
                <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
                  Quick Links
                </h4>
              </Motion>

              <ul className="space-y-3">
                {FOOTER_BOTTOM_LINKS.map((item, idx) => (
                  <Motion
                    animationType="fadeLeft"
                    delay={idx * 0.1}
                    key={item.label}
                  >
                    <a href={item.href} className="transition hover:text-white">
                      {item.label}
                    </a>
                  </Motion>
                ))}
              </ul>
            </div>

            {/* Address Column */}
            <div>
              <Motion animationType="fadeDown">
                <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white flex items-center gap-2">
                  <span className="text-primary!">
                    <MapPin size={18} />
                  </span>
                  <span>Locations</span>
                </h4>
              </Motion>

              <div className="space-y-4 text-sm">
                {LOCATIONS.map((loc, idx) => (
                  <Motion
                    animationType="fadeRight"
                    delay={(idx + 1) * 0.2}
                    key={idx}
                    className="px-4 py-3 rounded-lg bg-linear-to-r from-primary/10 to-transparent"
                  >
                    <p className="mb-2 font-medium text-white">{loc.title}</p>
                    <p className="leading-relaxed text-zinc-500">
                      {loc.address}
                    </p>
                  </Motion>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Terms Banner */}
          <div className="mt-8 border-t border-zinc-800 pt-6">
            <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
              <p className="text-zinc-500">
                © 2026 FeleTrip.com. All rights reserved.
              </p>

              <div className="flex gap-6">
                {FOOTER_BOTTOM_LINKS.map((item, idx) => (
                  <Motion
                    animationType="fadeUp"
                    delay={idx * 0.2}
                    key={item.label}
                  >
                    <a href={item.href} className="transition hover:text-white">
                      {item.label}
                    </a>
                  </Motion>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
