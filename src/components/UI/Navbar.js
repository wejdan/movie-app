import React, { useState } from "react";
import { Input } from "./Input";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { FaTachometerAlt, FaMoon, FaSun, FaUser } from "react-icons/fa";
import { setMode } from "../../store/appSettingsSlice";

const Navbar = () => {
  const { user, isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state to manage theme (true for dark, false for light)
  const isDarkMode = useSelector((state) => state.appSettings.isDarkMode);

  const toggleTheme = () => {
    dispatch(setMode(!isDarkMode));
    // Here, you would also update the global theme state or apply the theme change logic
  };

  return (
    <nav className={`bg-white dark:bg-gray-800 dark:text-white  px-4`}>
      <div className="container max-w-6xl  mx-auto flex justify-between items-center">
        <NavLink to="/" className="hover:text-gray-300">
          {isDarkMode ? (
            <img src="/logo193.png" alt="Company Logo" className="h-16" />
          ) : (
            <img src="/logo192.png" alt="Company Logo" className="h-16" />
          )}
        </NavLink>
        <div className="flex items-center space-x-4 ">
          <button
            onClick={toggleTheme}
            className="hover:text-gray-600 dark:hover:text-gray-300"
          >
            {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
          <Input placeholder="Search..." />
          {user && isAdmin && (
            <NavLink
              to="/dashboard"
              className="flex items-center hover:text-gray-600 dark:hover:text-gray-300"
            >
              <FaTachometerAlt className="mr-2" />
              Dashboard
            </NavLink>
          )}
          {!user ? (
            <NavLink
              to="/login"
              className="hover:text-gray-600 dark:hover:text-gray-300"
            >
              Login
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/update-password"
                className="hover:text-gray-600 dark:hover:text-gray-300"
              >
                <FaUser className="mr-2" />
              </NavLink>
              <Button
                variant="outline"
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
              >
                Logout
              </Button>
            </>
          )}
        </div>
        <div className="md:hidden">Menu</div>
      </div>
    </nav>
  );
};

export default Navbar;
