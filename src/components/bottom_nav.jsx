import React from 'react';
import { GoHome } from "react-icons/go";
import { RiChat3Line } from "react-icons/ri";
import { MdOutlineBookmarkBorder, MdOutlinePostAdd } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { NavLink } from "react-router-dom";

const BottomNavBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg">
      <ul className="flex justify-around items-center py-2 bg-gray-100 rounded-t-2xl">
        <li>
          <NavLink
            exact
            to="/"
            activeClassName="text-blue-500"
            className="flex flex-col items-center text-gray-500 hover:text-blue-500"
          >
            <GoHome size={24} />
            <span className="text-xs">Explore</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/chat"
            activeClassName="text-blue-500"
            className="flex flex-col items-center text-gray-500 hover:text-blue-500"
          >
            <RiChat3Line size={24} />
            <span className="text-xs">Chat</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/saved"
            activeClassName="text-blue-500"
            className="flex flex-col items-center text-gray-500 hover:text-blue-500"
          >
            <MdOutlineBookmarkBorder size={24} />
            <span className="text-xs">Saved</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/post"
            activeClassName="text-blue-500"
            className="flex flex-col items-center text-gray-500 hover:text-blue-500"
          >
            <MdOutlinePostAdd size={24} />
            <span className="text-xs">Post</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/updates"
            activeClassName="text-blue-500"
            className="flex flex-col items-center text-gray-500 hover:text-blue-500"
          >
            <IoIosNotificationsOutline size={24} />
            <span className="text-xs">Updates</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNavBar;
