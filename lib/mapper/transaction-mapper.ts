import type { Booking } from "@/types/user/booking";
import {
    Pagination,
    Transaction,
    TransactionApiItem,
    TransactionApiResponse,
} from "@/types/user/transactionHistory";
import { formatTransactionDate } from "@/lib/transaction-utils";

function buildRoomDetails(source: {
    roomName?: string | null;
    guestCount?: number | null;
    checkInDate?: string | null;
    checkOutDate?: string | null;
}): Transaction["roomDetails"] | undefined {
    const hasRoomDetails =
        Boolean(source.roomName) ||
        source.guestCount != null ||
        Boolean(source.checkInDate && source.checkOutDate);

    if (!hasRoomDetails) return undefined;

    return {
        roomType: source.roomName ?? "N/A",
        guests: source.guestCount ?? 0,
        checkIn: source.checkInDate
            ? formatTransactionDate(source.checkInDate)
            : "N/A",
        checkOut: source.checkOutDate
            ? formatTransactionDate(source.checkOutDate)
            : "N/A",
    };
}

export function mapPaymentToTransaction(
    payment: TransactionApiItem,
    bookingOverride?: Booking | null,
): Transaction {
    const apiBooking = payment.booking;
    const booking = bookingOverride ?? null;

    return {
        id: payment.id,
        bookingId: payment.bookingId,
        bookingCode:
            booking?.bookingCode ||
            apiBooking?.bookingCode ||
            "N/A",
        transactionId: payment.transactionId,
        hotelName:
            booking?.hotel?.name ||
            apiBooking?.hotel?.name ||
            "N/A",
        roomDetails:
            buildRoomDetails({
                roomName: booking?.room?.name ?? apiBooking?.room?.name,
                guestCount: booking?.guestCount ?? apiBooking?.guestCount,
                checkInDate: booking?.checkInDate ?? apiBooking?.checkInDate,
                checkOutDate: booking?.checkOutDate ?? apiBooking?.checkOutDate,
            }),
        amount: Number(payment.amount),
        currency: payment.currency,
        gateway: payment.gateway,
        paymentStatus: payment.paymentStatus,
        validationId: payment.validationId,
        gatewayData: payment.gatewayData,
        paidAt: payment.paidAt,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
    };
}

export function mapTransactionApiResponse(
    response: TransactionApiResponse | null | undefined,
    bookingsById?: Map<string, Booking> | null,
): {
    transactions: Transaction[];
    pagination: Pagination;
} {
    const payments = response?.data ?? [];
    const pagination = response?.pagination ?? {
        page: 1,
        limit: payments.length || 10,
        total: payments.length,
        totalPages: 1,
    };

    const transactions = payments.map((payment) =>
        mapPaymentToTransaction(
            payment,
            bookingsById?.get(payment.bookingId) ?? null,
        ),
    );

    return {
        transactions,
        pagination,
    };
}
