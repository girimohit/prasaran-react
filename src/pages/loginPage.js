// src/Login.js
import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Ensure this path is correct
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully');
      navigate('/');
      // Redirect the user or perform further actions after login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-11/12 max-w-md p-6 bg-gray-300 rounded-lg relative">
        <div className="absolute -top-28 left-1/2 transform -translate-x-1/2 bg-gray-300 rounded-xl">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/prasaran-init.appspot.com/o/loginHeadimg.png?alt=media&token=d38ed5d6-d24a-4597-bedd-35170bc3be43"
            alt="Logo"
            className="w-40 h-40 object-contain"
          />
        </div>

        <form onSubmit={handleLogin} className="mt-10 space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <input
              type="email"
              placeholder="Email-Id"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-3 bg-black text-white rounded-lg"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-black font-bold">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;