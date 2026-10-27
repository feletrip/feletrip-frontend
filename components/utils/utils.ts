import { DAYS } from "@/data/calendarData"
import { Booking, CalendarStats, Room } from "@/types/hoteltypes"



export function addDays(date: Date, n: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

export function getToday(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

export function fmtDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay()
  return day === 0 || day === 6
}

export function getDayLabel(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "short" }).charAt(0)
}

/** Build array of Date objects for the 30-day window starting from `today`. */
export function buildDays(today: Date): Date[] {
  return Array.from({ length: DAYS }, (_, i) => addDays(today, i))
}

/** Pre-index bookings by roomId for O(1) lookup per row. */
export function indexBookingsByRoom(
  bookings: Booking[]
): Map<number, Booking[]> {
  return bookings.reduce((map, b) => {
    const list = map.get(b.roomId) ?? []
    list.push(b)
    map.set(b.roomId, list)
    return map
  }, new Map<number, Booking[]>())
}

/** Calculate summary stats shown in the stat cards. */
export function calcStats(
  bookings: Booking[],
  rooms: Room[]
): CalendarStats {
  let totalOccupied = 0
  let occupiedToday = 0

  for (const b of bookings) {
    totalOccupied += b.end - b.start
    if (b.start <= 0 && b.end > 0) occupiedToday++
  }

  const rate = Math.round((totalOccupied / (rooms.length * DAYS)) * 100)
  return { occupiedToday, rate }
}