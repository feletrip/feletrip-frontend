import { ReactNode } from "react";
import { Text, View } from "@react-pdf/renderer";
import { receiptStyles } from "./PaymentReceiptStyles";

interface PdfSectionProps {
    title: string;
    children: ReactNode;
}

export function PdfSection({ title, children }: PdfSectionProps) {
    return (
        <View style={receiptStyles.section}>
            <Text style={receiptStyles.sectionTitle}>{title}</Text>

            <View style={receiptStyles.sectionCard}>
                {children}
            </View>
        </View>
    );
}