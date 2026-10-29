import type { Metadata } from "next";
import OwnerProfileClient from "./OwnerProfileClient";

export const metadata: Metadata = {
  title: "Mohammed Rakib Gazi - Co-Owner | FeleTrip",
  description:
    "Official executive profile of Mohammed Rakib Gazi, Co-Owner at FeleTrip. Leading technology vision, business strategy, and travel innovation across Bangladesh and beyond.",
  keywords: [
    "Mohammed Rakib Gazi",
    "Rakib Gazi",
    "FeleTrip Co-Owner",
    "FeleTrip",
    "FeleTrip Leadership",
    "Gazi Courses",
    "Hotel Booking Bangladesh",
  ],
  openGraph: {
    title: "Mohammed Rakib Gazi - Co-Owner | FeleTrip",
    description:
      "Official executive profile of Mohammed Rakib Gazi, Co-Owner at FeleTrip. Leading technology vision, business strategy, and travel innovation.",
    url: "https://feletrip.com/owners/mohammed-rakib-gazi",
    siteName: "FeleTrip",
    images: [
      {
        url: "/owners/mohammed-rakib-gazi.png",
        width: 1024,
        height: 1024,
        alt: "Mohammed Rakib Gazi - Co-Owner at FeleTrip",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Rakib Gazi - Co-Owner | FeleTrip",
    description:
      "Official executive profile of Mohammed Rakib Gazi, Co-Owner at FeleTrip.",
    images: ["/owners/mohammed-rakib-gazi.png"],
  },
};

export default function OwnerProfilePage() {
  return <OwnerProfileClient />;
}
