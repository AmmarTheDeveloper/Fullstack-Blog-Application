import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { loggedInUserHandler } from "../../handler";
import { writeFile } from "fs/promises";
import Blog from "@/models/Blog";
import { cloudinary } from "@/lib/cloudinary";

const createBlog = async (request: NextRequest, context: any) => {
  await dbConnect();
  try {
    const data = await request.formData();
    const title = data.get("title");
    const description = data.get("description");
    const content = data.get("content");
    const category = data.get("category");
    const thumbnail = data.get("thumbnail") as File;
    const filename = await saveThumbnail(thumbnail);
    const postedBy = context.user._id;

    if (!description || !title || !content || !category) {
      return NextResponse.json({
        success: false,
        message: "All fields are reuqired.",
      });
    }

    const blog = await Blog.create({
      title,
      description,
      content,
      category,
      // thumbnail: "/blogThumbnails/" + filename,
      thumbnail: filename.url,
      thumbnailPublicId: filename.public_id,
      date: Date.now(),
      postedBy,
    });

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

const getBlog = async (request: NextRequest) => {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "1");
    const offset = (page - 1) * limit;

    const blogs = await Blog.find()
      .populate({ path: "postedBy", select: "-password" })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    return NextResponse.json(
      { success: true, message: "Blog retrieved successfully", blogs },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error occured while getting blogs data from database", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
};

// async function saveThumbnail(file: File): Promise<string> {
async function saveThumbnail(
  file: File
): Promise<{ url: string; public_id: string }> {
  const validImageTypes = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/jfif",
  ];

  const mimeType = file.type;

  if (!validImageTypes.includes(mimeType)) {
    throw new Error("Only image files are allowed.");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");

  const imageSizeInBytes = buffer.byteLength;
  const imageSizeInMB = imageSizeInBytes / (1024 * 1024);

  if (imageSizeInMB > 1) {
    throw new Error("Image should be less than 1MB");
  }

  // const filename = Date.now() + file.name;
  try {
    // await writeFile(`./public/blogThumbnails/${filename}`, buffer);
    // return filename;
    const uploadResponse = await cloudinary.uploader.upload(
      `data:${mimeType};base64,${base64}`,
      {
        folder: "blogThumbnails",
      }
    );
    return {
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

export const POST = loggedInUserHandler(createBlog);
export const GET = getBlog;
