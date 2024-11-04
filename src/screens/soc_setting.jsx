import React from 'react';
import {IoSettingsOutline, IoTimeOutline, IoLockClosedOutline, IoBookmarkOutline, IoHelpCircleOutline, IoLogOutOutline } from 'react-icons/io5';
import { IoMdArrowRoundBack } from "react-icons/io"
import { useLocation, useNavigate } from 'react-router-dom';

const SocSetting = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const societyData = location.state?.societyData || {};

    const handleEditProfile = () => {
      navigate('/edit-society', { state: { username: societyData.username } }); // Pass the username
    };

    // Inside the handleArchivePost function
    const handleArchivePost = () => {
      navigate('/post_archive', { state: { societyData } });  // Pass societyData as state
    };

    // Inside the handleSavePost function
    const handleSavePost = () => {
      navigate('/save_post', { 
          state: { 
              societyData 
          }
      });
    };

  return (
    <div className="min-h-screen bg-[#DEE2E6] flex flex-col items-center">
      {/* Header */}
      <IoMdArrowRoundBack  
        onClick={() => navigate('/soc_page')} // Change to the correct route if needed
        className="text-2xl cursor-pointer absolute top-2 left-2 text-gray-700 hover:text-black" // Positioning styles
      />
      <h1 className="text-2xl font-semibold mt-1">Profile</h1>
      
      {/* Profile Information */}
      <div className="mt-7 w-full max-w-md flex flex-col items-center">
        <div className="relative">
          <img
            src={societyData.profileImageUrl || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
          />
        </div>
        {/* <h2 className="text-xl sm:text-2xl font-semibold mt-4">{societyData.username || 'Google Developer Group Dyal Singh College'}</h2> */}
        <p className="text-xl sm:text-2xl font-semibold text-gray-500 mt-4">@{societyData.username}</p>
        <button 
          onClick={handleEditProfile}
          className="bg-black text-white rounded-full py-2 px-4 my-4"
        >
          Edit Profile
        </button>
      </div>

      {/* Options */}
      <div className="w-full max-w-sm">
        {/* Settings */}
        <div className="flex items-center py-2 px-4 border-t border-gray-600">
            <IoSettingsOutline size={20} className="text-gray-500" />
            <p className="text-gray-700 font-medium">&ensp; Settings</p>
        </div>

        {/* My Activity */}
        <div className="flex items-center py-2 px-4">
            <IoTimeOutline size={20} className="text-gray-500" />
            <button 
            onClick={handleArchivePost}
            className="text-gray-700 font-medium"
            >
              &ensp; Archive
            </button>
        </div>

        {/* Change Passcode */}
        <div className="flex items-center py-2 px-4">
            <IoLockClosedOutline size={20} className="text-gray-500" />
            <p className="text-gray-700 font-medium">&ensp; Change Passcode</p>
        </div>

        {/* Saved Posts */}
        <div className="flex items-center py-2 px-4 border-b border-gray-600">
            <IoBookmarkOutline size={20} className="text-gray-500" />
            <button 
            onClick={handleSavePost}
            className="text-gray-700 font-medium"
            >
              &ensp; Saved Posts
            </button>
        </div>

        {/* Help & Support */}
        <div className="flex items-center py-2 px-4">
            <IoHelpCircleOutline size={20} className="text-gray-500" />
            <p className="text-gray-700 font-medium">&ensp; Help & Support</p>
        </div>

        {/* Log Out */}
        <div className="flex items-center py-2 px-4">
            <IoLogOutOutline size={20} className="text-gray-500" />
            <p className="text-gray-700 font-medium">&ensp; Log out</p>
        </div>
      </div>
    </div>
  );
};

export default SocSetting;
