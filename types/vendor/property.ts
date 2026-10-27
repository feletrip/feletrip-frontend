export interface CreateHotelPayload {
  destination: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  phone: string;
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
}

export interface UploadPhotoParams {
  hotelId: string;
  imageFile: File;
  isCover: "true" | "false";
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type FormValues = {
  name: string;
  slug: string;
  description: string;
  destination: string;
  categoryId: string;
  city: string;
  latitude?: number;
  longitude?: number;
  address: string;
  phone: string;
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  facilities: string;
};
