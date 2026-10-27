"use server";
import serverFetch from "@/lib/serverFetch";

interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

export const Addrole = async (data: {
  name: string;
  description: string;
  panel: string;
  permissionIds: string[];
}): Promise<ApiResponse> => {
  try {
    const response: any = await serverFetch.post(`/role/admin/create`, data);
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

export const getAllroles = async (): Promise<ApiResponse> => {
  try {
    const response: any = await serverFetch.get(`/role/admin/get-all`);
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

export const getsinglepermission = async (
  id: string,
): Promise<ApiResponse> => {
  try {
    const response: any = await serverFetch.get(
      `/role/admin/get-role-permissions/${id}`,
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

export const getAllpermissions = async (): Promise<ApiResponse> => {
  try {
    const response: any = await serverFetch.get(`/permissions/admin/get-all`);
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

export const UpdateRole = async (data: {
  id: string;
  name: string;
  description: string;
  panel: string;
  permissionIds: string[];
}): Promise<ApiResponse> => {
  try {
    const response: any = await serverFetch.patch(
      `/role/admin/update/${data.id}`,
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

export const DeleteRole = async (id: string): Promise<ApiResponse> => {
  try {
    const response: any = await serverFetch.delete(`/role/admin/delete/${id}`);
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
