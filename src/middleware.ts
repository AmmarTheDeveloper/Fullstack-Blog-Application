import { verifyToken } from "@/helper/token/token";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const staticPaths = [
    "/login",
    "/register",
    "/verify-email",
    "/forgot-password",
    "/reset-password",
    "/blogs",
  ];
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  const isStaticPath = staticPaths.some((staticPath) =>
    path.startsWith(staticPath)
  );

  if (token) {
    try {
      const isVerified = await verifyToken(token);

      // Redirect authenticated users from static paths to the home page
      if (isVerified && isStaticPath) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      // Allow access if verified or path is not static
      return NextResponse.next();
    } catch (error) {
      // Handle verification errors and redirect to login if necessary
      if (!isStaticPath) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // Allow access to static paths even if verification fails
      return NextResponse.next();
    }
  } else {
    // Redirect unauthenticated users from non-static paths to the login page
    if (!isStaticPath) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Allow access to static paths if no token
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/verify-email",
    "/forgot-password",
    "/reset-password/:path*",
    "/blogs",
    "/blogs/:path*",
  ],
};
