import { IoMdArrowRoundBack , IoMdCamera } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebaseConfig";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";

const EditField = ({ field_name, field_data, onChange }) => {
  return (
    <div className="my-3 flex flex-col justify-center rounded-lg border border-gray-400 p-2 px-4">
      <p className="text-gray-400">{field_name}</p>
      <input
        type="text"
        value={field_data}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none"
      />
    </div>
  );
};

const EditProfileScreen = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const navigate = useNavigate();

  // Function to fetch user data from Firestore
  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setFullName(userDoc.data().fullName || "");
        setEmail(userDoc.data().email || "");
        setUsername(userDoc.data().username || "");
        setGender(userDoc.data().gender || "");
        setDob(userDoc.data().dob ? new Date(userDoc.data().dob) : null);
        setProfilePicture(userDoc.data().profilePicture || "");

        const dateOfBirth = userDoc.data().dob ? new Date(userDoc.data().dob) : null;
        setDob(isNaN(dateOfBirth) ? null : dateOfBirth);
      }
    }
  };

  // Function to handle saving changes to Firestore
  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      try {
        await updateDoc(userDocRef, {
          fullName,
          email,
          username,
          gender,
          dob: dob ? dob.toISOString() : null,
          profilePicture,
        });
        alert("Profile updated successfully");
        navigate(-1);
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile");
      }
    }
  };

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const user = auth.currentUser;
    if (user) {
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      try {
        // Upload the file to Firebase Storage
        await uploadBytes(storageRef, file);

        // Get the download URL and update the profile picture state
        const downloadURL = await getDownloadURL(storageRef);
        setProfilePicture(downloadURL);

        // Update the profile picture in Firestore
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, { profilePicture: downloadURL });

        alert("Profile picture updated successfully");
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        alert("Failed to upload profile picture");
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <div className="mb-8 flex flex-col items-center justify-center">
        <div className="grid w-full grid-cols-3 items-center justify-center px-10">
          <IoMdArrowRoundBack onClick={() => navigate(-1)} />
          <h2 className="my-10 text-center font-bold">Edit Profile</h2>
        </div>

        <div className="relative mb-6 h-32 w-32 rounded-full border-2 border-black bg-gray-50">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="h-full w-full rounded-full bg-gray-200"></div>
          )}
          <label htmlFor="fileInput">
            <IoMdCamera
              className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-white p-1 text-xl"
            />
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleProfilePictureUpload}
            style={{ display: "none" }}
          />
        </div>
        <h3 className="font-semibold">{fullName || "Full Name"}</h3>
        <p className="text-gray-400">@{username || "username"}</p>
      </div>

      <hr className="mx-5 my-1 h-1 border-0 bg-gray-300" />

      <div id="setting-options" className="mx-6 grid grid-cols-2 gap-x-3">
        <EditField field_name="Username" field_data={username} onChange={setUsername} />
        <div className="my-3 flex flex-col justify-center rounded-lg border border-gray-400 p-2 px-4">
          <p className="text-gray-400">Gender</p>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="bg-transparent outline-none"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="my-3 flex flex-col justify-center rounded-lg border border-gray-400 p-2 px-4">
          <p className="text-gray-400">Date of Birth</p>
          <DatePicker
            selected={dob}
            onChange={(date) => setDob(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Date of Birth"
            className="bg-transparent outline-none"
          />
        </div>
        <EditField field_name="Full Name" field_data={fullName} onChange={setFullName} />
        <EditField field_name="Email" field_data={email} onChange={setEmail} />
      </div>

      <div className="fixed bottom-4 left-0 right-0 flex justify-center">
        <button
          onClick={handleSave}
          className="w-96 rounded-xl bg-black px-5 py-2 text-white"
        >
          Save
        </button>
      </div>
    </>
  );
};

export default EditProfileScreen;