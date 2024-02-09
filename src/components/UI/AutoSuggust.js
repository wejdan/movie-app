import React, { useCallback } from "react";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";
import AsyncSelect from "react-select/async";
import { getAllActors, searchActors } from "../../services/actors";
const animatedComponents = makeAnimated();

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

// Add more customized styles as needed
const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

const CustomOption = (props) => {
  const { Option } = components;
  return (
    <Option {...props}>
      <div className="flex items-center">
        <img
          src={`${BASE_URL}/` + props.data.image}
          alt={props.data.label}
          className="w-10 h-10 mr-2" // Tailwind classes
        />
        {props.data.label}
      </div>
    </Option>
  );
};

const Autocomplete = React.forwardRef(
  (
    { options, className, isMulti, placeholder, exclude, label, ...props },
    ref
  ) => {
    const loadOptions = async (inputValue) => {
      try {
        const options = await searchActors(inputValue);
        // If `exclude` array is provided and not null, filter out the excluded options

        if (exclude && exclude.length > 0) {
          const excludeIds = exclude.map((item) => item.actor.value); // Adjust based on your data structure
          return options.filter((option) => !excludeIds.includes(option.value));
        }

        return options;
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    };
    return (
      <div className={className}>
        {label && (
          <label className="block text-sm font-bold mb-2 text-gray-400">
            {label}
          </label>
        )}
        <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={loadOptions}
          styles={customStyles}
          isMulti={isMulti}
          components={{
            ...animatedComponents,
            Option: CustomOption,
          }}
          classNamePrefix="react-select"
          {...props}
        />{" "}
      </div>
    );
  }
);
export default Autocomplete;
{
  /* <AsyncSelect
          cacheOptions
          defaultOptions
          loadOptions={loadOptions}
          styles={customStyles}
          components={{
            ...animatedComponents,
            Option: CustomOption,
          }}
          classNamePrefix="react-select"
          {...props}
        /> */
}
