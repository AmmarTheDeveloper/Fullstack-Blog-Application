import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { loggedInUserHandler } from "../../handler";

const createBlog = async (request: NextRequest) => {
  await dbConnect();
  try {
    const data = await request.json();
    return NextResponse.json(
      { success: true, message: "Blog created successfully" },
      { status: 200 }
    );
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

export const POST = loggedInUserHandler(createBlog);
