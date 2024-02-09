import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useSelector((state) => state.auth);

  if (user && isAdmin) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }

  // If user is logged in, render the child components
};

export default AdminRoute;
