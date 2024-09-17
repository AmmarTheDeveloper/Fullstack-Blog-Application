import { loggedInUserHandler } from "@/app/api/handler";
import { sendBlogCommentReplyNotificationEmail } from "@/helper/nodemailer/commentReplyNotificationEmail";
import dbConnect from "@/lib/dbConnect";
import Comment from "@/models/Comment";
import { UserType } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

async function ReplyComment(request: NextRequest, context: any) {
  await dbConnect();
  try {
    const { commentId, reply, blogTitle } = await request.json();

    if (!commentId || !mongoose.Types.ObjectId.isValid(commentId)) {
      return NextResponse.json({
        success: false,
        message: "Invalid comment ID",
      });
    }

    if (!reply || reply.trim() === "") {
      return NextResponse.json({
        success: false,
        message: "Comment reply cannot be empty",
      });
    }

    const userId = context.user._id;
    const date = new Date();

    const newReply = await Comment.create({
      userId,
      date,
      comment: reply,
      blogId: null,
      likes: [],
      replies: [],
    });

    const updatedComment = await Comment.findOneAndUpdate(
      { _id: commentId },
      { $push: { replies: newReply._id } },
      { new: true }
    ).populate("userId");

    const commentOwner = updatedComment?.userId as UserType;

    if (commentOwner && commentOwner.email) {
      await sendBlogCommentReplyNotificationEmail({
        email: commentOwner.email,
        originalCommenterName: commentOwner.fullname,
        originalCommentText: updatedComment?.comment!,
        blogTitle,
        replyingUserName: context.user.fullname,
        replyText: reply,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Comment reply added successfully",
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

export const PUT = loggedInUserHandler(ReplyComment);
