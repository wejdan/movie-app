import React from "react";
import { Hourglass } from "react-loader-spinner";
import { useSelector } from "react-redux";

function Loader() {
  const isDarkMode = useSelector((state) => state.appSettings.isDarkMode);

  // Define color gradients for light and dark modes
  const colorsLightMode = ["#B8860B", "#DAA520"]; // Darker gold to gold gradient for light mode
  const colorsDarkMode = ["#C99500", "#C98500"]; // Dark gold gradient for dark mode

  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white flex-grow flex items-center justify-center text-white">
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={isDarkMode ? colorsDarkMode : colorsLightMode} // Conditional colors based on dark mode
      />
    </div>
  );
}

export default Loader;
