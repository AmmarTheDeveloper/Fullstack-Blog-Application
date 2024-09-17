import { blogLikedNotificationEmailTemplate } from "./mailTemplates";
import { sender, transporter } from "./nodemailer.config";

interface Props {
  likerName: string;
  blogTitle: string;
  email: string;
  fullname: string;
}
export const sendBlogLikedNotificationEmail = async ({
  likerName,
  blogTitle,
  email,
  fullname,
}: Props) => {
  try {
    await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Blog Liked Notification",
      html: blogLikedNotificationEmailTemplate(fullname, likerName, blogTitle),
    });
  } catch (error: any) {
    console.log("Error : Error occured while sending blog liked email ", error);
    throw new Error("Error occured while sending blog liked email");
  }
};
