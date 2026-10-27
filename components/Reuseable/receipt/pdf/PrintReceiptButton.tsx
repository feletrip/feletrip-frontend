"use client";

import { useState } from "react";

import { Loader2, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Transaction } from "@/types/user/transactionHistory";

import { generateReceiptPdf } from "@/lib/receipt-pdf";
import { toast } from "../../common/toast";

interface PrintReceiptButtonProps {
    transaction: Transaction;
}

export function PrintReceiptButton({
    transaction,
}: PrintReceiptButtonProps) {
    const [loading, setLoading] = useState(false);

    const handlePrint = async () => {
        try {
            setLoading(true);

            toast.loading("Preparing receipt...");

            const blob = await generateReceiptPdf(transaction);

            const url = URL.createObjectURL(blob);

            const printWindow = window.open(url);

            if (!printWindow) {
                throw new Error("Unable to open print window.");
            }

            printWindow.onload = () => {
                printWindow.focus();
                printWindow.print();
            };

            const cleanup = () => {
                URL.revokeObjectURL(url);
            };

            printWindow.onafterprint = cleanup;

            setTimeout(cleanup, 60_000);

            toast.success("Receipt ready for printing.");
        } catch (error) {
            console.error(error);

            toast.error("Unable to print receipt.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="outline"
            onClick={handlePrint}
            disabled={loading}
        >
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Preparing...
                </>
            ) : (
                <>
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                </>
            )}
        </Button>
    );
}