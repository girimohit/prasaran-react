import { IoMdArrowRoundBack, IoMdCamera } from "react-icons/io";
import React, { useState, useRef, useEffect } from 'react';
import { db, storage } from '../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const EditSocietyDescription = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const positionSectionRef = useRef(null);

    const username = location.state?.username || ''; // Get username from navigation state

    const [societyName, setSocietyName] = useState('');
    const [societyDescription, setSocietyDescription] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [email, setEmail] = useState('');
    const [headTeacherName, setHeadTeacherName] = useState('');
    const [headTeacherEmail, setHeadTeacherEmail] = useState('');
    const [positions, setPositions] = useState([]);
    const [newPosition, setNewPosition] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const societyDocRef = doc(db, 'societies', username, 'description', 'main');
                const societyDoc = await getDoc(societyDocRef);

                if (societyDoc.exists()) {
                    const data = societyDoc.data();
                    setSocietyName(data.societyName || '');
                    setSocietyDescription(data.societyDescription || '');
                    setEmail(data.email || '');
                    setHeadTeacherName(data.headTeacherName || '');
                    setHeadTeacherEmail(data.headTeacherEmail || '');
                    setPositions(data.positions || []);
                    if (data.profileImageUrl) setProfileImageUrl(data.profileImageUrl);
                }
            } catch (error) {
                console.error("Error fetching society data: ", error);
            }
        };

        fetchData();
    }, [username]);

    const handleSave = async () => {
      try {
          // Upload new profile image if there is one
          let uploadedImageUrl = profileImageUrl;
          if (profileImage) {
              const imageRef = ref(storage, `societies/${username}/profile.jpg`);
              await uploadBytes(imageRef, profileImage);
              uploadedImageUrl = await getDownloadURL(imageRef);
          }
  
          // Fetch current data to retain `username` if it's already in the database
          const societyDocRef = doc(db, 'societies', username, 'description', 'main');
          const societyDoc = await getDoc(societyDocRef);
  
          // Retain existing `username` in the update, or fall back to an empty string if not present
          const existingUsername = societyDoc.exists() ? societyDoc.data().username : username;
  
          const societyData = {
              username: existingUsername, // Retain the username
              societyName,
              societyDescription,
              profileImageUrl: uploadedImageUrl,
              email,
              headTeacherName,
              headTeacherEmail,
              positions
          };
  
          // Update the document with the new data
          await setDoc(societyDocRef, societyData);
          navigate('/soc_page');
      } catch (error) {
          console.error("Error saving society information: ", error);
          alert("Failed to save society information. Try again.");
      }
  };
  

    const handleAddPosition = () => {
        if (newPosition.trim()) {
            if (editIndex !== null) {
                const updatedPositions = [...positions];
                updatedPositions[editIndex] = newPosition;
                setPositions(updatedPositions);
                setEditIndex(null);
            } else {
                setPositions([...positions, newPosition]);
            }
            setNewPosition('');
        }
    };

    const handleEditPosition = (index) => {
        if (editIndex === index) {
            setEditIndex(null);
            setNewPosition('');
        } else {
            setNewPosition(positions[index]);
            setEditIndex(index);
        }
    };

    const handleDeletePosition = (index) => {
        setPositions(positions.filter((_, posIndex) => posIndex !== index));
        setEditIndex(null);
        setNewPosition('');
    };

    const handleClickOutside = (event) => {
        if (positionSectionRef.current && !positionSectionRef.current.contains(event.target)) {
            setEditIndex(null);
            setNewPosition('');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCameraClick = () => fileInputRef.current.click();
    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setProfileImageUrl(URL.createObjectURL(file));
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
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-2 relative">
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-gray-500 text-2xl">+</span>
              )}
            </div>

            <input
              id="profileImage"
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleProfileImageChange}
            />
            <IoMdCamera
              size={30}
              onClick={handleCameraClick}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 cursor-pointer rounded-full bg-white p-1 text-xl border border-gray-300"
            />
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
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

          {/* Additional Fields */}
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

          {/* Dynamic Positions Field */}
          <div ref={positionSectionRef}>
                    <label className="block text-sm font-medium text-gray-700">Add or Edit Position</label>
                    <input
                        type="text"
                        value={newPosition}
                        onChange={(e) => setNewPosition(e.target.value)}
                        placeholder="Enter position"
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <button
                        onClick={handleAddPosition}
                        className="mt-2 py-1 px-3 bg-black text-white font-semibold rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                    >
                        {editIndex !== null ? 'Update Position' : 'Add Position'}
                    </button>
                    <div className="mt-2 space-y-1">
                        {positions.map((position, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <span
                                    onClick={() => handleEditPosition(index)}
                                    className="flex-grow inline-block p-1 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
                                >
                                    {position}
                                </span>
                                {editIndex === index && (
                                    <FaTimes
                                        onClick={() => handleDeletePosition(index)}
                                        className="text-red-500 cursor-pointer"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
          </div>

        {/* Save Button */}
        <div className="mt-6">
          <button
            onClick={handleSave}
            className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSocietyDescription;
