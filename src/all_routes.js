import React from "react";
import { Route, Routes, useLocation } from "react-router-dom"; // Ensure you're importing from react-router-dom
// import PostList from "./postList"; // Assuming you need these imports somewhere
// import AccountSettingScreen from "./screens/account_setting";
// import AddPostScreen from "./screens/add_post";
// import ChatScreen from "./screens/chat_screen";
// import EditProfileScreen from "./screens/edit_profile";
import HomeScreen from "./screens/home_screen";
// import SearchScreen from "./screens/search_screen";
import SocPage from "./screens/soc_page";
import BottomNavBar from "./components/bottom_nav";
import CreatePost from "./screens/create_post"; 
import EditPost from "./screens/edit_post";
import EditSocietyDescription from "./screens/edit_soc_description";
import SocSetting from "./screens/soc_setting";
import SocMembers from "./screens/soc_members";
import SocFollowers from "./screens/soc_followers";
import ArchivePage from "./screens/post_archive";

const AllRoutes = () => {
  const location = useLocation(); // Get the location object
  const showNavPaths = [
    "/",
    "/search",
    "/add-post",
    "/chats",
    "/account-settings",
  ];

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        {/* <Route path="/search" element={<SearchScreen />} />
        <Route path="/add-post" element={<AddPostScreen />} />
        <Route path="/chats" element={<ChatScreen />} />
        <Route path="/account-settings" element={<AccountSettingScreen />} />
        <Route path="/account-settings/edit-profile" element={<EditProfileScreen />}/> */}
        <Route path="/soc_page" element={<SocPage />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/edit-post" element={<EditPost />} />
        <Route path="/edit-society" element={<EditSocietyDescription />} />
        <Route path="/soc_setting" element={<SocSetting />} />
        <Route path="/soc_members" element={<SocMembers />} />
        <Route path="/soc_followers" element={<SocFollowers />} />
        <Route path="/post_archive" element={<ArchivePage />} />
      </Routes>
      {showNavPaths.includes(location.pathname) && <BottomNavBar />}
    </>
  );
};

export default AllRoutes;