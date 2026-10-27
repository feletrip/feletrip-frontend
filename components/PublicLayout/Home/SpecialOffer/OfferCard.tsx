"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { IDeals } from "@/Server/Deals/ActiveDeals.actions";
import { BiSolidOffer } from "react-icons/bi";
import { MdLocalOffer } from "react-icons/md";
import { toast } from "@/components/Reuseable/common/toast";
import { TicketPercent } from "lucide-react";
import OfferDetailsModal from "./OfferDetailsModal";

export default function OfferCard({
  id,
  title,
  description,
  promoCode,
  image,
  dealType,
  discountValue,
  isHighlighted,
}: IDeals) {
  const discountText =
    dealType === "PERCENTAGE"
      ? `${discountValue}% OFF`
      : `৳${discountValue} OFF`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(promoCode);
    toast.success(
      "Promo Code Copied",
      ` "${promoCode}" has been copied to your clipboard`,
    );
  };

  return (
    <div
      className={cn(
        "group relative w-80 overflow-hidden rounded-3xl border border-border/50 bg-background/80 backdrop-blur-xl shadow-lg transition-all duration-500",
        isHighlighted &&
          "scale-[1.03] border-primary/40 shadow-xl shadow-primary/20",
      )}
    >
      {/* highlighted badge */}
      {isHighlighted && (
        <div className="absolute -top-7.5 z-20 left-1/2 -translate-x-1/2 px-6 pb-1 pt-8 rounded-full bg-primary text-background shadow-lg shadow-primary/20 text-xs font-semibold uppercase">
          Highlighted
        </div>
      )}

      {/* animated border glow */}
      {isHighlighted && (
        <div className="absolute inset-0 rounded-3xl border border-primary/30 ring-1 ring-primary/20 -z-10" />
      )}

      {/* image section */}
      <div className="relative h-48 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="320px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="h-full flex justify-center items-center bg-accent relative text-9xl text-background">
            {dealType === "PERCENTAGE" ? <BiSolidOffer /> : <MdLocalOffer />}
            <div className="absolute -bottom-20 -right-20 h-50 aspect-square rounded-full bg-primary/10" />
          </div>
        )}

        {/* overlays */}
        <div
          className={cn(
            "absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent",
            isHighlighted && "from-background via-background/20",
          )}
        />
      </div>

      {/* content */}
      <div className="space-y-5 px-5 pb-5">
        <div className="space-y-2">
          <h3 className="line-clamp-1 text-xl font-bold tracking-tight text-foreground">
            {title}
          </h3>

          <p className="line-clamp-2 h-12 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        {/* divider */}
        <div className="relative">
          <div className="h-px w-full bg-border" />
          <div
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-all duration-300 text-center text-xs font-bold text-background px-4 py-1",
              isHighlighted && "w-24 shadow-lg shadow-primary/40",
            )}
          >
            {discountText}
          </div>
        </div>

        {/* promo badge */}
        <div
          onClick={copyToClipboard}
          className={cn(
            "flex cursor-pointer items-center gap-2 rounded-2xl bg-background/80 p-2 transition-all duration-300 hover:border-primary/40",
            isHighlighted && "border border-primary/20 bg-background/90",
          )}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <TicketPercent className="h-5 w-5" />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-widest text-foreground">
              Promo Code
            </p>
            <h4 className="text-sm font-bold tracking-wide text-primary">
              {promoCode}
            </h4>
          </div>
        </div>

        {/* Render Modal Component */}
        <OfferDetailsModal id={id} isHighlighted={isHighlighted} />
      </div>

      {/* glow effect */}
      <div
        className={cn(
          "absolute -left-20 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20",
          isHighlighted && "bg-primary/20 group-hover:bg-primary/30",
        )}
      />
    </div>
  );
}
