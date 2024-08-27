import { sendResetPasswordEmail } from "@/helper/nodemailer/sendResetPasswordEmail";
import { resetPasswordToken } from "@/utils/resetPasswordToken";
import { NextRequest, NextResponse } from "next/server";
import { loginAndRegisterHandler } from "../../handler";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

const forgotPassword = async (request: NextRequest) => {
  await dbConnect();
  const { email } = await request.json();
  try {
    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Enter valid email" },
        { status: 400 }
      );
    }

    const RESET_PASSWORD_TOKEN = resetPasswordToken();
    user.resetPasswordToken = RESET_PASSWORD_TOKEN;
    user.resetPasswordExpiry = Date.now() + 300 * 60 * 1000; //5 min

    await user.save();

    await sendResetPasswordEmail({
      fullname: user.fullname,
      resetPasswordToken: user.resetPasswordToken,
      receiverEmail: user.email,
    });

    return NextResponse.json(
      { success: true, message: "Reset password link sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
};

export const POST = loginAndRegisterHandler(forgotPassword);
