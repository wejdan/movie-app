import React, { useRef } from "react";
import { FaImage } from "react-icons/fa";

function ImagePicker({
  imagePreview,
  onImageChange,
  id,
  disabled,
  width,
  height,
  error,
  rounded, // New prop for rounded corners
}) {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    if (!disabled) {
      fileInputRef.current.click();
    }
  };

  // Conditionally apply rounded styles
  const roundedStyle = rounded ? { borderRadius: "50%" } : {};

  return (
    <div>
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="Image preview"
          onClick={handleImageClick}
          style={{
            width,
            height,
            cursor: disabled ? "not-allowed" : "pointer",
            ...roundedStyle, // Apply rounded style conditionally
          }}
        />
      ) : (
        <div
          style={{
            width,
            height,
            cursor: disabled ? "not-allowed" : "pointer",
            ...roundedStyle, // Apply rounded style conditionally
          }}
          className={`bg-gray-200`}
          onClick={handleImageClick}
        >
          <div className="flex justify-center items-center w-full h-full">
            <FaImage className="text-3xl" />
          </div>
        </div>
      )}
      <input
        hidden
        ref={fileInputRef}
        id={id}
        name={id}
        type="file"
        onChange={onImageChange}
        accept=".jpg,.png"
      />
      <label
        className="block  cursor-pointer"
        htmlFor={id}
        disabled={disabled}
        style={{ cursor: "pointer" }}
      ></label>
      <p className=" text-xs text-red-500 ">{error || ""}</p>
    </div>
  );
}

export default ImagePicker;
