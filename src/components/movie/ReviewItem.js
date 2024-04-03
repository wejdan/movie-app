import React from "react";

function ReviewItem({ userInitial, userName, rating, comment, date }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-3 rounded-lg my-8 ">
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-700 text-lg text-white font-medium">
        {userInitial}
      </div>
      <div className="flex flex-col w-full">
        <span className="text-black  dark:text-white font-semibold">
          {userName}
        </span>{" "}
        {/* Username displayed here */}
        <div className="flex items-center  mt-1">
          <span className="text-yellow-400 text-lg">{rating}</span>
          <span className="text-yellow-400 text-sm ml-1">★</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{comment}</p>
        <p className="text-gray-500 text-[10px] mt-2 self-end">
          {formatDate(date)}
        </p>
      </div>
    </div>
  );
}

export default ReviewItem;
