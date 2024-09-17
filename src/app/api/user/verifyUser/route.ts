import { verifyToken } from "@/helper/token/token";
import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "../../handler";

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
