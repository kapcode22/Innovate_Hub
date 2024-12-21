const nodemailer = require('nodemailer');

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE), // true for port 465, false for others
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER, // Sender address
      to: email, // Recipient
      subject: subject, // Email subject
      text: text, // Plain text body
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Failed to send email:", error.message || error);
    throw new Error("Email sending failed"); // Pass the error to the caller
  }
};
