import { pdf } from "@react-pdf/renderer";
import type { Transaction } from "@/types/user/transactionHistory";
import { PaymentReceiptPDF } from "@/components/Reuseable/receipt/pdf/PaymentReceiptPDF";

export async function generateReceiptPdf(
    transaction: Transaction,
): Promise<Blob> {
    return pdf(
        <PaymentReceiptPDF transaction={transaction} />
    ).toBlob();
}
