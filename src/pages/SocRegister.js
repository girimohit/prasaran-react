// src/SocRegister.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SocRegister = () => {
  const [societyName, setSocietyName] = useState('');
  const [societyDescription, setSocietyDescription] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [socEmail, setsocEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [societyLogo, setSocietyLogo] = useState(null); // for optional logo
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const domain = "@dsc.du.ac.in";
    if (!teacherEmail.endsWith(domain)) {
    setError(`TIC Email-id must end with ${domain}`);
    return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send OTP to the teacher's email via your Node.js server
      const response = await fetch('http://localhost:5500/send-otp', { // Adjust the URL if needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: teacherEmail }), // Send the email in the request body
      });

      const data = await response.json();
      console.log("Response from server:", data); // Log the response
      
      if (!data.success) {
        throw new Error(data.error); // Handle any errors returned from the server
      }
      navigate('/verify-otp', { state: { societyName, socEmail, societyDescription, teacherEmail, password, societyLogo } });

      console.log("OTP sent successfully, navigating to verify-otp");
      // Redirect to OTP verification page with form data as state
      
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
        <form onSubmit={handleRegister} className="mt-10 space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <input
              type="text"
              placeholder="Society Name"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
              value={societyName}
              onChange={(e) => setSocietyName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Society Description"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
              value={societyDescription}
              onChange={(e) => setSocietyDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Teacher In-Charge Email-ID"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
              value={teacherEmail}
              onChange={(e) => setTeacherEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Society's Official Email-ID"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
              value={socEmail}
              onChange={(e) => setsocEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Set Password"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="file"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
              onChange={(e) => setSocietyLogo(e.target.files[0])}
              accept="image/*"
            />
          </div>
          <div>
            <button type="submit" className="w-full p-3 bg-black text-white rounded-lg">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SocRegister;