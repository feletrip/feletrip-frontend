export interface IHotelPhoto {
  photoUrl: string;
}

export interface IAdvertisedHotel {
  id: string;
  name: string;
  slug: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  hotelPhotos: IHotelPhoto[];
}

export interface IAdvertisement {
  id: string;
  title: string;
  description: string;
  bannerImage: string;
  targetUrl: string;
  durationType: "DAY" | "WEEK" | "MONTH" | string;
  duration: number;
  startDate: string;
  endDate: string;
  status: "ACTIVE" | "INACTIVE" | string;
  hotel: IAdvertisedHotel;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
