import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "./user/verifyUser/route";

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
