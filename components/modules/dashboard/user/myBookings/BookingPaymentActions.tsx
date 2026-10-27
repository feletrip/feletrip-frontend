"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Download,
  Loader2,
  MessageSquarePlus,
  ReceiptText,
} from "lucide-react";

import { PaymentReceiptDialog } from "@/components/Reuseable/receipt/PaymentReceiptDialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/Reuseable/common/toast";
import { generateReceiptPdf } from "@/lib/receipt-pdf";
import { initiatePaymentAction } from "@/Server/payments/paymentAction";
import { formatTransactionDate } from "@/lib/transaction-utils";
import { formatBookingCode } from "@/lib/booking-utils";
import type { Booking } from "@/types/user/booking";
import type {
  PaymentStatus,
  Transaction,
} from "@/types/user/transactionHistory";

type BookingPaymentActionsProps = {
  booking: Booking;
};

function toPaymentStatus(status: Booking["status"]): PaymentStatus {
  if (status === "pending") return "pending";
  if (status === "refunded") return "refunded";
  return "paid";
}

export function BookingPaymentActions({ booking }: BookingPaymentActionsProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const transaction: Transaction = {
    id: booking.id,
    bookingId: booking.id,
    bookingCode: formatBookingCode(booking.bookingCode),
    transactionId: formatBookingCode(booking.bookingCode),
    hotelName: booking.hotel.name,
    roomDetails: {
      roomType: booking.room?.name ?? "N/A",
      guests: booking.guestCount,
      checkIn: formatTransactionDate(booking.checkInDate),
      checkOut: formatTransactionDate(booking.checkOutDate),
    },
    amount: Number(booking.finalAmount),
    currency: "BDT",
    gateway: "BKASH",
    paymentStatus: toPaymentStatus(booking.status),
    validationId: null,
    gatewayData: null,
    paidAt: booking.status === "pending" ? null : booking.createdAt,
    createdAt: booking.createdAt,
    updatedAt: booking.createdAt,
  };

  const handlePayNow = async () => {
    try {
      setIsPaying(true);
      toast.loading("Redirecting to payment", "Opening SSLCommerz gateway...");

      const paymentRes = await initiatePaymentAction(booking.id);

      if (paymentRes?.success && paymentRes?.data?.gatewayPageURL) {
        toast.close();
        window.location.href = paymentRes.data.gatewayPageURL;
        return;
      }

      toast.error(
        "Payment initiation failed",
        paymentRes?.message || "Unable to start payment. Please try again.",
      );
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast.error(
        "An error occurred",
        "Unable to start payment. Please try again.",
      );
    } finally {
      setIsPaying(false);
    }
  };

  const downloadReceipt = async () => {
    try {
      setIsDownloading(true);
      toast.loading("Generating receipt...");

      const blob = await generateReceiptPdf(transaction);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `FeleTrip-Receipt-${formatBookingCode(booking.bookingCode)}.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      toast.close();
      toast.success("Receipt downloaded successfully.");
    } catch (error) {
      console.error("Unable to generate booking receipt:", error);
      toast.close();
      toast.error("Unable to generate receipt.");
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadReceiptButton = (
    <Button
      className="w-full"
      variant="outline"
      size="sm"
      onClick={downloadReceipt}
      disabled={isDownloading}
    >
      {isDownloading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Download className="size-4" />
      )}
      {isDownloading ? "Generating receipt..." : "Download receipt"}
    </Button>
  );

  if (booking.status === "pending") {
    return (
      <div className="grid gap-2 pt-2">
        <Button
          className="w-full"
          size="sm"
          onClick={handlePayNow}
          disabled={isPaying}
        >
          {isPaying ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <CreditCard className="size-4" />
          )}
          {isPaying ? "Redirecting..." : "Pay now"}
        </Button>
        {downloadReceiptButton}
      </div>
    );
  }

  if (booking.status === "completed") {
    return (
      <div className="grid gap-2 pt-2">
        <Button className="w-full" size="sm" asChild>
          <Link href="/dashboard/user/myReviews">
            <MessageSquarePlus className="size-4" />
            Give review
          </Link>
        </Button>
        <PaymentReceiptDialog transaction={transaction}>
          <Button className="w-full" variant="outline" size="sm">
            <ReceiptText className="size-4" />
            View receipt
          </Button>
        </PaymentReceiptDialog>
      </div>
    );
  }

  return <div className="pt-2">{downloadReceiptButton}</div>;
}
