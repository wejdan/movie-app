import React from "react";
import CreatableSelect from "react-select/creatable";
const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "#1F2937",
    borderColor: state.isFocused ? "#9CA3AF" : "#4B5563",
    color: "white",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#9CA3AF",
    },
  }),
  menu: (base) => ({
    ...base,
    background: "#1F2937",
    marginTop: "2px", // Adjust the margin from the input
    borderRadius: "0 0 4px 4px", // Add rounded corners to the dropdown
  }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? "#374151" : "#1F2937",
    color: "#D1D5DB",
    "&:active": {
      background: "#4B5563",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "white",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9CA3AF",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 8px", // Adjust padding to match your design
  }),
  input: (base) => ({
    ...base,
    color: "#ffffff",
    margin: 0, // Adjust input margin
    padding: 0,
  }),
  indicatorSeparator: () => ({
    display: "none", // Hide the separator between input and indicator
  }),
  dropdownIndicator: (base) => ({
    ...base,
    display: "none", // Remove dropdown indicator
  }),
  clearIndicator: (base) => ({
    ...base,
    display: "none", // Color of the clear indicator icon
  }),
};
const TagInput = ({ label, className, value, onChange }) => {
  // Function to normalize tags input
  const handleCreate = (inputValue) => {
    // Split by spaces, filter out empty tags, and map to the appropriate format
    const tags = inputValue
      .split(/\s+/)
      .filter((tag) => tag !== "")
      .map((tag) => ({ label: tag, value: tag }));
    onChange([...value, ...tags]);
  };

  return (
    <div id="tag-input-container" className={className}>
      {label && (
        <label className="block text-sm font-bold mb-2 text-gray-400">
          {label}
        </label>
      )}
      <CreatableSelect
        id="tag-input"
        isMulti
        styles={customStyles}
        onChange={onChange}
        onCreateOption={handleCreate}
        value={value}
        placeholder="Type or pastetags and press enter..."
      />
    </div>
  );
};

export default TagInput;
