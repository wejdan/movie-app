import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrashAlt,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import StatCard from "../../components/dashboard/StatCard";
import useStats from "../../hooks/common/getStats";
import { useNavigate } from "react-router-dom";
import { truncateText } from "../../utils/data";

const Home = () => {
  const [statsData, loading] = useStats();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading stats...</div>;
  }

  const {
    totalMovies,
    totalReviews,
    totalUsers,
    recentUploads,
    mostRatedMovies,
  } = statsData;

  // Preparing dynamic stats for StatCard components
  const dynamicStats = [
    { name: "Total Uploads", value: totalMovies },
    { name: "Total Reviews", value: totalReviews },
    { name: "Total Users", value: totalUsers },
  ];

  return (
    <div className="mt-10 container mx-auto">
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {dynamicStats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      {/* Lists Row */}
      <div className="grid mt-5 grid-cols-1 md:grid-cols-3 gap-4">
        {/* Recent Uploads */}
        <div className="md:col-span-2 bg-white dark:bg-gray-700 p-4 rounded-md">
          <h3 className="text-xl mb-4 dark:text-white text-black">
            Recent Uploads
          </h3>
          <div className="space-y-2">
            {recentUploads.map((upload) => (
              <div
                onClick={() => navigate(`/movie/${upload._id}`)}
                key={upload._id}
                className="bg-gray-100 dark:bg-gray-800 dark:text-white text-black p-4  cursor-pointer rounded-lg"
              >
                <h4 className="text-lg font-bold">{upload.title}</h4>
                <p> {truncateText(upload.description, 100)}</p>
                {/* Other details as needed */}
              </div>
            ))}
          </div>
        </div>

        {/* Most Rated Movies */}
        <div className="md:col-span-1 bg-white dark:bg-gray-700 p-4  rounded-md">
          <h3 className="dark:text-white text-black text-xl mb-4">
            Most Rated Movies
          </h3>
          <div className="space-y-2">
            {mostRatedMovies.map((movie) => (
              <div
                key={movie.movieId}
                className="bg-gray-100 dark:bg-gray-800 dark:text-white text-black p-4  rounded-lg"
              >
                <h4 className="text-lg">{movie.movieDetails.title}</h4>
                <p>Rating: {movie.averageRating}</p>
                {/* Other details as needed */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
