// EditSocietyDescription.jsx
import { IoMdArrowRoundBack, IoMdCamera } from "react-icons/io";
import React, { useState, useRef } from 'react';
import { db, storage } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const EditSocietyDescription = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Reference to the file input element

  const [username, setUsername] = useState('');
  const [societyName, setSocietyName] = useState('');
  const [societyDescription, setSocietyDescription] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState('');
  const [headTeacherName, setHeadTeacherName] = useState('');
  const [headTeacherEmail, setHeadTeacherEmail] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const positions = [
    'President', 'Vice President', 'Secretary', 'Design Head', 
    'Editorial Head', 'Tech Head'
  ];

  const handleSave = async () => {
    try {
      let profileImageUrl = '';
      if (profileImage) {
        const imageRef = ref(storage, `societies/${societyName}/profile.jpg`);
        await uploadBytes(imageRef, profileImage);
        profileImageUrl = await getDownloadURL(imageRef);
      }

      const societyData = {
        username,
        societyName,
        societyDescription,
        profileImageUrl,
        email,
        headTeacherName,
        headTeacherEmail,
        position: selectedPosition
      };

      await setDoc(doc(db, 'societies', societyName), societyData);
      alert("Society information saved successfully!");
    } catch (error) {
      console.error("Error saving society information: ", error);
      alert("Failed to save society information. Try again.");
    }
  };

  // Trigger file input on camera icon click
  const handleCameraClick = () => {
    fileInputRef.current.click(); // Programmatically clicks the hidden file input
  };

  // Handle profile image selection
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        {/* Header with Back Icon and Title */}
        <div className="flex items-center mb-6">
          <IoMdArrowRoundBack 
            onClick={() => navigate(-1)} 
            className="text-2xl cursor-pointer mr-2 text-gray-700 hover:text-black"
          />
          <h2 className="text-2xl font-semibold text-center flex-grow">Society Page</h2>
        </div>

        {/* Profile Image Upload */}
        <div className="relative flex flex-col items-center mb-6">
          {/* Profile Image Circle */}
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-2 relative">
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Profile Preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-gray-500 text-2xl">+</span>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            id="profileImage"
            type="file"
            ref={fileInputRef} // Attach the ref to the file input
            className="hidden"
            onChange={handleProfileImageChange} // Handle file change
          />

          {/* Camera Icon Overlay on Circumference */}
          <IoMdCamera
            size={30}
            onClick={handleCameraClick} // Trigger file input click on camera icon click
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 cursor-pointer rounded-full bg-white p-1 text-xl border border-gray-300"
          />
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">User Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter user name"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Society Name</label>
            <input
              type="text"
              value={societyName}
              onChange={(e) => setSocietyName(e.target.value)}
              placeholder="Enter society name"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Society Description</label>
            <textarea
              value={societyDescription}
              onChange={(e) => setSocietyDescription(e.target.value)}
              placeholder="Enter society description"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Head Teacher Name</label>
            <input
              type="text"
              value={headTeacherName}
              onChange={(e) => setHeadTeacherName(e.target.value)}
              placeholder="Enter head teacher name"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Head Teacher Email</label>
            <input
              type="email"
              value={headTeacherEmail}
              onChange={(e) => setHeadTeacherEmail(e.target.value)}
              placeholder="Enter head teacher email"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Position</label>
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select Position</option>
              {positions.map((position) => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full mt-6 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditSocietyDescription;
