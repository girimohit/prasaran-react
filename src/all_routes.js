import PostList from "./postList";
import AccountSettingScreen from "./screens/account_setting";
import AddPostScreen from "./screens/add_post";
import ChatScreen from "./screens/chat_screen";
import EditProfileScreen from "./screens/edit_profile";
import HomeScreen from "./screens/home_screen";
import SearchScreen from "./screens/search_screen";
import { Route, Routes } from "react-router";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/add-post" element={<AddPostScreen />} />
        <Route path="/chats" element={<ChatScreen />} />
        <Route path="/account-settings" element={<AccountSettingScreen />} />
        <Route path="/edit-profile" element={<EditProfileScreen />} />
      </Routes>
    </>
  );
};
export default AllRoutes;
