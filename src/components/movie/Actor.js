import React from "react";
import { truncateText } from "../../utils/data";
const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

function Actor({ actor }) {
  return (
    <div className="bg-white dark:bg-gray-700 overflow-hidden rounded-lg shadow-lg">
      <img
        src={`${BASE_URL}/${actor.profile}`}
        alt={actor.name}
        className="w-full h-32 object-cover"
      />
      <div className="mt-2 p-4">
        <h3 className="text-gray-900 dark:text-white text-lg font-semibold">
          {actor.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {truncateText(actor.about, 100)}
        </p>{" "}
        {/* Adjust 100 to your desired max length */}
      </div>
    </div>
  );
}

export default Actor;
