"use server"

import serverFetch from "@/lib/serverFetch";
import { IBlogs } from "@/types/blog";

export const getBlogs = async (): Promise<IBlogs[]> => {
    try {
        const result = await serverFetch.get<{ data: { data: IBlogs[] } }>("/blogs");
        return result.data.data ?? [];
    } catch (error) {
        console.error("Failed to fetch blogs:", error);
        return [];
    }
};


export const getBlogBySlug = async (id: string): Promise<IBlogs | null> => {
    try {
        const result = await serverFetch.get<{ data: IBlogs } >(`/blogs/${encodeURIComponent(id)}`);
        return result.data ?? null;
    } catch (error) {
        console.error("Failed to fetch blog:", error);
        return null;
    }
};