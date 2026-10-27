import WithdrawalsClient from "@/components/modules/dashboard/admin/WithdrawalsClient";
import { getAllAdminWithdrawals } from "@/Server/Admin/getAllWithdrawals.action";

export default async function WithdrawalsPage() {
  const res = await getAllAdminWithdrawals();

  const initialWithdrawals = res?.success && res.data ? res.data : [];

  return (
    <main className="w-full min-h-screen bg-background">
      <WithdrawalsClient withdrawalsData={initialWithdrawals} />
    </main>
  );
}
