"use client";

import { Motion } from "@/components/Reuseable/common/Framermotion";
import Pagination from "@/components/Reuseable/common/Pagination";
import { Spinner } from "@/components/ui/spinner";
import BookingFilters from "@/components/vendor/bookings/BookingFilters";
import BookingTable from "@/components/vendor/bookings/BookingTable";
import VendorBookingHeader from "@/components/vendor/bookings/VendorBookingHeader";
import { getVendorBookings } from "@/Server/Vendor/bookings.action";
import { Booking, BookingStatus } from "@/types/vendor/bookings";
import { useEffect, useState } from "react";

export default function MyBookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [status, setStatus] = useState<BookingStatus | undefined>();

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [totalBooking, setTotalBooking] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadBookings() {
      try {
        setLoading(true);

        const res = await getVendorBookings({
          page,
          limit: 10,
          status,
          sortOrder,
        });

        if (!ignore) {
          setBookings(res?.data?.data);

          setTotalPages(res?.data?.meta?.totalPages);
          setTotalBooking(res?.data?.meta?.total);
        }
      } catch {
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadBookings();

    return () => {
      ignore = true;
    };
  }, [page, status, sortOrder]);

  return (
    <div className="">
      <VendorBookingHeader></VendorBookingHeader>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 mb-4 ">
        <Motion animationType="fadeLeft">
          <p>Total Bookings: {totalBooking}</p>
        </Motion>
        <Motion animationType="fadeRight">
          <BookingFilters
            status={status}
            setStatus={(value) => {
              setPage(1);

              setStatus(value);
            }}
            sortOrder={sortOrder}
            setSortOrder={(value) => {
              setPage(1);

              setSortOrder(value);
            }}
          />
        </Motion>
      </div>

      {loading ? (
        <div className="flex flex-col gap-2 justify-start items-center min-h-screen">
          <Spinner className="text-primary"></Spinner>
          <p>Loading bookings...</p>
        </div>
      ) : bookings?.length > 0 ? (
        <Motion animationType="slideDown" delay={0.3}>
          <BookingTable bookings={bookings} />
        </Motion>
      ) : (
        <div className="text-center py-10 min-h-screen text-muted-foreground">
          No bookings found
        </div>
      )}

      {!loading && bookings?.length > 0 && (
        <div className="flex justify-center mt-8">
          <Motion animationType="slideDown" delay={0.5}>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              setCurrentPage={setPage}
            />
          </Motion>
        </div>
      )}
    </div>
  );
}
