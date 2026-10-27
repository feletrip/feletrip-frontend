import { BadgePercent, Search } from "lucide-react";

const CouponOfferEmptyState = () => {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border bg-card px-6 py-10 text-center shadow-sm">
      <div className="relative">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-accent">
          <BadgePercent className="size-6 text-accent-foreground" />
        </div>

        <div className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full border-2 border-card bg-background">
          <Search className="size-3 text-muted-foreground" />
        </div>
      </div>

      <h3 className="mt-4 text-base font-semibold text-foreground">
        No offers available
      </h3>

      <p className="mt-1.5 max-w-64 text-xs leading-relaxed text-muted-foreground">
        There are no active deals or coupon codes right now. Check back later
        for new savings.
      </p>
    </div>
  );
};
export default CouponOfferEmptyState;