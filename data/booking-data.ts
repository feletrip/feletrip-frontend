import { Booking } from "@/types/user/booking";

export const bookings: Booking[] = [
  // 1. Confirmed — has one valid cover image
  {
    id: "booking-001",
    bookingCode: "BK-1720252800000-4821",
    customerId: "customer-001",
    hotelId: "hotel-001",
    roomId: "room-001",
    checkInDate: "2026-07-8",
    checkOutDate: "2026-07-11",
    totalNights: 3,
    roomsBooked: 1,
    guestCount: 2,
    totalAmount: 18000,
    finalAmount: 16500,
    status: "confirmed",
    createdAt: "2026-07-01T08:30:00.000Z",

    room: {
      id: "room-001",
      name: "Deluxe Sea View Room",
      bedType: "King Bed",
      maxGuests: 3,
      totalRooms: 8,
      pricePerNight: 5500,
    },

    hotel: {
      id: "hotel-001",
      name: "Ocean Paradise Hotel & Resort",
      city: "Cox's Bazar",
      address: "Kolatoli Road, Cox's Bazar",
      phone: "+880 1712-345678",
      hotelPhotos: [
        {
          photoUrl:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          isCover: true,
        },
        {
          photoUrl:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
          isCover: false,
        },
      ],
    },
  },

  // 2. Pending — no hotel photos, should show "G"
  {
    id: "booking-002",
    bookingCode: "BK-1720252800000-6193",
    customerId: "customer-001",
    hotelId: "hotel-002",
    roomId: "room-002",
    checkInDate: "2026-08-05",
    checkOutDate: "2026-08-08",
    totalNights: 3,
    roomsBooked: 2,
    guestCount: 4,
    totalAmount: 24000,
    finalAmount: 22000,
    status: "pending",
    createdAt: "2026-07-04T10:15:00.000Z",

    room: {
      id: "room-002",
      name: "Premium Twin Room",
      bedType: "2 Queen Beds",
      maxGuests: 4,
      totalRooms: 12,
      pricePerNight: 4000,
    },

    hotel: {
      id: "hotel-002",
      name: "Grand Sylhet Hotel",
      city: "Sylhet",
      address: "Airport Road, Sylhet",
      phone: "+880 1812-987654",
      hotelPhotos: [],
    },
  },

  // 3. Completed — multiple photos, second one is cover
  {
    id: "booking-003",
    bookingCode: "BK-1717200000000-7294",
    customerId: "customer-001",
    hotelId: "hotel-003",
    roomId: "room-003",
    checkInDate: "2026-05-12",
    checkOutDate: "2026-05-15",
    totalNights: 3,
    roomsBooked: 1,
    guestCount: 2,
    totalAmount: 13500,
    finalAmount: 12000,
    status: "completed",
    createdAt: "2026-04-20T07:20:00.000Z",

    room: {
      id: "room-003",
      name: "Executive Garden Room",
      bedType: "Queen Bed",
      maxGuests: 2,
      totalRooms: 10,
      pricePerNight: 4000,
    },

    hotel: {
      id: "hotel-003",
      name: "The Garden Residence",
      city: "Dhaka",
      address: "Banani, Dhaka",
      phone: "+880 1912-123456",
      hotelPhotos: [
        {
          photoUrl:
            "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
          isCover: false,
        },
        {
          photoUrl:
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
          isCover: true,
        },
        {
          photoUrl:
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
          isCover: false,
        },
      ],
    },
  },

  // 4. Cancelled — photos exist, but no cover, should show "C"
  {
    id: "booking-004",
    bookingCode: "BK-1714608000000-8472",
    customerId: "customer-001",
    hotelId: "hotel-004",
    roomId: "room-004",
    checkInDate: "2026-04-10",
    checkOutDate: "2026-04-12",
    totalNights: 2,
    roomsBooked: 1,
    guestCount: 1,
    totalAmount: 9000,
    finalAmount: 8500,
    status: "cancelled",
    createdAt: "2026-03-28T14:00:00.000Z",

    room: {
      id: "room-004",
      name: "Business Class Room",
      bedType: "Single King Bed",
      maxGuests: 2,
      totalRooms: 6,
      pricePerNight: 4250,
    },

    hotel: {
      id: "hotel-004",
      name: "City Crown Hotel",
      city: "Chattogram",
      address: "Agrabad, Chattogram",
      phone: "+880 1612-456789",
      hotelPhotos: [
        {
          photoUrl:
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
          isCover: false,
        },
        {
          photoUrl:
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
          isCover: false,
        },
      ],
    },
  },

  // 5. Refunded — empty photos, should show "L"
  {
    id: "booking-005",
    bookingCode: "BK-1711929600000-9351",
    customerId: "customer-001",
    hotelId: "hotel-005",
    roomId: "room-005",
    checkInDate: "2026-03-14",
    checkOutDate: "2026-03-16",
    totalNights: 2,
    roomsBooked: 1,
    guestCount: 2,
    totalAmount: 11000,
    finalAmount: 10000,
    status: "refunded",
    createdAt: "2026-03-01T09:45:00.000Z",

    room: {
      id: "room-005",
      name: "Lake View Suite",
      bedType: "King Bed",
      maxGuests: 3,
      totalRooms: 5,
      pricePerNight: 5000,
    },

    hotel: {
      id: "hotel-005",
      name: "Lake Shore Retreat",
      city: "Rangamati",
      address: "Reserve Bazar, Rangamati",
      phone: "+880 1512-567890",
      hotelPhotos: [],
    },
  },

  // 6. Confirmed — cover image available
  {
    id: "booking-006",
    bookingCode: "BK-1720425600000-5632",
    customerId: "customer-001",
    hotelId: "hotel-006",
    roomId: "room-006",
    checkInDate: "2026-07-10",
    checkOutDate: "2026-09-14",
    totalNights: 4,
    roomsBooked: 1,
    guestCount: 2,
    totalAmount: 32000,
    finalAmount: 28000,
    status: "confirmed",
    createdAt: "2026-07-06T12:20:00.000Z",

    room: {
      id: "room-006",
      name: "Mountain View Suite",
      bedType: "King Bed",
      maxGuests: 3,
      totalRooms: 4,
      pricePerNight: 7000,
    },

    hotel: {
      id: "hotel-006",
      name: "Hilltop Grand Resort",
      city: "Bandarban",
      address: "Meghla Road, Bandarban",
      phone: "+880 1711-445566",
      hotelPhotos: [
        {
          photoUrl:
            "https://images.unsplash.com/photo-1445019980597-93fa8acb246c",
          isCover: true,
        },
      ],
    },
  },
];