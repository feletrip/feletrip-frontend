"use client";

import Link from "next/link";
import { Copy, Download, Eye, MoreHorizontal, ReceiptText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "../common/toast";
import { Button } from "@/components/ui/button";
import { PaymentStatus, Transaction } from "@/types/user/transactionHistory";
import { PaymentReceiptDialog } from "../receipt/PaymentReceiptDialog";

interface TransactionActionsProps {
  transaction: Transaction;
}

export function TransactionActions({
  transaction,
}: TransactionActionsProps) {
  const { bookingId, transactionId, paymentStatus } = transaction;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(transactionId);
    toast.success(
      "Transaction copied",
      `${transactionId} has been copied to your clipboard.`,
    );
  };

  const handleDownloadInvoice = () => {
    toast.loading("Coming Soon", "Invoice download will be available soon.");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <PaymentReceiptDialog transaction={transaction}>
          <DropdownMenuItem
            disabled={paymentStatus !== "paid"}
            onSelect={(e) => e.preventDefault()}
          >
            <ReceiptText className="mr-2 h-4 w-4" />
            View Receipt
          </DropdownMenuItem>
        </PaymentReceiptDialog>

        <DropdownMenuItem asChild>
          <Link href={`/dashboard/user/myBookings/${bookingId}`}>
            <Eye className="mr-2 h-4 w-4" />
            View Booking
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Transaction ID
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
