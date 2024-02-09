import React from "react";
import { Hourglass } from "react-loader-spinner";

function Loader() {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center  text-white">
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#FFD700", "#FFA500"]} // Gold to orange gradient
      />
    </div>
  );
}

export default Loader;
