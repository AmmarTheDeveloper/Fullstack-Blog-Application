import { verifyToken } from "@/helper/token/token";
import { NextRequest, NextResponse } from "next/server";

export function loginAndRegisterHandler(
  cb: (request: NextRequest, context: any) => Promise<NextResponse>
) {
  return async (request: NextRequest, context: any) => {
    const user = await isLoggedIn(request);
    if (user) {
      return NextResponse.json(
        { success: false, message: "Already logged in." },
        { status: 401 }
      );
    }
    try {
      return await cb(request, context);
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || "Internal server error.",
        },
        { status: 500 }
      );
    }
  };
}

export function loggedInUserHandler(
  cb: (request: NextRequest, context: any) => Promise<NextResponse>
) {
  return async (request: NextRequest, context: any) => {
    const user = await isLoggedIn(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access." },
        { status: 401 }
      );
    }
    context.user = user;
    try {
      return await cb(request, context);
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || "Internal server error.",
        },
        { status: 500 }
      );
    }
  };
}

export async function verifyUser(request: NextRequest) {
  let token = request.cookies.get("token")?.value;
  if (!token) throw new Error("Token not found");
  try {
    let user = await verifyToken(token);
    return user;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Something went wrong.");
  }
}

export async function isLoggedIn(request: NextRequest) {
  let token = request.cookies.get("token")?.value;
  if (!token) return null;
  try {
    const payload = await verifyToken(token);
    return payload;
  } catch (error) {
    return null;
  }
}
