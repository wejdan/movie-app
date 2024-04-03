import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const Rating = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const onMouseEnter = (index) => {
    setHoverRating(index);
  };

  const onMouseLeave = () => {
    setHoverRating(0);
  };

  const onSaveRating = (index) => {
    setRating(index);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
          <FontAwesomeIcon
            key={index}
            icon={
              hoverRating >= index || rating >= index ? solidStar : regularStar
            }
            onMouseEnter={() => onMouseEnter(index)}
            onMouseLeave={() => onMouseLeave()}
            onClick={() => onSaveRating(index)}
            className={`h-5 w-5 cursor-pointer ${
              hoverRating >= index || rating >= index
                ? "text-yellow-400"
                : "text-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Rating;
