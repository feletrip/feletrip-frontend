import { Motion } from "@/components/Reuseable/common/Framermotion";

export function TransactionsHeader() {
  return (
    <Motion animationType="fadeDown" duration={0.5}>
      <div>
        <h1 className="text-3xl font-bold">Transaction History</h1>
        <p className="mt-2 text-muted-foreground">
          View and manage all your payment transactions.
        </p>
      </div>
    </Motion>
  );
}
