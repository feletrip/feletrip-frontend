import { Text, View, Image } from "@react-pdf/renderer";
import { Transaction } from "@/types/user/transactionHistory";
import { formatTransactionDate } from "@/lib/transaction-utils";
import { receiptStyles } from "./PaymentReceiptStyles";
import { FELETRIP_LOGO_BASE64 } from "@/lib/feletrip-logo-base64";

interface PdfHeaderProps {
    transaction: Transaction;
}

export function PdfHeader({ transaction }: PdfHeaderProps) {
    return (
        <View style={receiptStyles.headerContainer}>

            {/* Brand + Receipt Title */}
            <View style={receiptStyles.headerTop}>
                <View style={receiptStyles.brandWrapper}>
                    <Image src={FELETRIP_LOGO_BASE64} style={receiptStyles.brandLogo} />
                    <View style={receiptStyles.brandTextGroup}>
                        <View style={receiptStyles.brandTitleRow}>
                            <Text style={receiptStyles.brandNamePrimary}>Fele</Text>
                            <Text style={receiptStyles.brandNameSecondary}>Trip</Text>
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