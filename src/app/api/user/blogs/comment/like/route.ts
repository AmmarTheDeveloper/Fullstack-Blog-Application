import { loggedInUserHandler } from "@/app/api/handler";
import { sendBlogLikedNotificationEmail } from "@/helper/nodemailer/blogLikedNotificationEmail";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import Comment from "@/models/Comment";
import User, { UserType } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

async function Like(request: NextRequest, context: any) {
  await dbConnect();
  try {
    const { commentId, blogId } = await request.json();

    if (!commentId || !mongoose.Types.ObjectId.isValid(commentId)) {
      return NextResponse.json({
        success: false,
        message: "Invalid comment ID",
      });
    }

    const existingComment = await Comment.findById(commentId);
    if (!existingComment) {
      return NextResponse.json(
        {
          success: false,
          message: "Comment not found",
        },
        { status: 404 }
      );
    }

    const userId = context.user._id;
    if (existingComment.likes.includes(userId)) {
      return NextResponse.json(
        {
          success: false,
          message: "You already liked this comment",
        },
        { status: 400 }
      );
    }

    existingComment.likes.push(userId);
    await existingComment.save();

    const blog = await Blog.findOne({ _id: blogId }).populate("postedBy");
    const commentOwner = blog?.postedBy as UserType;

    if (commentOwner && commentOwner.email) {
      await sendBlogLikedNotificationEmail({
        likerName: context.user.fullname,
        blogTitle: blog?.title!,
        email: commentOwner.email,
        fullname: commentOwner.fullname,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Liked successfully",
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

export const POST = loggedInUserHandler(Like);
