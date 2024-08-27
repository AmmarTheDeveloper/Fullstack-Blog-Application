import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { encrypt } from "@/helper/encryptionDecription/encryptPassword";
import { loginAndRegisterHandler } from "../../handler";
import { writeFile } from "fs/promises";
import { generateVerificationCode } from "@/utils/generateVerificationCode";
import { sendVerificationToken } from "@/helper/nodemailer/sendVerificationToken";

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

    // Process profile image
    const base64 = profileImage.split(",")[1];
    const buffer = Buffer.from(base64, "base64");
    const fileName = `${Date.now()}.png`;

    try {
      await writeFile(`./public/profileImages/${fileName}`, buffer);
    } catch (fileError) {
      console.error("Error saving profile image:", fileError);
      return NextResponse.json(
        { success: false, message: "Failed to save profile image." },
        { status: 500 }
      );
    }

    // Check if user already exists
    const isUserAlreadyRegistered = await User.findOne({ email });

    if (isUserAlreadyRegistered) {
      return NextResponse.json(
        { success: false, message: "Email already exists." },
        { status: 400 }
      );
    }

    // Validate password
    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password length should be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    // Create and save new user
    const hashedPassword = await encrypt(password);
    const verificationToken = generateVerificationCode();

    const savedUser = new User({
      fullname,
      email,
      password: hashedPassword,
      profileImage: fileName,
      verificationToken,
      verificationTokenExpiry: Date.now() + 300 * 60 * 1000, // 5 minutes
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
