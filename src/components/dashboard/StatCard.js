import React from "react";

function StatCard({ stat }) {
  return (
    <div className="bg-gray-700 p-4 rounded-sm flex flex-col justify-between items-center">
      <h4 className="text-lg">{stat.name}</h4>
      <span className="text-3xl">{stat.value}</span>
    </div>
  );
}

export default StatCard;
