import React, { ReactNode } from 'react';

const FormInput = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  error,
  icon,
  endIcon
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative rounded-md">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`block w-full ${
            icon ? 'pl-10' : 'pl-4'
          } ${
            endIcon ? 'pr-10' : 'pr-4'
          } py-2.5 border ${
            error ? 'border-red-300' : 'border-gray-300'
          } rounded-lg focus:outline-none focus:ring-2 ${
            error ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-indigo-500 focus:border-indigo-500'
          } transition-colors duration-200 ease-in-out text-gray-900 placeholder-gray-400 text-sm`}
          placeholder={placeholder}
          aria-invalid={error ? 'true' : 'false'}
        />
        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {endIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;