"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactInfoCard } from "./ContactInfoCard";

export default function GoogleMap() {
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.471334000522!2d-73.985428!3d40.748817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd";

  const [isMapActive, setIsMapActive] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mapContainerRef.current &&
        !mapContainerRef.current.contains(event.target as Node)
      ) {
        setIsMapActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-background pt-32 pb-24 overflow-hidden">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center px-4 mb-16">
        <span className="text-xs tracking-[0.25em] uppercase text-primary font-semibold mb-3 block">
          Contact us
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-foreground font-medium tracking-tight mb-5">
          We’d love to hear from you
        </h2>
        <p className="text-muted-foreground text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
          We have offices and teams all around the world. Conveniently located
          near major attractions, shopping districts, and business hubs.
        </p>
      </div>

      {/* Map Section */}
      <div className="w-full mx-auto px-8 md:px-12">
        <div
          ref={mapContainerRef}
          onClick={() => setIsMapActive(true)}
          className="w-full h-100 md:h-125 lg:h-140 relative bg-muted cursor-pointer border border-border rounded-2xl overflow-hidden shadow-sm"
        >
          <iframe
            src={mapSrc}
            className={`w-full h-full border-0 rounded-2xl transition-all duration-700 ${
              isMapActive ? "pointer-events-auto" : "pointer-events-none"
            }`}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {!isMapActive && (
            <div className="absolute inset-0 bg-transparent z-10" />
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-20">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-8 text-center">
          {/* Card 1: Support (Mail Animation) */}
          <ContactInfoCard
            title="Support"
            description="Our friendly team is here to help with any queries or assistance."
            linkText="support@ObeoRooms.com"
            linkHref="mailto:support@ObeoRooms.com"
            animationPath="/contactAnimation/Customer Support.json"
            fallbackIcon={<Mail size={16} />}
          />

          {/* Card 2: Sales (Location Animation) */}
          <ContactInfoCard
            title="Sales"
            description="Questions or queries about booking packages? Get in touch!"
            linkText="sales@ObeoRooms.com"
            linkHref="mailto:sales@ObeoRooms.com"
            animationPath="/contactAnimation/Location Icon.json"
            fallbackIcon={<MapPin size={16} />}
          />

          {/* Card 3: Phone (Phone Animation) */}
          <ContactInfoCard
            title="Phone"
            description="Mon-Fri from 8am to 5pm. Feel free to call us directly."
            linkText="+880 1876-987622"
            linkHref="tel:+880 1876-987622"
            animationPath="/contactAnimation/phone ring.json"
            fallbackIcon={<Phone size={16} />}
          />
        </div>
      </div>
    </div>
  );
}
