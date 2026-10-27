import { StatusBadge } from "@/components/Reuseable/common/StatusBadge";
import { Booking, BookingStatus } from "@/types/vendor/bookings";
import { formatBookingCode } from "@/lib/booking-utils";

interface BookingsProps {
  bookings: Booking[];
}

export default function BookingTable({ bookings }: BookingsProps) {
  const bookingStatus: Record<BookingStatus, string> = {
    pending: "bg-warning/40",
    confirmed: "bg-info/40",
    cancelled: "bg-destructive/40",
    completed: "bg-success/40",
    refunded: "bg-accent-foreground/40",
    checked_out: "bg-chart-2/40",
    checked_in: "bg-sidebar-primary/40",
  };

  return (
    <div className="w-full space-y-4">
      {/* Desktop Grid Table */}
      <div className="border rounded-xl overflow-hidden">
        {/* Header */}
        <div className="hidden lg:grid lg:grid-cols-[1.2fr_2fr_1.2fr_1.2fr_1.25fr_1fr_0.8fr] bg-primary text-muted  border-b font-semibold text-sm ">
          <div className="py-3 text-center">Code</div>
          <div className="py-3 text-center">Customer</div>
          <div className="py-3 text-center">Property</div>
          <div className="py-3 text-center">Room</div>
          <div className="py-3 text-center">Dates</div>
          <div className="py-3 text-center">Amount</div>
          <div className="py-3 text-center">Status</div>
        </div>

        {/* Rows */}

        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="grid grid-cols-2 lg:grid-cols-[1.2fr_2fr_1.2fr_1.2fr_1.25fr_1fr_0.8fr] border-b last:border-none hover:bg-muted/50 transition text-sm p-4 lg:px-2 lg:py-2"
          >
            {/* Code */}
            <div className="lg:p-2 text-xs xl:text-sm break-all hidden lg:block text-center font-mono">
              {formatBookingCode(booking.bookingCode)}
            </div>

            <div className="col-span-2 flex justify-between items-center lg:hidden p-2 ">
              {/* Code */}
              <div>
                <h1 className="text-muted-foreground">Booking Code</h1>
                <span className="py-2 font-medium break-all font-mono">
                  {formatBookingCode(booking.bookingCode)}
                </span>
              </div>

              {/* status  */}
              <div className="p-2">
                <span
                  className={`inline-flex  px-3 py-1 rounded-full text-xs capitalize ${bookingStatus[booking.status]}`}
                >
                  {booking.status.replace("_", " ")}
                </span>
              </div>
            </div>

            {/* Customer */}
            <div className="p-2 lg:p-1 xl:text-center">
              <p className="flex flex-col">
                <span className="lg:hidden text-muted-foreground text-sm ">
                  Customer
                </span>
                <span className="font-medium text-base lg:text-sm">
                  {booking.customer.name}
                </span>
              </p>

              <p className="text-xs text-muted-foreground">
                {booking.customer.phone}
              </p>

              <p className="text-xs text-muted-foreground truncate">
                {booking.customer.email}
              </p>
            </div>

            {/* Hotel */}

            <div className="p-2 lg:p-1 xl:text-center">
              <p className="flex flex-col">
                <span className="lg:hidden text-muted-foreground text-sm ">
                  Property
                </span>
                <span className="font-medium text-base lg:text-sm">
                  {booking.hotel.name}
                </span>
              </p>

              <p className="text-xs text-muted-foreground">
                {booking.hotel.city}
              </p>
            </div>

            {/* Room */}

            <div className="p-2 lg:p-1 xl:text-center">
              <p className="flex flex-col">
                <span className="lg:hidden text-muted-foreground text-sm ">
                  Room
                </span>
                <span className="font-medium text-base lg:text-sm">
                  {booking.room.name}
                </span>
              </p>

              <p className="text-xs text-muted-foreground">
                {booking.room.bedType}
              </p>
            </div>

            {/* Dates */}

            <div className="p-2 lg:p-1 xl:text-center">
              <p className="flex flex-col">
                <span className="lg:hidden text-muted-foreground text-sm ">
                  Date
                </span>
                <span>
                  {new Date(booking.checkInDate).toLocaleDateString()}
                  {" - "}
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </span>
              </p>

              <p className="text-xs text-muted-foreground">
                {booking.totalNights} nights
              </p>
            </div>

            {/* Amount */}

            <div className="col-span-2 lg:col-span-1  lg:flex lg:flex-col items-center lg:justify-center border lg:border-none border-primary rounded py-2 lg:py-0">
              <p className="text-center font-medium lg:font-normal text-primary lg:text-foreground">
                ${Number(booking.finalAmount).toLocaleString("en-US")}
              </p>
            </div>

            {/* Status */}

            <div className="p-1 hidden lg:flex justify-center items-center">
              {/* <span
                className={`inline-flex px-3 py-1 rounded-full text-xs capitalize ${bookingStatus[booking.status]}`}
              >
                {booking.status.replace("_", " ")}
              </span> */}
              <StatusBadge status={booking.status.replace("_", " ")} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
