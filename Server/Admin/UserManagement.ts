"use server";

import serverFetch from "@/lib/serverFetch";
import { HotelUser } from "@/types/admin/usersAdmin";

type UserResponse = {
  data: {
    data: HotelUser[];
  };
};

export async function getUser(): Promise<UserResponse> {
  try {
    const data = await serverFetch.get<UserResponse>("/dashboard/admin/users");
    return data;
  } catch {
    return { data: { data: [] } };
  }
}
