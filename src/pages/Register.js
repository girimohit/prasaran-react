// src/Register.js
import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig'; // Import your Firebase config
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { getImageURL } from '../assets/getImageURL'; // Assuming you have this function
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        rollNumber: rollNumber,
        createdAt: new Date(),
      });

      alert('User registered successfully');
      navigate('/login');
      // Optionally, redirect or reset the form
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-11/12 max-w-md p-6 bg-gray-300 rounded-lg relative">
        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-gray-300 rounded-xl">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/prasaran-init.appspot.com/o/loginHeadimg.png?alt=media&token=d38ed5d6-d24a-4597-bedd-35170bc3be43"
            alt="Logo"
            className="w-40 h-40 object-contain"
          />
        </div>

        <form onSubmit={handleRegister} className="mt-10 space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email-Id"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Phone Number"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Roll Number"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Set Password"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-3 bg-black text-white rounded-lg"
            >
              Register
            </button>
          </div>
        </form>

        <p className="text-center mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-black font-bold">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;