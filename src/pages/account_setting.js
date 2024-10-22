import { IoSettingsOutline } from "react-icons/io5";
import { FaRegClipboard } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { MdHelpOutline } from "react-icons/md";
import { MdLogout } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebaseConfig"; // Import your Firebase auth and Firestore instance
import { doc, getDoc } from "firebase/firestore";

const SettingOptions = ({ option_name, IconComponent, onClick }) => {
  return (
    <>
      <div className="my-3 flex items-center gap-2" onClick={onClick}>
        {IconComponent}
        <p className="font-semibold">{option_name}</p>
      </div>
    </>
  );
};

const AccountSettingScreen = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Function to fetch the user's full name from Firestore
  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setFullName(userDoc.data().fullName);
        setUsername(userDoc.data().username); // Assuming you have a username field
      }
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate("/login"); // Redirect to the login screen
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <div className="mb-8 flex flex-col items-center justify-center">
        <h2 className="my-10 text-center font-bold">Account</h2>
        <div className="h-32 w-32 rounded-full border-2 border-black bg-gray-50"></div>
        <h3 className="font-semibold">{fullName || "Full Name"}</h3>
        <p className="text-gray-400">@{username || "username"}</p>
        <Link to={"edit-profile"}>
          <button className="rounded-lg bg-black px-5 py-1 text-white">
            Edit Profile
          </button>
        </Link>
      </div>

      <hr className="mx-5 my-1 h-1 border-0 bg-gray-300" />

      <div id="setting-options" className="mx-6">
        <SettingOptions
          option_name="Settings"
          IconComponent={<IoSettingsOutline />}
        />
        <SettingOptions
          option_name="My Activity"
          IconComponent={<FaRegClipboard />}
        />
        <SettingOptions
          option_name="Change Passcode"
          IconComponent={<MdOutlineLock />}
        />
        <SettingOptions
          option_name="Saved Posts"
          IconComponent={<FaRegSave />}
        />
      </div>

      <hr className="mx-5 my-1 h-1 border-0 bg-gray-300" />

      <div id="setting-options" className="mx-6">
        <SettingOptions
          option_name="Help & Support"
          IconComponent={<MdHelpOutline />}
        />
        <SettingOptions
          option_name="Log out"
          IconComponent={<MdLogout />}
          onClick={handleLogout} // Add onClick for logging out
        />
      </div>
      <div></div>
    </>
  );
};

export default AccountSettingScreen;