import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (user) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }

  // If user is logged in, render the child components
};

export default ProtectedRoute;
