import { loginAndRegisterHandler } from "@/app/api/handler";
import { validatePassword } from "@/helper/authentication/validatePassword";
import { encrypt } from "@/helper/encryptionDecription/encryptPassword";
import { sendResetPasswordSuccessEmail } from "@/helper/nodemailer/sendResetPasswordSuccessEmail";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

const resetPassword = async (request: NextRequest, context: any) => {
  await dbConnect();
  const { params } = context;
  const { token } = params;
  const { password } = await request.json();
  try {
    if (!token || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Token and password is required",
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Invalid or expired reset token ",
      });
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
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save();

    await sendResetPasswordSuccessEmail({
      fullname: user.fullname,
      receiverEmail: user.email,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Password Reset Successfully",
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

export const POST = loginAndRegisterHandler(resetPassword);
