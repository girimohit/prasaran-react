import React from 'react';
import loginHeadimg from './assets/images/loginHeadimg.png';

const Register = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-11/12 max-w-md p-6 bg-gray-300 rounded-lg relative">
        
        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-gray-300 rounded-xl">
          <img
            src={loginHeadimg}
            alt="Logo"
            className="w-40 h-40 object-contain"
          />
          
        </div>

        
        <form className="mt-10 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email-Id"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Phone Number"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Roll Number"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Set Password"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
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