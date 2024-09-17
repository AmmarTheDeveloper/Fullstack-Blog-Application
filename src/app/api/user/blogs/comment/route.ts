import { loggedInUserHandler } from "@/app/api/handler";
import { sendBlogCommentNotificationEmail } from "@/helper/nodemailer/blogCommentNotificationEmail";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import Comment from "@/models/Comment";
import { UserType } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

async function PostComment(request: NextRequest, context: any) {
  await dbConnect();
  try {
    const { blogId, comment } = await request.json();

    if (!blogId || !mongoose.Types.ObjectId.isValid(blogId)) {
      return NextResponse.json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    if (!comment || comment.trim() === "") {
      return NextResponse.json({
        success: false,
        message: "Comment cannot be empty",
      });
    }

    const userId = context.user._id;
    const date = new Date();

    const blog = await Blog.findOne({ _id: blogId }).populate("postedBy");

    if (!blog) {
      return NextResponse.json({
        success: false,
        message: "Blog not found",
      });
    }

    const newComment = await Comment.create({
      blogId,
      userId,
      date,
      comment,
    });

    const ownerOfBlog = blog.postedBy as UserType;

    await sendBlogCommentNotificationEmail({
      email: ownerOfBlog.email,
      fullname: ownerOfBlog.fullname,
      blogTitle: blog.title,
      commenterName: context.user.fullname,
      commentText: comment,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Comment added successfully",
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

export const POST = loggedInUserHandler(PostComment);
