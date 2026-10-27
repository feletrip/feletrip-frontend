import TransactionsHistory from "@/components/modules/dashboard/host/TransactionsHistory";
import { getVendorPayments } from "@/Server/Vendor/paymentHistory.action";
import { IVendorPaymentsQueryParams } from "@/types/payment";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }>;
}

export default async function TransactionsHistoryPage({
  searchParams,
}: PageProps) {
  // Await searchParams (Next.js 15+)
  const resolvedParams = await searchParams;

  const queryParams: IVendorPaymentsQueryParams = {
    page: resolvedParams.page ? parseInt(resolvedParams.page, 10) : 1,
    limit: resolvedParams.limit ? parseInt(resolvedParams.limit, 10) : 10,
    search: resolvedParams.search || "",
    sortBy: resolvedParams.sortBy || "",
    sortOrder: resolvedParams.sortOrder || "desc",
  };

  const response = await getVendorPayments(queryParams);

  const transactionsData = response?.data || [];
  const paginationData = response?.pagination || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  return (
    <div className="p-6">
      <TransactionsHistory
        transactions={transactionsData}
        pagination={paginationData}
        queryParams={queryParams}
      />
    </div>
  );
}
