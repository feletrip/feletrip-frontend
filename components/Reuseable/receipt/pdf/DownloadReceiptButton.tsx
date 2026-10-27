"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types/user/transactionHistory";
import { PaymentReceiptPDF } from "./PaymentReceiptPDF";
import { toast } from "../../common/toast";
import { generateReceiptPdf } from "@/lib/receipt-pdf";

interface DownloadReceiptButtonProps {
    transaction: Transaction;
}

export function DownloadReceiptButton({
    transaction,
}: DownloadReceiptButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        try {
            setLoading(true);
            toast.loading("Generating receipt...");
            const blob = await generateReceiptPdf(transaction);
            toast.close();
            // Give the close transition time to settle
            await new Promise((resolve) => setTimeout(resolve, 250));
            toast.success("Receipt downloaded successfully.");

            // Give the success transition time to start before trigger download
            await new Promise((resolve) => setTimeout(resolve, 100));

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;

            link.download = `FeleTrip-Receipt-${transaction.transactionId}.pdf`;

            link.click();

            URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
            toast.close();
            // Give the close transition time to settle before showing error
            await new Promise((resolve) => setTimeout(resolve, 250));
            toast.error("Unable to generate receipt.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleDownload}
            disabled={loading}
        >
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                </>
            ) : (
                <>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                </>
            )}
        </Button>
    );
}