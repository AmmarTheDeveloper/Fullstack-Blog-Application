import { blogCommentNotificationEmailTemplate } from "./mailTemplates";
import { sender, transporter } from "./nodemailer.config";

interface Props {
  email: string;
  fullname: string;
  commenterName: string;
  blogTitle: string;
  commentText: string;
}

export const sendBlogCommentNotificationEmail = async ({
  email,
  fullname,
  commenterName,
  commentText,
  blogTitle,
}: Props) => {
  try {
    await transporter.sendMail({
      from: sender,
      to: email,
      subject: "New Comment on Your Blog",
      html: blogCommentNotificationEmailTemplate(
        fullname,
        commenterName,
        blogTitle,
        commentText
      ),
    });
  } catch (error: any) {
    console.log(
      "Error : Error occured while sending blog comment notification email ",
      error
    );
    throw new Error(
      "Error occured while sending blog comment notification email"
    );
  }
};
