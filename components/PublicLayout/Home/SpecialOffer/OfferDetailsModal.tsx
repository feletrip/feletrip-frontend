"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Modal } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { Container } from "../../Shared/Container";
import {
  Building2,
  MapPin,
  ShieldCheck,
  TicketPercent,
  BedDouble,
  Users,
  CalendarDays,
  Flame,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  GetActiveDealDetailsAction,
  IDeals,
} from "@/Server/Deals/ActiveDeals.actions";

interface OfferDetailsModalProps {
  id: string;
  isHighlighted?: boolean;
}

export default function OfferDetailsModal({
  id,
  isHighlighted,
}: OfferDetailsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [deal, setDeal] = useState<IDeals | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Fetch deal details on modal trigger
  useEffect(() => {
    if (!isOpen) return;

    async function fetchDealDetails() {
      try {
        setIsLoading(true);
        const res = await GetActiveDealDetailsAction(id);

        if (res.success && res.data) {
          setDeal(res.data);
        }
      } catch (error) {
        console.error("Error loading deal details:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDealDetails();
  }, [isOpen, id]);

  const copyToClipboard = (promoCode?: string) => {
    if (!promoCode || isCopied) return;
    navigator.clipboard.writeText(promoCode);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  // Helper date formatter
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const discountText = deal
    ? deal.dealType === "PERCENTAGE"
      ? `${deal.discountValue}% OFF`
      : `৳${deal.discountValue} OFF`
    : "";

  // Usage Limit calculations
  const usageLimit = deal?.usageLimit ?? 0;
  const usedCount = deal?.usedCount ?? 0;
  const remainingUses = Math.max(0, usageLimit - usedCount);
  const usagePercent = usageLimit > 0 ? (usedCount / usageLimit) * 100 : 0;

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Modal.Trigger className="w-full">
        <Button
          variant={isHighlighted ? "default" : "secondary"}
          className={cn(
            "w-full uppercase font-semibold tracking-wider cursor-pointer transition-all duration-300",
            isHighlighted &&
              "shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5",
          )}
        >
          Learn More
        </Button>
      </Modal.Trigger>

      <Modal.Backdrop
        className="bg-black/60 backdrop-blur-md transition-all"
        variant="blur"
      >
        <Modal.Container>
          <Container className="h-screen flex justify-center items-center">
            <Modal.Dialog className="sm:max-w-xl w-full mx-4 max-h-[85vh] overflow-y-auto rounded-3xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl">
              {isLoading ? (
                /* Custom Loader Component */
                <div className="flex flex-col items-center justify-center p-16 space-y-4">
                  <div className="relative flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    <div className="absolute h-10 w-10 rounded-full border-4 border-primary/40 border-b-primary animate-spin direction-[reverse]" />
                    <Sparkles className="absolute h-5 w-5 text-primary animate-pulse" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-base font-semibold text-foreground">
                      Unlocking Offer Details
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Fetching the latest pricing and room options...
                    </p>
                  </div>
                </div>
              ) : deal ? (
                <>
                  <Modal.Header className="flex flex-col items-center text-center gap-3 pt-8 px-6">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full font-bold tracking-wider uppercase border shadow-xs",
                        deal.status === "ACTIVE"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
                      )}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current animate-ping" />
                      {deal.status} Deal
                    </span>

                    <Modal.Heading className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-snug">
                      {deal.title}
                    </Modal.Heading>
                  </Modal.Header>

                  <Modal.Body className="space-y-6 py-4 px-6">
                    <p className="text-center text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
                      {deal.description}
                    </p>

                    {/* Interactive Promo Code Display Block */}
                    <div className="relative group overflow-hidden rounded-2xl border border-primary/30 bg-linear-to-b from-primary/10 via-primary/5 to-transparent p-5 text-center transition-all duration-300 hover:border-primary/50">
                      <p className="text-[11px] text-muted-foreground mb-2 uppercase tracking-widest font-bold">
                        Click To Copy Promocode
                      </p>

                      <button
                        type="button"
                        onClick={() => copyToClipboard(deal.promoCode)}
                        className={cn(
                          "mx-auto flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-xl font-mono text-lg font-bold tracking-widest transition-all duration-300 cursor-pointer border shadow-sm select-none",
                          isCopied
                            ? "bg-emerald-500 text-white border-emerald-500 scale-105"
                            : "bg-background/80 hover:bg-background text-primary border-primary/30 hover:border-primary hover:shadow-md",
                        )}
                      >
                        <span>{isCopied ? "Copied" : deal.promoCode}</span>
                        {isCopied ? (
                          <Check className="size-5 animate-in zoom-in-50 duration-200" />
                        ) : (
                          <TicketPercent className="size-5 opacity-70 group-hover:scale-110 transition-transform" />
                        )}
                      </button>
                    </div>

                    {/* Hotel Details Card */}
                    {deal.hotel && (
                      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-accent/20 p-4 transition-all duration-200 hover:border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            Applicable Hotel
                          </span>
                          <span className="text-base font-black text-primary px-2.5 py-0.5 rounded-md bg-primary/10">
                            {discountText}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div>
                            <p className="font-bold text-base text-foreground flex items-center gap-1.5">
                              <Building2 className="size-4 text-primary shrink-0" />
                              {deal.hotel.name}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="size-3.5 text-muted-foreground/70" />{" "}
                              {deal.hotel.city}, Bangladesh
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Usage Statistics & Expiry Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Validity Period */}
                      <div className="p-4 rounded-2xl border border-border/60 bg-background/50 space-y-1.5 shadow-xs">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                          <CalendarDays className="size-3.5 text-primary" />
                          <span>Validity Period</span>
                        </div>
                        <p className="text-xs font-semibold text-foreground">
                          {formatDate(deal.startDate)} —{" "}
                          {formatDate(deal.endDate)}
                        </p>
                      </div>

                      {/* Usage Limit Tracker */}
                      <div className="p-4 rounded-2xl border border-border/60 bg-background/50 space-y-2 shadow-xs">
                        <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                          <span className="flex items-center gap-1.5">
                            <Flame className="size-3.5 text-amber-500" />
                            <span>Coupons Left</span>
                          </span>
                          <span className="text-foreground font-extrabold">
                            {remainingUses} / {usageLimit}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-accent h-2 rounded-full overflow-hidden p-0.5">
                          <div
                            className="bg-primary h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.min(100, usagePercent)}%`,
                            }}
                          />
                        </div>
                        <p className="text-[10px] text-muted-foreground text-right font-medium">
                          {usedCount} claimed so far
                        </p>
                      </div>
                    </div>

                    {/* Eligible Rooms Grid */}
                    {deal.dealrooms && deal.dealrooms.length > 0 && (
                      <div className="space-y-3">
                        <h5 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          Eligible Rooms ({deal.dealrooms.length})
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 pr-1">
                          {deal.dealrooms.map(({ room }) => (
                            <div
                              key={room.id}
                              className="group flex flex-col justify-between p-3.5 rounded-2xl border border-border/60 bg-background hover:border-primary/40 hover:shadow-2xl shadow-primary/20 hover:-translate-y-1 transition-all duration-300"
                            >
                              <div className="space-y-1">
                                <span className="inline-block text-[10px] font-bold text-primary uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10">
                                  {room.roomCategory?.name || "Room"}
                                </span>
                                <p className="font-bold text-sm text-foreground flex items-center gap-1.5 pt-1">
                                  <BedDouble className="size-4 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                                  <span className="line-clamp-1">
                                    {room.name}
                                  </span>
                                </p>
                              </div>

                              <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-border/40 text-xs">
                                <span className="flex items-center gap-1 text-muted-foreground font-medium">
                                  <Users className="size-3.5" />
                                  {room.maxGuests} Guests
                                </span>
                                <span className="font-extrabold text-foreground">
                                  ৳{room.pricePerNight}
                                  <span className="text-[10px] text-muted-foreground font-normal">
                                    /night
                                  </span>
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Terms / Policy Note */}
                    <div className="flex items-start gap-2 text-xs text-muted-foreground/80 bg-accent/20 p-3 rounded-xl border border-border/40">
                      <ShieldCheck className="size-4 text-primary shrink-0 mt-0.5" />
                      <span>
                        Valid on selected room bookings exclusively at this
                        hotel branch. Terms apply.
                      </span>
                    </div>
                  </Modal.Body>

                  {/* Clean Action Footer */}
                  <Modal.Footer className="w-full flex justify-end items-center gap-2 pt-2">
                    {deal.hotel?.id ? (
                      <Button
                        asChild
                        className="w-full sm:w-auto h-12 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 uppercase font-bold tracking-wider gap-2 cursor-pointer"
                      >
                        <Link href={`/hotels/${(deal.hotel as any).slug || deal.hotel.id}`}>
                          Explore Hotel <ArrowRight className="size-4" />
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        className="w-full sm:w-auto uppercase font-semibold"
                        slot="close"
                      >
                        Close
                      </Button>
                    )}
                  </Modal.Footer>
                </>
              ) : (
                <div className="p-12 text-center text-sm text-muted-foreground">
                  No details found for this offer.
                </div>
              )}

              <Modal.CloseTrigger />
            </Modal.Dialog>
          </Container>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
