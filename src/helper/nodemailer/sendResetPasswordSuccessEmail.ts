import { resetPasswordSuccessEmailTemplate } from "./mailTemplates";
import { sender, transporter } from "./nodemailer.config";

interface Props {
  receiverEmail: string;
  fullname: string;
}
export const sendResetPasswordSuccessEmail = async ({
  receiverEmail,
  fullname,
}: Props) => {
  try {
    await transporter.sendMail({
      from: sender, // sender address
      to: receiverEmail, // list of receivers
      subject: "Password Reset Successful", // Subject line
      html: resetPasswordSuccessEmailTemplate(fullname), // html body
    });
  } catch (error: any) {
    console.log(
      "Error : Error occured while sending reset password success email ",
      error
    );
    throw new Error("Error occured while sending reset password success email");
  }
};
