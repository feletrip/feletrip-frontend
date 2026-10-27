"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Booking } from "@/types/user/booking";
import { Transaction } from "@/types/user/transactionHistory";
import { formatTransactionDate } from "@/lib/transaction-utils";
import { formatBookingCode } from "@/lib/booking-utils";
import { generateReceiptPdf } from "@/lib/receipt-pdf";
import { toast } from "@/components/Reuseable/common/toast";

interface DownloadReceiptButtonProps {
  bookingId?: string;
  booking?: Booking | null;
}

export function DownloadReceiptButton({ bookingId, booking }: DownloadReceiptButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!booking) {
      toast.error("Booking details unavailable.");
      return;
    }

    try {
      setLoading(true);
      toast.loading("Generating receipt...");

      const code = formatBookingCode(booking.bookingCode || booking.id);

      const transaction: Transaction = {
        id: booking.id,
        bookingId: booking.id,
        bookingCode: code,
        transactionId: code,
        hotelName: booking.hotel?.name ?? "Hotel Reservation",
        roomDetails: booking.room
          ? {
              roomType: booking.room.name ?? "Room",
              guests: booking.guestCount ?? 1,
              checkIn: formatTransactionDate(booking.checkInDate),
              checkOut: formatTransactionDate(booking.checkOutDate),
            }
          : undefined,
        amount: Number(booking.finalAmount || 0),
        currency: "BDT",
        gateway: "SSLCOMMERZ",
        paymentStatus: "paid",
        validationId: null,
        gatewayData: null,
        paidAt: booking.createdAt,
        createdAt: booking.createdAt,
        updatedAt: booking.createdAt,
      };

      const blob = await generateReceiptPdf(transaction);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ObeoRooms-Receipt-${code}.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      toast.close();
      toast.success("Receipt downloaded successfully.");
    } catch (error) {
      console.error("Receipt download error:", error);
      toast.close();
      toast.error("Unable to generate receipt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      disabled={loading}
      className="hidden sm:flex items-center gap-1.5 text-xs font-medium cursor-pointer"
      title="Download Voucher / Receipt"
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Download className="h-3.5 w-3.5" />
      )}
      Download Receipt
    </Button>
  );
}
