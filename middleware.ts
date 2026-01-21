import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "anchor_session";

const getSecret = () => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
};

const verify = async (token: string) => {
  const secret = getSecret();
  if (!secret) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { role?: string; creatorCode?: string };
  } catch {
    return null;
  }
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verify(token) : null;

  if (path.startsWith("/admin") && path !== "/admin/login") {
    if (!session || session.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (path.startsWith("/creator") && path !== "/creator/login") {
    if (!session || session.role !== "creator") {
      return NextResponse.redirect(new URL("/creator/login", request.url));
    }
    if (path.startsWith("/creator/") && session.creatorCode) {
      const code = path.split("/")[2];
      if (code && code.toUpperCase() !== session.creatorCode) {
        return NextResponse.redirect(
          new URL(`/creator/${session.creatorCode}`, request.url)
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/creator/:path*"]
};
