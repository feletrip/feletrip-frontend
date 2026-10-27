import { getVendorRecentActivities } from "@/Server/Vendor/dashboard.action";
import { Motion } from "@/components/Reuseable/common/Framermotion";
import { VendorRecentActivities } from "@/types/vendor/dashboard";
import { Activity, Hotel, BookmarkCheck, CalendarCheck } from "lucide-react";

const RecentActivities = async () => {
  const activitiesRes = await getVendorRecentActivities();
  const recentActivities = activitiesRes?.data ?? [];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "booking_created":
        return <BookmarkCheck size={18} />;
      case "booking_confirmed":
        return <CalendarCheck size={18} />;
      default:
        return <Activity size={18} />;
    }
  };

  const getActivityLabel = (type: string) => {
    return type
      .split("_")
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(" ");
  };

  return (
    <Motion>
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 ">
        {/* Background Glow */}
        <div className="absolute -right-30 -top-70 h-156 w-156 rounded-full bg-success/5 " />

        <div className="relative">
          {/* Header */}
          <Motion animationType="fadeLeft" delay={0.4}>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Activity size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Recent Activities
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Latest actions across your properties
                  </p>
                </div>
              </div>
            </div>
          </Motion>

          {/* Empty State */}
          {recentActivities.length === 0 && (
            <Motion animationType="slideDown" delay={0.4}>
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background py-14 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Activity size={28} />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  No Recent Activities
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  New activity updates will appear here.
                </p>
              </div>
            </Motion>
          )}

          {/* Activity Table */}
          {recentActivities.length > 0 && (
            <Motion animationType="slideDown" delay={0.6}>
              <div className="rounded-xl border border-border bg-primary/5">
                <div className="divide-y divide-border">
                  {recentActivities.map((activity: VendorRecentActivities) => (
                    <div
                      key={activity.referenceId}
                      className="flex items-start gap-4 p-5 transition-colors hover:bg-muted/40 "
                    >
                      {/* <div className="flex flex-1 items-start gap-4"> */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        {getActivityIcon(activity.type)}
                      </div>

                      <div className="space-y-5 w-full flex flex-col gap-5  items-start xl:flex-row xl:items-start xl:justify-between">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                              {getActivityLabel(activity.type)}
                            </span>

                            <span className="text-xs text-muted-foreground">
                              {formatDate(activity.createdAt)}
                            </span>
                          </div>

                          <p className="text-sm text-foreground">
                            {activity.message}
                          </p>
                        </div>
                        <div className="flex items-center xl:items-start  gap-2 text-sm text-muted-foreground">
                          <div className="xl:mt-1">
                            <Hotel size={16} />
                          </div>
                          <div className="flex xl:flex-col items-center xl:items-start  gap-2">
                            <p className="ml-2">Property</p>
                            <p className="font-semibold bg-info/10 text-info py-1 px-4 rounded-full">
                              {activity.hotelName}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* </div> */}
                    </div>
                  ))}
                </div>
              </div>
            </Motion>
          )}
        </div>
      </section>
    </Motion>
  );
};

export default RecentActivities;
