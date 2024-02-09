import React from "react";
import { Input } from "./Input";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { FaTachometerAlt, FaUserShield } from "react-icons/fa";

const Navbar = () => {
  const { user, isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(isAdmin);
  return (
    <nav className="bg-gray-800 text-white px-4">
      <div className="container max-w-6xl  mx-auto flex justify-between items-center">
        <NavLink to="/" className="hover:text-gray-300">
          <img src="/logo192.png" alt="Company Logo" className="h-16" />
        </NavLink>
        <div className="hidden md:flex md:items-center space-x-4 ">
          {/* Add your navigation links here */}
          <Input placeholder="Search..." />
          {isAdmin && (
            <NavLink
              to="/dashboard"
              className="flex items-center hover:text-gray-300"
            >
              <FaTachometerAlt className="mr-2" />
              Dashboard
            </NavLink>
          )}
          {!user ? (
            <NavLink to="/login" className="hover:text-gray-300">
              Login
            </NavLink>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                /* handle click event */
                dispatch(logout());
              }}
            >
              Logout
            </Button>
          )}
        </div>
        <div className="md:hidden">Menu</div>
      </div>
    </nav>
  );
};

export default Navbar;
