require("dotenv").config();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
const twilio = require("twilio");

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();

const corsHandler = cors({ origin: true });

// Function to generate a 6-digit OTP
const generateOtp = () => {
    const min = 100000;
    const max = 900000;
    return Math.floor(min + Math.random() * max).toString();
};

// Send OTP to Email using Twilio
exports.sendOtpToEmail = functions.https.onRequest(corsHandler, async (req, res) => {
    const email = req.body.email; // Ensure to send email from request body
    const otp = generateOtp();

    // Store OTP in Firestore
    await db.collection("otp").doc(email).set({
        otp,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Configure Twilio client
    const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    // Send OTP via Twilio Email
    const message = {
        to: email,
        from: process.env.TWILIO_EMAIL, // Your Twilio verified email
        subject: "Your OTP Code",
        text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`,
    };

    try {
        await twilioClient.sendEmail(message);
        res.status(200).send({ success: true });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send({ success: false, error: error.message });
    }
});

// Function to verify OTP
// exports.verifyOtp = functions.https.onRequest(corsHandler, async (req, res) => {
//     const { email, otp } = req.body;

//     const otpDoc = await db.collection('otp').doc(email).get();
//     if (!otpDoc.exists) {
//         return res.status(400).send({ success: false, error: 'OTP not found or expired' });
//     }

//     const { otp: storedOtp, createdAt } = otpDoc.data();
//     const now = admin.firestore.Timestamp.now();

//     // Check if OTP matches and is not expired (10 minutes)
//     const isExpired = now.toMillis() - createdAt.toMillis() > 10 * 60 * 1000; // 10 minutes

//     if (isExpired) {
//         return res.status(400).send({ success: false, error: 'OTP has expired' });
//     }

//     if (storedOtp !== otp) {
//         return res.status(400).send({ success: false, error: 'Invalid OTP' });
//     }

//     // Optionally, delete OTP after successful verification
//     await db.collection('otp').doc(email).delete();

//     return res.status(200).send({ success: true });
// });