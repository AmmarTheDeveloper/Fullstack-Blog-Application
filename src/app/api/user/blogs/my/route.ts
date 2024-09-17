import { loggedInUserHandler } from "@/app/api/handler";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { NextRequest, NextResponse } from "next/server";

const getMyBlogs = async (request: NextRequest, context: any) => {
  await dbConnect();
  try {
    const userId = context.user._id;

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "1");
    const offset = (page - 1) * limit;

    const blogs = await Blog.find({ postedBy: userId })
      .populate({ path: "postedBy", select: "-password" })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    return NextResponse.json(
      { success: true, message: "My Blogs  retrieved successfully", blogs },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(
      "Error occured while getting my blogs data from database",
      error
    );
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
};

export const GET = loggedInUserHandler(getMyBlogs);
