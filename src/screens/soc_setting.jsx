import React from 'react';
import { IoTimeOutline, IoLockClosedOutline, IoBookmarkOutline, IoHelpCircleOutline, IoLogOutOutline, IoHeartOutline, IoChatbubbleOutline, IoShieldOutline, IoWarningOutline, IoBanOutline } from 'react-icons/io5';
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

    // Inside the Privacy Policy function
    const handlePrivacyPolicy = () => {
      navigate('/privacy_policy');
    };

    // Inside the Help & Support function
    const handleHelpSupport = () => {
      navigate('/help_support');
    };

  return (
    <div className="min-h-screen bg-[#DEE2E6] flex flex-col items-center">
      {/* Header */}
      <div className="flex items-center mb-6 w-full max-w-sm">
        <IoMdArrowRoundBack  
          onClick={() => navigate('/soc_page')} // Change to the correct route if needed
          className="text-2xl cursor-pointer text-gray-700 hover:text-black ml-0" // Positioning styles
        />
        <h1 className="text-2xl font-semibold text-center text-gray-950 flex-grow">Profile</h1>
      </div>
      
      {/* Profile Information */}
      <div className="mt-7 w-full max-w-md flex flex-col items-center">
        <div className="relative">
          <img
            src={societyData.profileImageUrl || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
          />
        </div>
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
        {/* Likes */}
        <div className="flex items-center py-2 px-4 border-t border-gray-600">
            <IoHeartOutline size={20} className="text-gray-500" />
            <p className="text-gray-700 font-medium">&ensp; Likes</p>
        </div>

        {/* Saved Posts */}
        <div className="flex items-center py-2 px-4">
            <IoBookmarkOutline size={20} className="text-gray-500" />
            <button 
            onClick={handleSavePost}
            className="text-gray-700 font-medium"
            >
              &ensp; Saved Posts
            </button>
        </div>

        {/* Comments */}
        <div className="flex items-center py-2 px-4">
            <IoChatbubbleOutline size={20} className="text-gray-500" />
            <p className="text-gray-700 font-medium">&ensp; Comments</p>
        </div>

        {/* Archive */}
        <div className="flex items-center py-2 px-4">
            <IoTimeOutline size={20} className="text-gray-500" />
            <button 
            onClick={handleArchivePost}
            className="text-gray-700 font-medium"
            >
              &ensp; Archive
            </button>
        </div>

        {/* Blocked */}
        <div className="flex items-center py-2 px-4">
            <IoBanOutline size={20} className="text-gray-500" />
            <p className="text-gray-700 font-medium">&ensp; Blocked</p>
        </div>
        
        {/* Change Passcode */}
        <div className="flex items-center py-2 px-4 border-b border-gray-600">
            <IoLockClosedOutline size={20} className="text-gray-500" />
            <p className="text-gray-700 font-medium">&ensp; Change Passcode</p>
        </div>

        {/* Help & Support */}
        <div className="flex items-center py-2 px-4">
            <IoHelpCircleOutline size={20} className="text-gray-500" />
            <button 
            onClick={handleHelpSupport}
            className="text-gray-700 font-medium"
            >
              &ensp; Help & Support
            </button>
        </div>

        {/* Privacy Policy */}
        <div className="flex items-center py-2 px-4">
            <IoShieldOutline size={20} className="text-gray-500" />
            <button 
            onClick={handlePrivacyPolicy}
            className="text-gray-700 font-medium"
            >
              &ensp; Privacy Policy
            </button>
        </div>

        {/* Report Problem */}
        <div className="flex items-center py-2 px-4">
            <IoWarningOutline size={20} className="text-gray-500" />
            <p className="text-gray-700 font-medium">&ensp; Report Problem</p>
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
