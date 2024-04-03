import React from "react";

function StatCard({ stat }) {
  return (
    <div className="dark:text-white text-black bg-white dark:bg-gray-800 p-4  rounded-md flex flex-col justify-between items-center">
      <h4 className="text-lg">{stat.name}</h4>
      <span className="text-3xl">{stat.value}</span>
    </div>
  );
}

export default StatCard;
