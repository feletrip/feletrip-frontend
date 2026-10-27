import { IDeals } from "@/Server/Deals/ActiveDeals.actions";
import { Tag } from "lucide-react";
import CouponOfferEmptyState from "./CouponOfferEmptyState";
import CopyCodeButton from "./CopyCodeButton";
interface CouponCodeOfferProps {
  activeDeals: IDeals[];
}
const CouponCodeOffer = ({ activeDeals }: CouponCodeOfferProps) => {
  const displayDeal =
    activeDeals.find((deal) => deal.isHighlighted) ?? activeDeals[0] ?? null;

  if (!displayDeal) {
    return <CouponOfferEmptyState />;
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-linear-to-br from-invert to-invert/90 p-5 text-invert-foreground shadow-sm">
      <div className="relative z-10">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary">
          <Tag className="size-3" />
          Special Offer
        </span>

        {/* Content */}
        <div className="mt-3">
          <h4 className="text-lg font-bold leading-tight">
            {displayDeal.title}
          </h4>

          <p className="mt-1.5 text-xs leading-relaxed text-invert-foreground/70">
          {displayDeal.description}
          </p>
        </div>

        {/* Coupon */}
        <div className="mt-4 flex items-end justify-between border-t border-invert-foreground/10 pt-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-invert-foreground/50">
              Use Code
            </p>

            <p className="mt-0.5 font-mono text-base font-bold tracking-wide text-primary">
            {displayDeal.promoCode}
            </p>
          </div>
          <CopyCodeButton code={displayDeal.promoCode} />
        </div>
      </div>

      {/* Decoration */}
      <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 blur-2xl" />

      <div className="pointer-events-none absolute -bottom-12 -left-10 size-28 rounded-full bg-primary/5 blur-2xl" />
    </div>
  );
};

export default CouponCodeOffer;
