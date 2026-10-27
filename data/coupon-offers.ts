import { IDeals } from "@/Server/Deals/ActiveDeals.actions";

export const mockActiveDeals: IDeals[] = [
  {
    id: "deal-001",
    title: "Monsoon Bliss Getaway",
    description:
      "Enjoy 15% off on selected hotel and resort bookings during the monsoon season.",
    promoCode: "MONSOON26",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    dealType: "PERCENTAGE",
    discountValue: 15,
    maxDiscount: 3000,
    status: "ACTIVE",
    hotel: {
      id: "hotel-001",
      name: "Grand Palace Resort",
      city: "Sylhet",
    },
    isHighlighted: true,
  },

  {
    id: "deal-002",
    title: "Weekend Escape",
    description:
      "Save ৳2,000 on selected weekend stays with a minimum eligible booking amount.",
    promoCode: "WEEKEND2K",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    dealType: "FIXED",
    discountValue: 2000,
    maxDiscount: 2000,
    status: "ACTIVE",
    hotel: {
      id: "hotel-002",
      name: "Ocean View Hotel",
      city: "Cox's Bazar",
    },
    isHighlighted: false,
  },

  {
    id: "deal-003",
    title: "Hill Track Adventure",
    description:
      "Get 20% off on selected stays in Bandarban and other hill destinations.",
    promoCode: "HILLS20",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c",
    dealType: "PERCENTAGE",
    discountValue: 20,
    maxDiscount: 5000,
    status: "ACTIVE",
    hotel: {
      id: "hotel-003",
      name: "Eco Hill Lodge",
      city: "Bandarban",
    },
    isHighlighted: false,
  },

  {
    id: "deal-004",
    title: "Summer Beach Escape",
    description: "Get 10% off on selected beach hotels and resorts.",
    promoCode: "BEACH10",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    dealType: "PERCENTAGE",
    discountValue: 10,
    maxDiscount: 2500,
    status: "INACTIVE", // Swapped "EXPIRED" to "INACTIVE" to match your strict interface types
    hotel: {
      id: "hotel-002",
      name: "Ocean View Hotel",
      city: "Cox's Bazar",
    },
    isHighlighted: false,
  },
];