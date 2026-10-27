import { HotelUser } from "@/types/admin/usersAdmin";

export const stats = [
  {
    label: "Total Users",
    value: "12,540",
    change: "+8.2% this month",
    icon: "Users",
  },
  {
    label: "Hotel Owners",
    value: "1,245",
    change: "+4.1% growth",
    icon: "Building2",
  },
  {
    label: "Verified Accounts",
    value: "9,820",
    change: "+12% verified",
    icon: "ShieldCheck",
  },
  {
    label: "Suspended Users",
    value: "124",
    change: "Moderation active",
    icon: "Ban",
  },
];

export const filters = [
  "All Users",
  "Users",
  "Hotel Vendor",
  "Staff",
  "Verified",
  "Suspended",
];

export const headers = [
  "User",
  "Role",
  "Status",
  "Hotels",
  "Bookings",
  "Joined",
  "Verification",
  "Actions",
];

// CHANGED: Pass plain strings across the server boundary instead of raw component instances
export const actions = [
  { key: "view", icon: "Eye" },
  { key: "edit", icon: "Pencil" },
  { key: "more", icon: "MoreHorizontal" },
];

export const users : any = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1234567890",
    role: { id: "role-1", name: "Hotel Owner" },
    status: "active",
    isVerified: true,
    createdAt: "12 Jan 2026",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@example.com",
    phone: "+1234567891",
    role: { id: "role-2", name: "Guest" },
    status: "active",
    isVerified: true,
    createdAt: "08 Feb 2026",
  },
  {
    id: "3",
    name: "Emma Williams",
    email: "emma@example.com",
    phone: "+1234567892",
    role: { id: "role-3", name: "Staff" },
    status: "pending",
    isVerified: false,
    createdAt: "20 Mar 2026",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david@example.com",
    phone: "+1234567893",
    role: { id: "role-4", name: "Hotel Owner" },
    status: "suspended",
    isVerified: true,
    createdAt: "11 Apr 2026",
  },
  {
    id: "5",
    name: "Sophia Martinez",
    email: "sophia@example.com",
    phone: "+1234567894",
    role: { id: "role-5", name: "Guest" },
    status: "active",
    isVerified: true,
    createdAt: "01 May 2026",
  },
] satisfies HotelUser[];

// Define strict prop types for the incoming server data structures

export interface UserManagementClientProps {
  initialStats: any[];
  initialFilters: string[];
  initialUsers: HotelUser[];
  headers: any[];

  actions: {
    key: string;
    icon: string;
  }[];
}
