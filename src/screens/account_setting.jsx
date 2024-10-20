import { IoSettingsOutline } from "react-icons/io5";
import { FaRegClipboard } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { MdHelpOutline } from "react-icons/md";
import { MdLogout } from "react-icons/md";

const SettingOptions = ({ option_name, IconComponent }) => {
  return (
    <>
      <div className="my-3 flex items-center gap-2">
        {IconComponent}
        <p className="font-semibold">{option_name}</p>
      </div>
    </>
  );
};

const AccountSettingScreen = () => {
  return (
    <>
      <div className="mb-8 flex flex-col items-center justify-center">
        <h2 className="my-10 text-center font-bold">Account</h2>
        <div className="h-32 w-32 rounded-full border-2 border-black bg-gray-50"></div>
        <h3 className="font-semibold">Full Name</h3>
        <p className="text-gray-400">@username</p>
        <button
          className="rounded-lg bg-black px-5 py-1 text-white"
          onClick={"/edit-profile"}
        >
          Edit Profile
        </button>
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
        <SettingOptions option_name="Log out" IconComponent={<MdLogout />} />
      </div>
      <div></div>
    </>
  );
};
export default AccountSettingScreen;

// DEE2E6
