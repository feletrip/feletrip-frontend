"use server";
import serverFetch from "@/lib/serverFetch";

interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

export const Addrolevendor = async (data: {
  name: string;
  description: string;
  panel: string;
  permissionIds: string[];
}): Promise<ApiResponse> => {
  try {
    const response: any = await serverFetch.post(`/role/vendor/create`, data);
    if (!response || !response.success) {
      return {
        success: false,
        message: response?.message || "Failed to create role",
        data: null,
      };
    }
    return {
      success: true,
      message: response.message || "Role created successfully",
      data: response.data || response,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "An unexpected error occurred",
      data: null,
    };
  }
};

export const getAllrolesvendor = async (): Promise<ApiResponse> => {
  try {
    const response: any = await serverFetch.get(`/role/vendor/get-all`);
    if (!response || !response.success) {
      return {
        success: false,
        message: response?.message || "Failed to fetch roles",
        data: [],
      };
    }
    const roles = Array.isArray(response.data)
      ? response.data
      : response?.data?.data || [];
    return { success: true, data: roles };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "An unexpected error occurred",
      data: [],
    };
  }
};

export const getsinglepermissionvendor = async (
  id: string,
): Promise<ApiResponse> => {
  try {
    const response: any = await serverFetch.get(
      `/role/vendor/get-role-permissions/${id}`,
    );
    if (!response || !response.success) {
      return {
        success: false,
        message: response?.message || "Failed to fetch role permissions",
        data: [],
      };
    }
    const permissions = Array.isArray(response.data)
      ? response.data
      : response?.data?.data || [];
    return { success: true, data: permissions };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "An unexpected error occurred",
      data: [],
    };
  }
};

export const getAllpermissionsvendor = async (): Promise<ApiResponse> => {
  try {
    const response: any = await serverFetch.get(`/permissions/vendor/get-all`);
    if (!response || !response.success) {
      return {
        success: false,
        message: response?.message || "Failed to fetch permissions",
        data: [],
      };
    }
    const permissions = Array.isArray(response.data)
      ? response.data
      : response?.data?.data || [];
    return { success: true, data: permissions };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "An unexpected error occurred",
      data: [],
    };
  }
};

export const UpdateRolevendor = async (data: {
  id: string;
  name: string;
  description: string;
  panel: string;
  permissionIds: string[];
}): Promise<ApiResponse> => {
  try {
    const response: any = await serverFetch.patch(
      `/role/vendor/update/${data.id}`,
      data,
    );
    if (!response || !response.success) {
      return {
        success: false,
        message: response?.message || "Failed to update role",
        data: null,
      };
    }
    return {
      success: true,
      message: response.message || "Role updated successfully",
      data: response.data || response,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "An unexpected error occurred",
      data: null,
    };
  }
};

export const DeleteRolevendor = async (id: string): Promise<ApiResponse> => {
  try {
    const response: any = await serverFetch.delete(`/role/vendor/delete/${id}`);
    if (!response || !response.success) {
      return {
        success: false,
        message: response?.message || "Failed to delete role",
        data: null,
      };
    }
    return {
      success: true,
      message: response.message || "Role deleted successfully",
      data: response.data || response,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "An unexpected error occurred",
      data: null,
    };
  }
};
