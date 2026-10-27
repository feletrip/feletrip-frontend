export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  coverPhoto?: string | null;
  phone: string;
  businessName: string;
  status: string;
  createdAt: string;
  token?: string;
  accessToken?: string;
  role: {
    id: string;
    name: string;
    panel?: string;
  };
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  pagination?: IPagination;
  data: T;
}

export interface UserOverviewMetrics {
  totalBookings: number;
  completedBookings: number;
  upcomingBookings: number;
  cancelledBookings: number;
  totalSpent: number;
}
