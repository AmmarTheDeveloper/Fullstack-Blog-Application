import { welcomeEmailTemplate } from "./mailTemplates";
import { sender, transporter } from "./nodemailer.config";

interface Props {
  fullname: string;
  receiverEmail: string;
}
export const sendWelcomeEmail = async ({ fullname, receiverEmail }: Props) => {
  try {
    await transporter.sendMail({
      from: sender, // sender address
      to: receiverEmail, // list of receivers
      subject: "Welcome to ByteBlog", // Subject line
      html: welcomeEmailTemplate(fullname), // html body
    });
  } catch (error: any) {
    console.log("Error : Error occured while sending welcome email ", error);
    throw new Error("Error occured while sending welcome email");
  }
};
