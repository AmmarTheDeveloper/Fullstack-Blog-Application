import { comparePass } from "@/helper/encryptionDecription/encryptPassword";
import { generateToken } from "@/helper/token/token";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { loginAndRegisterHandler } from "../../handler";

async function Login(request: NextRequest) {
  await dbConnect();
  let { email, password } = await request.json();
  if (!email || !password)
    return NextResponse.json(
      {
        success: false,
        message: "Email or password missing.",
      },
      { status: 404 }
    );
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    let isPasswordMatched = await comparePass(password, user?.password);

    if (isPasswordMatched) {
      if (!user.isVerified) {
        return NextResponse.json(
          {
            success: false,
            message: "Verify your email",
          },
          { status: 400 }
        );
      }
      let { password, ...payload } = user._doc;
      //holding the password in password variable and other things are stored in payload object
      let token = await generateToken(payload);
      const response = NextResponse.json(
        {
          user: {
            fullname: user.fullname,
            email: user.email,
            profileImage: user.profileImage,
          },
          success: true,
          message: "Logged in successfully",
        },
        { status: 200 }
      );

      response.cookies.set("token", token, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
      });

      user.lastLogin = new Date();
      await user.save();

      return response;
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Enter valid email or password.",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}

export const POST = loginAndRegisterHandler(Login);
