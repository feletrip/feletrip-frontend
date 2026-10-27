import { Text, View } from "@react-pdf/renderer";
import { receiptStyles } from "./PaymentReceiptStyles";

interface PdfRowProps {
    label: string;
    value: string;
    isLast?: boolean;
}

export function PdfRow({ label, value, isLast = false }: PdfRowProps) {
    const rowStyle = isLast
        ? [receiptStyles.row, receiptStyles.lastRow]
        : receiptStyles.row;

    return (
        <View style={rowStyle}>
            <Text style={receiptStyles.label}>{label}</Text>
            <Text style={receiptStyles.value}>{value}</Text>
        </View>
    );
}