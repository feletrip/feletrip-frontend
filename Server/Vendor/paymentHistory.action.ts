"use server";

import serverFetch, { IApiResponse } from "@/lib/serverFetch";
import { IVendorPayment, IVendorPaymentsQueryParams } from "@/types/payment";

export const getVendorPayments = async (
  params?: IVendorPaymentsQueryParams,
) => {
  try {
    const query = new URLSearchParams();

    if (params?.page) query.append("page", params.page.toString());
    if (params?.limit) query.append("limit", params.limit.toString());
    if (params?.search) query.append("search", params.search);
    if (params?.sortBy) query.append("sortBy", params.sortBy);
    if (params?.sortOrder) query.append("sortOrder", params.sortOrder);

    const queryString = query.toString();
    const endpoint = `/payments/vendor/my-payments${queryString ? `?${queryString}` : ""}`;

    const result =
      await serverFetch.get<IApiResponse<IVendorPayment[]>>(endpoint);

    return result;
  } catch (error) {
    console.error("Failed to fetch vendor payments:", error);
    return null;
  }
};
