import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

const protectedRoutes = ["/books"];
const publicRoutes = ["/", "/login", "/signup"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const token = (await cookies()).get("token")?.value as string;
  if (!token) {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
  const { payload, protectedHeader } = await jose.jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );
  console.log(payload, protectedHeader);

  // If not authenticated and trying to access a protected route, redirect to login
  if (!payload && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // If authenticated and trying to access a public route, redirect to home
  if (
    isPublicRoute &&
    payload &&
    !request.nextUrl.pathname.startsWith("/books")
  ) {
    return NextResponse.redirect(new URL("/books", request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("authorization", `Bearer ${token}`);
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/books", "/books/:path*"],
};
