// src/AllRoutes.js
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import Register from "./pages/Register";
import AccountSettingScreen from "./pages/account_setting";
import EditProfileScreen from "./pages/edit_profile";
import Home from "./pages/Home";
import BottomNavBar from "./components/bottom_nav";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute

const AllRoutes = () => {
  const location = useLocation();
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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/account-settings"
          element={
            <ProtectedRoute>
              <AccountSettingScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account-settings/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfileScreen />
            </ProtectedRoute>
          }
        />
      </Routes>
      {showNavPaths.includes(location.pathname) && <BottomNavBar />}
    </>
  );
};

export default AllRoutes;