import React from "react";
const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

function Actor({ actor }) {
  return (
    <div className="bg-gray-700  overflow-hidden  rounded-lg">
      <img
        src={`${BASE_URL}/` + actor.profile}
        alt={actor.name}
        className="w-full h-32 object-cover "
      />
      <div className="mt-2 p-4">
        <h3 className="text-white text-lg">{actor.name}</h3>
        <p className="text-gray-300 text-sm">{actor.about}</p>
      </div>
    </div>
  );
}

export default Actor;
