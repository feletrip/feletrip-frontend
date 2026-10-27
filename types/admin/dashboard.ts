import {
  CheckCircle,
  DollarSign,
  LandPlot,
  LucideIcon,
  Users,
} from "lucide-react";
import { IconType } from "react-icons";

export type DashboardIcon = LucideIcon | IconType;

export type StatIconKey = "bookings" | "users" | "hotels" | "revenue" | string;

export const iconMap: Record<StatIconKey, DashboardIcon> = {
  bookings: CheckCircle,
  users: Users,
  hotels: LandPlot,
  revenue: DollarSign,
};

export interface StatisticItem {
  index?: number;
  key?: number | string;
  title: string;
  value: string | number | undefined;
  icon: StatIconKey | IconType | LucideIcon;
  trend?: number;
  trendText?: string;
  trendDescription?: string;
  className?: string;
  iconClassName?: string;
  bgGlow?: string;
  iconStyle?: string;
  borderGlow?: string;
  subtitle?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AdminOverviewMetrics {
  totalBookings: number;
  bookingGrowth: number;
  totalCheckIn: number;
  checkInGrowth: number;
  totalCheckOut: number;
  checkOutGrowth: number;
  totalRevenue: number;
  revenueGrowth: number;
}

//start here
export interface AdminHotelBooking {
  status: string;
  count: number;
  percentage: number;
}

export interface AdminUsers {
  users: number;
  hotelOwners: number;
  verifiedUsers: number;
  suspendedUsers: number;
}

export interface AdminHotel {
  hotels: number;
  approvedHotels: number;
  pendingHotels: number;
  rejectedHotels: number;
}

export interface OccupancyChartItem {
  label: string;
  occupancyRate: number;
}

export interface AnalyticsDataPayload {
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  occupancyRate: number;
  occupancyChart: OccupancyChartItem[];
}

// start here
export interface BookingApiResponse {
  success: boolean;
  message: string;
  data: {
    meta: Meta;
    data: Booking[];
  };
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Booking {
  id: string;
  bookingCode: string;
  checkInDate: string;
  checkOutDate: string;
  totalNights: number;
  roomsBooked: number;
  guestCount: number;
  totalAmount: string;
  finalAmount: string;
  status: BookingStatus;
  completedAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  customer: Customer;
  hotel: Hotel;
  room: Room;
  payment: Payment | null;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  address: string;
  vendorId: string;
  vendor: Vendor;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
}

export interface Room {
  id: string;
  name: string;
  bedType: string;
  maxGuests: number;
  pricePerNight: string;
}

export interface Payment {
  id: string;
  amount: string;
  paymentStatus: PaymentStatus;
  gateway: PaymentGateway;
  transactionId: string;
  paidAt: string | null;
}

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type PaymentGateway = "SSLCOMMERZ" | "STRIPE" | "PAYPAL" | string;
//finish here

export interface RevenueChartItem {
  month: string;
  revenue: number;
}

export interface RevenueOverviewData {
  totalRevenue: number;
  monthlyRevenue: number;
  revenueGrowth: number;
  averageBookingValue: number;
  revenueChart: RevenueChartItem[];
}

export interface ReviewItem {
  id: string;
  customerName: string;
  hotelName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface LatestReviewsResponse {
  success: boolean;
  message: string;
  data: ReviewItem[];
}

export interface BookingDistributionItem {
  status: string;
  count: number;
  percentage: number;
}

export interface BookingDistributionResponse {
  success: boolean;
  message: string;
  data: BookingDistributionItem[];
}

export interface RecentActivityItem {
  id: string;
  type: "BOOKING" | "CHECK_IN" | "CHECK_OUT" | string;
  title: string;
  createdAt: string;
}

export interface RecentActivitiesResponse {
  success: boolean;
  message: string;
  data: RecentActivityItem[];
}

export interface AdminDashboardProps {
  statisticsData?: StatisticItem[];
  analyticsData?: AnalyticsDataPayload;
  revenueData?: RevenueOverviewData;
  latestReviews?: LatestReviewsResponse;
  bookingDistribution?: BookingDistributionItem[];
  recentActivities?: RecentActivityItem[];
  bookingDetails?: Booking[];
  bookingMetaData?: Meta;
}

export interface Activity {
  id: number;
  user: string;
  type: "checkin" | "checkout" | "reservation";
  room: string;
  timestamp: string;
}

export interface Review {
  id: number;
  user: string;
  room: string;
  comment: string;
  icon: DashboardIcon;
  iconColor: string;
  bgColor: string;
}
