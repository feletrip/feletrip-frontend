import { Document, Page, Text, View } from "@react-pdf/renderer";
import { Transaction } from "@/types/user/transactionHistory";
import { formatTransactionDate } from "@/lib/transaction-utils";
import { formatBookingCode } from "@/lib/booking-utils";
import { receiptStyles } from "./PaymentReceiptStyles";
import { PdfHeader } from "./PdfHeader";
import { PdfSummaryCard } from "./PdfSummaryCard";
import { PdfSection } from "./PdfSection";
import { PdfRow } from "./PdfRow";

interface PaymentReceiptPDFProps {
    transaction: Transaction;
}

export function PaymentReceiptPDF({ transaction }: PaymentReceiptPDFProps) {
    const paidAt = transaction.paidAt
        ? formatTransactionDate(transaction.paidAt)
        : "Pending";

    return (
        <Document
            title={`ObeoRooms-Receipt-${transaction.transactionId}`}
            author="ObeoRooms"
            subject="Payment Receipt"
            creator="ObeoRooms"
        >
            <Page size="A4" style={receiptStyles.page}>
                <View style={receiptStyles.container}>

                    {/* Header */}
                    <PdfHeader transaction={transaction} />

                    {/* Payment Summary */}
                    <PdfSummaryCard transaction={transaction} />

                    {/* Booking Details */}
                    <PdfSection title="Booking Details">
                        <PdfRow label="Booking Code" value={formatBookingCode(transaction.bookingCode)} />
                        <PdfRow
                            label="Hotel"
                            value={transaction.hotelName}
                            isLast={!transaction.roomDetails}
                        />
                        {transaction.roomDetails ? (
                            <PdfRow
                                label="Room Type"
                                value={transaction.roomDetails.roomType}
                            />
                        ) : null}
                        {transaction.roomDetails ? (
                            <PdfRow
                                label="Guests"
                                value={String(transaction.roomDetails.guests)}
                            />
                        ) : null}
                        {transaction.roomDetails ? (
                            <PdfRow
                                label="Stay"
                                value={`${transaction.roomDetails.checkIn} - ${transaction.roomDetails.checkOut}`}
                                isLast
                            />
                        ) : null}
                    </PdfSection>

                    {/* Transaction Details */}
                    <PdfSection title="Transaction Details">
                        <PdfRow label="Transaction ID" value={transaction.transactionId} />
                        <PdfRow label="Validation ID" value={transaction.validationId ?? "N/A"} />
                        <PdfRow label="Paid At" value={paidAt} isLast />
                    </PdfSection>

                    {/* Footer */}
                    <View style={receiptStyles.footer}>
                        <View style={receiptStyles.footerRow}>
                            <View>
                                <Text style={receiptStyles.company}>ObeoRooms</Text>
                                <Text style={receiptStyles.support}>Thank you for choosing ObeoRooms.</Text>
                            </View>
                            <Text style={receiptStyles.support}>support@obeorooms.com</Text>
                        </View>
                        <Text style={receiptStyles.disclaimer}>
                            This is an electronically generated receipt. No signature is required.
                        </Text>
                    </View>

                </View>
            </Page>
        </Document>
    );
}