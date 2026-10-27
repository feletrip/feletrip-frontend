import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type FetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  pagination?: IPagination;
}

const serverFetchHelper = async <T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> => {
  const { headers, body, ...restOptions } = options;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const isFormData = body instanceof FormData;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...restOptions,
    headers: {
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
      ...headers,
    },
    body: isFormData
      ? (body as FormData)
      : body
        ? JSON.stringify(body)
        : undefined,
  });

  let result: any = null;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      result = await response.json();
    } catch {
      result = null;
    }
  } else {
    try {
      const text = await response.text();
      result = { message: text || response.statusText };
    } catch {
      result = { message: response.statusText };
    }
  }

  if (!response.ok) {
    return {
      success: false,
      message: result?.message || `Server responded with status ${response.status}`,
      data: null,
    } as T;
  }

  return result;
};

const serverFetch = {
  get: <T>(endpoint: string, options?: FetchOptions) =>
    serverFetchHelper<T>(endpoint, {
      ...options,
      method: "GET",
    }),

  post: <T>(endpoint: string, body?: unknown, options?: FetchOptions) =>
    serverFetchHelper<T>(endpoint, {
      ...options,
      method: "POST",
      body,
    }),

  put: <T>(endpoint: string, body?: unknown, options?: FetchOptions) =>
    serverFetchHelper<T>(endpoint, {
      ...options,
      method: "PUT",
      body,
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: FetchOptions) =>
    serverFetchHelper<T>(endpoint, {
      ...options,
      method: "PATCH",
      body,
    }),

  delete: <T>(endpoint: string, options?: FetchOptions) =>
    serverFetchHelper<T>(endpoint, {
      ...options,
      method: "DELETE",
    }),
};

export default serverFetch;
