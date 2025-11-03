import nodemailer from "nodemailer";
import { devConfig } from "../../config/dev.config";
import { MailOptions } from "nodemailer/lib/sendmail-transport";

// send mail function utlis
export const sendMail = async (mailOptions: MailOptions) => {
  // create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: devConfig.EMAIL_USER,
      pass: devConfig.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // not goot for production
    },
  });
  mailOptions.from = `social_app <${devConfig.EMAIL_USER}>`;
  // send mail
  await transporter.sendMail(mailOptions);
};
