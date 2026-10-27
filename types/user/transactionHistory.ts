export type PaymentStatus =
    | "pending"
    | "paid"
    | "failed"
    | "refunded";

export type PaymentGateway =
    | "SSLCOMMERZ"
    | "SURJOPAY"
    | "BANKTRANSFER"
    | "AAMARPAY"
    | "NAGAD"
    | "ROCKET"
    | "BKASH";

export interface Transaction {
    id: string;
    bookingId: string;
    bookingCode: string;
    transactionId: string;
    hotelName: string;
    roomDetails?: {
        roomType: string;
        guests: number;
        checkIn: string;
        checkOut: string;
    };
    amount: number;
    currency: string;
    gateway: PaymentGateway;
    paymentStatus: PaymentStatus;
    validationId: string | null;
    gatewayData: unknown | null;
    paidAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface TransactionApiResponse {
    success: boolean;
    message: string;
    pagination: Pagination;
    data: TransactionApiItem[];
}

export interface TransactionApiItem {
    id: string;

    bookingId: string;

    transactionId: string;

    amount: string;

    currency: string;

    gateway: PaymentGateway;

    paymentStatus: PaymentStatus;

    validationId: string | null;

    gatewayData: unknown | null;

    paidAt: string | null;

    createdAt: string;

    updatedAt: string;

    booking?: {
        bookingCode: string;
        checkInDate?: string;
        checkOutDate?: string;
        guestCount?: number;
        hotel?: {
            name: string;
        };
        room?: {
            name: string;
        };
    } | null;
}