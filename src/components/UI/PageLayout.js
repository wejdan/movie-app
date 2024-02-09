import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function PageLayout() {
  // Add padding on the x-axis (left and right) and a smaller padding on the y-axis (top and bottom)
  return (
    <div className="bg-gray-900 min-h-screen  text-white">
      <Navbar />

      <div className="container max-w-6xl   mx-auto">
        <div className="flex flex-col min-h-screen ">
          <main className="flex-grow">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default PageLayout;
