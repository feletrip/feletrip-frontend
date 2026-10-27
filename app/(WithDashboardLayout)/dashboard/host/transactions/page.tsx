import TransactionsDashboard from "@/components/modules/dashboard/host/TransactionsOverview";
import { getVendorWalletData } from "@/Server/Vendor/vendorGetWallet.action";
import { getVendorWithdrawalHistory } from "@/Server/Vendor/vendorWithdrawalHistory.action";

export default async function TransactionsPage() {
  // Fetch both server actions in parallel
  const [walletRes, historyRes] = await Promise.all([
    getVendorWalletData(),
    getVendorWithdrawalHistory(),
  ]);

  // Ensure undefined falls back to null and empty array
  const walletData = walletRes?.success ? walletRes.data : null;
  const withdrawalHistory =
    historyRes?.success && historyRes.data ? historyRes.data : [];

  return (
    <TransactionsDashboard
      walletData={walletData ?? null}
      withdrawalHistory={withdrawalHistory}
    />
  );
}
