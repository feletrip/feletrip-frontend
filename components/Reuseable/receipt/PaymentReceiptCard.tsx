import { Transaction } from "@/types/user/transactionHistory";

import { formatTransactionCurrency } from "@/lib/transaction-utils";
import { formatTransactionDate } from "@/lib/transaction-utils";
import { formatBookingCode } from "@/lib/booking-utils";

import { PaymentReceiptHeader } from "./PaymentReceiptHeader";
import { PaymentReceiptRow } from "./PaymentReceiptRow";
import { PaymentReceiptSection } from "./PaymentReceiptSection";
import { PaymentStatusBadge } from "../transactions/PaymentStatusBadge";

interface PaymentReceiptCardProps {
    transaction: Transaction;
}

export function PaymentReceiptCard({ transaction }: PaymentReceiptCardProps) {
    return (
        <div className="rounded-xl border bg-background">
            <div className="p-8">
                <PaymentReceiptHeader
                    title="Payment Successful"
                    description="Your payment has been processed successfully."
                    transactionId={transaction.transactionId}
                />
                <div className="mt-8 space-y-8">
                    <PaymentReceiptSection title="Booking Details">
                        <PaymentReceiptRow
                            label="Booking Code"
                            value={formatBookingCode(transaction.bookingCode)}
                        />
                        <PaymentReceiptRow
                            label="Hotel"
                            value={transaction.hotelName}
                        />
                        {transaction.roomDetails && (
                            <>
                                <PaymentReceiptRow label="Room Type" value={transaction.roomDetails.roomType} />
                                <PaymentReceiptRow label="Guests" value={transaction.roomDetails.guests.toString()} />
                                <PaymentReceiptRow label="Stay" value={`${transaction.roomDetails.checkIn} - ${transaction.roomDetails.checkOut}`} />
                            </>
                        )}
                    </PaymentReceiptSection>

                    <PaymentReceiptSection title="Payment Details">
                        <PaymentReceiptRow
                            label="Amount"
                            value={formatTransactionCurrency(
                                transaction.amount
                            )}
                        />
                        <PaymentReceiptRow
                            label="Gateway"
                            value={transaction.gateway}
                        />
                        <PaymentReceiptRow
                            label="Status"
                            value={
                                <PaymentStatusBadge
                                    status={transaction.paymentStatus}
                                />
                            }
                        />
                    </PaymentReceiptSection>

                    <PaymentReceiptSection title="Transaction Details">
                        <PaymentReceiptRow
                            label="Transaction ID"
                            value={transaction.transactionId}
                        />
                        <PaymentReceiptRow
                            label="Validation ID"
                            value={
                                transaction.validationId ??
                                "N/A"
                            }
                        />
                        <PaymentReceiptRow
                            label="Paid At"
                            value={
                                transaction.paidAt
                                    ? formatTransactionDate(
                                        transaction.paidAt
                                    )
                                    : "Pending"
                            }
                        />
                    </PaymentReceiptSection>
                </div>
            </div>

            <footer className="border-t bg-muted/30 px-8 py-5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold">ObeoRooms</p>
                        <p className="text-sm text-muted-foreground">Thank you for choosing ObeoRooms.</p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                        support@obeorooms.com
                    </div>
                </div>
            </footer>
        </div>
    );
}