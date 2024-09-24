import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { encrypt } from "@/helper/encryptionDecription/encryptPassword";
import { loginAndRegisterHandler } from "../../handler";
import { writeFile } from "fs/promises";
import { generateVerificationCode } from "@/utils/generateVerificationCode";
import { sendVerificationToken } from "@/helper/nodemailer/sendVerificationToken";
import { validatePassword } from "@/helper/authentication/validatePassword";
import { cloudinary } from "@/lib/cloudinary";

async function Register(request: NextRequest) {
  await dbConnect();

  try {
    const data = await request.json();
    const { fullname, email, profileImage, password } = data;

    // Input validation
    if (!fullname || !email || !profileImage || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

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

    const base64 = profileImage.split(",")[1];
    const buffer = Buffer.from(base64, "base64");
    const fileName = `${Date.now()}.png`;

    const imageSizeInBytes = buffer.byteLength;
    const imageSizeInMB = imageSizeInBytes / (1024 * 1024);

    if (imageSizeInMB > 1) {
      return NextResponse.json(
        { success: false, message: "Image size should be less than 1MB." },
        { status: 400 }
      );
    }

    // if user already exist then sending email already exists in response
    const isUserAlreadyRegistered = await User.findOne({ email });

    if (isUserAlreadyRegistered) {
      return NextResponse.json(
        { success: false, message: "Email already exists." },
        { status: 400 }
      );
    }

    let uploadResponse;
    try {
      // await writeFile(`./public/profileImages/${fileName}`, buffer);
      uploadResponse = await cloudinary.uploader.upload(profileImage, {
        folder: "profileImages",
      });
    } catch (fileError) {
      console.error("Error saving profile image:", fileError);
      return NextResponse.json(
        { success: false, message: "Failed to save profile image." },
        { status: 500 }
      );
    }

    const isValidPassword = validatePassword(password);

    if (!isValidPassword.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: isValidPassword.message,
        },
        { status: 400 }
      );
    }

    const hashedPassword = await encrypt(password);
    const verificationToken = generateVerificationCode();

    const savedUser = new User({
      fullname,
      email,
      password: hashedPassword,
      // profileImage: "/profileImages/" + fileName,
      profileImage: uploadResponse.secure_url,
      profileImagePublicId: uploadResponse.public_id,
      verificationToken,
      verificationTokenExpiry: Date.now() + 300 * 60 * 1000,
    });

    try {
      await sendVerificationToken({
        receiverEmail: email,
        fullname,
        verificationToken,
      });
    } catch (emailError) {
      console.error("Error sending verification token:", emailError);
      return NextResponse.json(
        { success: false, message: "Failed to send verification email." },
        { status: 500 }
      );
    }

    await savedUser.save();

    return NextResponse.json(
      { success: true, message: "User registered successfully." },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Registration error:", err);

    if (err.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Email already exists." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

export const POST = loginAndRegisterHandler(Register);
