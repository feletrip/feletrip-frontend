"use client";

import Marquee from "react-fast-marquee";
import OfferCard from "./OfferCard";
import { IDeals } from "@/Server/Deals/ActiveDeals.actions";

interface OffersMarqueeProps {
  offers: IDeals[];
}

const OffersMarquee = ({ offers }: OffersMarqueeProps) => {
  if (!offers?.length) return null;

  return (
    <div>
      <Marquee className="py-12" pauseOnHover gradient={false} speed={40}>
        {[
          ...offers,
          ...offers,
          ...offers,
        ].map((offer, index) => (
          <div key={`${offer.id}-${index}`} className="mx-4 shrink-0">
            <OfferCard {...offer} />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default OffersMarquee;
