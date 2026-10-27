"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "./toast";

const redirectToast = {
  "login-required": {
    type: "warning",
    title: "Login Required",
    description: "Please sign in to access that page.",
  },

  "session-expired": {
    type: "warning",
    title: "Session Expired",
    description: "Your session has expired. Please sign in again.",
  },

  "unauthorized-admin": {
    type: "error",
    title: "Access Denied",
    description: "This page can only be accessed by administrators.",
  },

  "unauthorized-host": {
    type: "error",
    title: "Access Denied",
    description: "This page can only be accessed by vendors.",
  },

  "unauthorized-user": {
    type: "error",
    title: "Access Denied",
    description: "This page can only be accessed by users.",
  },
} as const;

type RedirectErrorKey = keyof typeof redirectToast;

export default function RedirectToast() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const lastProcessedError = useRef<string | null>(null);

  useEffect(() => {
    const error = searchParams.get("error");

    if (!error || !(error in redirectToast)) {
      lastProcessedError.current = null;
      return;
    }

    if (lastProcessedError.current === error) return;

    lastProcessedError.current = error;

    const data = redirectToast[error as RedirectErrorKey];

    // Trigger the matching variant toast
    if (data.type === "warning") {
      toast.warning(data.title, data.description);
    } else if (data.type === "error") {
      toast.error(data.title, data.description);
    }

    // Clean up the query parameter
    const params = new URLSearchParams(searchParams.toString());
    params.delete("error");

    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    router.replace(newUrl, { scroll: false });
  }, [pathname, router, searchParams]);

  return null;
}
