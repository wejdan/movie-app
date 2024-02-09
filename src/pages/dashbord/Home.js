import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrashAlt,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import StatCard from "../../components/dashboard/StatCard";

const Home = () => {
  // Replace with your actual data and imports
  const stats = [
    { name: "Total Uploads", value: 21 },
    { name: "Total Reviews", value: 2 },
    { name: "Total Users", value: 3 },
  ];

  const recentUploads = [
    // ... Populate with your recent uploads data
  ];

  const mostRatedMovies = [
    // ... Populate with your most rated movies data
  ];

  return (
    <div className="mt-10 container mx-auto">
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      {/* Lists Row */}
      <div className="grid mt-5 grid-cols-1 md:grid-cols-3 gap-4">
        {/* Recent Uploads */}
        <div className="md:col-span-2 bg-gray-700 p-4 rounded-sm">
          <h3 className="text-xl mb-4">Recent Uploads</h3>
          {/* List of recent uploads */}
          <div className="space-y-2">
            {/* Map through your recent uploads */}
          </div>
        </div>

        {/* Most Rated Movies */}
        <div className="md:col-span-1 bg-gray-700 p-4 rounded-sm">
          <h3 className="text-xl mb-4">Most Rated Movies</h3>
          {/* List of most rated movies */}
          <div className="space-y-2">
            {/* Map through your most rated movies */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
