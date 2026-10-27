"use client";

import GoogleMap from "@/components/shared/GoogleMap";
import MeetOurTeam from "@/components/shared/MeetOurTeam";
import ContactSection from "@/components/shared/ContactsSection";


export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* GOOGLE MAP                              */}
      <GoogleMap />
      {/* MEET THE TEAM                           */}
      <MeetOurTeam />

      {/* CONTACT GRID                            */}
      <ContactSection />
    </main>
  );
}
