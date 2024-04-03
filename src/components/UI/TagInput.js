import React from "react";
import { useSelector } from "react-redux";
import CreatableSelect from "react-select/creatable";
const getCustomStyles = (isDarkMode) => ({
  control: (base, state) => ({
    ...base,
    background: isDarkMode ? "#1F2937" : "#FFFFFF",
    borderColor: state.isFocused
      ? "#9CA3AF"
      : isDarkMode
      ? "#4B5563"
      : "#9ca3af",
    color: isDarkMode ? "white" : "black",
    boxShadow: "none",
    "&:hover": {
      borderColor: isDarkMode ? "#9CA3AF" : "#D1D5DB",
    },
  }),
  menu: (base) => ({
    ...base,
    background: isDarkMode ? "#1F2937" : "#FFFFFF",
    marginTop: "2px",
    borderRadius: "0 0 4px 4px",
  }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused
      ? isDarkMode
        ? "#374151"
        : "#EEEEEE"
      : isDarkMode
      ? "#1F2937"
      : "#FFFFFF",
    color: isDarkMode ? "#D1D5DB" : "black",
    "&:active": {
      background: isDarkMode ? "#4B5563" : "#DDDDDD",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: isDarkMode ? "white" : "black",
  }),
  placeholder: (base) => ({
    ...base,
    color: isDarkMode ? "#9CA3AF" : "#A1A1AA",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 8px",
  }),
  input: (base) => ({
    ...base,
    color: isDarkMode ? "#ffffff" : "black",
    margin: 0,
    padding: 0,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    display: "none",
  }),
  clearIndicator: (base) => ({
    ...base,
    display: "none",
  }),
});

// Usage example in your component

const TagInput = ({ label, className, value, onChange }) => {
  // Function to normalize tags input
  const isDarkMode = useSelector((state) => state.appSettings.isDarkMode);

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
        <label className="block text-sm font-bold mb-2 text-gray-900 dark:text-gray-400">
          {label}
        </label>
      )}
      <CreatableSelect
        id="tag-input"
        isMulti
        styles={getCustomStyles(isDarkMode)}
        onChange={onChange}
        onCreateOption={handleCreate}
        value={value}
        placeholder="Type or pastetags and press enter..."
      />
    </div>
  );
};

export default TagInput;
