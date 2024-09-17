import { loggedInUserHandler } from "@/app/api/handler";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import Comment from "@/models/Comment";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

async function RemoveLike(request: NextRequest, context: any) {
  await dbConnect();
  try {
    const { commentId } = await request.json();

    if (!commentId || !mongoose.Types.ObjectId.isValid(commentId)) {
      return NextResponse.json({
        success: false,
        message: "Invalid comment ID",
      });
    }

    const userId = context.user._id;

    const updatedComment = await Comment.findOneAndUpdate(
      { _id: commentId },
      { $pull: { likes: userId } },
      { new: true }
    );

    if (!updatedComment) {
      return NextResponse.json(
        { success: false, message: "Comment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Like removed successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}

export const POST = loggedInUserHandler(RemoveLike);
