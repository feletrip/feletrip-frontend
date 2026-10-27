"use server";

import serverFetch from "@/lib/serverFetch";

export interface RoomInput {
  hotelId: string;
  name: string;
  bedType: string;
  maxGuests: number;
  totalRooms: number;
  pricePerNight: number;
  description: string;
  roomCategoryId: string;
  facilities: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface RoomPhoto {
  id: string;
  photoUrl: string;
  isCover: boolean;
}

export interface RoomFacilityAssignment {
  facility: {
    id: string;
    name: string;
  };
}

export interface RoomData {
  id: string;
  hotelId: string;
  name: string;
  bedType: string;
  maxGuests: number;
  totalRooms: number;
  pricePerNight: number;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  roomPhotos: RoomPhoto[];
  hotel?: {
    id: string;
    name: string;
    address: string;
    city?: string;
    phone?: string;
  };
  roomCategory: {
    id: string;
    name: string;
    description: string;
  };
  roomFacilityAssignments?: RoomFacilityAssignment[];
}

// create room
export async function createRoom(
  roomData: RoomInput,
): Promise<ApiResponse<RoomData> | null> {
  try {
    const data = await serverFetch.post("/rooms/vendor", roomData);

    return data as ApiResponse<RoomData>;
  } catch (error) {
    console.error("Error creating room:", error);
    return null;
  }
}

// get my rooms by hotel id
export async function getMyRooms(hotelId: string,): Promise<ApiResponse<RoomData[]> | null> {
  try {
    const data = await serverFetch.get(`/rooms/${hotelId}/rooms?limit=100`);

    return data as ApiResponse<RoomData[]>;
  } catch (error) {
    console.error("Error fetching vendor rooms:", error);
    return null;
  }
}

// update room
export async function updateRoom(
  roomId: string,
  updateData: Partial<RoomInput>,
): Promise<ApiResponse<RoomData> | null> {
  try {
    const data = await serverFetch.patch(`/rooms/vendor/${roomId}`, updateData);

    return data as ApiResponse<RoomData>;
  } catch (error) {
    console.error(`Error updating room for ID ${roomId}:`, error);
    return null;
  }
}

// delete room
export async function deleteRoom(
  id: string,
): Promise<ApiResponse<{ success: boolean; message: string }> | null> {
  try {
    const data = await serverFetch.delete(`/rooms/${id}`);

    return data as ApiResponse<{ success: boolean; message: string }>;
  } catch (error) {
    console.error(`Error deleting room for ID ${id}:`, error);
    return null;
  }
}

// upload room photo
export async function uploadRoomPhoto(
  roomId: string,
  formData: FormData,
): Promise<ApiResponse<RoomData> | null> {
  try {
    const data = await serverFetch.post(
      `/rooms/vendor/${roomId}/photos`,
      formData,
    );

    return data as ApiResponse<RoomData>;
  } catch (error) {
    console.error(`Error uploading photo for room ID ${roomId}:`, error);
    return null;
  }
}

// delete room photo
export async function deleteRoomPhoto(
  roomId: string,
  photoId: string,
): Promise<ApiResponse<any> | null> {
  try {
    const data = await serverFetch.delete(`/rooms/${roomId}/photos/${photoId}`);

    return data as ApiResponse<any>;
  } catch (error) {
    console.error(`Error deleting photo for room ID ${roomId}:`, error);
    return null;
  }
}

// get room category
export async function getRoomCategory(): Promise<ApiResponse<any[]> | null> {
  try {
    const data = await serverFetch.get("/room-categories");

    return data as ApiResponse<any[]>;
  } catch (error) {
    console.error("Error fetching rooms category:", error);
    return null;
  }
}
