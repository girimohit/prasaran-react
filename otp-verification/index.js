// index.js
require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const otpStore = require("./otpStore");
const admin = require('firebase-admin');
const serviceAccount = require('./prasaran-init-firebase-adminsdk-tk0xa-fe7bdbc4ac.json');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 5500;
const OTP_EXPIRATION = process.env.OTP_EXPIRATION || 5; // OTP expiration time in minutes

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), // Ensure you have the right credentials set up
  databaseURL: process.env.FIREBASE_DATABASE_URL, // Set your database URL
});
// Generate a 6-digit OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Endpoint to send OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const otp = generateOtp();
  const expirationTime = Date.now() + OTP_EXPIRATION * 60 * 1000; // Set expiration time

  // Save OTP and expiration time in store
  const otpData = { otp, expirationTime };
  await admin.firestore().collection('otps').doc(email).set(otpData);


  // Send OTP via email
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "VERIFY TIC EMAIL-ID",
    text: `Your OTP code is: ${otp}. It will expire in ${OTP_EXPIRATION} minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success:true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP email:", error);
    res.status(500).json({ success:false, error: "Failed to send OTP" });
  }
});

// Endpoint to verify OTP
app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  const doc = await admin.firestore().collection('otps').doc(email).get();
  const storedData = doc.data();

  // Check if OTP exists and is not expired
  if (!storedData || storedData.otp !== otp || Date.now() > storedData.expirationTime) {
    return res.status(400).json({ success: false, error: "Invalid or expired OTP" });
  }

  // OTP is valid, delete from Firestore
  await admin.firestore().collection('otps').doc(email).delete();
  res.status(200).json({success: true, message: "OTP verified successfully" });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});