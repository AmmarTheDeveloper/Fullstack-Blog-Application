import { commentReplyNotificationEmailTemplate } from "./mailTemplates";
import { sender, transporter } from "./nodemailer.config";

interface Props {
  email: string;
  originalCommenterName: string;
  blogTitle: string;
  originalCommentText: string;
  replyingUserName: string;
  replyText: string;
}

export const sendBlogCommentReplyNotificationEmail = async ({
  email,
  originalCommenterName,
  blogTitle,
  originalCommentText,
  replyingUserName,
  replyText,
}: Props) => {
  try {
    await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Comment Reply",
      html: commentReplyNotificationEmailTemplate(
        originalCommenterName,
        blogTitle,
        originalCommentText,
        replyingUserName,
        replyText
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
