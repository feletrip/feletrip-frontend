export interface DealFormValues {
  hotelId: string;
  roomIds: string[];
  title: string;
  description?: string;
  promoCode: string;
  dealType: "PERCENTAGE" | "FIXED_AMOUNT";
  discountValue: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  usageLimit?: number;
  image?: string | null;
}

export type StepId = "general" | "config" | "media";
