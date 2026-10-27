"use client";

import * as React from "react";
import {ReceiptText, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Transaction } from "@/types/user/transactionHistory";

import { PaymentReceiptCard } from "./PaymentReceiptCard";
import { DownloadReceiptButton } from "./pdf/DownloadReceiptButton";
import { PrintReceiptButton } from "./pdf/PrintReceiptButton";

interface PaymentReceiptDialogProps {
  transaction: Transaction;
  children: React.ReactNode;
}

export function PaymentReceiptDialog({ transaction, children }: PaymentReceiptDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl p-0 sm:max-w-4xl">

        <DialogHeader className="border-b px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <ReceiptText className="h-5 w-5 text-primary" />
            </div>

            <div>
              <DialogTitle>Payment Receipt</DialogTitle>

              <DialogDescription>
                Review your payment details before downloading or printing.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6">
          <PaymentReceiptCard transaction={transaction} />
        </div>

        <DialogFooter className="border-t bg-muted/30 px-6 py-4">

          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>

          <div className="flex gap-2">

            <PrintReceiptButton
              transaction={transaction}
            />

            <DownloadReceiptButton
              transaction={transaction}
            />

          </div>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}