import { THotel } from "../hotel";

export type WishlistItem = Pick<
  THotel,
  | "id"
  | "name"
  | "slug"
  | "city"
  | "address"
  | "coverPhoto"
  | "averageRating"
  | "reviewCount"
  | "minPrice"
> & {
  addedAt: string;
};

export type WishlistMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type WishlistData = {
  meta: WishlistMeta;
  data: WishlistItem[];
};

export type WishlistApiResponse = {
  success: boolean;
  message: string;
  data: WishlistData;
};
