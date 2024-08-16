const transporter = require("../config/nodemailer");

const otpStore = new Map();

function storeOTP(email, otp, token) {
  otpStore.set(otp, {
    email,
    otp,
    token,
    expiresAt: Date.now() + 10 * 60 * 1000,
  }); // 10 minutes
}

function getStoredDataByOTP(otp) {
  const otpData = otpStore.get(otp);
  if (!otpData || Date.now() > otpData.expiresAt) {
    otpStore.delete(otp);
    return null;
  }
  return otpData;
}

function sendOtpEmail(email, firstName, otp) {
  return new Promise((resolve, reject) => {
    const setPasswordLink = `${process.env.FRONT_END_BASE_URL}/set-password?otp=${otp}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Set Your Password",
      html: `
        <p>Hi, ${firstName},</p>
        <p>Click ${setPasswordLink} to set your password. The Link will expire in 10 minutes.</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        reject("Error sending OTP");
      } else {
        console.log("Email sent: " + info.response);
        resolve("OTP sent successfully");
      }
    });
  });
}

module.exports = { storeOTP, getStoredDataByOTP, sendOtpEmail };
