"use client";

import React, { useTransition } from "react";
import Image from "next/image";
import { Modal } from "@heroui/react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  DollarSign,
  FileText,
  Save,
  Loader2,
} from "lucide-react";
import {
  IAdminWithdrawalItem,
  WithdrawalStatus,
} from "@/types/admin/withdrawal";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/Reuseable/common/toast";
import { updateWithdrawalStatus } from "@/Server/Admin/updateWithdrawal.action";

interface WithdrawalDetailsModalProps {
  selectedItem: IAdminWithdrawalItem | null;
  onCloseModal: () => void;
  modalStatus: WithdrawalStatus;
  setModalStatus: (status: WithdrawalStatus) => void;
  modalNote: string;
  setModalNote: (note: string) => void;
  onSuccess?: (updatedItem: IAdminWithdrawalItem) => void;
}

export function WithdrawalDetailsModal({
  selectedItem,
  onCloseModal,
  modalStatus,
  setModalStatus,
  modalNote,
  setModalNote,
  onSuccess,
}: WithdrawalDetailsModalProps) {
  const [isPending, startTransition] = useTransition();

  if (!selectedItem) return null;

  const handleSaveChanges = () => {
    toast.loading(
      "Updating status...",
      "Please wait while we process the request.",
    );

    startTransition(async () => {
      try {
        const response = await updateWithdrawalStatus(selectedItem.id, {
          status: modalStatus,
          adminNote: modalNote.trim() ? modalNote : undefined,
        });

        if (response?.success) {
          toast.success(
            "Status Updated",
            response.message || "Withdrawal status updated successfully!",
          );

          const updatedItem: IAdminWithdrawalItem = {
            ...selectedItem,
            status: modalStatus,
            adminNote: modalNote.trim() || null,
            processedAt:
              modalStatus !== "pending"
                ? new Date().toISOString()
                : selectedItem.processedAt,
          };

          onSuccess?.(updatedItem);
          onCloseModal();
        } else {
          toast.error(
            "Update Failed",
            response?.message || "Failed to update withdrawal status.",
          );
        }
      } catch (error) {
        console.error("Error updating status:", error);
        toast.error("Error", "An unexpected error occurred.");
      }
    });
  };

  return (
    <Modal
      isOpen={Boolean(selectedItem)}
      onOpenChange={(isOpen) => !isOpen && !isPending && onCloseModal()}
    >
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-150 border border-border bg-background text-foreground shadow-2xl rounded-2xl p-6">
            <Modal.CloseTrigger onClick={onCloseModal} isDisabled={isPending} />

            {/* Modal Header */}
            <Modal.Header className="flex flex-col gap-0.5 pb-3 border-b border-border">
              <Modal.Heading className="font-bold text-lg text-foreground leading-tight">
                Withdrawal Request Details
              </Modal.Heading>
              <p className="text-xs text-muted-foreground font-mono font-normal">
                ID: {selectedItem.id}
              </p>
            </Modal.Header>

            {/* Modal Body */}
            <Modal.Body className="py-4 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Vendor Profile */}
              <div className="p-3.5 bg-muted/40 rounded-xl border border-border flex items-center gap-3">
                {selectedItem.vendor?.avatar ? (
                  <Image
                    src={selectedItem.vendor.avatar}
                    alt={selectedItem.vendor.name || "Vendor"}
                    width={44}
                    height={44}
                    className="w-11 h-11 rounded-full object-cover border border-border"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <User className="w-5 h-5" />
                  </div>
                )}
                <div className="space-y-0.5">
                  <p className="font-bold text-sm text-foreground">
                    {selectedItem.vendor?.name}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {selectedItem.vendor?.email}
                    </span>
                    {selectedItem.vendor?.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {selectedItem.vendor.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Request Breakdown */}
              <div className="grid grid-cols-2 gap-4 text-sm bg-muted/20 p-4 rounded-xl border border-border">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Requested Amount
                  </p>
                  <p className="font-extrabold text-lg text-foreground">
                    ৳{Number(selectedItem.amount).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Payment Gateway
                  </p>
                  <p className="font-semibold text-foreground">
                    {selectedItem.paymentMethod}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Account Name
                  </p>
                  <p className="font-semibold text-foreground">
                    {selectedItem.accountName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Account Number / Phone
                  </p>
                  <p className="font-mono text-xs font-semibold text-foreground">
                    {selectedItem.accountNumber}
                  </p>
                </div>
              </div>

              {/* Update Status & Admin Note */}
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Admin Actions
                </h4>

                {/* Status Dropdown */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Update Request Status
                  </label>
                  <select
                    value={modalStatus}
                    disabled={isPending}
                    onChange={(e) =>
                      setModalStatus(e.target.value as WithdrawalStatus)
                    }
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs font-semibold text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-hidden disabled:opacity-50"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="paid">Paid (Completed)</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {/* Admin Note Textarea */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Add Note (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={modalNote}
                    disabled={isPending}
                    onChange={(e) => setModalNote(e.target.value)}
                    placeholder="Add reason for rejection, transaction ID, or internal remarks..."
                    className="w-full bg-background border border-border rounded-lg p-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/40 focus:outline-hidden resize-none disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Timestamps */}
              <div className="space-y-1.5 text-xs text-muted-foreground bg-muted/10 p-3 rounded-lg border border-border">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Requested At:
                  </span>
                  <span className="font-medium text-foreground">
                    {new Date(selectedItem.requestedAt).toLocaleString("en-US")}
                  </span>
                </div>
                {selectedItem.processedAt && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />{" "}
                      Processed At:
                    </span>
                    <span className="font-medium text-foreground">
                      {new Date(selectedItem.processedAt).toLocaleString(
                        "en-US",
                      )}
                    </span>
                  </div>
                )}
              </div>

              {/* Commission Breakdown */}
              {selectedItem.commissions &&
                selectedItem.commissions.length > 0 && (
                  <div className="space-y-2 border-t border-border pt-4">
                    <p className="text-xs font-semibold uppercase text-muted-foreground flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                      Commission Settlement Info
                    </p>
                    {selectedItem.commissions.map((comm) => (
                      <div
                        key={comm.id}
                        className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-2 text-xs"
                      >
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Commission Rate:
                          </span>
                          <span className="font-bold">
                            {comm.commissionRate}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Platform Cut:
                          </span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            ৳{Number(comm.platformAmount).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Vendor Payout Share:
                          </span>
                          <span className="font-bold text-foreground">
                            ৳{Number(comm.vendorAmount).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-emerald-500/10">
                          <span className="text-muted-foreground">
                            Settlement Status:
                          </span>
                          <span className="font-semibold capitalize text-emerald-600 dark:text-emerald-400">
                            {comm.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </Modal.Body>

            {/* Modal Footer */}
            <Modal.Footer className="border-t border-border pt-3 flex items-center justify-end gap-3">
              <Button
                variant="warning"
                className="font-medium"
                onClick={onCloseModal}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveChanges} disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    Update
                  </>
                )}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
