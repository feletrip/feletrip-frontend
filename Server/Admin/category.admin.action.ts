"use server";
import serverFetch from "@/lib/serverFetch";
import { CategoryResponse } from "@/types/admin/category";
import { ApiResponse } from "@/types/admin/dashboard";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function getCategories(): Promise<ApiResponse<CategoryResponse> | null> {
    try {
        const data = await serverFetch.get("/hotel-categories", {
            cache: "no-store",
        });
        return data as ApiResponse<CategoryResponse>;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return null;
    }
}

export async function addCategory(
    formData: FormData
): Promise<ApiResponse<CategoryResponse>> {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                message: "Unauthorized user",
                success: false,
                data: null as unknown as CategoryResponse,
            };
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/hotel-categories`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            }
        );

        const result = await response.json();

        if (!response.ok) {
            return {
                message: result.message,
                success: false,
                data: null as unknown as CategoryResponse,
            };
        }

        revalidatePath("/dashboard/admin/categories");
        return result;
    } catch (error) {
        console.error("Error adding category:", error);

        return {
            message: "Something went wrong",
            success: false,
            data: null as unknown as CategoryResponse,
        };
    }
}

export async function updateCategory(
    id: string,
    formData: FormData
): Promise<ApiResponse<CategoryResponse>> {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        if (!accessToken) {
            return {
                message: "Unauthorized user",
                success: false,
                data: null as unknown as CategoryResponse,
            };
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/hotel-categories/${id}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            }
        );

        const result = await response.json();

        if (!response.ok) {
            return {
                message: result.message || "Failed to update category",
                success: false,
                data: null as unknown as CategoryResponse,
            };
        }

        revalidatePath("/dashboard/admin/categories");
        return result;
    } catch (error) {
        console.error("Error updating category:", error);

        return {
            message: "Something went wrong",
            success: false,
            data: null as unknown as CategoryResponse,
        };
    }
}

export const deleteCategory = async (id: string): Promise<any> => {
    try {
        const response = await serverFetch.delete(
            `/hotel-categories/${id}`
        );
        revalidatePath("/dashboard/admin/categories");
        return {
            success: true,
            data: response,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};
