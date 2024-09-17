import { verifyToken } from "@/helper/token/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    let user = await verifyUser(request);
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
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
