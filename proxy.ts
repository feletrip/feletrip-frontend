import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { IUserProfile } from "@/types/user/user";

async function getProfileInProxy(
  accessToken: string,
): Promise<IUserProfile | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      console.error("NEXT_PUBLIC_API_URL is missing in env!");
      return null;
    }

    const res = await fetch(`${baseUrl}/user/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const result = await res.json();
    console.log("Proxy profile fetch result:", result);

    if (!result.success || !result.data) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Proxy profile fetch error:", error);
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (pathname.startsWith("/dashboard") && !accessToken) {
    return NextResponse.redirect(new URL("/?error=login-required", request.url));
  }

  if (pathname.startsWith("/dashboard") && accessToken) {
    const user = await getProfileInProxy(accessToken);

    if (!user) {
      return NextResponse.redirect(
        new URL("/?error=login-required", request.url),
      );
    }

    const roleName = user.role?.panel?.toLowerCase();

    if (pathname.startsWith("/dashboard/admin") && roleName !== "admin") {
      return NextResponse.redirect(
        new URL("/?error=unauthorized-admin", request.url),
      );
    }

    if (pathname.startsWith("/dashboard/host") && roleName !== "host") {
      return NextResponse.redirect(
        new URL("/?error=unauthorized-host", request.url),
      );
    }

    if (pathname.startsWith("/dashboard/user") && roleName !== "user") {
      return NextResponse.redirect(
        new URL("/?error=unauthorized-user", request.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
