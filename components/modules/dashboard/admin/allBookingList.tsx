"use client";

import { useMemo, useState } from "react";
import {
  Search,
  AlertCircle,
  Calendar,
  User,
  Building2,
  CreditCard,
  Hash,
} from "lucide-react";

import InputField from "@/components/Reuseable/auth/InputField";
import Pagination from "@/components/Reuseable/common/Pagination";
import { Booking, Meta } from "@/types/admin/dashboard";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { formatBookingCode } from "@/lib/booking-utils";

export default function AllBookingList({
  bookingDetails = [],
  bookingMetaData,
}: {
  bookingDetails?: Booking[];
  bookingMetaData?: Meta;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Search filtering
  const filteredData = useMemo(() => {
    return bookingDetails.filter((booking) => {
      const search = searchTerm.toLowerCase();

      return (
        booking.bookingCode?.toLowerCase().includes(search) ||
        booking.customer?.email?.toLowerCase().includes(search) ||
        booking.customer?.name?.toLowerCase().includes(search) ||
        booking.hotel?.name?.toLowerCase().includes(search)
      );
    });
  }, [bookingDetails, searchTerm]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const statusColors: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    confirmed: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    completed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    cancelled: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  };

  return (
    <div className="w-full min-w-0">
      <Motion delay={0.1} animationType="fadeUp">
        <div className="w-full rounded-2xl border border-accent/60 shadow-lg overflow-hidden bg-background p-4 sm:p-5 space-y-4">
          {/* Top Header & Search Bar */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 pb-3 border-b border-border/60">
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight truncate">
                Booking List
              </h2>
              <p className="text-xs text-muted-foreground truncate">
                Total Bookings:{" "}
                <span className="font-semibold text-foreground">
                  {bookingMetaData?.total ?? bookingDetails.length}
                </span>
              </p>
            </div>

            <div className="relative w-full xl:w-64">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground z-10" />
              <InputField
                label=""
                placeholder="Search ID, customer, hotel..."
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-8 text-xs bg-accent/20 rounded-xl border-border/60 focus:ring-primary h-9"
              />
            </div>
          </div>

          <div>
            {/* Desktop Table Header */}
            <div className="hidden 2xl:grid grid-cols-12 gap-3 2xl:border-b border-border/60 bg-primary px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-background rounded-t-xl">
              <div className="col-span-2">Booking ID</div>
              <div className="col-span-3">Customer</div>
              <div className="col-span-2">Hotel</div>
              <div className="col-span-2">Room & Stay</div>
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>

            {/* Booking Items List - FIXED: divide-y scoped only to 2xl */}
            <div className="2xl:divide-y 2xl:divide-border/60 space-y-3 2xl:space-y-0 2xl:border 2xl:rounded-b-xl">
              {paginatedData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/40 text-muted-foreground mb-2">
                    <AlertCircle className="h-5 w-5 text-muted-foreground/60" />
                  </div>
                  <p className="text-xs font-semibold text-foreground">
                    No bookings found
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    No records match your search criteria.
                  </p>
                </div>
              ) : (
                paginatedData.map((booking, idx) => {
                  const status = booking.status?.toLowerCase() || "pending";

                  return (
                    <Motion
                      key={booking.id}
                      animationType="fadeUp"
                      delay={idx * 0.04}
                    >
                      {/* Full Table Row View */}
                      <div className="hidden 2xl:grid grid-cols-12 gap-3 p-3 px-4 items-center hover:bg-accent/20 transition-colors text-xs">
                        {/* Booking Code & Date */}
                        <div className="col-span-2 min-w-0">
                          <h4 className="font-semibold text-foreground truncate flex items-center gap-1">
                            <Hash className="h-3.5 w-3.5 text-primary shrink-0" />
                            <span className="truncate">
                              {formatBookingCode(booking.bookingCode)}
                            </span>
                          </h4>
                          <div className="mt-0.5 inline-flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                            <Calendar className="h-3 w-3 text-muted-foreground/70" />
                            <span>
                              {booking.createdAt
                                ? new Date(
                                    booking.createdAt,
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })
                                : "-"}
                            </span>
                          </div>
                        </div>

                        {/* Customer Info */}
                        <div className="col-span-3 min-w-0">
                          <div className="font-medium text-foreground truncate flex items-center gap-1">
                            <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <span className="truncate capitalize">
                              {booking.customer?.name || "N/A"}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground truncate pl-4">
                            {booking.customer?.email || "N/A"}
                          </p>
                        </div>

                        {/* Hotel Info */}
                        <div className="col-span-2 min-w-0">
                          <div className="font-medium text-foreground truncate flex items-center gap-1">
                            <Building2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <span className="truncate capitalize">
                              {booking.hotel?.name || "N/A"}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground truncate pl-4">
                            {booking.hotel?.city || "-"}
                          </p>
                        </div>

                        {/* Room & Stay */}
                        <div className="col-span-2 min-w-0">
                          <p className="font-medium text-foreground text-[11px] truncate capitalize">
                            {booking.room?.name || "N/A"}
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate">
                            {booking.guestCount} Guests · {booking.totalNights}{" "}
                            Nights
                          </p>
                        </div>

                        {/* Status */}
                        <div className="col-span-1 flex justify-center min-w-0">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border capitalize ${
                              statusColors[status] ||
                              "bg-accent text-muted-foreground border-border"
                            }`}
                          >
                            {status}
                          </span>
                        </div>

                        {/* Amount & Payment */}
                        <div className="col-span-2 text-right min-w-0">
                          <div className="font-bold text-foreground text-sm">
                            ${Number(booking.finalAmount || 0).toLocaleString()}
                          </div>
                          <p className="text-[10px] text-muted-foreground truncate capitalize">
                            {booking.payment?.paymentStatus ?? "N/A"} (
                            {booking.payment?.gateway})
                          </p>
                        </div>
                      </div>

                      {/* Compact Card View (Used on < 2xl) */}
                      <div className="block 2xl:hidden rounded-xl border border-border/60 bg-card p-3.5 space-y-2.5 text-xs shadow-sm hover:border-accent transition-colors">
                        {/* Top Bar: Booking Code + Status */}
                        <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2 min-w-0">
                          <div className="min-w-0">
                            <p className="font-bold text-foreground text-xs sm:text-sm truncate flex items-center gap-1">
                              <Hash className="h-3.5 w-3.5 text-primary shrink-0" />
                              {formatBookingCode(booking.bookingCode)}
                            </p>
                            <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Calendar className="h-3 w-3 shrink-0" />
                              <span>
                                {booking.createdAt
                                  ? new Date(
                                      booking.createdAt,
                                    ).toLocaleDateString()
                                  : "-"}
                              </span>
                            </p>
                          </div>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border capitalize shrink-0 ${
                              statusColors[status] ||
                              "bg-accent text-muted-foreground border-border"
                            }`}
                          >
                            {status}
                          </span>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                          <div className="min-w-0">
                            <span className="text-muted-foreground flex items-center gap-1 font-medium text-[10px]">
                              <User className="h-3 w-3 shrink-0" /> Customer
                            </span>
                            <p className="font-bold text-foreground truncate">
                              {booking.customer?.name || "N/A"}
                            </p>
                            <p className="text-muted-foreground truncate text-[10px]">
                              {booking.customer?.email || "N/A"}
                            </p>
                          </div>

                          <div className="min-w-0">
                            <span className="text-muted-foreground flex items-center gap-1 font-medium text-[10px]">
                              <Building2 className="h-3 w-3 shrink-0" /> Hotel
                            </span>
                            <p className="font-bold text-foreground truncate">
                              {booking.hotel?.name || "N/A"}
                            </p>
                            <p className="text-muted-foreground truncate text-[10px]">
                              {booking.hotel?.city || "-"}
                            </p>
                          </div>
                        </div>

                        {/* Room Details & Amount Summary */}
                        <div className="bg-accent/20 rounded-lg p-2 border border-border/40 grid grid-cols-3 gap-1.5 text-center text-[10px]">
                          <div className="min-w-0">
                            <span className="text-muted-foreground block text-[9px] uppercase font-semibold">
                              Room
                            </span>
                            <span className="font-semibold text-foreground truncate block">
                              {booking.room?.name || "N/A"}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <span className="text-muted-foreground block text-[9px] uppercase font-semibold">
                              Guests / Stay
                            </span>
                            <span className="font-semibold text-foreground truncate block">
                              {booking.guestCount} G / {booking.totalNights} N
                            </span>
                          </div>
                          <div className="min-w-0">
                            <span className="text-muted-foreground block text-[9px] uppercase font-semibold">
                              Amount
                            </span>
                            <span className="font-bold text-foreground truncate block">
                              $
                              {Number(
                                booking.finalAmount || 0,
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Footer Payment Status */}
                        <div className="flex items-center justify-between text-[10px] pt-0.5 min-w-0">
                          <span className="text-muted-foreground flex items-center gap-1 shrink-0">
                            <CreditCard className="h-3 w-3 shrink-0" /> Payment:
                          </span>
                          <span className="font-medium text-foreground capitalize truncate ml-2">
                            {booking.payment?.paymentStatus ?? "N/A"} (
                            {booking.payment?.gateway ?? "-"})
                          </span>
                        </div>
                      </div>
                    </Motion>
                  );
                })
              )}
            </div>
          </div>

          {/* Integrated Pagination Footer */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/60 pt-3 text-xs text-muted-foreground">
              <span className="text-[11px]">
                Page <strong className="text-foreground">{currentPage}</strong>{" "}
                of <strong className="text-foreground">{totalPages}</strong>
              </span>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </div>
      </Motion>
    </div>
  );
}
