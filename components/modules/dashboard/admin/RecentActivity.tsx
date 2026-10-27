import React from "react";
import { Card } from "@/components/ui/card";
import { CiLogin, CiLogout } from "react-icons/ci";
import { GoVerified } from "react-icons/go";
import { History } from "lucide-react";
import { RecentActivityItem } from "@/types/admin/dashboard";
import { Motion } from "@/components/Reuseable/common/Framermotion";

interface RecentActivityProps {
  activities?: RecentActivityItem[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  activities = [], // Default fallback protection array
}) => {
  const getActivityStyle = (type: RecentActivityItem["type"]) => {
    switch (type) {
      case "CHECK_IN":
        return {
          icon: CiLogin,
          iconColor: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-500/20",
        };
      case "CHECK_OUT":
        return {
          icon: CiLogout,
          iconColor: "text-destructive",
          bgColor: "bg-red-100 dark:bg-red-500/20",
        };
      case "BOOKING":
        return {
          icon: GoVerified,
          iconColor: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-100 dark:bg-blue-500/20",
        };
      default:
        return {
          icon: GoVerified,
          iconColor: "text-gray-600 dark:text-gray-400",
          bgColor: "bg-gray-100 dark:bg-gray-500/20",
        };
    }
  };

  return (
    <Motion animationType="fadeRight" delay={0.5}>
      <Card className="border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-lg p-6 flex-1">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center border border-dashed rounded-xl border-border/60 bg-muted/10">
              <History className="size-8 text-muted-foreground/40 mb-2" />
              <p className="text-sm font-medium text-muted-foreground">
                No recent timeline updates recorded
              </p>
            </div>
          ) : (
            activities.map((activity) => {
              const {
                icon: Icon,
                iconColor,
                bgColor,
              } = getActivityStyle(activity.type);

              const formattedTime = new Date(activity.createdAt).toLocaleString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                },
              );

              return (
                <div key={activity.id} className="relative flex gap-4">
                  <div
                    className={`z-10 flex items-center justify-center h-8 w-8 rounded-full shrink-0 ${bgColor}`}
                  >
                    <Icon size={18} className={iconColor} />
                  </div>

                  <div>
                    <p className="text-sm text-secondary-foreground leading-tight">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formattedTime}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>
    </Motion>
  );
};
