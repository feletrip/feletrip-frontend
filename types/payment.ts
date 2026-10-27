export interface IVendorPayment {
  id: string;
  bookingId: string;
  transactionId: string;
  amount: string;
  currency: string;
  gateway: string;
  paymentStatus: "pending" | "completed" | "failed" | "cancelled";
  validationId: string | null;
  gatewayData: unknown | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  advertisementId: string | null;
  booking: {
    bookingCode: string;
    customer: {
      name: string;
      email: string;
      phone: string;
    };
    hotel: {
      name: string;
    };
  };
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IVendorPaymentsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
