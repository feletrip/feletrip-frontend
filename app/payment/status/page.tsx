import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Calendar,
  ArrowRight,
  RefreshCw,
  Home,
  Receipt,
  User,
  ShieldCheck,
  MapPin,
  Clock,
  MailCheck,
  PhoneCall,
  Sparkles,
  CreditCard,
  AlertOctagon,
  Timer,
  ShieldAlert,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatBookingCurrency, formatBookingDate, formatBookingCode } from "@/lib/booking-utils";
import { Booking } from "@/types/user/booking";
import { CopyIdButton } from "@/payment/CopyIdButton";
import { DownloadReceiptButton } from "@/payment/DownloadReceiptButton";
import { getMyBookings } from "@/Server/User/user.bookingManagement";

const SUCCESS_PAYMENT_STATUSES = new Set([
  "paid",
  "success",
  "completed",
  "valid",
  "validated",
  "1",
]);

const FAILURE_PAYMENT_STATUSES = new Set([
  "failed",
  "fail",
  "cancelled",
  "canceled",
  "cancel",
  "unpaid",
  "pending",
  "0",
]);

function isSuccessfulPaymentStatus(status?: string): boolean {
  const normalized = (status || "").toLowerCase().trim();
  if (!normalized) return false;
  if (SUCCESS_PAYMENT_STATUSES.has(normalized)) return true;
  if (FAILURE_PAYMENT_STATUSES.has(normalized)) return false;
  return false;
}

async function getBookingDetails(bookingId?: string): Promise<Booking | null> {
  if (!bookingId) return null;

  const response = await getMyBookings();
  const booking = response?.data?.data?.find((item) => item.id === bookingId);

  return booking ?? null;
}

type PageProps = {
  searchParams: Promise<{
    paymentStatus?: string;
    bookingId?: string;
    bookingCode?: string;
  }>;
};

export default async function PaymentStatusPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const rawPaymentStatus = params.paymentStatus;
  const bookingId = params.bookingId;
  const bookingCodeFromUrl = params.bookingCode;

  // SSLCommerz success redirect uses paymentStatus=paid
  const isSuccess = isSuccessfulPaymentStatus(rawPaymentStatus);

  const booking = await getBookingDetails(bookingId);

  const displayCode = formatBookingCode(
    booking?.bookingCode || bookingCodeFromUrl || bookingId
  );

  return (
    <div className="min-h-screen py-6 sm:py-10 md:py-14 px-3 sm:px-6 lg:px-8 bg-linear-to-b from-background via-muted/20 to-background flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full space-y-6 sm:space-y-8">
        {/* Top Header Card */}
        <div
          className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border p-6 sm:p-8 md:p-10 text-center transition-all ${isSuccess
            ? "bg-card border-emerald-500/30 dark:border-emerald-500/20"
            : "bg-card border-red-500/30 dark:border-red-500/20"
            }`}
        >
          {/* Background Glow Accent */}
          <div
            className={`absolute -top-24 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl pointer-events-none ${isSuccess ? "bg-primary/15" : "bg-red-500/10"
              }`}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Status Icon */}
            <div className="mb-4 sm:mb-6">
              {isSuccess ? (
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                  <div className="relative rounded-full bg-primary p-3.5 sm:p-4 text-white">
                    <CheckCircle2 className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 stroke-[2.5]" />
                  </div>
                </div>
              ) : (
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse" />
                  <div className="relative rounded-full bg-red-600 p-3.5 sm:p-4 text-white">
                    <XCircle className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 stroke-[2.5]" />
                  </div>
                </div>
              )}
            </div>

            {/* Status Pill Badge */}
            {isSuccess ? (
              <Badge
                variant="outline"
                className="mb-2 sm:mb-3 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
              >
                Payment Completed
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="mb-2 sm:mb-3 px-3 py-1 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30"
              >
                Transaction Unsuccessful
              </Badge>
            )}

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {isSuccess ? "Booking Confirmed!" : "Payment Unsuccessful"}
            </h1>

            {/* Description Text */}
            <p className="mt-2 sm:mt-3 text-xs sm:text-base text-muted-foreground max-w-lg sm:max-w-xl mx-auto leading-relaxed">
              {isSuccess
                ? "Your reservation has been successfully booked with SSLCommerz. A confirmation receipt has been generated below."
                : "We couldn't process your payment with SSLCommerz. Don't worry, your booking details are saved and you can try again."}
            </p>

            {/* Transaction Identifiers */}
            <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 w-full">
              {displayCode && <CopyIdButton label="Booking Code" value={displayCode} />}
            </div>
          </div>
        </div>

        {/* Booking Details Card */}
        {booking && (
          <div className="bg-card border border-border rounded-2xl sm:rounded-3xl overflow-hidden transition-all">
            {/* Card Header */}
            <div className="px-4 sm:px-8 py-4 sm:py-5 border-b border-border bg-muted/40 flex flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-1.5 sm:p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                  <Receipt className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-base font-bold text-foreground truncate">Reservation Details</h2>
                  <p className="text-[11px] sm:text-xs text-muted-foreground font-mono truncate">
                    Code: {displayCode}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {isSuccess ? (
                  <>
                    <Badge className="text-[10px] sm:text-xs px-2.5 py-0.5 sm:px-3 sm:py-1 bg-emerald-600 text-white hover:bg-emerald-600">
                      Confirmed
                    </Badge>
                    <DownloadReceiptButton bookingId={booking.id} booking={booking} />
                  </>
                ) : (
                  <Badge
                    variant="outline"
                    className="text-[10px] sm:text-xs px-2.5 py-0.5 sm:px-3 sm:py-1 bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30 font-bold"
                  >
                    Payment Pending
                  </Badge>
                )}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
              {/* Hotel & Room Banner */}
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-start">
                {booking.hotel.hotelPhotos?.[0]?.photoUrl && (
                  <div className="w-full md:w-48 h-40 sm:h-44 md:h-36 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 relative bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={booking.hotel.hotelPhotos[0].photoUrl}
                      alt={booking.hotel.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 left-2.5 text-[10px] text-white font-medium bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
                      {booking.hotel.city}
                    </span>
                  </div>
                )}

                <div className="flex-1 space-y-2.5 sm:space-y-3 w-full">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
                      {booking.hotel.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground flex items-start gap-1.5 mt-1">
                      <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0 mt-0.5" />
                      <span>{booking.hotel.address}</span>
                    </p>
                  </div>

                  {/* Badges Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-1">
                    <div className="px-3 py-1.5 rounded-xl bg-muted/60 border border-border">
                      <span className="text-muted-foreground block text-[10px] sm:text-[11px]">Room Type</span>
                      <span className="font-semibold text-xs sm:text-sm text-foreground truncate block">
                        {booking.room.name}
                      </span>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-muted/60 border border-border">
                      <span className="text-muted-foreground block text-[10px] sm:text-[11px]">Bed Config</span>
                      <span className="font-semibold text-xs sm:text-sm text-foreground truncate block">
                        {booking.room.bedType}
                      </span>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-muted/60 border border-border">
                      <span className="text-muted-foreground block text-[10px] sm:text-[11px]">Guests & Rooms</span>
                      <span className="font-semibold text-xs sm:text-sm text-foreground truncate block">
                        {booking.guestCount} Guest(s) • {booking.roomsBooked} Room
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stay Timeline Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-muted/30 border border-border">
                <div className="space-y-1 pb-3 sm:pb-0 border-b sm:border-b-0 border-border">
                  <span className="text-[10px] sm:text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                    Check-In Date
                  </span>
                  <div className="flex items-center gap-2 text-foreground font-bold text-sm sm:text-base">
                    <Calendar className="h-4 w-4 text-primary shrink-0" />
                    <span>{formatBookingDate(booking.checkInDate)}</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-muted-foreground block">Check-In: 12:00 PM</span>
                </div>

                <div className="space-y-1 pb-3 sm:pb-0 border-b sm:border-b-0 sm:border-l sm:border-r border-border sm:px-4">
                  <span className="text-[10px] sm:text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                    Check-Out Date
                  </span>
                  <div className="flex items-center gap-2 text-foreground font-bold text-sm sm:text-base">
                    <Calendar className="h-4 w-4 text-primary shrink-0" />
                    <span>{formatBookingDate(booking.checkOutDate)}</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-muted-foreground block">Check-Out: 11:00 AM</span>
                </div>

                <div className="space-y-1 sm:pl-2">
                  <span className="text-[10px] sm:text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                    Total Duration
                  </span>
                  <div className="flex items-center gap-2 text-foreground font-bold text-sm sm:text-base">
                    <Clock className="h-4 w-4 text-primary shrink-0" />
                    <span>{booking.totalNights} Night(s)</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground block">
                    Reserved
                  </span>
                </div>
              </div>

              {/* Financial & Payment Summary */}
              <div className="border-t border-border pt-4 sm:pt-6 space-y-3">
                <h4 className="text-[11px] sm:text-xs uppercase tracking-wider font-bold text-muted-foreground">
                  Payment Breakdown
                </h4>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span className="pr-2">
                      Room Rate ({booking.totalNights} Nights × {formatBookingCurrency(booking.room.pricePerNight)})
                    </span>
                    <span className="font-medium text-foreground shrink-0">
                      {formatBookingCurrency(booking.totalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>Payment Gateway (SSLCommerz)</span>
                    <span className="font-medium text-foreground shrink-0">
                      {isSuccess ? "Paid" : "Pending"}
                    </span>
                  </div>

                  <div className="border-t border-border pt-3 flex justify-between items-center">
                    <div>
                      <span className="text-sm sm:text-base font-bold text-foreground block">
                        {isSuccess ? "Total Amount Paid" : "Total Amount Due"}
                      </span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground">
                        {isSuccess ? "Paid via SSLCommerz Gateway" : "Payment Pending"}
                      </span>
                    </div>
                    <span className="text-xl sm:text-2xl font-extrabold text-primary shrink-0">
                      {formatBookingCurrency(booking.finalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps / Failure Diagnostics Card */}
        {isSuccess ? (
          <div className="rounded-2xl sm:rounded-3xl border border-primary/20 bg-primary/5 p-5 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-sm sm:text-base">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
              What happens next?
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-background border border-border text-foreground shrink-0 mt-0.5">
                  <MailCheck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <span className="font-semibold text-foreground block">1. Confirmation Email</span>
                  We sent your voucher & invoice directly to your registered email address.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-background border border-border text-foreground shrink-0 mt-0.5">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <span className="font-semibold text-foreground block">2. Present at Check-in</span>
                  Show your Booking Code ({displayCode}) along with photo ID upon arrival.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-background border border-border text-foreground shrink-0 mt-0.5">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <span className="font-semibold text-foreground block">3. Manage Reservation</span>
                  View, download receipts, or manage your stay anytime in your User Dashboard.
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl sm:rounded-3xl border border-red-500/25 bg-card p-5 sm:p-8 space-y-5">
            <div className="flex items-center gap-2.5 text-red-600 dark:text-red-400 font-bold text-base sm:text-lg">
              <div className="p-2 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
                <ShieldAlert className="h-5 w-5" />
              </div>
              Common Reasons For Payment Failure
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
                <div className="flex items-center gap-2 text-foreground font-semibold text-xs sm:text-sm">
                  <CreditCard className="h-4 w-4 text-red-600 shrink-0" />
                  Incorrect Card Details
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Card number, expiry date, CVC, or OTP code might have been mistyped.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
                <div className="flex items-center gap-2 text-foreground font-semibold text-xs sm:text-sm">
                  <AlertOctagon className="h-4 w-4 text-red-600 shrink-0" />
                  Bank or Limit Issue
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Insufficient balance or your bank online transaction limit was reached.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
                <div className="flex items-center gap-2 text-foreground font-semibold text-xs sm:text-sm">
                  <Timer className="h-4 w-4 text-red-600 shrink-0" />
                  Gateway Timeout
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Payment session expired or gateway redirect was cancelled before completion.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full">
          {isSuccess ? (
            <>
              <Button asChild size="lg" className="w-full sm:w-auto px-8 py-3 h-auto gap-2 font-semibold">
                <Link href="/dashboard/user/myBookings">
                  View My Bookings
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto px-6 py-3 h-auto gap-2">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild size="lg" className="w-full sm:w-auto px-8 py-3 h-auto gap-2 font-semibold">
                <Link href="/dashboard/user/myBookings">
                  <RefreshCw className="h-4 w-4" />
                  Retry Payment / Manage Bookings
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto px-6 py-3 h-auto gap-2">
                <Link href="/contact">
                  <PhoneCall className="h-4 w-4" />
                  Contact Support
                </Link>
              </Button>

              <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto px-6 py-3 h-auto gap-2">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
