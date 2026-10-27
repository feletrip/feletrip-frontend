import { ActiveDealsActions, IDeals } from "@/Server/Deals/ActiveDeals.actions";
import SectionTitle from "../../Typography";
import Marquee from "./OffersMarquee";

export default async function SpecialOffer() {
  const response = await ActiveDealsActions();

  const offers: IDeals[] = response?.data ?? [];

  return (
    <section className="py-20 bg-brand-background">
      {offers.length > 0 && (
        <>
          <SectionTitle
            title="What We Offer"
            subtitle="Get Our Special Deals"
            className="text-center mb-12"
            divClassName="justify-center"
            subtitleClassName="max-w-3xl mx-auto"
          />

          <Marquee offers={offers} />
        </>
      )}
    </section>
  );
}
