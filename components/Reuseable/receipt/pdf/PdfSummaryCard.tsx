import { Text, View } from "@react-pdf/renderer";
import { Transaction } from "@/types/user/transactionHistory";
import {
    formatTransactionCurrency,
    formatTransactionDate,
} from "@/lib/transaction-utils";
import { receiptStyles } from "./PaymentReceiptStyles";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PdfSummaryCardProps {
    transaction: Transaction;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_LABEL: Record<string, string> = {
    paid: "PAYMENT SUCCESSFUL",
    pending: "PAYMENT PENDING",
    failed: "PAYMENT FAILED",
    refunded: "PAYMENT REFUNDED",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function PdfSummaryCard({ transaction }: PdfSummaryCardProps) {
    const statusLabel = STATUS_LABEL[transaction.paymentStatus] ?? "PAYMENT REFUNDED";
    const paidDate = transaction.paidAt ?? transaction.createdAt;

    return (
        <View style={receiptStyles.summaryCard}>

            {/* Status Badge */}
            <View style={receiptStyles.statusBadge}>
                <Text style={receiptStyles.statusText}>{statusLabel}</Text>
            </View>

            {/* Total Amount */}
            <Text style={receiptStyles.summaryLabel}>TOTAL PAID</Text>
            <Text style={receiptStyles.summaryAmount}>
                {formatTransactionCurrency(transaction.amount)}
            </Text>

            <View style={receiptStyles.summaryDivider} />

            {/* Meta: Gateway / Currency / Paid On */}
            <View style={receiptStyles.summaryMeta}>
                <View>
                    <Text style={receiptStyles.summaryMetaLabel}>Gateway</Text>
                    <Text style={receiptStyles.summaryMetaValue}>{transaction.gateway}</Text>
                </View>

                <View>
                    <Text style={receiptStyles.summaryMetaLabel}>Currency</Text>
                    <Text style={receiptStyles.summaryMetaValue}>{transaction.currency}</Text>
                </View>

                <View>
                    <Text style={receiptStyles.summaryMetaLabel}>Paid On</Text>
                    <Text style={receiptStyles.summaryMetaValue}>
                        {formatTransactionDate(paidDate)}
                    </Text>
                </View>
            </View>

        </View>
    );
}