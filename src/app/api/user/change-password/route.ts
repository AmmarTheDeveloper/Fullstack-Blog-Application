import { loggedInUserHandler } from "@/app/api/handler";
import { validatePassword } from "@/helper/authentication/validatePassword";
import {
  comparePass,
  encrypt,
} from "@/helper/encryptionDecription/encryptPassword";
import { sendChangePasswordSuccessEmail } from "@/helper/nodemailer/changePasswordSuccessEmail";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

const changePassword = async (request: NextRequest, context: any) => {
  await dbConnect();
  const { currentPassword, newPassword } = await request.json();
  try {
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Current password and Confirm password is required",
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({ _id: context.user._id });

    const isMatched = await comparePass(currentPassword, user?.password!);

    if (!isMatched) {
      return NextResponse.json(
        {
          success: false,
          message: "Enter valid current password",
        },
        { status: 400 }
      );
    }

    const isValidPassword = validatePassword(newPassword);

    if (!isValidPassword.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: isValidPassword.message,
        },
        { status: 400 }
      );
    }

    const newHashedPassword = await encrypt(newPassword);

    await User.updateOne(
      { _id: context.user._id },
      { $set: { password: newHashedPassword } }
    );

    await sendChangePasswordSuccessEmail({
      fullname: user?.fullname!,
      email: user?.email!,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Password Changed Successfully",
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

export const PUT = loggedInUserHandler(changePassword);
