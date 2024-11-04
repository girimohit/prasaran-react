// src/VerifyOtp.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve the state passed from SocRegister
  const { societyName, societyDescription, teacherEmail, password, societyLogo } = location.state || {};
  
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  
  // Initialize Firebase Functions
  const functions = getFunctions();
  const verifyOtp = httpsCallable(functions, 'verifyOtp'); // You will create this function in your backend

  const handleVerify = async (e) => {
    e.preventDefault();
    
    try {
      // Call the verify OTP function
      const result = await verifyOtp({ email: teacherEmail, otp });
      
      if (result.data.success) {
        // If OTP is valid, create the user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, teacherEmail, password);
        
        // Create a Firestore document for the society
        await setDoc(doc(db, 'societies', userCredential.user.uid), {
          societyName,
          societyDescription,
          teacherEmail,
          logo: societyLogo ? `path/to/uploaded/logo/${societyLogo.name}` : null // Handle logo upload if needed
        });
        
        // Redirect to the home page after successful registration
        navigate('/home');
      } else {
        setError(result.data.error || 'Invalid OTP');
      }
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