"use client";

import Image from "next/image";
import { Check, Image as ImageIcon } from "lucide-react";
import { UseFormGetValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DealFormValues } from "../type/type";

interface DealPreviewModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  getValues: UseFormGetValues<DealFormValues>;
  bannerUrl: string | null;
  onPublish: () => void;
  isSubmitting: boolean;
}

export function DealPreviewModal({
  isOpen,
  onClose,
  getValues,
  bannerUrl,
  onPublish,
  isSubmitting,
}: DealPreviewModalProps) {
  const selectedRoomIds = getValues("roomIds") || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl border-2 shadow-2xl max-h-[90vh] overflow-y-auto rounded-3xl text-foreground hide-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Review Live Deal Layout
          </DialogTitle>
          <DialogDescription>
            Verify how the coupon details and banner cards display before launching.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {bannerUrl ? (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border">
              <Image
                src={bannerUrl}
                alt="Live Banner View"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-full aspect-video bg-muted/50 flex flex-col items-center justify-center text-muted-foreground gap-2 border border-dashed rounded-xl">
              <div className="p-4 bg-background border border-border rounded-full shadow-sm text-muted-foreground/70">
                <ImageIcon size={32} />
              </div>
              <span className="text-sm font-semibold mt-1">
                No Promotional Banner Uploaded
              </span>
              <span className="text-xs text-muted-foreground/80 max-w-xs text-center">
                This campaign will launch without a visual cover grid asset.
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-muted/30 p-4 rounded-xl border border-border/60">
            <div className="md:col-span-2">
              <span className="text-xs text-muted-foreground block">
                Campaign Title
              </span>
              <span className="font-bold text-lg">
                {getValues("title") || "—"}
              </span>
            </div>
            
            <div className="md:col-span-2 border-b border-border/40 pb-2">
              <span className="text-xs text-muted-foreground block">
                Targeted Rooms
              </span>
              <span className="font-semibold text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-md inline-block mt-1">
                {selectedRoomIds.length > 0 
                  ? `${selectedRoomIds.length} Rooms Selected` 
                  : "All Rooms Linked"}
              </span>
            </div>

            <div>
              <span className="text-xs text-muted-foreground block">
                Promo Voucher Code
              </span>
              <span className="font-mono font-bold text-sm text-primary uppercase bg-primary/10 px-2.5 py-0.5 rounded-md inline-block mt-1">
                {getValues("promoCode") || "—"}
              </span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block">
                Discount Value
              </span>
              <span className="font-semibold text-sm">
                {getValues("dealType") === "PERCENTAGE"
                  ? `${getValues("discountValue")}%`
                  : `${getValues("discountValue")} BDT FLAT`}
              </span>
            </div>
            {getValues("dealType") === "PERCENTAGE" && (
              <div>
                <span className="text-xs text-muted-foreground block">
                  Max Cap Limitation
                </span>
                <span className="font-semibold text-sm">
                  {getValues("maxDiscount")
                    ? `${getValues("maxDiscount")} BDT`
                    : "No Limit"}
                </span>
              </div>
            )}
            <div>
              <span className="text-xs text-muted-foreground block">
                Total Redemptions Cap
              </span>
              <span className="font-semibold text-sm">
                {getValues("usageLimit") || "Unlimited Pool"}
              </span>
            </div>
            <div className="md:col-span-2">
              <span className="text-xs text-muted-foreground block">
                Timeline Active Frame
              </span>
              <span className="text-xs font-medium text-foreground">
                {getValues("startDate")
                  ? new Date(getValues("startDate")).toLocaleString()
                  : "—"}
                <span className="mx-1.5 font-bold text-primary">→</span>
                {getValues("endDate")
                  ? new Date(getValues("endDate")).toLocaleString()
                  : "—"}
              </span>
            </div>
            {getValues("description") && (
              <div className="md:col-span-2 border-t pt-2 mt-1">
                <span className="text-xs text-muted-foreground block mb-1">
                  Promo Disclaimers / Description
                </span>
                <p className="text-muted-foreground text-xs leading-relaxed bg-background p-2.5 rounded-lg border">
                  {getValues("description")}
                </p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0 pt-3 border-t">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onClose(false)}
            className="rounded-xl"
          >
            Edit More
          </Button>
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={() => {
              onClose(false);
              onPublish();
            }}
            className="bg-primary hover:bg-primary/50 text-white rounded-xl font-semibold gap-2 transition-all"
          >
            <Check size={16} />{" "}
            {isSubmitting ? "Publishing..." : "Launch Campaign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}