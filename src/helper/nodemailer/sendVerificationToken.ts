import { emailVerificationTemplate } from "./mailTemplates";
import { sender, transporter } from "./nodemailer.config";

interface Props {
  receiverEmail: string;
  fullname: string;
  verificationToken: string;
}
export const sendVerificationToken = async ({
  receiverEmail,
  fullname,
  verificationToken,
}: Props) => {
  try {
    await transporter.sendMail({
      from: sender, // sender address
      to: receiverEmail, // list of receivers
      subject: "Verify your email", // Subject line
      html: emailVerificationTemplate(fullname, verificationToken), // html body
    });
  } catch (error: any) {
    console.log("Error sending verification email : ", error);
    throw new Error(`Error sending verification email : ${error}`);
  }
};
