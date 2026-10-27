"use server"
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type FetchOptions = Omit<RequestInit, "body"> & {
    body?: unknown;
};

async function clientFetch<T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> {
    const { body, headers, ...rest } = options;
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    try {
        const res = await fetch(`${API_URL}${endpoint}`, {
            ...rest,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
                ...(headers || {}),
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: data?.message || "Something went wrong",
            } as T;
        }

        return data;
    } catch (err) {
        console.error("Fetch failed:", err);
        throw err;
    }
}

export default clientFetch;