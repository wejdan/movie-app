import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MovieCard({ title, id, thumbnail, rating, info }) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverClass = isHovered ? "z-50 scale-125" : "z-0";
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/movie/${id}`);
      }}
      className={`flex-shrink-0 relative w-[227px] h-[127px] bg-gray-800 text-white rounded overflow-hidden shadow-lg m-2 ml-0 transition duration-500 ease-in-out transform cursor-pointer ${hoverClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={thumbnail}
        alt={title}
        className="absolute w-full h-full object-cover"
      />
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-2">
          <div className="flex justify-end">
            <span className="bg-red-600 text-xs font-bold px-2 py-1 rounded mr-2">
              N
            </span>
          </div>
          <div>
            <h3 className="text-sm font-semibold truncate">{title}</h3>
            <p className="text-xs">{info}</p>
          </div>
          <div className="flex justify-between">
            <span className="text-xs">{rating}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieCard;
