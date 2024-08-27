import { sendWelcomeEmail } from "@/helper/nodemailer/sendWelcomeEmail";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { loginAndRegisterHandler } from "../../handler";
import dbConnect from "@/lib/dbConnect";

const verifyEmail = async (request: NextRequest) => {
  await dbConnect();
  const { code } = await request.json();
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;

    await sendWelcomeEmail({
      fullname: user.fullname,
      receiverEmail: user.email,
    });
    await user.save();
    return NextResponse.json(
      { success: true, message: "Welcome email sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
};

export const POST = loginAndRegisterHandler(verifyEmail);
