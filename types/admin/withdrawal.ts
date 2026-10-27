export type WithdrawalStatus = "pending" | "approved" | "rejected" | "paid";

export interface ICommission {
  id: string;
  withdrawalId: string;
  commissionRate: string;
  commissionAmount: string;
  vendorAmount: string;
  platformAmount: string;
  status: string;
  settledAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface IVendorInfo {
  id: string;
  roleId: string;
  name: string;
  email: string;
  phone: string;
  address: string | null;
  avatar: string | null;
  status: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAdminWithdrawalItem {
  id: string;
  vendorId: string;
  amount: string;
  paymentMethod: string;
  accountNumber: string;
  accountName: string;
  adminNote: string | null;
  status: WithdrawalStatus;
  requestedAt: string;
  processedAt: string | null;
  createdAt: string;
  updatedAt: string;
  vendor: IVendorInfo;
  commissions: ICommission[];
}
