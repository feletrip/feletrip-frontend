import { Commission } from "@/types/commission"

export const commissionData: Commission[] = [
  {
    id: "COM-001",
    bookingId: "BK-231",
    guest: "John Doe",
    property: "Hotel Mania Deluxe Room",
    bookingAmount: 200,
    commissionRate: 10,
    commissionAmount: 20,
    hostEarning: 180,
    date: "2026-03-01",
    status: "paid",
  },
  {
    id: "COM-002",
    bookingId: "BK-232",
    guest: "Sarah Smith",
    property: "Sea View Suite",
    bookingAmount: 300,
    commissionRate: 10,
    commissionAmount: 30,
    hostEarning: 270,
    date: "2026-03-03",
    status: "pending",
  },
]