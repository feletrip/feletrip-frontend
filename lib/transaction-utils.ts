import { PaymentStatus, Transaction } from "@/types/user/transactionHistory";


export function formatTransactionCurrency(
    amount: number,
    currency = "BDT"
) {
    return new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatTransactionDate(date: string) {
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
}


export function formatTransactionDateTime(date: string) {
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
}

export function calculateTransactionSummary(
    transactions: Transaction[]
) {
    const totalTransactions = transactions.length;

    const totalPaid = transactions
        .filter((txn) => txn.paymentStatus === "paid")
        .reduce((sum, txn) => sum + txn.amount, 0);

    const pendingAmount = transactions
        .filter((txn) => txn.paymentStatus === "pending")
        .reduce((sum, txn) => sum + txn.amount, 0);

    const failedTransactions = transactions.filter(
        (txn) => txn.paymentStatus === "failed"
    ).length;

    const refundedAmount = transactions
        .filter((txn) => txn.paymentStatus === "refunded")
        .reduce((sum, txn) => sum + txn.amount, 0);

    return {
        totalTransactions,
        totalPaid,
        pendingAmount,
        failedTransactions,
        refundedAmount,
    };
}

export function getPaymentStatusOrder(
    status: PaymentStatus
) {
    switch (status) {
        case "paid":
            return 1;

        case "pending":
            return 2;

        case "refunded":
            return 3;

        case "failed":
            return 4;

        default:
            return 99;
    }
}

export async function copyTransactionId(
    transactionId: string
) {
    await navigator.clipboard.writeText(transactionId);
}