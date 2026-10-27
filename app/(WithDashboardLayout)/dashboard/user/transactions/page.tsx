import { getMyTransactions } from "@/Server/User/user.paymentHistory";
import { getMyBookings } from "@/Server/User/user.bookingManagement";
import { TransactionSummary } from "@/components/Reuseable/transactions/TransactionSummary";
import { TransactionsTable } from "@/components/Reuseable/transactions/TransactionsTable";
import { TransactionsHeader } from "@/components/Reuseable/transactions/TransactionsHeader";
import { mapTransactionApiResponse } from "@/lib/mapper/transaction-mapper";
import type { Booking } from "@/types/user/booking";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }>;
}

export default async function TransactionsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const page = Number.parseInt(resolvedParams.page ?? "1", 10) || 1;
  const limit = Number.parseInt(resolvedParams.limit ?? "5", 10) || 5;
  const sortBy = resolvedParams.sortBy ?? "createdAt";
  const sortOrder = resolvedParams.sortOrder ?? "desc";

  const [paymentsResponse, bookingsResponse] = await Promise.all([
    getMyTransactions({ page, limit, sortBy, sortOrder }),
    getMyBookings(),
  ]);

  const bookingsById = new Map<string, Booking>(
    (bookingsResponse?.data?.data ?? []).map((booking) => [booking.id, booking]),
  );

  const { transactions, pagination } = mapTransactionApiResponse(
    paymentsResponse,
    bookingsById,
  );

  return (
    <section className="space-y-8">
      <TransactionsHeader />

      <TransactionSummary transactions={transactions} />

      <TransactionsTable transactions={transactions} pagination={pagination} />
    </section>
  );
}
