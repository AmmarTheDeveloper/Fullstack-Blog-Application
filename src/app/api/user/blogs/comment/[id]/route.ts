import { loggedInUserHandler } from "@/app/api/handler";
import dbConnect from "@/lib/dbConnect";
import Comment from "@/models/Comment";
import { isValidObjectId, ObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

async function UpdateComment(request: NextRequest, context: any) {
  await dbConnect();
  try {
    const { params } = context;
    const { id } = params;
    const { content } = await request.json();
    const userId = context.user._id;

    if (!id || !isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid comment id",
        },
        { status: 400 }
      );
    }

    if (!content || content.trim().length == 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Comment is required.",
        },
        { status: 400 }
      );
    }

    const isUpdated = await Comment.updateOne(
      { _id: id, userId: userId },
      { $set: { comment: content } }
    );

    if (isUpdated.modifiedCount == 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Comment not found or not updated",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Comment updated successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 200 }
    );
  }
}

async function deleteComment(request: NextRequest, context: any) {
  await dbConnect();
  try {
    const { params } = context;
    const { id } = params;
    const userId = context.user._id;

    if (!id || !isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid comment id",
        },
        { status: 400 }
      );
    }

    const commentToDelete = await Comment.findOne({ _id: id, userId: userId });

    if (!commentToDelete) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Comment not found or you don't have permission to delete it",
        },
        { status: 400 }
      );
    }

    const deleteReplies = async (commentId: ObjectId) => {
      const comment = await Comment.findById(commentId);
      if (comment?.replies && comment.replies.length > 0) {
        for (const replyId of comment.replies) {
          let id = replyId as ObjectId;
          await deleteReplies(id);
        }
      }
      await Comment.deleteOne({ _id: commentId });
    };

    await deleteReplies(id);

    return NextResponse.json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 200 }
    );
  }
}

export const PUT = loggedInUserHandler(UpdateComment);
export const DELETE = loggedInUserHandler(deleteComment);
