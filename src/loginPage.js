import React from 'react'
import loginHeadimg from './assets/images/loginHeadimg.png';

function loginPage() {
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
    
            
            <form className="mt-10 space-y-4">
             
              <div>
                <input
                  type="email"
                  placeholder="Email-Id"
                  className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
                />
              </div>
             
              
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 border-b-2 border-gray-500 focus:outline-none bg-transparent"
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
              Dont have an account?{' '}
              <a href="/register" className="text-black font-bold">
                Register
              </a>
            </p>
          </div>
        </div>
      );
}

export default loginPage
