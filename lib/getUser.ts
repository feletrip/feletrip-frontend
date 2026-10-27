"use server";

import { cookies } from "next/headers";
import serverFetch from "@/lib/serverFetch";
import { IUserProfile } from "@/types/user/user";

const defaultAvatar = "https://i.ibb.co.com/j9P7WfQG/image.png";

export async function getUser(): Promise<IUserProfile | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  
  if (!accessToken) {
    return null;
  }
  
  const result = await serverFetch.get<{
    success: boolean;
    message: string;
    data: IUserProfile | null;
  }>("/user/profile");
  
  if (!result.success || !result.data) {
    return null;
  }
  
  return {
    ...result.data,
    avatar: result.data.avatar || defaultAvatar,
  };
}
