export const emailVerificationTemplate = (
  fullname: String,
  otp: String
): string => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification OTP</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 90%;
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin-top: 20px;
        }
        .header {
            background-color: #00466a;
            color: #ffffff;
            padding: 10px 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            padding: 20px;
        }
        .content h1 {
            color: #333;
        }
        .content p {
            line-height: 1.6;
        }
        .otp-code {
            font-size: 24px;
            font-weight: bold;
            color: #00466a;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 10px 20px;
            background-color: #f4f4f4;
            border-radius: 0 0 5px 5px;
        }
        .footer p {
            margin: 0;
            font-size: 14px;
            color: #666;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Email Verification</h1>
        </div>
        <div class="content">
            <h1>Hello ${fullname},</h1>
            <p>Thank you for registering with ByteBlog. To complete your registration, please verify your email address by entering the OTP below:</p>
            <div class="otp-code">
                ${otp}
            </div>
            <p>The OTP is valid for 5 minutes. If you did not request this verification, please ignore this email.</p>
            <p>Thank you for using ByteBlog. If you have any questions, feel free to contact our support team.</p>
            <p>Best regards,<br>The ByteBlog Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 ByteaBlog. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`;
  return html;
};

export const welcomeEmailTemplate = (fullname: String): string => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Service!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: auto;
            overflow: hidden;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin-top: 20px;
        }
        .header {
            background-color: #00466a;
            color: #ffffff;
            padding: 10px 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            padding: 20px;
        }
        .content h1 {
            color: #333;
        }
        .content p {
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            padding: 10px 20px;
            background-color: #f4f4f4;
            border-radius: 0 0 5px 5px;
        }
        .footer p {
            margin: 0;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to ByteBlog!</h1>
        </div>
        <div class="content">
            <h1>Hello ${fullname},</h1>
            <p>Thank you for signing up with ByteBlog! We're thrilled to have you on board.</p>
            <p>Your account has been created successfully, and you can now start exploring our features and services.</p>
            <p>If you have any questions or need assistance, feel free to reach out to our support team at ammarthedeveloper@gmail.com.</p>
            <p>Best regards,<br>The ByteBlog Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 ByteBlog. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
  return html;
};

export const resetPasswordEmailTemplate = (
  fullname: String,
  resetPasswordLink: String
): string => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 90%;
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin-top: 20px;
        }
        .header {
            background-color: #00466a;
            color: #ffffff;
            padding: 10px 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            padding: 20px;
        }
        .content h1 {
            color: #333;
        }
        .content p {
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            background-color: #00466a;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
            text-align: center;
        }
        .footer {
            text-align: center;
            padding: 10px 20px;
            background-color: #f4f4f4;
            border-radius: 0 0 5px 5px;
        }
        .footer p {
            margin: 0;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset Request</h1>
        </div>
        <div class="content">
            <h1>Hello ${fullname},</h1>
            <p>We received a request to reset your password for your account at ByteBlog.</p>
            <p>If you requested this password reset, click the button below to reset your password:</p>
            <a href="${resetPasswordLink}" class="button" style="color:white">Reset Password</a>
            <p>If you did not request this password reset, please ignore this email. Your password will remain unchanged.</p>
            <p>Best regards,<br>The ByteBlog Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 ByteBlog. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
  return html;
};

export const resetPasswordSuccessEmailTemplate = (fullname: String) => {
  const html = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 90%;
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin-top: 20px;
        }
        .header {
            background-color: #00466a;
            color: #ffffff;
            padding: 10px 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            padding: 20px;
        }
        .content h1 {
            color: #333;
        }
        .content p {
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            padding: 10px 20px;
            background-color: #f4f4f4;
            border-radius: 0 0 5px 5px;
        }
        .footer p {
            margin: 0;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset Successful</h1>
        </div>
        <div class="content">
            <h1>Hello ${fullname},</h1>
            <p>Your password has been successfully reset. You can now log in to your account using your new password.</p>
            <p>If you did not request this change, please contact our support team immediately. For security reasons, if you believe your account may have been compromised, we recommend changing your password again and reviewing your account activity.</p>
            <p>Thank you for using ByteBlog. If you have any questions or need further assistance, feel free to reach out to us.</p>
            <p>Best regards,<br>The ByteBlog Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 ByteBlog. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;

  return html;
};

export const changePasswordSuccessEmailTemplate = (fullname: String) => {
  const html = `
          <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Changed Successful</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              color: #333;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              width: 90%;
              max-width: 600px;
              margin: auto;
              background-color: #ffffff;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              padding: 20px;
              margin-top: 20px;
          }
          .header {
              background-color: #00466a;
              color: #ffffff;
              padding: 10px 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
          }
          .content {
              padding: 20px;
          }
          .content h1 {
              color: #333;
          }
          .content p {
              line-height: 1.6;
          }
          .footer {
              text-align: center;
              padding: 10px 20px;
              background-color: #f4f4f4;
              border-radius: 0 0 5px 5px;
          }
          .footer p {
              margin: 0;
              font-size: 14px;
              color: #666;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Password Changed Successful</h1>
          </div>
          <div class="content">
              <h1>Hello ${fullname},</h1>
              <p>Your password has been successfully changed. You can now log in to your account using your new password.</p>
              <p>If you did not request this change, please contact our support team immediately. For security reasons, if you believe your account may have been compromised, we recommend changing your password again and reviewing your account activity.</p>
              <p>Thank you for using ByteBlog. If you have any questions or need further assistance, feel free to reach out to us.</p>
              <p>Best regards,<br>The ByteBlog Team</p>
          </div>
          <div class="footer">
              <p>&copy; 2024 ByteBlog. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
      `;

  return html;
};

export const blogLikedNotificationEmailTemplate = (
  ownerName: string,
  likerName: string,
  blogTitle: string
) => {
  const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Blog Liked Notification</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  color: #333;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  width: 90%;
                  max-width: 600px;
                  margin: auto;
                  background-color: #ffffff;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  padding: 20px;
                  margin-top: 20px;
              }
              .header {
                  background-color: #00466a;
                  color: #ffffff;
                  padding: 10px 20px;
                  text-align: center;
                  border-radius: 5px 5px 0 0;
              }
              .content {
                  padding: 20px;
              }
              .content h1 {
                  color: #333;
              }
              .content p {
                  line-height: 1.6;
              }
              .footer {
                  text-align: center;
                  padding: 10px 20px;
                  background-color: #f4f4f4;
                  border-radius: 0 0 5px 5px;
              }
              .footer p {
                  margin: 0;
                  font-size: 14px;
                  color: #666;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Blog Liked Notification</h1>
              </div>
              <div class="content">
                  <h1>Hello ${ownerName},</h1>
                  <p>Good news! Your blog titled "<strong>${blogTitle}</strong>" has just been liked by ${likerName}.</p>
                  <p>Thank you for creating great content on ByteBlog. Keep up the amazing work!</p>
                  <p>If you have any questions or need further assistance, feel free to reach out to us.</p>
                  <p>Best regards,<br>The ByteBlog Team</p>
              </div>
              <div class="footer">
                  <p>&copy; 2024 ByteBlog. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `;

  return html;
};

export const blogCommentNotificationEmailTemplate = (
  ownerName: string,
  commenterName: string,
  blogTitle: string,
  commentText: string
) => {
  const html = `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Comment on Your Blog</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 90%;
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            padding: 20px;
            margin-top: 40px;
        }
        .header {
            background-color: #00466a;
            color: #ffffff;
            padding: 15px;
            text-align: center;
            border-radius: 10px 10px 0 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            color: #555;
        }
        .content h1 {
            font-size: 20px;
            color: #333;
        }
        .blog-title {
            background-color: #e3f2fd;
            padding: 10px;
            font-size: 18px;
            border-radius: 5px;
            color: #00466a;
            text-align: center;
            font-weight: bold;
            margin: 10px 0;
        }
        .comment-info {
            padding: 10px;
            background-color: #f9f9f9;
            border-left: 5px solid #00466a;
            margin: 20px 0;
            border-radius: 5px;
        }
        .commenter-name {
            font-weight: bold;
            color: #00466a;
            font-size: 16px;
        }
        .comment-text {
            font-style: italic;
            color: #333;
            margin-top: 10px;
            padding-left: 10px;
            border-left: 2px solid #00466a;
        }
        .footer {
            text-align: center;
            padding: 15px;
            background-color: #f4f4f4;
            border-radius: 0 0 10px 10px;
            margin-top: 30px;
        }
        .footer p {
            margin: 0;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            New Comment on Your Blog
        </div>
        <div class="content">
            <h1>Hello ${ownerName},</h1>
            <p>There is a new comment on your blog titled:</p>
            <div class="blog-title">${blogTitle}</div>
            <div class="comment-info">
                <span class="commenter-name">${commenterName}</span> commented:
                <div class="comment-text">
                    "${commentText}"
                </div>
            </div>
            <p>You can view and respond to the comment on your blog page.</p>
            <p>If you have any questions or need further assistance, feel free to reach out to us.</p>
            <p>Best regards,<br>The ByteBlog Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 ByteBlog. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;

  return html;
};

export const commentReplyNotificationEmailTemplate = (
  originalCommenterName: string,
  replyingUserName: string,
  blogTitle: string,
  originalCommentText: string,
  replyText: string
) => {
  const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reply to Your Comment</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 90%;
                    max-width: 600px;
                    margin: auto;
                    background-color: #ffffff;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    margin-top: 20px;
                }
                .header {
                    background-color: #00466a;
                    color: #ffffff;
                    padding: 10px 20px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    padding: 20px;
                }
                .content h1 {
                    color: #333;
                }
                .content p {
                    line-height: 1.6;
                }
                .blog-title {
                    font-weight: bold;
                    color: #00466a;
                }
                .original-comment, .reply {
                    border-left: 4px solid #00466a;
                    padding-left: 15px;
                    margin-bottom: 10px;
                    background-color: #f9f9f9;
                }
                .footer {
                    text-align: center;
                    padding: 10px 20px;
                    background-color: #f4f4f4;
                    border-radius: 0 0 5px 5px;
                }
                .footer p {
                    margin: 0;
                    font-size: 14px;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Reply to Your Comment</h1>
                </div>
                <div class="content">
                    <h1>Hello ${originalCommenterName},</h1>
                    <p>Someone has replied to your comment on the blog titled "<span class="blog-title">${blogTitle}</span>".</p>
                    <p><strong>Your original comment:</strong></p>
                    <div class="original-comment">
                        <p>${originalCommentText}</p>
                    </div>
                    <p><strong>${replyingUserName}</strong> replied:</p>
                    <div class="reply">
                        <p>${replyText}</p>
                    </div>
                    <p>You can view and respond to the reply on your comment page.</p>
                    <p>If you have any questions or need further assistance, feel free to reach out to us.</p>
                    <p>Best regards,<br>The ByteBlog Team</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 ByteBlog. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
      `;

  return html;
};
