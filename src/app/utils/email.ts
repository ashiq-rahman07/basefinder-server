import nodemailer from 'nodemailer';

// Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail or any other email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});

// Function to send email
const sendEmail = async (to: any, subject: any, text: any) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to, // Recipient address
    subject, // Email subject
    text, // Email body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (err) {
    console.error(`Error sending email to ${to}:`, err);
  }
};

module.exports = sendEmail;
