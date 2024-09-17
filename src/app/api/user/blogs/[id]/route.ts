import { loggedInUserHandler } from "@/app/api/handler";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import Comment, { CommentType } from "@/models/Comment";
import { unlink, writeFile } from "fs/promises";
import mongoose, { ObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { comment } from "postcss";

const populateNestedReplies = async (comments: any[]) => {
  for (const comment of comments) {
    await Comment.populate(comment, {
      path: "userId",
      select: "-password",
    });

    if (comment.replies && comment.replies.length > 0) {
      comment.replies.sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      await Comment.populate(comment, {
        path: "replies",
        populate: {
          path: "userId",
        },
      });

      await populateNestedReplies(comment.replies);
    }
  }
};

const getSpecificBlog = async (request: NextRequest, context: any) => {
  await dbConnect();

  try {
    const { params } = context;
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid blog ID" },
        { status: 400 }
      );
    }

    let blog = await Blog.findOne({ _id: id })
      .populate({
        path: "postedBy",
        select: "-password",
      })
      .lean();

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "No blog found" },
        { status: 404 }
      );
    }

    const comments = await Comment.find({ blogId: id })
      .sort({ date: -1 })
      .lean()
      .exec();

    await populateNestedReplies(comments);

    blog = { ...blog, comments };

    return NextResponse.json(
      {
        success: true,
        message: "Specific blog retrieved successfully",
        blog,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
};

async function deleteReply(commentId: ObjectId) {
  try {
    const comment = await Comment.findOne({ _id: commentId });

    if (comment?.replies?.length) {
      for (const replyId of comment?.replies) {
        await deleteReply(replyId as ObjectId);
      }
    }

    await Comment.deleteOne({ _id: comment });
  } catch (error: any) {
    console.error("Error deleting reply:", error);
    throw new Error("Error deleting replies");
  }
}

const deleteBlog = async (request: NextRequest, context: any) => {
  await dbConnect();
  try {
    const { params } = context;
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid blog ID" },
        { status: 400 }
      );
    }

    const userId = context.user._id;

    const deleted = await Blog.deleteOne({ _id: id, postedBy: userId });

    if (deleted.deletedCount == 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid blogId  or unauthorized access",
        },
        { status: 401 }
      );
    }

    const comments = await Comment.find({ blogId: id });

    for (const comment of comments) {
      await deleteReply(comment?._id);
    }

    return NextResponse.json(
      { success: true, message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error occured while getting deleting blog", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
};

async function updateBlog(request: NextRequest, context: any) {
  try {
    const { params } = context;
    const { id } = params;
    const data = await request.formData();
    const title = data.get("title");
    const description = data.get("description");
    const content = data.get("content");
    const category = data.get("category");
    const thumbnail = data.get("thumbnail") as File;
    const postedBy = context.user._id;
    const isBlogAvailable = await Blog.findOne({ _id: id, postedBy: postedBy });

    if (!title || !content || !category || !description) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 404 }
      );
    }

    if (!isBlogAvailable) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog is not available or unauthorized access.",
        },
        { status: 401 }
      );
    }

    let filename = isBlogAvailable.thumbnail;

    if (thumbnail) {
      try {
        await unlink("./public" + isBlogAvailable.thumbnail);
      } catch (error) {}
      const Tempfilename = await saveThumbnail(thumbnail);
      filename = "/blogThumbnails/" + Tempfilename;
    }

    await Blog.updateOne(
      { _id: id },
      { title, description, content, category, thumbnail: filename }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Blog updated successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

async function saveThumbnail(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const imageSizeInBytes = buffer.byteLength;
  const imageSizeInMB = imageSizeInBytes / (1024 * 1024);

  if (imageSizeInMB > 1) {
    throw new Error("Image size should be less than 1MB");
  }

  const filename = Date.now() + file.name;
  try {
    await writeFile(`./public/blogThumbnails/${filename}`, buffer);
    return filename;
  } catch (error: any) {
    throw new Error(error);
  }
}

export const DELETE = loggedInUserHandler(deleteBlog);
export const PUT = loggedInUserHandler(updateBlog);
export const GET = getSpecificBlog;
