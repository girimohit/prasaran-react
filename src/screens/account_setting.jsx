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
      <p>Account Settings</p>
    </>
  );
};
export default AccountSettingScreen;

// DEE2E6
