// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to the login page if the user is not authenticated
    // alert("Please login to access this page");
    console.log("Please login to access this page");
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the child component
  return children;
};

export default ProtectedRoute;