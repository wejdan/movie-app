import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MovieCard({ title, id, thumbnail, rating, info, className }) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverClass = isHovered ? "z-50 scale-110" : "z-0"; // scale-125 might be too large for responsive designs
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/movie/${id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex-shrink-0 relative bg-gray-800 text-white rounded overflow-hidden shadow-lg m-2 ml-0 transition duration-500 ease-in-out transform cursor-pointer w-full h-[125px] ${className}`}
    >
      <div
        className={`${hoverClass} absolute inset-0 transition duration-500 ease-in-out transform`}
      >
        <img
          src={thumbnail}
          alt={title}
          className="absolute w-full h-full object-cover"
        />
        {isHovered && (
          <div className="absolute p-5 inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-2">
            <div className="flex justify-end">
              <span className="bg-red-600 text-xs font-bold px-2 py-1 rounded">
                N
              </span>
            </div>
            <div>
              <h3 className="text-sm font-semibold truncate">{title}</h3>
              <p className="text-xs truncate">{info}</p>
            </div>
            <div className="flex justify-between">
              <span className="text-xs">{rating}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
