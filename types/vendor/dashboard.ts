export interface VendorApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface VendorOverview {
  totalHotels: number;
  totalRooms: number;
  activeBookings: number;
  occupancyRate: number;
  totalRevenue: number;
  averageRating: number;
}

export interface VendorRevenueOverview {
  totalRevenue: number;
  currentPeriodRevenue: number;
  previousPeriodRevenue: number;
  revenueGrowth: number;
  averageBookingValue: number;
}

export interface VendorRevenueAnalytics {
  label: string;
  value: number;
}

export interface VendorBookingOverview {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  checkedInBookings: number;
  checkedOutBookings: number;
  cancelledBookings: number;
}

export interface VendorBookingTrend {
  label: string;
  value: number;
}

export interface VendorRoomOverview {
  totalRoomTypes: number;
  totalRooms: number;
  activeRoomTypes: number;
  inactiveRoomTypes: number;
}

export interface VendorGuestOverview {
  totalGuests: number;
  newGuests: number;
  returningGuests: number;
}

export interface VendorLatestReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  customerName: string;
  hotelName: string;
}

export interface VendorRecentBooking {
  id: string;
  bookingCode: string;
  status: string;
  totalAmount: number;
  checkInDate: string;
  checkOutDate: string;
  createdAt: string;
  customerName: string;
  hotelName: string;
}

export interface VendorRecentActivities {
  type: string;
  message: string;
  createdAt: string;
  hotelName: string;
  referenceId: string;
}
