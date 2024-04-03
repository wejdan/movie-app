import React, { useState, useRef } from "react";
// or
import { CloudIcon } from "@heroicons/react/24/solid"; // for solid icons

const DragDropVideoInput = ({ setVideo }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    // Check if the file is a video
    if (files[0].type.startsWith("video/")) {
      console.log("Video file detected:", files[0]);
      setVideo(files[0]);
      // Handle the video file
      // You might want to update the component's state with the file,
      // send it somewhere else, or preview it.
    } else {
      console.log("The file is not a video:", files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div
      className={`flex justify-center items-center w-96 h-96 bg-white dark:bg-gray-800 rounded-lg cursor-pointer ${
        dragActive
          ? "border-4 border-dashed border-gray-500"
          : "border-2 border-dashed border-gray-700"
      }`}
      onClick={handleClick}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="video/*"
        onChange={handleChange}
      />
      <div className="flex flex-col items-center">
        <CloudIcon className="w-12 h-12 text-gray-500" />
        <p className="text-gray-500">Drop your file here</p>
        {/* Use an appropriate hand icon or image */}
      </div>
    </div>
  );
};

export default DragDropVideoInput;
