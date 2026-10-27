"use client";
import { useSidebar } from "@/components/ui/sidebar";
import {
  BookDown,
  CalendarDays,
  CopyPlus,
  LifeBuoy,
  MessageCircle,
  Rss,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BadgePercent,
  BookCheck,
  CreditCard,
  CreditCardIcon,
  HeartPlus,
  Hotel,
  Kanban,
  LayoutDashboard,
  MessageCircleCheck,
  UserRoundCog,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { IoMdGitNetwork } from "react-icons/io";
import { useAuth } from "@/providers/authProvider";
import { IUserProfile } from "@/types/user/user";
import { MdOutlineMeetingRoom, MdOutlineReviews } from "react-icons/md";
import { LiaBlogSolid } from "react-icons/lia";
import { useStartChat } from "@/hooks/useStartChat";

type Role = "USER" | "HOST" | "ADMIN";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  visible: Role[];
  action?: "chat-with-admin";
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

const menuItems: MenuGroup[] = [
  {
    title: "USER DASHBOARD",
    items: [
      {
        icon: <LayoutDashboard />,
        label: "Dashboard",
        href: "/dashboard/user",
        visible: ["USER"],
      },
      {
        icon: <BookCheck />,
        label: "My Bookings",
        href: "/dashboard/user/myBookings",
        visible: ["USER"],
      },
      {
        icon: <HeartPlus />,
        label: "Saved Properties",
        href: "/dashboard/user/savedProperties",
        visible: ["USER"],
      },
      {
        icon: <MessageCircleCheck />,
        label: "My Reviews",
        href: "/dashboard/user/myReviews",
        visible: ["USER"],
      },
    ],
  },
  {
    title: "USER TRANSACTION",
    items: [
      {
        icon: <CreditCardIcon />,
        label: "Payment History",
        href: "/dashboard/user/transactions",
        visible: ["USER"],
      },
    ],
  },
  {
    title: "USER PROFILE",
    items: [
      {
        icon: <UserRoundCog />,
        label: "Settings",
        href: "/dashboard/user/profile",
        visible: ["USER"],
      },
    ],
  },

  // HOST DASHBOARD
  {
    title: "HOST DASHBOARD",
    items: [
      {
        icon: <LayoutDashboard />,
        label: "Dashboard",
        href: "/dashboard/host",
        visible: ["HOST"],
      },
      {
        icon: <MessageCircle />,
        label: "Chat with Admin",
        href: "",
        visible: ["HOST"],
        action: "chat-with-admin",
      },
    ],
  },
  {
    title: "PROPERTY MANAGEMENT",
    items: [
      {
        icon: <Hotel />,
        label: "My Properties",
        href: "/dashboard/host/properties",
        visible: ["HOST"],
      },
      {
        icon: <Hotel />,
        label: "Add New Property",
        href: "/dashboard/host/properties/new",
        visible: ["HOST"],
      },
      {
        icon: <BookCheck />,
        label: "Rooms & Amenities",
        href: "/dashboard/host/properties/rooms",
        visible: ["HOST"],
      },
      {
        icon: <BookCheck />,
        label: "Photos & Gallery",
        href: "/dashboard/host/properties/photos",
        visible: ["HOST"],
      },
    ],
  },
  {
    title: "RESERVATIONS MANAGEMENT",
    items: [
      {
        icon: <BookDown />,
        label: "Bookings",
        href: "/dashboard/host/bookings/my-bookings",
        visible: ["HOST"],
      },
      {
        icon: <CalendarDays />,
        label: "Reservations Calendar",
        href: "/dashboard/host/bookings/vendor-calender",
        visible: ["HOST"],
      },
      {
        icon: <LifeBuoy />,
        label: "Reservations Statement",
        href: "/dashboard/host/bookings/statement",
        visible: ["HOST"],
      },
    ],
  },

  {
    title: "OFFER AND DEALS",
    items: [
      {
        icon: <BadgePercent />,
        label: "Create Deals",
        href: "/dashboard/host/dealsSection/dealsAdd",
        visible: ["HOST"],
      },
      {
        icon: <BadgePercent />,
        label: "Deals Management",
        href: "/dashboard/host/dealsSection/deals",
        visible: ["HOST"],
      },
      {
        icon: <BadgePercent />,
        label: "Advertisements",
        href: "/dashboard/host/advertisements",
        visible: ["HOST"],
      },
    ],
  },
  {
    title: "ROLES AND USER MANAGEMENT",
    items: [
      {
        icon: <IoMdGitNetwork />,
        label: "Roles Management",
        href: "/dashboard/host/roles",
        visible: ["HOST"],
      },
      {
        icon: <IoMdGitNetwork />,
        label: "User Management",
        href: "/dashboard/host/users",
        visible: ["HOST"],
      },
    ],
  },
  {
    title: "BLOGS",
    items: [
      {
        icon: <Rss />,
        label: "My Blogs",
        href: "/dashboard/host/blogs/my-blogs",
        visible: ["HOST"],
      },
      {
        icon: <CopyPlus />,
        label: "Add Blogs",
        href: "/dashboard/host/blogs/add-blogs",
        visible: ["HOST"],
      },
    ],
  },
  {
    title: "TRANSACTIONS",
    items: [
      {
        icon: <Hotel />,
        label: "Wallet",
        href: "/dashboard/host/transactions",
        visible: ["HOST"],
      },
      {
        icon: <Hotel />,
        label: "Payment History",
        href: "/dashboard/host/transactions/history",
        visible: ["HOST"],
      },
    ],
  },
  {
    title: "PROFILE",
    items: [
      {
        icon: <UserRoundCog />,
        label: "Profile",
        href: "/dashboard/host/profile",
        visible: ["HOST"],
      },
    ],
  },

  // ADMIN DASHBOARD
  {
    title: "ADMIN DASHBOARD",
    items: [
      {
        icon: <LayoutDashboard />,
        label: "Dashboard",
        href: "/dashboard/admin",
        visible: ["ADMIN"],
      },
    ],
  },

  {
    title: "HOMEPAGE MANAGEMENT",
    items: [
      {
        icon: <Hotel />,
        label: "Popular Destinations",
        href: "/dashboard/admin/destinations",
        visible: ["ADMIN"],
      },
      {
        icon: <Rss />,
        label: "Featured Videos",
        href: "/dashboard/admin/featured-videos",
        visible: ["ADMIN"],
      },
      {
        icon: <BadgePercent />,
        label: "Advertisements",
        href: "/dashboard/admin/advertisements",
        visible: ["ADMIN"],
      },
    ],
  },

  {
    title: "PROPERTY MANAGEMENT",
    items: [
      {
        icon: <Hotel />,
        label: "Property Management",
        href: "/dashboard/admin/properties",
        visible: ["ADMIN"],
      },
      {
        icon: <Kanban />,
        label: "Hotel Categories",
        href: "/dashboard/admin/categories",
        visible: ["ADMIN"],
      },
      {
        icon: <MdOutlineMeetingRoom />,
        label: "Room Categories",
        href: "/dashboard/admin/room-categories",
        visible: ["ADMIN"],
      },
      {
        icon: <MdOutlineReviews />,
        label: "Reviews Management",
        href: "/dashboard/admin/reviews",
        visible: ["ADMIN"],
      },
    ],
  },

  // ================= CONTENT MANAGEMENT =================
  {
    title: "CONTENT MANAGEMENT",
    items: [
      {
        icon: <LiaBlogSolid />,
        label: "Blogs Management",
        href: "/dashboard/admin/blogs",
        visible: ["ADMIN"],
      },
      {
        icon: <CreditCard />,
        label: "Deals Management",
        href: "/dashboard/admin/deals",
        visible: ["ADMIN"],
      },
    ],
  },

  {
    title: "USER & ACCESS",
    items: [
      {
        icon: <UserRoundCog />,
        label: "User Management",
        href: "/dashboard/admin/users",
        visible: ["ADMIN"],
      },
      {
        icon: <IoMdGitNetwork />,
        label: "Roles Management",
        href: "/dashboard/admin/roles",
        visible: ["ADMIN"],
      },
    ],
  },

  {
    title: "FINANCIAL",
    items: [
      {
        icon: <Wallet />,
        label: "Withdrawals",
        href: "/dashboard/admin/withdrawals",
        visible: ["ADMIN"],
      },
      {
        icon: <BookCheck />,
        label: "Limits & Commission",
        href: "/dashboard/admin/commission",
        visible: ["ADMIN"],
      },
    ],
  },

  {
    title: "PROFILE",
    items: [
      {
        icon: <UserRoundCog />,
        label: "Profile",
        href: "/dashboard/admin/profile",
        visible: ["ADMIN"],
      },
    ],
  },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { user } = useAuth() as { user: IUserProfile | null };
  const { startVendorAdminChat } = useStartChat();

  const resolvedRole =
    typeof user?.role === "object"
      ? user?.role?.panel || user?.role?.name
      : user?.role;

  const userRole = (resolvedRole || "USER").toUpperCase() as Role;

  return (
    <Sidebar collapsible="icon" {...props} className="border-none">
      {/* ================== HEADER ================== */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link
                href="/"
                className="flex items-center gap-2 rounded-xl hover:bg-muted transition-all"
              >
                {!isCollapsed ? (
                  <div className="py-1">
                    <Image
                      src="/logo.png"
                      alt="FeleTrip Logo"
                      width={140}
                      height={36}
                      className="h-8 w-auto object-contain dark:hidden"
                    />
                    <Image
                      src="/logo-white.png"
                      alt="FeleTrip Logo"
                      width={140}
                      height={36}
                      className="h-8 w-auto object-contain hidden dark:block"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      alt="FeleTrip Logo"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ================== CONTENT ================== */}
      <SidebarContent className="hide-scrollbar">
        {menuItems.map((group) => {
          const visibleItems = group.items.filter((item) =>
            item.visible.includes(userRole),
          );

          if (!visibleItems.length) return null;

          return (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel className="text-sm font-semibold text-invert tracking-wider mb-2">
                {group.title}
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {visibleItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <SidebarMenuItem key={item.label}>
                        <Tooltip delayDuration={200}>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton asChild>
                              {item.action === "chat-with-admin" ? (
                                <button
                                  onClick={() => startVendorAdminChat()}
                                  className={cn(
                                    "flex w-full items-center gap-3 rounded px-3 py-2 transition-all duration-200",
                                    "hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer",
                                  )}
                                >
                                  {item.icon}
                                  {!isCollapsed && <span>{item.label}</span>}
                                </button>
                              ) : (
                                <Link
                                  href={item.href}
                                  className={cn(
                                    "flex items-center gap-3 rounded px-3 py-2 transition-all duration-200",
                                    isActive
                                      ? "bg-primary text-primary-foreground shadow-md"
                                      : "hover:bg-muted text-muted-foreground hover:text-foreground",
                                  )}
                                >
                                  {item.icon}
                                  {!isCollapsed && <span>{item.label}</span>}
                                </Link>
                              )}
                            </SidebarMenuButton>
                          </TooltipTrigger>

                          {isCollapsed && (
                            <TooltipContent side="right">
                              {item.label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
