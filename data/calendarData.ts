import { Booking, Room, RoomType, RoomTypeStyle } from "@/types/hoteltypes"

export const DAYS = 30


export const rooms: Room[] = [
  // Standard Rooms
  { id: 1, name: "Room 101", type: "Standard" },
  { id: 2, name: "Room 102", type: "Standard" },
  { id: 3, name: "Room 103", type: "Standard" },
  { id: 4, name: "Room 104", type: "Standard" },
  { id: 5, name: "Room 105", type: "Standard" },

  // Deluxe Rooms
  { id: 6, name: "Room 201", type: "Deluxe" },
  { id: 7, name: "Room 202", type: "Deluxe" },
  { id: 8, name: "Room 203", type: "Deluxe" },
  { id: 9, name: "Room 204", type: "Deluxe" },

  // Suite Rooms
  { id: 10, name: "Room 301", type: "Suite" },
  { id: 11, name: "Room 302", type: "Suite" },
  { id: 12, name: "Room 303", type: "Suite" },
]


export const bookings: Booking[] = [
  { id: 1, guest: "John Doe",     roomId: 1,  start: 3,  end: 7  },
  { id: 2, guest: "Sarah Lee",    roomId: 2,  start: 6,  end: 10 },
  { id: 3, guest: "David Miller", roomId: 3,  start: 1,  end: 4  },

  { id: 4, guest: "Emma Watson",  roomId: 4,  start: 8,  end: 12 },
  { id: 5, guest: "Liam Smith",   roomId: 5,  start: 10, end: 15 },

  { id: 6, guest: "Olivia Brown", roomId: 6,  start: 2,  end: 6  },
  { id: 7, guest: "Noah Wilson",  roomId: 7,  start: 12, end: 18 },
  { id: 8, guest: "Ava Taylor",   roomId: 8,  start: 5,  end: 9  },

  { id: 9, guest: "William Moore", roomId: 9,  start: 14, end: 20 },

  { id: 10, guest: "Sophia White", roomId: 10, start: 1,  end: 5  },
  { id: 11, guest: "James Harris", roomId: 11, start: 7,  end: 11 },
  { id: 12, guest: "Isabella Clark", roomId: 12, start: 16, end: 22 },
]

// 🎨 Room type styles (unchanged)
export const ROOM_TYPE_STYLES: Record<RoomType, RoomTypeStyle> = {
  Standard: { bg: "#378ADD", text: "#E6F1FB", dot: "#378ADD" },
  Deluxe:   { bg: "#D85A30", text: "#FAECE7", dot: "#D85A30" },
  Suite:    { bg: "#1D9E75", text: "#E1F5EE", dot: "#1D9E75" },
}

export const ROOM_TYPES: RoomType[] = ["Standard", "Deluxe", "Suite"]

export const CELL_WIDTH = 26 // px