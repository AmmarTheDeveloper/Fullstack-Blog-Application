import { generateToken } from "@/helper/token/token";
import User from "@/models/User";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { loggedInUserHandler } from "../handler";

async function updateUser(request: NextRequest, context: any) {
  try {
    const { profileImage, fullname } = await request.json();

    let userExist = await User.findOne({ _id: context.user._id });

    if (!userExist) {
      return NextResponse.json(
        {
          success: false,
          message: "User doesn't exist",
        },
        { status: 400 }
      );
    }

    if (profileImage) {
      const mimeType = profileImage.split(";")[0].split(":")[1];
      if (
        ![
          "image/jpg",
          "image/jpeg",
          "image/webp",
          "image/png",
          "image/gif",
          "image/jfif",
        ].includes(mimeType)
      ) {
        return NextResponse.json(
          { success: false, message: "Only image files are allowed." },
          { status: 400 }
        );
      }

      try {
        const filename = userExist.profileImage;
        const base64 = profileImage.split(",")[1];
        const buffer = Buffer.from(base64, "base64");

        const imageSizeInBytes = buffer.byteLength;
        const imageSizeInMB = imageSizeInBytes / (1024 * 1024);

        if (imageSizeInMB > 1) {
          return NextResponse.json(
            { success: false, message: "Image size should be less than 1MB." },
            { status: 400 }
          );
        }

        await writeFile("./public" + filename, buffer);
      } catch (error: any) {
        console.log(error);
        return NextResponse.json(
          { success: false, message: "Failed to update profile image." },
          { status: 500 }
        );
      }
    }

    if (userExist.fullname != fullname) {
      if (!fullname) {
        return NextResponse.json(
          {
            success: false,
            message: "Fullname is required",
          },
          { status: 400 }
        );
      }

      await User.updateOne(
        { _id: context.user._id },
        { $set: { fullname } },
        { new: true }
      );
    }

    let user = await User.findOne({ _id: context.user._id }).lean();

    const { password, ...payload } = user!.toObject();
    console.log(password, payload);

    let token = await generateToken(payload);

    const response = NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
        user: {
          fullname: user?.fullname,
          email: user?.email,
          profileImage: user?.profileImage,
        },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
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

export const PUT = loggedInUserHandler(updateUser);
