import { getVendorRecentBooking } from "@/Server/Vendor/dashboard.action";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VendorRecentBooking } from "@/types/vendor/dashboard";
import { CalendarDays, Hotel, UserRound, ReceiptText } from "lucide-react";
import { formatBookingCode } from "@/lib/booking-utils";

const LatestBooking = async () => {
  const bookingRes = await getVendorRecentBooking();
  const latestBooking = bookingRes?.data ?? [];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Motion>
      <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-5">
        {/* Background Decoration */}
        <div className="absolute -left-30 -top-40 h-156 w-156 rounded-full bg-primary/10" />

        <div className="relative">
          {/* Header */}
          <Motion animationType="fadeLeft" delay={0.4}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <ReceiptText size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Recent Bookings
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Latest guest reservations
                  </p>
                </div>
              </div>
            </div>
          </Motion>

          {/* Empty State */}
          {latestBooking.length === 0 && (
            <Motion animationType="slideDown" delay={0.6}>
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background py-14 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <ReceiptText size={28} />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  No Recent Booking
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  New reservations will appear here.
                </p>
              </div>
            </Motion>
          )}

          {latestBooking.length > 0 && (
            <Motion animationType="slideDown" delay={0.4}>
              <div className="space-y-4">
                {latestBooking.map((booking: VendorRecentBooking) => (
                  <div
                    key={booking.id}
                    className="rounded-xl border border-border bg-background p-5 transition hover:shadow-md bg-linear-to-br from-warning/5 to-primary/5 "
                  >
                    {/* Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <ReceiptText size={20} />
                        </div>

                        <div>
                          <p className="font-semibold text-sm text-foreground font-mono">
                            {formatBookingCode(booking.bookingCode)}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            {formatDate(booking.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <span
                          className={`rounded-full  px-3 py-1 text-xs font-semibold capitalize ${
                            booking.status === "confirmed"
                              ? "bg-success/10 text-success"
                              : booking.status === "cancelled"
                                ? "bg-destructive/10 text-destructive"
                                : "bg-warning/10 text-warning"
                          }
              `}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="my-5 border-t border-border" />

                    {/* Details */}
                    <div className="grid  gap-5 grid-cols-2 xl:grid-cols-4">
                      {/* Guest */}
                      <div className="flex items-start gap-3">
                        <UserRound className="mt-1 text-info" size={18} />

                        <div>
                          <p className="text-xs text-muted-foreground">Guest</p>

                          <p className="text-sm font-medium text-foreground">
                            {booking.customerName}
                          </p>
                        </div>
                      </div>

                      {/* Hotel */}
                      <div className="flex items-start gap-3">
                        <Hotel className="mt-1 text-destructive" size={18} />

                        <div>
                          <p className="text-xs text-muted-foreground">Hotel</p>

                          <p className="text-sm font-medium text-foreground">
                            {booking.hotelName}
                          </p>
                        </div>
                      </div>

                      {/* Stay */}
                      <div className="flex items-start gap-3">
                        <CalendarDays className="mt-1 text-success" size={18} />

                        <div>
                          <p className="text-xs text-muted-foreground">
                            Stay Period
                          </p>

                          <p className="text-sm font-medium text-foreground">
                            {formatDate(booking.checkInDate)}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            to {formatDate(booking.checkOutDate)}
                          </p>
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="flex items-start gap-3">
                        <ReceiptText className="mt-1 text-primary" size={18} />

                        <div>
                          <p className="text-xs text-muted-foreground">
                            Amount
                          </p>

                          <p className="text-sm font-semibold text-foreground">
                            {formatCurrency(booking.totalAmount)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Motion>
          )}
        </div>
      </section>
    </Motion>
  );
};

export default LatestBooking;
