import {
  Clock3,
  CircleCheckBig,
  LogIn,
  LogOut,
  XCircle,
  CalendarCheck,
} from "lucide-react";
import { BookingTrend } from "./BookingTrend";
import {
  getVendorBookingOverview,
  getVendorBookingTrend,
} from "@/Server/Vendor/dashboard.action";
import { Motion } from "@/components/Reuseable/common/Framermotion";

const BookingDistribution = async () => {
  const bookingRes = await getVendorBookingOverview();
  const bookingOverview = bookingRes?.data;
  const totalBookings = bookingOverview?.totalBookings ?? 0;

  const bookingTrendRes = await getVendorBookingTrend();
  const bookingTrend = bookingTrendRes?.data;

  const bookingStats = [
    {
      title: "Pending",
      value: bookingOverview?.pendingBookings ?? 0,
      icon: Clock3,
      color: "text-warning",
      bg: "bg-warning/10",
      progress: "bg-warning",
    },
    {
      title: "Confirmed",
      value: bookingOverview?.confirmedBookings ?? 0,
      icon: CircleCheckBig,
      color: "text-success",
      bg: "bg-success/10",
      progress: "bg-success",
    },
    {
      title: "Checked In",
      value: bookingOverview?.checkedInBookings ?? 0,
      icon: LogIn,
      color: "text-info",
      bg: "bg-info/10",
      progress: "bg-info",
    },
    {
      title: "Checked Out",
      value: bookingOverview?.checkedOutBookings ?? 0,
      icon: LogOut,
      color: "text-primary",
      bg: "bg-primary/10",
      progress: "bg-primary",
    },
    {
      title: "Cancelled",
      value: bookingOverview?.cancelledBookings ?? 0,
      icon: XCircle,
      color: "text-destructive",
      bg: "bg-destructive/10",
      progress: "bg-destructive",
    },
  ];

  return (
    <Motion animationType="fadeRight">
      <section className="space-y-6 rounded-2xl border bg-linear-to-br from-[#4efc65]/3 to-[#4efc65]/0 p-6">
        <div className="">
          {/* Header */}
          <Motion animationType="fadeRight" delay={0.3}>
            <div className="flex items-center gap-3 mb-6">
              <div className=" flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ">
                <CalendarCheck size={22} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Booking Overview
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Real-time reservation status
                </p>
              </div>
            </div>
          </Motion>

          <div className="grid gap-6">
            {/* Total Booking Card */}
            <Motion animationType="fadeRight" delay={0.5}>
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card-bg p-6">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 " />

                <p className="text-sm text-muted-foreground">Total Bookings</p>

                <h1 className="text-3xl font-bold text-foreground  ">
                  {totalBookings}
                </h1>

                <p className="mt-4 text-sm  text-muted-foreground ">
                  Current reservation activity
                </p>

                <div className="mt-6 rounded-xl  bg-primary/10  px-4 py-3 text-sm  text-primary font-medium  ">
                  Booking Health
                  <span className="float-right">Active</span>
                </div>
              </div>
            </Motion>
            {/* Status Breakdown */}
            <div className="space-y-4">
              {bookingStats.map((item, idx) => {
                const Icon = item.icon;

                const percentage =
                  totalBookings > 0
                    ? Math.round((item.value / totalBookings) * 100)
                    : 0;

                return (
                  <Motion
                    key={item.title}
                    animationType="slideDown"
                    delay={0.5 + idx * 0.1}
                  >
                    <div className="rounded-xl  border border-border bg-background p-4 transition-all hover:shadow-md ">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-lg  ${item.bg} ${item.color} `}
                          >
                            <Icon size={20} />
                          </div>

                          <div>
                            <p className="text-sm font-medium  text-foreground ">
                              {item.title}
                            </p>

                            <p className="text-xs text-muted-foreground ">
                              {percentage}% of bookings
                            </p>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-foreground ">
                          {item.value}
                        </h3>
                      </div>

                      {/* Progress */}
                      <div className="mt-4 h-2 overflow-hidden rounded-full  bg-muted">
                        <div
                          className={`h-full rounded-full  ${item.progress}`}
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  </Motion>
                );
              })}
            </div>
          </div>
        </div>

        {/* Trend */}
        <Motion animationType="slideDown" delay={0.4}>
          <BookingTrend bookingTrend={bookingTrend} />
        </Motion>
      </section>
    </Motion>
  );
};

export default BookingDistribution;
