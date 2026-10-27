export type RoomType = "Standard" | "Deluxe" | "Suite"

export interface Room {
  id: number
  name: string
  type: RoomType
}

export interface Booking {
  id: number
  guest: string
  roomId: number
  /** day offset from today — 0 = today, 1 = tomorrow, etc. */
  start: number
  /** exclusive end offset (checkout day) */
  end: number
}

export interface RoomTypeStyle {
  bg: string
  text: string
  dot: string
}

export interface TooltipState {
  visible: boolean
  x: number
  y: number
  booking: Booking | null
  room: Room | null
  startDate: Date | null
  endDate: Date | null
}

export interface CalendarStats {
  occupiedToday: number
  rate: number
}

export interface BlockedDate {
  id: number
  roomId: number
  start: number
  end: number
  reason?: string
}