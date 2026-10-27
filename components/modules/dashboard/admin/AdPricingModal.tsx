"use client";

import React from "react";
import { Modal } from "@heroui/react";
import {
  Tag,
  Loader2,
  Save,
  PlusCircle,
  DollarSign,
  Clock,
} from "lucide-react";
import { IAdminAdPricingItem } from "@/types/admin/adminAdvertisement";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/Reuseable/common/toast";

interface AdPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingPricing: IAdminAdPricingItem | null;
  pricingDurationType: string;
  setPricingDurationType: (val: string) => void;
  pricingPrice: number;
  setPricingPrice: (val: number) => void;
  onSave: () => void;
  isPending: boolean;
}

export const AdPricingModal = ({
  isOpen,
  onClose,
  editingPricing,
  pricingDurationType,
  setPricingDurationType,
  pricingPrice,
  setPricingPrice,
  onSave,
  isPending,
}: AdPricingModalProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingPricing && !pricingDurationType.trim()) {
      toast.warning(
        "Duration Type Required",
        "Please specify a duration type (e.g., WEEK, MONTH).",
      );
      return;
    }

    if (pricingPrice <= 0) {
      toast.warning("Invalid Price", "Please enter a price greater than 0.");
      return;
    }

    toast.loading(
      editingPricing ? "Updating Pricing Tier..." : "Creating Pricing Tier...",
    );
    onSave();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => !open && !isPending && onClose()}
    >
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-md border border-border bg-background text-foreground shadow-2xl rounded-2xl p-6">
            <Modal.CloseTrigger onClick={onClose} isDisabled={isPending} />

            {/* Modal Header */}
            <Modal.Header className="flex flex-col gap-0.5 pb-3 border-b border-border">
              <Modal.Heading className="font-bold text-lg text-foreground leading-tight flex items-center gap-2">
                <Tag className="w-5 h-5 text-primary" />
                {editingPricing ? "Edit Pricing Tier" : "Create Pricing Tier"}
              </Modal.Heading>
              <p className="text-xs text-muted-foreground font-normal">
                {editingPricing
                  ? "Update slot pricing details and rates."
                  : "Set up a new duration tier and cost rule for ad spaces."}
              </p>
            </Modal.Header>

            {/* Form & Modal Body */}
            <form onSubmit={handleSubmit}>
              <Modal.Body className="py-4 space-y-4 max-h-[70vh] overflow-y-auto">
                {/* Duration Type Input */}
                {!editingPricing ? (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      Duration Type
                    </label>
                    <input
                      type="text"
                      required
                      disabled={isPending}
                      placeholder="e.g. DAY, WEEK, MONTH or 7_DAYS"
                      value={pricingDurationType}
                      onChange={(e) =>
                        setPricingDurationType(e.target.value.toUpperCase())
                      }
                      className="w-full bg-background border border-border rounded-md px-3 py-2 text-xs font-medium text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/40 focus:outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                ) : (
                  /* Display static duration badge when editing */
                  <div className="p-3 bg-muted/30 rounded-md border border-border flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      Duration
                    </span>
                    <span className="text-xs font-bold text-primary uppercase bg-primary/10 px-2.5 py-1 rounded-md">
                      {editingPricing.durationType}
                    </span>
                  </div>
                )}

                {/* Price Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
                    Price (৳)
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    disabled={isPending}
                    placeholder="e.g. 500"
                    value={pricingPrice || ""}
                    onChange={(e) => setPricingPrice(Number(e.target.value))}
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-xs font-medium text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/40 focus:outline-none transition-all disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </Modal.Body>

              {/* Modal Footer */}
              <Modal.Footer className="border-t border-border pt-3 flex items-center justify-end gap-2.5">
                <Button
                  type="button"
                  variant="warning"
                  className="font-medium text-xs h-9 px-4"
                  onClick={onClose}
                  disabled={isPending}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="font-medium text-xs h-9 px-4"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
                      Saving...
                    </>
                  ) : editingPricing ? (
                    <>
                      <Save className="w-3.5 h-3.5 mr-1" />
                      Update Pricing
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-3.5 h-3.5 mr-1" />
                      Create Pricing
                    </>
                  )}
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
