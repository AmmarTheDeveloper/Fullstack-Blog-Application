import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "./user/verifyUser/route";

export function loginAndRegisterHandler(
  cb: (request: NextRequest, context: any) => Promise<NextResponse>
) {
  return async (request: NextRequest, context: any) => {
    if (await isLoggedIn(request)) {
      return NextResponse.json(
        { success: false, message: "Already loggedin." },
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
    const loggedIn = await isLoggedIn(request);
    if (!loggedIn) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access." },
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
