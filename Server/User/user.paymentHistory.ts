"use server";

import serverFetch from "@/lib/serverFetch";

import { TransactionApiResponse } from "@/types/user/transactionHistory";

interface GetMyTransactionsParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

export async function getMyTransactions({
    page = 1,
    limit = 5,
    sortBy = "createdAt",
    sortOrder = "desc",
}: GetMyTransactionsParams = {}) {
    try {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
            sortBy,
            sortOrder,
        });

        return await serverFetch.get<TransactionApiResponse>(
            `/payments/user/my-payments?${params.toString()}`,
        );
    } catch (error) {
        console.error(error);

        return null;
    }
}