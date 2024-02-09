import React from "react";
import Navbar from "./DashboardNavbar"; // Import your Navbar component
import Sidebar from "./Sidebar"; // Import your Sidebar component
import { Outlet } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex bg-gray-900 min-h-screen">
      <Sidebar /> {/* Sidebar on the left */}
      <div className="flex-1 flex flex-col">
        <Navbar /> {/* Navbar at the top */}
        <main className="flex-1 max-w-5xl p-4 text-white overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
