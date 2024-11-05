// src/VerifyOtp.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the state passed from SocRegister
  const { societyName, societyDescription, teacherEmail, password, societyLogo } = location.state || {};

  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      // Call the verify OTP API endpoint on your Node.js server
      const response = await fetch('http://localhost:5500/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: teacherEmail, otp }), // Send the email and OTP in the request body
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Invalid OTP');
      }

      // If OTP is valid, create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, teacherEmail, password);
      
      let logoUrl = null;
      // Handle logo upload if a logo is provided
      if (societyLogo) {
        const storage = getStorage();
        const logoRef = ref(storage, `societyLogos/${societyLogo.name}`);
        await uploadBytes(logoRef, societyLogo); // Upload the logo
        logoUrl = await getDownloadURL(logoRef); // Get the download URL
      }

      // Create a Firestore document for the society
      await setDoc(doc(db, 'societies', userCredential.user.uid), {
        societyName,
        societyDescription,
        teacherEmail,
        logo: logoUrl // Store the logo URL
      });

      // Redirect to the home page after successful registration
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-11/12 max-w-md p-6 bg-gray-300 rounded-lg relative">
        <form onSubmit={handleVerify} className="mt-10 space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit" className="w-full p-3 bg-black text-white rounded-lg">
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;