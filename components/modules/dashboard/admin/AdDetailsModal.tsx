"use client";

import React from "react";
import Image from "next/image";
import { Modal } from "@heroui/react";
import {
  Megaphone,
  Building2,
  User,
  Mail,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Calendar,
} from "lucide-react";
import { IAdvertisementItem } from "@/types/admin/adminAdvertisement";
import { Button } from "@/components/ui/button";

interface AdDetailsModalProps {
  selectedAd: IAdvertisementItem | null;
  onClose: () => void;
  onUpdateStatus: (adId: string, status: "ACTIVE" | "REJECTED") => void;
  isPending: boolean;
}

export const AdDetailsModal = ({
  selectedAd,
  onClose,
  onUpdateStatus,
  isPending,
}: AdDetailsModalProps) => {
  if (!selectedAd) return null;

  return (
    <Modal
      isOpen={Boolean(selectedAd)}
      onOpenChange={(isOpen) => !isOpen && !isPending && onClose()}
    >
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-150 border border-border bg-background text-foreground shadow-2xl rounded-2xl p-6">
            <Modal.CloseTrigger onClick={onClose} isDisabled={isPending} />

            {/* Modal Header */}
            <Modal.Header className="flex flex-col gap-0.5 pb-3 border-b border-border">
              <Modal.Heading className="font-bold text-lg text-foreground leading-tight flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-primary" />
                Advertisement Details
              </Modal.Heading>
              <p className="text-xs text-muted-foreground font-mono font-normal">
                ID: {selectedAd.id}
              </p>
            </Modal.Header>

            {/* Modal Body */}
            <Modal.Body className="py-4 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Banner Image Preview */}
              <div className="relative w-full h-48 rounded-xl overflow-hidden border border-border bg-muted/20">
                <Image
                  src={selectedAd.bannerImage}
                  alt={selectedAd.title || "Advertisement Banner"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Campaign Title & Hotel */}
              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground">
                  {selectedAd.title}
                </h3>
                {selectedAd.hotel && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-primary" />
                    {selectedAd.hotel.name}
                  </p>
                )}
              </div>

              {/* Vendor Information */}
              <div className="p-3.5 bg-muted/40 rounded-xl border border-border flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 overflow-hidden">
                  <p className="font-bold text-sm text-foreground truncate">
                    {selectedAd.vendor?.name || "N/A"}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground truncate">
                    <Mail className="w-3 h-3 shrink-0" />
                    <span className="truncate">
                      {selectedAd.vendor?.email || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial & Duration Breakdown */}
              <div className="grid grid-cols-2 gap-4 text-sm bg-muted/20 p-4 rounded-xl border border-border">
                <div>
                  <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                    Total Paid Price
                  </p>
                  <p className="font-extrabold text-lg text-foreground mt-0.5">
                    ৳{Number(selectedAd.price).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    Duration
                  </p>
                  <p className="font-semibold text-foreground mt-0.5 capitalize">
                    {selectedAd.duration}{" "}
                    {selectedAd.durationType.toLowerCase()}(s)
                  </p>
                </div>
              </div>

              {/* Additional Status Details */}
              <div className="space-y-1.5 text-xs text-muted-foreground bg-muted/10 p-3 rounded-lg border border-border">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Campaign Status:
                  </span>
                  <span className="font-bold uppercase tracking-wider text-primary">
                    {selectedAd.status}
                  </span>
                </div>
              </div>
            </Modal.Body>

            {/* Modal Footer */}
            <Modal.Footer className="border-t border-border pt-3 flex items-center justify-end gap-3">
              <Button
                variant="warning"
                className="font-medium inline-flex items-center gap-1.5"
                onClick={() => onUpdateStatus(selectedAd.id, "REJECTED")}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <XCircle className="w-3.5 h-3.5" />
                )}
                Reject & Refund
              </Button>

              <Button
                onClick={() => onUpdateStatus(selectedAd.id, "ACTIVE")}
                disabled={isPending}
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {isPending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                )}
                Approve Ad
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
