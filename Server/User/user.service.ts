"use server";

import serverFetch from "@/lib/serverFetch";
import {
  IApiResponse,
  IUserProfile,
  UserOverviewMetrics,
} from "@/types/user/user";

export const getOwnId = async () => {
  try {
    const result = await serverFetch.get<IApiResponse<IUserProfile>>(
      "/user/profile"
    );

    return result;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }
};

export const getData =
  async (): Promise<IApiResponse<UserOverviewMetrics> | null> => {
    try {
      const response = await serverFetch.get<IApiResponse<UserOverviewMetrics>>(
        "/dashboard/user/overview"
      );
      return response;
    } catch (error) {
      console.error("Failed to fetch user overview metrics:", error);
      return null;
    }
  };
