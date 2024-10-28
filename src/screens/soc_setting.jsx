import React from 'react';
import {IoSettingsOutline, IoTimeOutline, IoLockClosedOutline, IoBookmarkOutline, IoHelpCircleOutline, IoLogOutOutline } from 'react-icons/io5';
import { IoMdArrowRoundBack } from "react-icons/io"
import { useLocation, useNavigate } from 'react-router-dom';

const SocSetting = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const societyData = location.state?.societyData || {};


    const handleEditProfile = () => {
        navigate('/edit-society');
    };

    const goBack = () => {
        navigate(-1); // Navigate to the previous page
    };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
      {/* Header */}
      <div className="w-full relative flex items-center justify-center text-gray-700 mb-6">
        <button onClick={goBack} className="absolute left-0 p-2">
          <IoMdArrowRoundBack size={24} />
        </button>
        <h1 className="text-lg font-semibold">Profile</h1>
      </div>
      
      {/* Profile Information */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={societyData.profileImageUrl || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mb-2"
        />
        <h2 className="text-xl font-semibold">{societyData.username || 'Google Developer Group Dyal Singh College'}</h2>
        <p className="text-gray-500">@{societyData.username}</p>
        <button 
          onClick={handleEditProfile}
          className="bg-black text-white rounded-full py-2 px-4 mt-4"
        >
          Edit Profile
        </button>
      </div>

      {/* Options */}
      <div className="w-full max-w-sm ">
        {/* Settings */}
        <div className="flex items-center py-2 border-t border-gray-600">
            <IoSettingsOutline size={20} className="text-gray-500" />
            <p className="text-gray-700 font-medium">&ensp; Settings</p>
        </div>

        {/* My Activity */}
        <div className="flex items-center py-2">
            <IoTimeOutline size={20} className="text-gray-500" />
            <p className="text-gray-700 font-medium">&ensp; My Activity</p>
        </div>

        {/* Change Passcode */}
        <div className="flex items-center py-2">
            <IoLockClosedOutline size={20} className="text-gray-500" />
            <p className="text-gray-700 font-medium">&ensp; Change Passcode</p>
        </div>

        {/* Saved Posts */}
        <div className="flex items-center py-2 border-b border-gray-600">
            <IoBookmarkOutline size={20} className="text-gray-500" />
            <p className="text-gray-700 font-medium">&ensp; Saved Posts</p>
        </div>

        {/* Help & Support */}
        <div className="flex items-center py-2">
            <IoHelpCircleOutline size={20} className="text-gray-500" />
            <p className="text-gray-700 font-medium">&ensp; Help & Support</p>
        </div>

        {/* Log Out */}
        <div className="flex items-center py-2">
            <IoLogOutOutline size={20} className="text-gray-500" />
            <p className="text-gray-700 font-medium">&ensp; Log out</p>
        </div>
      </div>
    </div>
  );
};

export default SocSetting;
