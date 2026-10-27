import { Text, View, Image } from "@react-pdf/renderer";
import { Transaction } from "@/types/user/transactionHistory";
import { formatTransactionDate } from "@/lib/transaction-utils";
import { receiptStyles } from "./PaymentReceiptStyles";
import { OBEO_LOGO_BASE64 } from "@/lib/obeo-logo-base64";

interface PdfHeaderProps {
    transaction: Transaction;
}

export function PdfHeader({ transaction }: PdfHeaderProps) {
    return (
        <View style={receiptStyles.headerContainer}>

            {/* Brand + Receipt Title */}
            <View style={receiptStyles.headerTop}>
                <View style={receiptStyles.brandWrapper}>
                    <Image src={OBEO_LOGO_BASE64} style={receiptStyles.brandLogo} />
                    <View style={receiptStyles.brandTextGroup}>
                        <View style={receiptStyles.brandTitleRow}>
                            <Text style={receiptStyles.brandNamePrimary}>Obeo</Text>
                            <Text style={receiptStyles.brandNameSecondary}>Rooms</Text>
                        </View>
                        <Text style={receiptStyles.brandTagline}>
                            Find &amp; Book Hotels at the Best Prices
                        </Text>
                    </View>
                </View>

                <View style={receiptStyles.receiptMeta}>
                    <Text style={receiptStyles.receiptTitle}>PAYMENT RECEIPT</Text>
                    <Text style={receiptStyles.receiptSubtitle}>Official Customer Copy</Text>
                </View>
            </View>

            {/* Receipt Number + Issue Date */}
            <View style={receiptStyles.metaContainer}>
                <View>
                    <Text style={receiptStyles.metaLabel}>Receipt Number</Text>
                    <Text style={receiptStyles.metaValue}>{transaction.transactionId}</Text>
                </View>

                <View>
                    <Text style={receiptStyles.metaLabel}>Issued</Text>
                    <Text style={receiptStyles.metaValue}>
                        {formatTransactionDate(transaction.createdAt)}
                    </Text>
                </View>
            </View>

        </View>
    );
}