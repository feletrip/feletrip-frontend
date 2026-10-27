import { Booking, BookingStatus } from "@/types/user/booking";

export type BookingCategory = "active" | "completed" | "cancelled";

export const BOOKING_CATEGORIES: BookingCategory[] = [
  "active",
  "completed",
  "cancelled",
];

const bookingStatusGroups: Record<BookingCategory, BookingStatus[]> = {
  active: ["pending", "confirmed"],
  completed: ["completed"],
  cancelled: ["cancelled", "refunded"],
};

export function formatBookingDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatBookingCurrency(amount: number | string) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

export function formatBookingCode(code?: string | null): string {
  if (!code) return "";
  const trimmed = code.trim();
  // If it's a UUID (e.g. 17653f48-548d-4cf9-9c32-7833af28b429), take first 10 chars
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(trimmed)) {
    return trimmed.replace(/-/g, "").slice(0, 10).toUpperCase();
  }
  // Remove BK- prefix if present:
  let clean = trimmed.replace(/^BK-?/i, "");
  // Remove trailing 4-digit postfix like -1904 or -7519 if present:
  clean = clean.replace(/-\d{4}$/, "");
  // Remove any trailing hyphens:
  clean = clean.replace(/-+$/, "");
  // If longer than 10 characters (e.g. 13-digit timestamp), take first 10 characters:
  if (clean.length > 10) {
    clean = clean.slice(0, 10);
  }
  return clean;
}

export function filterBookingsBySearch(bookings: Booking[], search: string) {
  const query = search.trim().toLowerCase();

  if (!query) {
    return bookings;
  }

  return bookings.filter((booking) => {
    return (
      booking.hotel.name.toLowerCase().includes(query) ||
      booking.hotel.city.toLowerCase().includes(query) ||
      booking.bookingCode.toLowerCase().includes(query) ||
      booking.room.name.toLowerCase().includes(query)
    );
  });
}

export function filterBookingsByCategory(
  bookings: Booking[],
  category: BookingCategory,
) {
  const allowedStatuses = bookingStatusGroups[category];

  return bookings.filter((booking) => allowedStatuses.includes(booking.status));
}

export function groupBookingsByCategory(
  bookings: Booking[],
): Record<BookingCategory, Booking[]> {
  return BOOKING_CATEGORIES.reduce(
    (grouped, category) => {
      grouped[category] = filterBookingsByCategory(bookings, category);
      return grouped;
    },
    {} as Record<BookingCategory, Booking[]>,
  );
}

export const getNextUpcomingBooking = (
  bookings: Booking[] = [],
): Booking | null => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingBookings = bookings
    .filter((booking) => {
      const checkInDate = new Date(booking.checkInDate);
      checkInDate.setHours(0, 0, 0, 0);

      const allowedStatuses = bookingStatusGroups["active"].map((s) =>
        s.toLowerCase(),
      );

      const statusNormalized = String(booking.status).toLowerCase().trim();

      return allowedStatuses.includes(statusNormalized as any) && checkInDate >= today;
    })
    .sort(
      (a, b) =>
        new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime(),
    );

  return upcomingBookings[0] ?? null;
};

export const getTripCountdown = (checkInDate: string): string => {
  if (!checkInDate) return "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const datePart = checkInDate.includes("T")
    ? checkInDate.split("T")[0]
    : checkInDate.split(" ")[0];

  const checkIn = new Date(`${datePart}T00:00:00`);

  let finalCheckIn = checkIn;
  if (isNaN(checkIn.getTime())) {
    finalCheckIn = new Date(checkInDate);
    if (isNaN(finalCheckIn.getTime())) {
      return "";
    }
    finalCheckIn.setHours(0, 0, 0, 0);
  }

  const difference = finalCheckIn.getTime() - today.getTime();

  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

  if (days < 0) {
    return "Trip started";
  }

  if (days === 0) {
    return "Today";
  }

  if (days === 1) {
    return "1 day remaining";
  }

  return `${days} days remaining`;
};
