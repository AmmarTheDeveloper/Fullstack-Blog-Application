import { resetPasswordEmailTemplate } from "./mailTemplates";
import { sender, transporter } from "./nodemailer.config";

interface Props {
  resetPasswordToken: string;
  receiverEmail: string;
  fullname: string;
}
export const sendResetPasswordEmail = async ({
  resetPasswordToken,
  receiverEmail,
  fullname,
}: Props) => {
  try {
    await transporter.sendMail({
      from: sender,
      to: receiverEmail,
      subject: "Reset Password",
      html: resetPasswordEmailTemplate(
        fullname,
        process.env.BASE_URL + "/reset-password/" + resetPasswordToken
      ),
    });
  } catch (error: any) {
    console.log(
      "Error : Error occured while sending reset password email ",
      error
    );
    throw new Error("Error occured while sending reset password email");
  }
};
