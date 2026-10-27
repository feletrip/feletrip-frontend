import { Action, Booking } from "@/types/admin/booking";
import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react";

export type BookingProps = {
  bookings: Booking[];
  actions: Action[];
};

export const bookingStats = [
  { label: "Total Bookings", value: "8,240", icon: "Calendar" },
  { label: "Confirmed", value: "6,120", icon: "CheckCircle" },
  { label: "Pending", value: "1,540", icon: "Clock" },
  { label: "Cancelled", value: "580", icon: "XCircle" },
];

export const iconMap = {
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
};

export const bookings = [
  {
    id: "1",
    guestName: "John Doe",
    email: "john.doe@email.com",
    hotelName: "Grand Palace Hotel",
    roomType: "Deluxe Room",
    checkIn: "2026-03-10",
    checkOut: "2026-03-12",
    amount: 220,
    status: "Pending",
  },
  {
    id: "2",
    guestName: "Sarah Ahmed",
    email: "sarah.ahmed@email.com",
    hotelName: "Royal Inn",
    roomType: "Suite Room",
    checkIn: "2026-03-15",
    checkOut: "2026-03-18",
    amount: 450,
    status: "Confirmed",
  },
  {
    id: "3",
    guestName: "John Doe",
    email: "john.doe@email.com",
    hotelName: "Grand Palace Hotel",
    roomType: "Deluxe Room",
    checkIn: "2026-03-10",
    checkOut: "2026-03-12",
    amount: 220,
    status: "Pending",
  },
  {
    id: "4",
    guestName: "Sarah Ahmed",
    email: "sarah.ahmed@email.com",
    hotelName: "Royal Inn",
    roomType: "Suite Room",
    checkIn: "2026-03-15",
    checkOut: "2026-03-18",
    amount: 450,
    status: "Cancelled",
  },
  {
    id: "5",
    guestName: "John Doe",
    email: "john.doe@email.com",
    hotelName: "Grand Palace Hotel",
    roomType: "Deluxe Room",
    checkIn: "2026-03-10",
    checkOut: "2026-03-12",
    amount: 220,
    status: "Pending",
  },
  {
    id: "6",
    guestName: "Sarah Ahmed",
    email: "sarah.ahmed@email.com",
    hotelName: "Royal Inn",
    roomType: "Suite Room",
    checkIn: "2026-03-15",
    checkOut: "2026-03-18",
    amount: 450,
    status: "Pending",
  },
];


export const actions: Action[] = [
  {
    id: "view",
    label: "View",
    variant: "default",
  },
  {
    id: "edit",
    label: "Edit",
    variant: "secondary",
  },
  {
    id: "delete",
    label: "Delete",
    variant: "destructive",
  },
];