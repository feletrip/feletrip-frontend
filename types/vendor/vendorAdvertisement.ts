export type DurationType = "DAY" | "WEEK" | "MONTH" | "YEAR";

export interface ICreateVendorAdPayload {
  hotelId: string;
  title: string;
  description: string;
  bannerImage: string;
  durationType: DurationType;
}

export interface IVendorAdHotelInfo {
  id: string;
  name: string;
  slug: string;
  city: string;
}

export interface IVendorAdDetail {
  id: string;
  vendorId: string;
  hotelId: string;
  title: string;
  description: string;
  bannerImage: string;
  targetUrl?: string;
  durationType: DurationType;
  duration: number;
  price: number;
  startDate: string;
  endDate: string;
  status: string;
  hotel?: IVendorAdHotelInfo;
  createdAt: string;
  updatedAt?: string;
}

export interface IVendorAdListItem {
  id: string;
  title: string;
  description?: string;
  bannerImage: string;
  durationType: DurationType;
  duration: number;
  price: number;
  status: string;
  startDate: string;
  endDate: string;
  hotel: IVendorAdHotelInfo;
  createdAt: string;
}

export interface IGetMyAdsQueryParams {
  page?: number;
  limit?: number;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IVendorAdPaginatedResponse {
  success: boolean;
  message: string;
  data: IVendorAdListItem[];
  pagination: IPaginationMeta;
}

export interface IUpdateVendorAdPayload {
  title?: string;
  description?: string;
  bannerImage?: string;
}

export type IDeleteVendorAdData = Record<string, never>;
