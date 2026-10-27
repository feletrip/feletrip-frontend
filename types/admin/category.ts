// @/types/admin/category.ts

import z from "zod";
import { ApiResponse } from "./dashboard";

export interface CategoryItem {
    id: string;
    name: string;
    slug: string;
    icon: string | null;
    backgroundImage: string | null;
    description: string;
    _count: {
        hotels: number;
    };

}

export interface CategoryResponse {
    success: boolean;
    message: string;
    data: CategoryItem[] | null;
}

export const AddCategorySchema = z.object({
    name: z.string().min(2, "Name is required"),
    slug: z.string().min(2, "Slug is required"),
    description: z.string().optional(),
    icon: z.instanceof(File).optional(),
    backgroundImage: z.instanceof(File).optional(),
});

export const UpdateCategorySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    slug: z.string().min(2, "Slug must be at least 2 characters"),
    description: z.string().optional(),
    icon: z.any().optional(),
    backgroundImage: z.any().optional(),
});