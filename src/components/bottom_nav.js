import { GoHome } from "react-icons/go";
import { IoSearch, IoSearchSharp } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";
import { RiChat3Line } from "react-icons/ri";
import { MdOutlineManageAccounts } from "react-icons/md";
import { NavLink } from "react-router-dom";


const BottomNavBar = () => {
  return (
    <>
      <nav className="bottom-4 fixed left-0 right-0 flex justify-center bg-transparent">
        <ul className="flex w-[90%] justify-around rounded-full border border-gray-300 bg-gray-300 py-3 backdrop-blur-md">
          <li>
            <NavLink exact to="/" activeClassName="active">
              <GoHome size={20} />
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/search" activeClassName="active">
              <IoSearchSharp size={20} />
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/add-post" activeClassName="active">
              <FiPlusCircle size={20} />
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/chats" activeClassName="active">
              <RiChat3Line size={20} />
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/account-settings" activeClassName="active">
              <MdOutlineManageAccounts size={20} />
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};


export default BottomNavBar;