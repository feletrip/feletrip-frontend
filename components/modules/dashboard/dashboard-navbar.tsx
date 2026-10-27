"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/modules/theme/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/Server/Auth/auth.actions";
import { useAuth } from "@/providers/authProvider";
import { toast } from "@/components/Reuseable/common/toast";
import { useChatStore } from "@/lib/chat.store";

const DashboardNavbar = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      toast.loading("Logging out...", "Please wait while we sign you out");

      const result = await logoutAction();

      toast.close();

      if (!result.success) {
        toast.error("Logout failed", result.message || "Something went wrong");
        return;
      }

      setUser(null);

      toast.success(
        "Logged out successfully",
        "We'll miss you. See you on your next adventure!",
      );

      router.push("/");
      useChatStore.getState().reset();

    } catch (error: any) {
      toast.close();

      toast.error(
        "Logout failed",
        error?.message || "Server Error. Please try again later",
      );
    }
  };

  return (
    <div className="flex justify-between items-center w-full gap-2 min-w-0">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink-0">
        <SidebarTrigger />
        <h2 className="font-semibold text-sm sm:text-base md:text-lg truncate max-w-[100px] sm:max-w-none">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 md:gap-6 min-w-0">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="hover:bg-transparent cursor-pointer min-w-0"
          >
            <SidebarMenuButton className="h-auto py-1 px-2 flex items-center gap-2 rounded-xl transition-colors hover:bg-muted/60">
              <div className="flex items-center gap-2 min-w-0">
                <Avatar className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 ring-1 ring-border/50">
                  <AvatarImage
                    src={
                      user?.avatar ||
                      "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg?semt=ais_incoming&w=740&q=80"
                    }
                    alt={user?.name || "userName"}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-xs font-semibold">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="hidden sm:flex flex-col text-left min-w-0 max-w-[100px] md:max-w-[160px]">
                  <span className="text-xs sm:text-sm font-semibold truncate leading-tight text-foreground">
                    {user?.name || "User"}
                  </span>
                  <span className="text-muted-foreground text-[11px] truncate leading-tight hidden md:inline">
                    {user?.email || "user@example.com"}
                  </span>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="mt-2 w-48">
            <DropdownMenuItem
              onClick={handleLogOut}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardNavbar;
