import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

export const sendEmail = async (origin, destination, subject, message) => {
  try {
    await transporter.sendMail({
      from: origin,
      to: destination,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <p style="font-size: 15px; line-height: 1.5;">
            ${message}
          </p>
        </div>
      `
    });

    console.log("Message sent successfully to:", email);
  } catch (err) {
    console.log("Error sending message:", err);
  }
};
