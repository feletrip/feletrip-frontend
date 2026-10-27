export interface IGetAdminAdsQueryParams {
  page?: number;
  limit?: number;
}

export interface IAdVendor {
  id: string;
  name: string;
  email: string;
}

export interface IAdHotel {
  id: string;
  name: string;
  slug: string;
}

export interface IAdvertisementItem {
  id: string;
  title: string;
  bannerImage: string;
  durationType: string;
  duration: number;
  price: number;
  status: string;
  startDate: string;
  endDate: string;
  vendor: IAdVendor;
  hotel: IAdHotel;
  createdAt: string;
}

export interface IAdminAdPaginatedData {
  data: IAdvertisementItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface IAdminAdPricingItem {
  id: string;
  durationType: string;
  price: string | number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateAdminAdPricingPayload {
  durationType: string;
  price: number;
}

export interface IUpdateAdminAdPricingPayload {
  price?: number;
  isActive?: boolean;
}

export interface IAdminAdDetail {
  id: string;
  vendorId: string;
  hotelId: string;
  title: string;
  description?: string;
  bannerImage: string;
  targetUrl?: string;
  durationType: string;
  duration: number;
  price: number;
  startDate: string;
  endDate: string;
  status: string;
  vendor: {
    id: string;
    name: string;
    email: string;
  };
  hotel: {
    id: string;
    name: string;
    slug: string;
    city?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateAdStatusPayload {
  status: "ACTIVE" | "REJECTED" | string;
}
