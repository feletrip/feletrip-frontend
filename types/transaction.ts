export type TransactionStatus = "paid" | "pending" | "completed" | "cancelled";
export type Transaction = {
  id: string;
  guestName: string;
  property: string;
  amount: number;
  date: string;
  status: TransactionStatus;
}