import React from "react";

const Input = React.forwardRef(
  ({ label, icon, className, error, ...props }, ref) => {
    const inputClassName = `bg-gray-800 text-white border ${
      error ? "border-red-500" : "border-gray-600"
    } rounded py-2 px-3 w-full leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500 ${
      icon ? "pl-10" : "pl-3"
    } `;

    return (
      <div className={className}>
        {label && (
          <label className="block text-sm font-bold mb-2 text-gray-400">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              {icon}
            </span>
          )}
          <input ref={ref} {...props} className={inputClassName} />
          {/* Reserve space for error message */}
        </div>
        {error && <p className="mt-1 text-xs text-red-500 ">{error}</p>}
      </div>
    );
  }
);

// Custom TextArea component
const TextArea = React.forwardRef(
  ({ label, icon, className, error, ...props }, ref) => {
    const textareaClassName = `bg-gray-800 text-white border ${
      error ? "border-red-500" : "border-gray-600"
    } rounded py-2 px-3 w-full leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500 ${
      icon ? "pl-10" : "pl-3"
    } `;

    return (
      <div className={className}>
        {label && (
          <label className="block text-sm font-bold mb-2 text-gray-400">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              {icon}
            </span>
          )}
          <textarea ref={ref} {...props} className={textareaClassName} />
          {/* Reserve space for error message */}
        </div>
        <p className="mt-1 text-xs text-red-500 ">{error || ""}</p>
      </div>
    );
  }
);

// Custom Select component
const Select = React.forwardRef(
  ({ label, icon, className, options, error, ...props }, ref) => {
    const selectClassName = `bg-gray-800 text-white border ${
      error ? "border-red-500" : "border-gray-600"
    } rounded py-2 px-3 w-full leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500 ${
      icon ? "pl-10" : "pl-3"
    } `;

    return (
      <div className={className}>
        {label && (
          <label className="block text-sm font-bold mb-2 text-gray-400">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              {icon}
            </span>
          )}
          <select ref={ref} {...props} className={selectClassName}>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* Reserve space for error message */}
        </div>
        <p className=" text-xs text-red-500 ">{error || ""}</p>
      </div>
    );
  }
);

export { Input, TextArea, Select };
