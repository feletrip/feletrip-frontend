export interface CategoryApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface RoomCategory {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}