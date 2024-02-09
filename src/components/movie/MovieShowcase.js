import React from "react";

const MovieShowcase = () => {
  return (
    <div className="bg-black text-white p-4">
      <div className="container mx-auto">
        <h2 className="text-xl font-bold mb-4">
          Marakkar: Lion of the Arabian Sea
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Movie Cards */}
          {/* Repeat this structure for each movie */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <img
              src="/path-to-image.jpg"
              alt="Movie Thumbnail"
              className="mb-4 w-full rounded-lg"
            />
            <h3 className="text-lg font-bold">Movie Title</h3>
            <p className="text-gray-400">Movie description...</p>
            {/* Add more movie details here */}
          </div>
          {/* ... */}
        </div>
      </div>
    </div>
  );
};

export default MovieShowcase;
