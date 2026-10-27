export interface Role {
  id: string;
  name: string;
  description?: string;
  panel?: string;
  permissionIds?: string[];
  type?: string;
  permissions?: string[];
  userCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const initialRoles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    type: "admin",
    permissions: [
      "Full Access",
      "User Management",
      "Property Approval",
      "Booking Management",
      "Deals Management",
    ],
    userCount: 3,
  },
  {
    id: "2",
    name: "Content Manager",
    type: "admin",
    permissions: ["Content Management", "Blog Management", "Media Upload"],
    userCount: 5,
  },
  {
    id: "3",
    name: "Support Agent",
    type: "admin",
    permissions: ["View Bookings", "Respond to Reviews", "Customer Support"],
    userCount: 12,
  },
  {
    id: "4",
    name: "Property Manager",
    type: "host",
    permissions: ["Property Management", "Booking Requests", "Availability Calendar"],
    userCount: 28,
  },
  {
    id: "5",
    name: "Guest",
    type: "user",
    permissions: ["View Properties", "Make Bookings", "Leave Reviews", "Save Properties"],
    userCount: 156,
  },
];
