export type Commission = {
  id: string
  bookingId: string
  guest: string
  property: string
  bookingAmount: number
  commissionRate: number
  commissionAmount: number
  hostEarning: number
  date: string
  status: "paid" | "pending"
}