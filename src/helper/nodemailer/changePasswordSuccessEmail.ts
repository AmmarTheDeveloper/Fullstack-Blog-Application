import { changePasswordSuccessEmailTemplate } from "./mailTemplates";
import { sender, transporter } from "./nodemailer.config";

interface Props {
  email: string;
  fullname: string;
}
export const sendChangePasswordSuccessEmail = async ({
  email,
  fullname,
}: Props) => {
  try {
    await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Change Password",
      html: changePasswordSuccessEmailTemplate(fullname),
    });
  } catch (error: any) {
    console.log(
      "Error : Error occured while sending change password email ",
      error
    );
    throw new Error("Error occured while sending change password email");
  }
};
